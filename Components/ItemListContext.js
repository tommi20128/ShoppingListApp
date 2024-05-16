// ItemlistContext.js
// Later in the project, I will save the data to the phone's memory.
// Right now this is just a placeholder for the future. :|

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemListContext = createContext();

export const ItemListProvider = ({ children }) => {

    const [favoriteItems, setFavoriteItems] = useState([]);
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const loadItemList = async () => {
            const itemListFromStorage = await AsyncStorage.getItem('itemList');
            if (itemListFromStorage) {
                setItemList(JSON.parse(itemListFromStorage));
            }
        };
        loadItemList();
    }, []);

    const saveItemList = async (list) => {
        await AsyncStorage.setItem('itemList', JSON.stringify(list));
        setItemList(list);
    };

    return (
        <ItemListContext.Provider value={{ itemList, saveItemList }}>
            {children}
        </ItemListContext.Provider>
    );
}