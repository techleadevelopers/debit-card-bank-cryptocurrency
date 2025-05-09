import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';

// Componente para a tela "Explorar"
export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Explore</Text>
      </View>
      <Text style={styles.description}>
        This app includes example code to help you get started.
      </Text>

      <Text style={styles.sectionTitle}>File-based routing</Text>
      <Text>
        This app has two screens: <Text style={styles.boldText}>app/(tabs)/index.tsx</Text> and{' '}
        <Text style={styles.boldText}>app/(tabs)/explore.tsx</Text>.
      </Text>
      <Text>
        The layout file in <Text style={styles.boldText}>app/(tabs)/_layout.tsx</Text> sets up the tab navigator.
      </Text>

      <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />

      {/* Adicione outras seções conforme necessário */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#666',
  },
  boldText: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#64B5F6',
    marginVertical: 10,
  },
  image: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});