import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CreditCardComponent from '../../components/CreditCardComponent';
import CryptoBalanceComponent from '../../components/CryptoBalanceComponent';
import CryptoActionsComponent from '../../components/CryptoActionsComponent';
import RecentTransactionsComponent from '../../components/RecentTransactionsComponent';
import NavbarComponent from '../../components/NavbarComponent';

// Interface para os dados de transação
interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  data: string;
}

const HomeScreen: React.FC = () => {
  // Dados de exemplo (substitua com seus dados reais)
  const [saldoReais, setSaldoReais] = useState(1500.75);
  const [saldoBitcoin, setSaldoBitcoin] = useState(0.025);
  const [saldoUsdt, setSaldoUsdt] = useState(120.50);
  const limiteCartao = 3000;
  const faturaAtual = 540.20;
  const [transacoes, setTransacoes] = useState<Transaction[]>([
    { id: '1', descricao: 'Supermercado Neon', valor: -125.90, data: '07/05/2025' },
    { id: '2', descricao: 'Salário Azul', valor: 2500.00, data: '05/05/2025' },
    { id: '3', descricao: 'Transferência Roxa', valor: -50.00, data: '03/05/2025' },
    { id: '4', descricao: 'USDT Neon', valor: -300.00, data: '01/05/2025' },
  ]);
  const [showDetailedBalance, setShowDetailedBalance] = useState(false);

  // Animações
  const pulseAnim = useState(new Animated.Value(1))[0];
  const detailedBalanceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.timing(pulseAnim, {
        toValue: 1.05,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(animate); // Recomeça a animação
      });
    };

    animate(); // Inicia a animação pela primeira vez

    return () => {
      pulseAnim.stopAnimation(); // Limpa a animação ao desmontar o componente
    };
  }, [pulseAnim]);

  // Função para lidar com o toque no saldo principal
  const handleSaldoPress = () => {
    setShowDetailedBalance(!showDetailedBalance);
    Animated.timing(detailedBalanceAnim, {
      toValue: showDetailedBalance ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const saldoTotalReais = saldoReais + saldoBitcoin * 280000 + saldoUsdt * 5.15;

  // Função para navegar para a tela de envio (a ser implementada)
  const handleEnviar = () => {
    console.log('Navegar para a tela de Enviar');
  };

  // Função para navegar para a tela de recebimento (a ser implementada)
  const handleReceber = () => {
    console.log('Navegar para a tela de Receber');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <HeaderComponent
          saldoTotalReais={saldoTotalReais}
          handleSaldoPress={handleSaldoPress}
          pulseAnim={pulseAnim}
          showDetailedBalance={showDetailedBalance}
          saldoReais={saldoReais}
          saldoBitcoin={saldoBitcoin}
          saldoUsdt={saldoUsdt}
          detailedBalanceAnim={detailedBalanceAnim}
        />

        <View style={styles.content}>
          <CreditCardComponent limiteCartao={limiteCartao} faturaAtual={faturaAtual} />
          <CryptoBalanceComponent saldoBitcoin={saldoBitcoin} saldoUsdt={saldoUsdt} />
          <CryptoActionsComponent handleEnviar={handleEnviar} handleReceber={handleReceber} />
          <RecentTransactionsComponent transacoes={transacoes} />
        </View>
      </ScrollView>
      <NavbarComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;