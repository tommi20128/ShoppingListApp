//ShoppingList.js
import React, { useState, useContext, useRef } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../Components/FavoritesContext';
import { ShoppingListContext } from '../Components/ShoppingListContext';
import { MaterialIcons } from '@expo/vector-icons';

const ShoppingList = () => {
  const { addToFavorite } = useContext(FavoritesContext);
  const { shoppingListItems, addToShoppingList, deleteFromShoppingList, clearShoppingList } = useContext(ShoppingListContext);
  const [text, setText] = useState('');
  const textInputRef = useRef(null); // Ref textInputille

  // Add to favorites using addToFavorite function from FavoritesContext component and clear the text input
  const handleAddToFavorites = () => {
    if (text.trim() !== '') {
      addToFavorite(text);
      console.log('Lisätty suosikiksi:', text);
      setText('');
    }
  };

  // Clear shopping list with clearShoppingList function from ShoppingListContext component
  const handleClearShoppingList = () => {
    clearShoppingList();
  };

  // Add to shopping list with addToShoppingList function from ShoppingListContext component and clear the text input
  const handleAddToShoppingList = () => {
    if (text.trim() !== '') {
      addToShoppingList(text);
      setText('');
      textInputRef.current.focus(null);
    }
  };

  // Delete an item from the shopping list with the deleteFromShoppingList function from the ShoppingListContext component
  const handleDeleteFromShoppingList = (item) => {
    deleteFromShoppingList(item);
  };

  // IconButton component for the buttons
  const IconButton = ({ onPress, icon }) => (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput style={styles.textInput}
          placeholder="Kirjoita tuotteen nimi"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddToShoppingList}
          ref={textInputRef}
          blurOnSubmit={false}
        />
        <IconButton
          onPress={() => { handleAddToFavorites(text) }}
          icon={<MaterialIcons name="favorite" size={24} color="red" />}
        />
      </View>
      <View style={styles.itemContainer}>
        {shoppingListItems && shoppingListItems.length > 0 ? (
          <FlatList
            style={styles.itemFlatlist}
            data={shoppingListItems}
            renderItem={({ item }) => (
              <View style={styles.itemList}>
                <Text style={styles.itemName}>{item}</Text>
                <IconButton
                  onPress={() => { addToFavorite(item) }}
                  icon={<MaterialIcons name="favorite" size={24} color="red" />}
                />
                <IconButton
                  onPress={() => { handleDeleteFromShoppingList(item) }}
                  icon={<MaterialIcons name="delete" size={24} color="black" />}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>Empty shopping list</Text>
        )}
      </View>
      <View style={styles.clearButtonContainer}>
        <Button title="Tyhjennä ostoslista" onPress={handleClearShoppingList} />
      </View>
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: '82%',
    backgroundColor: '#f7f3f2',
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
  clearButtonContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});