import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/';
const POKEMON_SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const PokemonDetailScreen = ({ route }) => {
  const { pokemonName } = route.params;
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`${POKEAPI_BASE_URL}pokemon/${pokemonName}`);
        const data = response.data;
        setPokemonDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  const renderAbilityItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.ability.name}</Text>
    </View>
  );

  const renderMoveItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.move.name}</Text>
    </View>
  );

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
      <Image
        style={styles.image}
        source={{ uri: `${POKEMON_SPRITE_BASE_URL}${pokemonDetails.id}.png` }}
      />
      <Text style={styles.name}>{pokemonDetails.name}</Text>
      <Text style={styles.info}>Altura: {pokemonDetails.height} decímetros</Text>
      <Text style={styles.info}>Peso: {pokemonDetails.weight} hectogramos</Text>
      <Text style={styles.sectionTitle}>Habilidades:</Text>
      <FlatList
        data={pokemonDetails.abilities}
        renderItem={renderAbilityItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.sectionTitle}>Movimientos:</Text>
      <FlatList
        data={pokemonDetails.moves}
        renderItem={renderMoveItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonDetailScreen;
