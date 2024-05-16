//Favorites.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Button, Animated, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../Components/FavoritesContext';
import { ShoppingListContext } from '../Components/ShoppingListContext';
import { MaterialIcons } from '@expo/vector-icons';

const Favorites = () => {
  const { favoriteItems, addToFavorite, clearFavorites, deleteFromFavorites } = useContext(FavoritesContext);
  const { addToShoppingList } = useContext(ShoppingListContext);
  const [text, setText] = useState('');
  const textInputRef = useRef(null); // Ref to textInput
  const [notification, setNotification] = useState('');
  const [animation] = useState(new Animated.Value(0));
  const animationRef = useRef(null);
  
  // Animation for notification
  useEffect(() => {
    if (notification) {
      if (animationRef.current) {
        animationRef.current.stop();
        animation.setValue(0);
      } 
      animationRef.current = Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      });

      animationRef.current.start(() => {
        setTimeout(() => {
          if (animationRef.current) {
            animationRef.current.stop();
          }
          setNotification('');
        }, 500);
      });
    }
  }, [notification]);


  console.log('Favorite List:', favoriteItems); // Just for testing

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
    setNotification(`${item} added to shopping list`);
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
  // Change alert to animation notification when item is already in shopping list
  // User should be able to change products order in the favorites list by dragging and dropping them
  // Add button that changes the order of the products in the favorites list to alphabetical order, ascending or descending and back to the original order
  // Add button "Clear Favorites" somewhere safe place to user won't accidentally press it
   
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TextInput style={styles.textInput}
          placeholder="Write here..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddToFavorites}
          ref={textInputRef}
          blurOnSubmit={false}
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
          <Text style={{ fontSize: 18 }}>Favorite list is empty</Text>
        )}
      </View>

      
      {notification ? (
        <Animated.View
          style={[
            styles.notificationContainer,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.notificationText}>{notification}</Text>
        </Animated.View>
      ) : null}
      

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
    height: '89%',
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
  notificationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  notificationText: {
    color: 'black',
    fontSize: 18,
  },
});