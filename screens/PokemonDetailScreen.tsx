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
        <ActivityIndicator size="large" color="#9b8cba" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${POKEMON_SPRITE_BASE_URL}${pokemonDetails.id}.png` }}
        />
      </View>
      <Text style={styles.name}>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</Text>
      <Text style={styles.info}>Su poder que lo caracteriza: {pokemonDetails.abilities[0].ability.name}</Text>
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
    backgroundColor: '#19114b',
  },
  imageContainer: {
    backgroundColor: '#19113b',
    borderRadius: 100, // Hacer el contenedor circular
    padding: 5,
    overflow: 'hidden', // Recortar la imagen para que se ajuste al contenedor circular
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Hacer la imagen circular
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize',
    color: '#9b8cba',
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    color: '#9b8cba',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#9b8cba',
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
    color: '#19114b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19114b',
  },
});

export default PokemonDetailScreen;
