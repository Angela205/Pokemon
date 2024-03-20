/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import PokedexScreen from './screens/PokedexScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Pantalla de Bienvenida */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'PokeDex App' }} />
        
        {/* Pantalla del Pokedex con lista de Pokémon */}
        <Stack.Screen name="Pokedex" component={PokedexScreen} options={{ title: 'Pokémon List' }} />
        
        {/* Pantalla de Detalle del Pokémon */}
        <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Pokémon Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
