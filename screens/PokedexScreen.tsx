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
        // Ordenar la lista alfabéticamente por nombre de Pokémon
        allPokemon.sort((a, b) => a.name.localeCompare(b.name));
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
      <Text style={styles.name}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
      <Image
        style={styles.image}
        source={{ uri: `${POKEMON_SPRITE_BASE_URL}${getPokemonIdFromUrl(item.url)}.png` }}
      />
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
    backgroundColor: '#463b71',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize', // Capitaliza la primera letra de cada palabra
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokedexScreen;
