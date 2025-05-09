import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

// Interface para as props do HeaderComponent
interface HeaderComponentProps {
  saldoTotalReais: number;
  handleSaldoPress: () => void;
  pulseAnim: Animated.Value;
  showDetailedBalance: boolean;
  saldoReais: number;
  saldoBitcoin: number;
  saldoUsdt: number;
  detailedBalanceAnim: Animated.Value;
}

// Componente para o cabeçalho
const HeaderComponent: React.FC<HeaderComponentProps> = ({
  saldoTotalReais,
  handleSaldoPress,
  pulseAnim,
  showDetailedBalance,
  saldoReais,
  saldoBitcoin,
  saldoUsdt,
  detailedBalanceAnim,
}) => {
  const renderDetailedBalance = () => {
    if (!showDetailedBalance) return null;

    return (
      <Animated.View
        style={{
          height: detailedBalanceAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100], // Altura aproximada do conteúdo detalhado
          }),
          opacity: detailedBalanceAnim,
          overflow: 'hidden',
        }}
      >
        <View style={styles.detailedBalanceContainer}>
          <Text style={styles.detailedBalanceText}>
            Real: R$ {saldoReais.toFixed(2).replace('.', ',')}
          </Text>
          <Text style={styles.detailedBalanceText}>
            Bitcoin (BTC): {saldoBitcoin.toFixed(5)} BTC
          </Text>
          <Text style={styles.detailedBalanceText}>
            USDT: {saldoUsdt.toFixed(2)} USDT
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={['#121212', '#1E1E1E']} style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Seu Saldo Total</Text>
        <TouchableOpacity onPress={() => { /* Adicionar funcionalidade de atualizar saldo */ }}>
          <Feather name="refresh-cw" size={24} color="#64B5F6" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSaldoPress}>
        <Animated.Text
          style={[styles.saldoPrincipal, { transform: [{ scale: pulseAnim }] }]}
        >
          R$ {saldoTotalReais.toFixed(2).replace('.', ',')}
        </Animated.Text>
      </TouchableOpacity>
      {renderDetailedBalance()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64B5F6',
  },
  saldoPrincipal: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E0F7FA',
  },
  detailedBalanceContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  detailedBalanceText: {
    color: '#E0F7FA',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HeaderComponent;