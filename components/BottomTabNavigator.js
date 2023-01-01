import React, {Component} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchScreen from '../screens/Search'
import TransactionScreen from '../screens/Transaction'
import Icon from 'react-native-ionicons'

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component{
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator 
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Transaction') {
              iconName = "book"
            } 
            else if (route.name === 'Search') {
              iconName = "search"
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;

          },
        })}

          tabBarOptions=
          {{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            style: { height: 130, borderTopWidth: 0, backgroundColor: "#5653d4" }, labelStyle: { fontSize: 20, fontFamily: "Rajdhani_600SemiBold" }, labelPosition: "beside-icon", tabStyle: { marginTop: 25, marginLeft: 10, marginRight: 10, borderRadius: 30, borderWidth: 2, alignItems: "center", justifyContent: "center", backgroundColor: "#5653d4" }
          }}
        >

                    <Tab.Screen name="Transaction" component={TransactionScreen}/>
                    <Tab.Screen name="Search" component={SearchScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
