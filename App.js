//App.js
import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Favorites from './Screens/Favorites';
import ShoppingList from './Screens/ShoppingList';
import { FavoritesProvider } from './Components/FavoritesContext';
import TabNavigatorIcons from './Components/TabNavigatorIcons';


const Tab = createBottomTabNavigator();

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color }) => (
    <TabNavigatorIcons route={route} focused={focused} color={color} size={24} />
  ),
});

export default function App() {
  return (
    <NavigationContainer>
      <FavoritesProvider>
        <Tab.Navigator screenOptions={tabScreenOptions}>
          <Tab.Screen name="ShoppingList" component={ShoppingList} />
          <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>  
      </FavoritesProvider>
    </NavigationContainer>
  );
}
