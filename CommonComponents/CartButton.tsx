import { Image, Text, TouchableOpacity, View } from "react-native"
import { cart } from "../assets/assets"

const CartButton = (props: any) => {
    return(
        <TouchableOpacity style={[{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}, props.style]} onPress={props.onPress}>
            <Image source={cart} style={{width: 20, height: 20, tintColor: 'white'}}/>
            {props?.count ? 
            <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, top: 0, borderWidth: 1, borderColor: 'white'}}>
                <Text style={{color: 'white', fontSize: 10, fontWeight: '500', textAlign: 'center'}}>{props?.count}</Text>
            </View>
            : null
            }
            
        </TouchableOpacity>
    )
}
export default CartButton;