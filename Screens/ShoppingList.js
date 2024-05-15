//ShoppingList.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Alert } from 'react-native';
import { FavoritesContext } from '../Components/FavoritesContext';

const ShoppingList = () => {
  const { addToFavorite } = useContext(FavoritesContext);
  const [text, setText] = useState('');

  // Lisätään tuote suosikkeihin ja tyhjennetään tekstikenttä
  // Lisäys tapahtuu käyttäen FavoriteContext komponentin addToFavorite-funktiota
  const handleAdd = () => {
    if (text.trim() !== '') {
      addToFavorite(text);
      console.log('Lisätty suosikiksi:', text);
      setText('');
    }
  };

    // Lisätään tuote ostoslistalle ja tyhjennetään tekstikenttä
    // Tässä vaiheessa vain ilmoitetaan käyttäjälle, että tuote ei ole valmis
  const handleAddGrocery = () => {
    if (text.trim() !== '') {
        Alert.alert(text, 'ei ole lisätty listalle, koska tämä ei ole valmis.');
      console.log('Lisätään jossain vaiheessa ostoslistalle:', text);
      setText('');
    }
  };

  // Jokaiselle tuotteelle luodaan sydänmerkki jolla voidaan lisätä tuote suosikkeihin
  // Jokaiselle tuotteelle luodaan myös checkbox jolla voidaan valita tuote ja poistaa se halutessaan ostoslistalta "Poista"-napilla

  return (
    <View>
      <TextInput style={styles.textInput}
        placeholder="Kirjoita tuotteen nimi"
        value={text}
        onChangeText={setText}
      />
      <View style={styles.itemlist}>

      </View>
        <Button title="Lisää tuote ostoslistalle" onPress={handleAddGrocery} />
        <View>
            <Text></Text>
        </View>
        <Button title="Lisää tuote suosikkeihin" onPress={handleAdd} />
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
        padding: 12,
        marginTop:8,
        borderRadius: 5,
        borderWidth:1,
        backgroundColor:'#fff',
        borderColor:'#C5C7BD',
        width: '100%'
    },
    itemlist: {
        padding: 8,
        fontSize: 20,
        height: '75%',
        backgroundColor:'#D5DBDB',
    },
});