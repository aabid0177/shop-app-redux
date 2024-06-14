import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { List } from './Screens/List';
import { Detail } from './Screens/Detail';
import { Cart } from './Screens/Cart';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { Wishlist } from './Screens/Wishlist';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { cart, heartIcon, heartIconFill, homeIcon, themeColorRed } from './assets/assets';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  const Stack = createNativeStackNavigator();

  const BottomTab = () => {
    return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: themeColorRed
      }}
      >
        <Tab.Screen 
        name="List" 
        component={List} 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={homeIcon} tintColor={color}/>
          )
        }}
        />
        <Tab.Screen 
        name="Wishlist" 
        component={Wishlist} 
        options={{headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={heartIconFill} tintColor={color} />
          ),
          tabBarBadgeStyle: {color: 'white', backgroundColor: 'orange', borderWidth: 1, borderColor: 'white'},
        }} 
        />
        <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={cart} tintColor={color}/>
          )
        }} 
        />
      </Tab.Navigator>)
  }
  
  return (
    
    <Provider store={store}>
      <PaperProvider theme={theme}>
     <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{
              headerShown: false
              }}
            />
             <Stack.Screen
              name="Detail"
              component={Detail}
              options={{title: 'Detail',
              headerShown: false
              }}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
export default App;
