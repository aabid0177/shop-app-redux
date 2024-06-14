import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { deleteIcon, minusIcon, plusIcon, themeColorRed } from "../assets/assets"
import { Rating } from "react-native-ratings"
import Header from "../CommonComponents/Header"
import { useDispatch, useSelector } from "react-redux"
import { updateItemInCart, updateItemQuantityAndPrice } from "../Store/reducers/productReducers"
export const Cart = ({navigation}) => {
    let dispatch = useDispatch()
    const ProductList = useSelector((store: any) => store.collection.cartProducts)
    const renderItem = (item: any, index: number) => {
       const product = item
        return (
        
            <View style={[{flexDirection: 'row'}, styles.itemContainer]}>
                <Image source={{uri: product?.image}} style={styles.productImage} resizeMode='cover' />
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text>{product.title}</Text>
                  <Text>Category: {product.category}</Text>
                  <Text>Price: ${product.price}</Text>
                  <Rating
                    startingValue={ 3}
                    ratingCount={5}
                    imageSize={15} 
                    style={{alignItems:"flex-start", paddingTop: 5}}
                />
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
                    <TouchableOpacity onPress={()=>{
                        dispatch(updateItemQuantityAndPrice({index: index, isAddedToCart: true}))
                    }}>
                        <Image source={plusIcon} style={{width: 15, height: 15, tintColor: themeColorRed}}/>       
                    </TouchableOpacity>
                    <Text>{product?.quantity ? product?.quantity : 1}</Text>
                    <TouchableOpacity onPress={()=>{
                        dispatch(updateItemQuantityAndPrice({index: index, isAddedToCart: false}))
                    }}>
                        <Image source={minusIcon} style={{width: 15, height: 15, tintColor: themeColorRed}}/>       
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        dispatch(updateItemInCart({product: product, isAddedToCart: false}))
                    }}>
                        <Image source={deleteIcon} style={{width: 24, height: 24, tintColor: themeColorRed}}/>       
                    </TouchableOpacity>
                  </View>
                </View>
           </View>
        
        )
    }

    const renderList = () => {
        return(
            <FlatList style={{flex: 1}} keyExtractor={(item) => new Date().getTime() + item.id} data={ProductList} renderItem={({item, index}) => (
                renderItem(item, index)
            )} />
        )
    }

    return (
    <SafeAreaView style={styles.mainScreen}>
        <Header navigation={navigation} title="Cart" hideCartButton={true} wishListCount={0} hideBackButton={true}/>
        {renderList()}
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: 'lightgrey'
    },
    productImage: {
        width: 100,
        height: 150
    },
    itemContainer: {
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 2
    }
})