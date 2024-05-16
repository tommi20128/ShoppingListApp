//TabNavigatorIcons.js
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

// TabNavigatorIcons component is used to display icons in the tab navigator
const TabNavigatorIcons = ({ route, color, size }) => {
  const iconMap = {
    Favorites: {name: 'favorite', color: 'red'},
    ShoppingList: 'shopping-cart',
  };

  // Get the name of the route or an empty string if the route is not defined and set the icon to the iconMap object or the default icon 'shopping-cart' if the icon is not found
  const routeName = route?.name || '';
  const icon = iconMap[routeName] || 'shopping-cart';

  if (typeof icon === 'string') {
    return <MaterialIcons name={icon} size={size} color={color} />;
  } else {
    return <MaterialIcons name={icon.name} size={size} color={icon.color} />;
  }
};

export default TabNavigatorIcons;