import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Rating } from "react-native-ratings"
import Header from "../CommonComponents/Header"
import { useDispatch, useSelector } from "react-redux"
import { updateItemInWishList } from "../Store/reducers/productReducers"
export const Wishlist = ({navigation}) => {

    let dispatch = useDispatch()
    const cartCount = useSelector((store: any) => store.collection.cartProducts.length)
    const ProductList = useSelector((store: any) => store.collection.wishListProducts)
    const renderItem = (item: any, index: any) => {
       const product = item
        return (
        
            <View style={[{flexDirection: 'row'}, styles.itemContainer]}>
                <Image source={{uri: product?.image}} style={styles.productImage} resizeMode='cover' />
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text>{product.title}</Text>
                  <Text>Category: {product.category}</Text>
                  <Text>Price: ${product.price}</Text>
                  <Rating
                    startingValue={product?.rating?.rate}
                    ratingCount={5}
                    imageSize={15} 
                    style={{alignItems:"flex-start", paddingTop: 5}}
                />
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}}>
                  <TouchableOpacity style={{ 
                        justifyContent:"center", 
                        alignItems:"center", 
                        padding:10 ,
                        backgroundColor:"white",
                        borderRadius:3,
                        borderColor: "#FF543C",
                        borderWidth:1,
                        }} 
                        onPress={()=>{
                            dispatch(updateItemInWishList({product: product, isAddedToWishList: false}))
                        }}
                        >
                        <Text style={{color:"#FF543C", fontWeight:"bold"}}> {'Remove from Wishlist' }</Text>
                    </TouchableOpacity>
                  </View>
                </View>
           </View>
        )
    }

    const renderList = () => {
        return(
            <FlatList style={{flex: 1}} keyExtractor={(item) => new Date().getTime() + item.id} data={ProductList} 
            renderItem={({item, index}) => (
                renderItem(item, index)
            )}
            />
        )
    }

    return (
    <SafeAreaView style={styles.mainScreen}>
        <Header navigation={navigation} hideWishListButton={true} title="Wishlist" cartCount={cartCount} hideBackButton={true}></Header>
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