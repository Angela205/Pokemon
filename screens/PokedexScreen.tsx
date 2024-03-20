import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/';
const POKEMON_SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const PokedexScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        let allPokemon = [];
        let offset = 0;
        const limit = 100;
        while (allPokemon.length < 1000) {
          const response = await axios.get(`${POKEAPI_BASE_URL}pokemon?offset=${offset}&limit=${limit}`);
          const data = response.data.results;
          allPokemon = [...allPokemon, ...data];
          offset += limit;
        }
        setPokemonList(allPokemon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PokemonDetail', { pokemonName: item.name })}
    >
      <Image
        style={styles.image}
        source={{ uri: `${POKEMON_SPRITE_BASE_URL}${getPokemonIdFromUrl(item.url)}.png` }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.code}>Código: {getPokemonIdFromUrl(item.url)}</Text>
      </View>
    </TouchableOpacity>
  );

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 16,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokedexScreen;
