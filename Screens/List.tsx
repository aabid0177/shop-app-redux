import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ThemeFonts, heartIcon, heartIconFill, themeColorRed } from "../assets/assets"
import { Rating } from "react-native-ratings"
import Header from "../CommonComponents/Header"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { APIManager, BASE_URL, END_POINTS } from "../Network/APIManager"
import { updateItemInCart, updateItemInWishList, fetchProducts } from "../Store/reducers/productReducers"
import axios from "axios"
import { Loader } from "../CommonComponents/ActivityIndicator"
import { Wishlist } from "./Wishlist"

export const List = ({navigation}) => {

    useEffect(() => {
        // Update the document title using the browser API
        dispatch(fetchProducts())
    }, [])

    let dispatch = useDispatch()
    let collection = useSelector((store: any) => store.collection)
    const isLoading = useSelector((store: any) => store.collection.isLoading)

    const cartCount = collection.cartProducts.length
    const wishListCount = collection.wishListProducts.length
    const ProductList =  collection.ProductList
    const renderItem = (item: any, index: number) => {
       const product = item
        return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => {
            navigation.navigate('Detail', {
                detail:product,
                index: index
            })
        }}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: product?.image}} style={styles.productImage} resizeMode='contain' />
                <View style={{flex: 1, paddingHorizontal: 10}}>
                  <Text style={{fontFamily: ThemeFonts.semibold, fontSize: 16, paddingBottom: 5}}>{product?.title}</Text>
                  <Text style={{fontFamily: ThemeFonts.medium, fontSize: 15}}>Category: {product?.category}</Text>
                  <Text style={{fontFamily: ThemeFonts.medium, fontSize: 15}}>Price: <Text style={{fontFamily: ThemeFonts.semibold, fontSize: 15, color: themeColorRed}}>${product?.price}</Text></Text>
                  <Rating
                    startingValue={ product?.rating?.rate}
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
                        onPress={async ()=>{
                            if(product.isAddedToCart){
                                const res = await APIManager.delete(END_POINTS.carts, product.id)
                                if(res?.status == 200) {
                                    dispatch(updateItemInCart({product: product, isAddedToCart: false}))
                                }
                            } else {
                                const params = {
                                    userId:5,
                                    date:new Date().toString(),
                                    products:[{productId:product.id,quantity:1}]
                                }
                                const res = await APIManager.post(END_POINTS.carts, params)

                                if(res?.status == 200) {
                                    dispatch(updateItemInCart({product: product, isAddedToCart: true}))
                                }
                            }
                        }}
                        >
                        <Text style={{color:"#FF543C", fontFamily: ThemeFonts.medium, fontSize: 13}}> {product.isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        if(product.isAddedToWishList){
                            dispatch(updateItemInWishList({product: product, isAddedToWishList: false}))
                        } else {
                            dispatch(updateItemInWishList({product: product, isAddedToWishList: true}))
                        }
                    }}>
                        <Image source={ product.isAddedToWishList ? heartIconFill: heartIcon} style={{width: 24, height: 24, tintColor: 'red'}}/>       
                    </TouchableOpacity>
                  </View>
                </View>
           </View>
        </TouchableOpacity>
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
        <Header navigation={navigation} title="List" hideBackButton={true} cartCount={cartCount} wishListCount={wishListCount}/>
        {renderList()}
        {isLoading && Loader()}
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1
    },
    productImage: {
        width: 100,
        height: 150
    },
    itemContainer: {
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 15,
        elevation: 5
    }
})