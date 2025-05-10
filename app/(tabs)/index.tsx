// app/(tabs)/index.tsx
import React from 'react';
// Importe o componente HomeScreen
import HomeScreen from './HomeScreen';

// Importe o tipo de navegação do Expo Router, se estiver usando tipagem forte.
// Se estiver usando Stack dentro das Tabs (com app/_layout.tsx sendo um Stack):
// import { StackNavigationProp } from 'expo-router/stack';
// Se estiver usando Tabs diretamente no _layout.tsx e precisar do tipo de navegação de Tabs:
// import { TabsNavigationProp } from 'expo-router/tabs';

// Defina o tipo para as props que este componente (TabIndexScreen) recebe do roteador.
// O nome 'index' no tipo de navegação (StackNavigationProp ou TabsNavigationProp)
// refere-se a esta tela específica (index.tsx).
// type TabIndexScreenProps = {
//   navigation: StackNavigationProp<any, 'index'>; // Exemplo para Stack dentro de Tabs
//   // navigation: TabsNavigationProp<any, 'index'>; // Exemplo para Tabs
// };
// Usando 'any' para simplificar e focar na passagem da prop,
// mas substitua pelo tipo correto do seu roteador para melhor tipagem.
type TabIndexScreenProps = {
  navigation: any;
};


// Este componente (TabIndexScreen) é o que o roteador renderiza para a rota 'index'.
// Ele RECEBE a prop 'navigation' automaticamente do roteador.
const TabIndexScreen: React.FC<TabIndexScreenProps> = ({ navigation }) => {
  // E então PASSA essa prop 'navigation' para o HomeScreen,
  // que a espera conforme definido em HomeScreenProps.
  return <HomeScreen navigation={navigation} />;
}

export default TabIndexScreen;
