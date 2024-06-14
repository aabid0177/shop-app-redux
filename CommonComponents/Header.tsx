import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ThemeFonts, back, heartIconFill, themeColorRed } from "../assets/assets";
import CartButton from "./CartButton";

interface Props {
    navigation?: any,
    onPressBack?: any,
    children?: any,
    hideBackButton?: boolean,
    hideWishListButton?: boolean,
    hideCartButton?: boolean,
    title?: string,
    rightView?: Element,
    onPressWishList?: any,
    cartCount?: number,
    wishListCount?: number
}

const Header = (props: Props) => {

  const renderBackButton = () => {
  return(
      <TouchableOpacity style={{ position: 'absolute', left: 0, width: 44, height: 44, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
        props?.navigation.goBack()
        props?.onPressBack
    }}>
        <Image source={back} style={{width: 20, height: 20, tintColor: 'white'}}/>
    </TouchableOpacity> 
    )
}

const renderWishListButton = () => {
  return(
      <TouchableOpacity style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
        props?.navigation?.navigate('Wishlist')
    }}>
        <Image source={heartIconFill} style={{width: 20, height: 20, tintColor: 'white'}}/>
        {props?.wishListCount ? 
            <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, top: 0, borderWidth: 1, borderColor: 'white'}}>
                <Text style={{color: 'white', fontSize: 10, fontWeight: '500', textAlign: 'center'}}>{props?.wishListCount}</Text>
            </View>
            : null
            }
    </TouchableOpacity> 
    )
}

const renderCartButton = () => {
  return(
    <CartButton count={props.cartCount} onPress={() => {
      props.navigation.navigate('Cart')
    }}/>
    )
}

const renderRightView = () => {
return(
  <View style={{position: 'absolute', right: 0, flexDirection: 'row'}}>
    {!props.hideWishListButton && renderWishListButton()}
    {!props.hideCartButton && renderCartButton()}
  </View>
)
}

 return(
    <View style={styles.header}>
        {props.hideBackButton ? null : renderBackButton()}
        <Text style={styles.titleText}>{props?.title}</Text>
        {renderRightView()}
    </View>
 )       
}
export default Header;

const styles = StyleSheet.create({
  header: {
    height: 54,
    backgroundColor: themeColorRed,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  titleText: {
    color: 'white',
    fontSize: 16,
   fontFamily: ThemeFonts.bold
  }
})
