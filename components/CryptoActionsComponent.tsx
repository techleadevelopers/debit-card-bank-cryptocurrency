import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Props para o CryptoActionsComponent
interface CryptoActionsComponentProps {
  handleEnviar: () => void;
  handleReceber: () => void;
}

// Componente para as ações de criptomoedas
const CryptoActionsComponent: React.FC<CryptoActionsComponentProps> = ({ handleEnviar, handleReceber }) => (
  <View style={styles.cryptoActionsContainer}>
    <Text style={styles.sectionTitle}>Enviar e Receber Cripto</Text>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionButton} onPress={handleEnviar}>
        <Feather name="arrow-up" size={24} color="#4CAF50" />
        <Text style={styles.actionButtonText}>Enviar</Text>
        <Text style={styles.actionButtonSubtitle}>BTC e USDT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={handleReceber}>
        <Feather name="arrow-down" size={24} color="#2196F3" />
        <Text style={styles.actionButtonText}>Receber</Text>
        <Text style={styles.actionButtonSubtitle}>BTC e USDT</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cryptoActionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#64B5F6',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#E0F7FA',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actionButtonSubtitle: {
    color: '#B0BEC5',
    fontSize: 12,
  },
});

export default CryptoActionsComponent;