//TabNavigatorIcons.js
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const TabNavigatorIcons = ({ route, color, size }) => {
  const iconMap = {
    Favorites: 'favorite',
    ShoppingList: 'shopping-cart',
  };

  const routeName = route?.name || '';
  const iconName = iconMap[routeName] || 'shopping-cart';

  return <MaterialIcons name={iconName} size={size} color={color} />;
};

export default TabNavigatorIcons;