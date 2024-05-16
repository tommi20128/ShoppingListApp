//FavoritesContext.js
// The data will be saved to the phone's memory later, so at this point everything is in progress :|

import React, { useState, createContext } from 'react';
import { Alert } from 'react-native';

// Create a context for favorites
export const FavoritesContext = createContext();

// Offer the favorites context to the children components
export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Add a product to the favorites on the favoriteItems list and check if the product is already in the favorites.
  // If the product is already in the favorites, notify the user and do not add it.
  const addToFavorite = (item) => {
    if (!favoriteItems.includes(item)) {
      setFavoriteItems(prevItems => [...prevItems, item]);
      Alert.alert(item, 'item added to favorites.');
    } else {
      Alert.alert(item, 'is already in favorites.');
      console.log('Tuote on jo suosikeissa.');
    }
  };

  // Delete a product from the favorites. Alert the user if he/she is sure about deleting the item.
  const deleteFromFavorites = (item) => {
    Alert.alert(
      'Delete item',
      `Are you sure you want to delete "${item}" from Favorites?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            setFavoriteItems(prevItems => prevItems.filter(i => i !== item));
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

  // Clear favorites
  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addToFavorite,
        deleteFromFavorites,
        clearFavorites
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
