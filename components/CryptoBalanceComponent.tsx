import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Props para o CryptoBalanceComponent
interface CryptoBalanceComponentProps {
  saldoBitcoin: number;
  saldoUsdt: number;
}

// Componente para o saldo de criptomoedas
const CryptoBalanceComponent: React.FC<CryptoBalanceComponentProps> = ({ saldoBitcoin, saldoUsdt }) => (
  <View style={styles.cryptoBalanceContainer}>
    <Text style={styles.sectionTitle}>Seu Saldo em Cripto</Text>
    <View style={styles.cryptoItem}>
      <Text style={styles.cryptoLabel}>Bitcoin (BTC)</Text>
      <Text style={styles.cryptoValue}>{saldoBitcoin.toFixed(5)} BTC</Text>
    </View>
    <View style={styles.cryptoItem}>
      <Text style={styles.cryptoLabel}>USDT</Text>
      <Text style={styles.cryptoValue}>{saldoUsdt.toFixed(2)} USDT</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cryptoBalanceContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#64B5F6',
    marginBottom: 15,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#212121',
  },
  cryptoLabel: {
    fontSize: 16,
    color: '#E0F7FA',
  },
  cryptoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64B5F6',
  },
});

export default CryptoBalanceComponent;