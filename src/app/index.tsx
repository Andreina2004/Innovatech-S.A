import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function LoginScreen() {
  const [correo, setCorreo] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo }),
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        alert("¡Bienvenido, " + data.empleado.nombre + " (Rol: " + data.empleado.rol + ")!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor backend.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Innovatech - Inicio de Sesión</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ingrese su correo institucional" 
        value={correo}
        onChangeText={setCorreo} 
        autoCapitalize="none"
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '80%', maxWidth: 400, borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8, backgroundColor: '#fff' }
});