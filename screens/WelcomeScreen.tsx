import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para validar el usuario y contraseña
    // Por ejemplo, puedes comparar el usuario y contraseña con una base de datos o realizar alguna otra validación.
    if (username === 'angemendez' && password === '12345') {
      navigation.navigate('Pokedex');
      setUsername(''); // Restablecer el estado del usuario
      setPassword(''); // Restablecer el estado de la contraseña
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground
      source={require('../Imagen/logo.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button
          title="Ingresar"
          onPress={handleLogin}
        />
      </View>
      <Text style={styles.bottomText}>Bienvenido a la aplicación de PokeDex</Text>
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
  input: {
    width: '100%',
    height: 60, // Aumento de la altura del input
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10, // Aumento del radio del borde
    fontSize: 20, // Aumento del tamaño de fuente
  },
  bottomText: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    fontSize: 24, // Aumento del tamaño de fuente
  },
});

export default WelcomeScreen;
