import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../Imagen/logo.png')} // Ruta de tu imagen de fondo con la extensión
      style={styles.backgroundImage}
      resizeMode="cover" // Ajusta el tamaño de la imagen para que cubra toda la pantalla
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenido a la aplicación de PokeDex</Text>
        <Button
          title="Ingresar"
          onPress={() => navigation.navigate('Pokedex')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
