// app/(tabs)/HomeScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, Button, Text, TouchableOpacity, TextInput } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CreditCardComponent from '../../components/CreditCardComponent';
// Importando CryptoActionsComponent - este componente AGORA espera a prop 'navigation'
import CryptoActionsComponent from '../../components/CryptoActionsComponent';
import CryptoBalanceComponent from '../../components/CryptoBalanceComponent';
import RecentTransactionsComponent from '../../components/RecentTransactionsComponent';
import NavbarComponent from '../../components/NavbarComponent'; // Se o Navbar for parte desta tela e não do _layout

// Importe o tipo de navegação apropriado do seu sistema de navegação (ex: React Navigation ou Expo Router)
// Se estiver usando Expo Router com Stack:
// import { StackNavigationProp } from 'expo-router/stack';
// type RootStackParamList = {
//   index: undefined; // Referente a esta tela (HomeScreen)
//   SendCrypto: undefined;
//   ReceiveCrypto: undefined;
//   // Adicione outras rotas aqui
// };

// Interface para os dados de transação
interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  data: string;
}

// Interface para as props do HomeScreen (incluindo navigation)
// Esta prop 'navigation' é fornecida automaticamente por bibliotecas de navegação
// (como React Navigation ou Expo Router) quando este componente é usado como uma tela em um navegador.
// Você PRECISA que este componente seja renderizado como uma tela de navegação para que 'navigation' exista.
// type HomeScreenProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'index'>; // Exemplo para Expo Router Stack
// };
// Use um tipo mais genérico se não souber o sistema de navegação específico
type HomeScreenProps = {
  navigation: any; // Tipo genérico para demonstração. Substitua pelo tipo correto da sua biblioteca de navegação.
};


// ------------- LoginComponent -------------
// Este componente lida com a apresentação visual da tela de login.
// A lógica de login (setIsLoggedIn) permanece na HomeScreen.
const LoginComponent: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Bem-vindo!</Text>
        <Text style={loginStyles.subtitle}>Faça login para continuar</Text>
        <TextInput
          style={loginStyles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={loginStyles.button} onPress={onLogin}>
          <Text style={loginStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para o LoginComponent (Mantidos os originais que você forneceu)
const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fundo escuro
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#1E1E1E', // Fundo do card um pouco mais claro
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#2C2C2C', // Campo de input mais escuro
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF', // Cor vibrante para o botão
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
// --- Fim do LoginComponent e seus estilos ---


// --- HomeScreen (Atualizado para aceitar e passar a prop navigation) ---
// Este componente AGORA espera a prop navigation ao ser usado como uma tela de navegação
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controle de login
  // Removido o estado currentView, pois a navegação será externa

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
        }).start(animate);
      });
    };

    // Animação só roda se estiver logado
    if (isLoggedIn) {
        animate();
    } else {
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);
    }

    return () => {
      pulseAnim.stopAnimation();
    };
  }, [pulseAnim, isLoggedIn]);

  const handleSaldoPress = () => {
    setShowDetailedBalance(!showDetailedBalance);
    Animated.timing(detailedBalanceAnim, {
      toValue: showDetailedBalance ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const saldoTotalReais = saldoReais + saldoBitcoin * 280000 + saldoUsdt * 5.15;

  // Função para lidar com o login (simulada)
  const handleLogin = () => {
    // Em um app real, aqui você faria a autenticação
    setIsLoggedIn(true);
  };

  // Se não estiver logado, exibe a tela de login
  if (!isLoggedIn) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  // Renderiza a tela principal se estiver logado
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
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
          {/* Mantido CreditCardComponent, lembrando que no conceito é débito */}
          <CreditCardComponent limiteCartao={limiteCartao} faturaAtual={faturaAtual} />
          <CryptoBalanceComponent saldoBitcoin={saldoBitcoin} saldoUsdt={saldoUsdt} />
          {/* Passando a prop navigation para CryptoActionsComponent.
              Este componente AGORA espera esta prop para usar navigation.navigate() */}
          <CryptoActionsComponent navigation={navigation} />
          <RecentTransactionsComponent transacoes={transacoes} />
        </View>
      </ScrollView>
      {/* NavbarComponent também precisaria de navegação em um app real */}
      {/* Se o Navbar for parte do _layout, remova esta linha */}
      <NavbarComponent />
    </View>
  );
};

// Seus estilos originais para HomeScreen (Mantidos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#121212', // Movido para o View pai
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  // loginContainer não é mais necessário aqui
  // Estilos do CryptoActionsComponent devem estar no arquivo do próprio componente.
});

export default HomeScreen;
