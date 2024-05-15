//Favorites.js
import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import { FavoritesContext } from '../Components/FavoritesContext';
import { MaterialIcons } from '@expo/vector-icons';

const Favorites = () => {
    const { favoriteItems, clearFavorites } = useContext(FavoritesContext);
    console.log('Suosikit:', favoriteItems);

    // Tyhjennetään suosikit FavoriteContextin komponentin clearFavorites-funktiolla
    // Tätä ei tarvitse Suosikkien kanssa mutta tullaan käyttämään ostoslistan tyhjennykseen
    // Suosikkien tyhjennys tapahtuu pelkästään valittujen tuotteiden kanssa eli teeppä se ku ehit.
    const handleClearFavorites = () => {
        clearFavorites();
      };

      // Lisätään tuote ostoslistalle ja ilmoitetaan käyttäjälle, että tuote lisätään ostoslistalle
      // Tässä vaiheessa vain ilmoitetaan käyttäjälle, että tuote ei ole valmis
    const handleAddToGroceryList = (item) => {
        Alert.alert(item, 'lisätään joskus ostoslistalle.');
        console.log('Lisätty ostoslistalle:', item);
    };

    // Poistetaan tuote suosikeista ja ilmoitetaan käyttäjälle, että tuote poistetaan suosikeista
    // Tässä vaiheessa vain ilmoitetaan käyttäjälle, että tuote ei ole valmis
    const handleDeleteFromFavorites = (item) => {
        Alert.alert(item, 'Poistetaan joskus suosikeista.');
        console.log('Poistettu suosikeista:', item);
    };

      const IconButton = ({ onPress, icon }) => (
        <TouchableOpacity style={styles.iconButton}  onPress={onPress}>
          {icon}
        </TouchableOpacity>
      );

    // Lisää hakukenttä jolla voidaan etsiä tuotteita suosikeista. 
    // Kun käyttäjä antaa ensimmäisen kirjaimen niin hakukenttä alkaa ehdottamaan tuotteita suosikeista.

    return (
        <View>
            <FlatList
                style={styles.itemFlatlist}
                data={favoriteItems}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item}</Text>
                        <IconButton                            
                            onPress={() => { handleAddToGroceryList(item) }}
                            icon={<MaterialIcons name="add" size={24} color="black" />}                            
                        />
                        <Button title="Remove" onPress={() => {handleDeleteFromFavorites(item)}} />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button style={styles.deleteItem} title="Tyhjennä suosikit" onPress={handleClearFavorites} />
        </View>
    );
};
export default Favorites;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemFlatlist: {
        padding: 5,
        height: '94.5%',
        backgroundColor:'#D5DBDB',
    }, 
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemName: {
        padding: 5,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        flex: 1,
        backgroundColor:'#fff',
      },
      iconButton: {
        marginRight: 8,
        marginLeft: 4,
        padding: 5,
        backgroundColor: 'lightgreen',
        },
      button: {
          padding: 20,
          fontSize: 15,
          marginTop: 5,
          marginRight: 8,
          flex: 1,
          backgroundColor:'#fff',
        },
      deleteItem: {
          padding: 12,
          marginTop:8,
          borderRadius: 5,
          borderWidth:1,
          backgroundColor:'#D5DBDB',
          borderColor:'#C5C7BD',
          width: '80%'
      },
  });