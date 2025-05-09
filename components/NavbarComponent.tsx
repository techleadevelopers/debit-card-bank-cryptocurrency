import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Componente para a barra de navegação
const NavbarComponent: React.FC = () => (
  <View style={styles.navbar}>
    <TouchableOpacity style={styles.navItem} onPress={() => console.log('Home')}>
      <Feather name="home" size={24} color="#64B5F6" />
      <Text style={styles.navText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => console.log('Extrato')}>
      <Feather name="list" size={24} color="#B0BEC5" />
      <Text style={styles.navText}>Extrato</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => console.log('Pagar')}>
      <Feather name="arrow-up-circle" size={24} color="#B0BEC5" />
      <Text style={styles.navText}>Pagar</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => console.log('Perfil')}>
      <Feather name="user" size={24} color="#B0BEC5" />
      <Text style={styles.navText}>Perfil</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Cor de fundo da navbar
    paddingVertical: 15,
    borderTopLeftRadius: 20, // Bordas arredondadas
    borderTopRightRadius: 20,
    position: 'absolute', // Fixa a navbar na parte inferior
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',     // Sombra para dar elevação
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    flex: 1, // Distribui os itens igualmente
  },
  navText: {
    color: '#B0BEC5',
    fontSize: 12,
    marginTop: 5,
  },
});

export default NavbarComponent;