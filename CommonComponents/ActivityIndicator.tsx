import { ActivityIndicator, View } from "react-native"
import { themeColorRed } from "../assets/assets"

export const Loader = () =>  {
    return(
        <View style={{flex: 1}}>
            <ActivityIndicator color={themeColorRed} size='large'/>
        </View>
        
    )
}