//Favorites.js
import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Button, Animated, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../Components/FavoritesContext';
import { ShoppingListContext } from '../Components/ShoppingListContext';
import { MaterialIcons } from '@expo/vector-icons';

const AnimatedIconButton = Animated.createAnimatedComponent(MaterialIcons);

const Favorites = () => {
  const { favoriteItems, addToFavorite, clearFavorites, deleteFromFavorites } = useContext(FavoritesContext);
  const { addToShoppingList } = useContext(ShoppingListContext);
  const [text, setText] = useState('');
  const textInputRef = useRef(null); // Ref to textInput
  const [animation] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };



  console.log('Suosikit:', favoriteItems); // Just for testing

  // Add to favorites using addToFavorite function from FavoritesContext component and clear the text input
  const handleAddToFavorites = () => {
    if (text.trim() !== '') {
      addToFavorite(text);
      console.log('Lisätty suosikiksi:', text);
      setText('');
    }
  };

  // Add to shopping list using the addToShoppingList function from the ShoppingListContext component
  const handleAddToShoppingList = (item) => {
    addToShoppingList(item);
  };

  // Delete from favorites using the deleteFromFavorites function from the FavoriteContext component
  const handleDeleteFromFavorites = (item) => {
    deleteFromFavorites(item);
  };

  // Clear favorites with the clearFavorites function from the FavoriteContext component
  // This may not be needed in the final version, but it makes testing easier
  const handleClearFavorites = () => {
    clearFavorites();
  };

  // IconButton component for the buttons
  const IconButton = ({ onPress, icon }) => (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );

  // TODO!!!
  // Add a search field to search for products in favorites or add directly to favorites.
  // When the user enters the first letter, the search field starts suggesting products from favorites.

   /* 
  // Make this code work properly

  <View style={styles.itemList}>
      <Text style={styles.itemName}>{item}</Text>
      <TouchableOpacity
        onPress={() => handleAddToShoppingList(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <AnimatedIconButton
          name="add"
          size={24}
          color="black"
          style={{ transform: [{ scale: animation }] }}
        />
      </TouchableOpacity>
      <Button title="Remove" onPress={() => handleDeleteFromFavorites(item)} />
    </View>
  */



  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput style={styles.textInput}
          placeholder="Kirjoita tuotteen nimi"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddToFavorites}
          ref={textInputRef}
          blurOnSubmit={false}
        />
        <IconButton
          onPress={() => { handleAddToFavorites(text) }}
          icon={<MaterialIcons name="favorite" size={24} color="red" />}
        />
      </View>
      <View style={styles.itemContainer}>
        {favoriteItems && favoriteItems.length > 0 ? (
          <FlatList
            style={styles.itemFlatlist}
            data={favoriteItems}
            renderItem={({ item }) => (
              <View style={styles.itemList}>
                <Text style={styles.itemName}>{item}</Text>
                <IconButton
                  onPress={() => { handleAddToShoppingList(item) }}
                  icon={<MaterialIcons name="add" size={24} color="black" />}
                />
                <Button title="Remove" onPress={() => { handleDeleteFromFavorites(item) }} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

        ) : (
          <Text>Empty favorite list</Text>
        )}
      </View>
    </View>
  );
};
export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: 12,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#C5C7BD',
    fontSize: 18,
  },
  itemContainer: {
    padding: 6,
    height: '100%',
    borderBottomColor: '#f7f3f2',
  },
  itemFlatlist: {
    padding: 5,
    backgroundColor: '#fff',
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  itemName: {
    padding: 5,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    flex: 1,
  },
  iconButton: {
    marginRight: 8,
    marginLeft: 4,
    padding: 6,
  },
  deleteItem: {
    padding: 12,
    marginTop: 8,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#D5DBDB',
    borderColor: '#C5C7BD',
  },
});