//FavoritesContext.js

import React, { useState, createContext } from 'react';
import { Alert } from 'react-native';

// Tiedot tullaan myöhemmin tallentamaan puhelimen muistiin, joten tässä vaiheessa kaikki on vaiheessa :|

// Luodaan konteksti suosikeille
export const FavoritesContext = createContext();

// Tarjoaa kontekstin suosikeille
export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Lisätään tuote suosikkeihin favoriteItems listalle ja tarkistetaan onko tuote jo suosikeissa. Jos tuote on jo suosikeissa, ilmoitetaan käyttäjälle, eikä lisäystä tehdä.
  const addToFavorite = (item) => {
    if (!favoriteItems.includes(item)) {
      setFavoriteItems(prevItems => [...prevItems, item]);
      Alert.alert(item, 'on lisätty suosikkeihin.');
    } else {
        Alert.alert(item, 'on jo suosikeissa.');
        console.log('Tuote on jo suosikeissa.');
    }
  };
  
  // Tyhjennetään suosikit
  const clearFavorites = () => {
    setFavoriteItems([]);
    console.log('Suosikit on tyhjennetty.');
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addToFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
