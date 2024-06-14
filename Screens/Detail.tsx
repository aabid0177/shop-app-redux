import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Header from "../CommonComponents/Header"
import { Rating } from "react-native-ratings"
import { ThemeFonts, themeColorRed } from "../assets/assets"
import { useDispatch, useSelector } from "react-redux"
import { updateItemInCart } from "../Store/reducers/productReducers"

export const Detail = ({navigation, route}) => {
    const collection = useSelector((store: any) => store.collection)
    const book = collection.ProductList.find((item: any) => {
        return item.id == route.params?.detail.id
    })
    const wishListCount = collection.wishListProducts.length
    const cartCount = collection.cartProducts.length
    const index = route.params?.index
    const dispatch = useDispatch()
    
    return (
    <SafeAreaView style={styles.mainScreen}>
        <Header 
         navigation={navigation} 
         title="Product Details" 
         cartCount={cartCount}
         wishListCount={wishListCount}
         />

        <ScrollView>
             <View style={[styles.mainScreen, {padding: 10}]}>
             
                 <Image
                  source={{ uri: book?.image }}
                      style={styles.fitImage}
                  />
                  <View style={styles.infoBox}>
                      <Text style={{fontFamily: ThemeFonts.regular, fontSize: 13}}>Product </Text>
                      <Text style={styles.propText}>{book?.title}</Text>
                  </View>
                 
                  <View style={styles.infoBox}>
                      <Text style={{fontFamily: ThemeFonts.regular, fontSize: 13}}>Category</Text>
                      <Text style={styles.propText}>{book?.category}</Text>
                  </View>
                  <View style={styles.infoBox}>
                      <Text style={{fontFamily: ThemeFonts.regular, fontSize: 13}}>Price</Text>
                      <Text style={styles.propText}>${book?.price}</Text>
                  </View>
                 <View style={styles.rating}>
                   <View style={{...styles.infoBox, flexDirection:"column"}}>   
                     <Text style={{fontFamily: ThemeFonts.regular, fontSize: 13}}> Description! </Text>
                      <Text style={{fontFamily: ThemeFonts.regular, fontSize: 13}}>{book?.description}</Text>
                   </View>
                 <Rating
                      startingValue={Math.floor(parseInt(book?.rating?.rate))}
                      ratingCount={5}
                      imageSize={25}
                      showRating
                  />
                 </View>
                <View style={{alignItems:"center"}}>
                <TouchableOpacity style={{ 
                justifyContent:"center", 
                alignItems:"center", 
                padding:10 ,
                width:"80%", 
                backgroundColor:themeColorRed,
                borderRadius:3,
               
                marginBottom:20,
                }}
                onPress={()=>{
                    if (book?.isAddedToCart) {
                        dispatch(updateItemInCart({product: book, isAddedToCart: false}))
                    } else {
                        dispatch(updateItemInCart({product: book, isAddedToCart: true}))
                    }
                }}>
                
              <Text style={{color:"white", fontFamily: ThemeFonts.bold, fontSize:18}}>{book?.isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}</Text>
              </TouchableOpacity>
                </View>
              
             </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: 'white'
    },
    rating : {
        marginTop:10,
        marginBottom:10
    },
    infoBox: {
       flexDirection:"row", 
       justifyContent:"space-between", borderColor:"gray",
       borderWidth:1,
        padding:10,
        marginTop:15,
            },
    fitImage: {
        borderRadius: 5, 
        resizeMode:"contain",
        width:"100%",
        height:430,
      },
      fitImageWithSize: {
        height: 100,
        width: 30,
      },
      defaultText:{
        fontSize : 15,
      },
      propText: {
        fontFamily : ThemeFonts.semibold,
        fontSize : 13,
        color: themeColorRed
      }
})