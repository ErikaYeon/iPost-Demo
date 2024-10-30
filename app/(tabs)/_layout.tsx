import { Tabs } from "expo-router"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgUri } from 'react-native-svg'; // Asegúrate de instalar react-native-svg
import LupaIcon from "../../assets/images/icons/nav_search.svg";
import ProfileIcon from "../../assets/images/icons/nav_user.svg";
import PostIcon from "../../assets/images/icons/nav_more.svg";
import HomeIcon from "../../assets/images/icons/logoiPost.svg";

const Tab = createBottomTabNavigator();
export default () => {
    return(
        // <Tab.Navigator
        // initialRouteName="home"
        // screenOptions={{headerShown:false}}>
        // <Tab.Screen
        // name= 'home'
        // component={DetailScreen}
        // options={{title: home,
        //     tabBarIcon:({size,color}) =>(
        //         <MaterialComunityIcons name='details' size={size}
        //         color={color}
        //     )
        // }}
        // />
           

        // </Tab.Navigator>
        <Tabs >
            <Tabs.Screen name="search" options={{ headerShown: false }}  />
            <Tabs.Screen name="profile" options={{ headerShown: false }} />
            <Tabs.Screen name="createPost" options={{ headerShown: false }} />
            <Tabs.Screen name="home" options={{ headerShown: false }} />
         </Tabs>
    
    )
}