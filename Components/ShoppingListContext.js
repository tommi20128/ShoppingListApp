//ShoppingListContext.js

import React, { useState, createContext } from 'react';
import { Alert } from 'react-native';

// Create a context for the shopping list
export const ShoppingListContext = createContext();

// Offer the shopping list context to the children components
export const ShoppingListProvider = ({ children }) => {
  const [shoppingListItems, setShoppingListItems] = useState([]);

  // Add a product to the shopping list on the shoppingListItems list and check if the product is already on the shopping list.
  // If the product is already on the shopping list, notify the user and do not add it.
  const addToShoppingList = (item) => {
    if (!shoppingListItems.includes(item)) {
      setShoppingListItems(prevItems => [...prevItems, item]);
    } else {
      Alert.alert(item, 'is already on the shopping list');
    }
  };

  // Delete a product from the shopping list
  const deleteFromShoppingList = (item) => {
    setShoppingListItems(prevItems => prevItems.filter(i => i !== item));
  };

  // Clear shopping list. Ask the user if he/she is sure about clearing the shopping list.
  const clearShoppingList = () => {
    Alert.alert(
      'Delete shopping list',
      `Are you sure you want to clear your shopping list?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            setShoppingListItems([]);
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingListItems,
        addToShoppingList,
        deleteFromShoppingList,
        clearShoppingList
      }}>
      {children}
    </ShoppingListContext.Provider>
  );
}