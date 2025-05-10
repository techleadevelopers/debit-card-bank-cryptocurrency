// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Importe os ícones que você usará para as abas (ex: Ionicons, MaterialIcons)
// Certifique-se de ter instalado o pacote: expo install @expo/vector-icons
import { Ionicons } from '@expo/vector-icons';

// Importando seu objeto Colors. Vamos usar as propriedades que existem nele.
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light']; // Obter o objeto de cores para o tema atual

  return (
    <Tabs
      screenOptions={{
        // Define a cor ativa dos ícones e texto da aba
        tabBarActiveTintColor: colors.tint, // Usando 'tint' que parece existir
        // Define a cor inativa. Usando 'tabIconDefault' ou 'icon' como alternativa se 'tabInactive' não existe
        tabBarInactiveTintColor: colors.tabIconDefault || colors.icon, // Ajustado para usar propriedades existentes
        // Oculta o cabeçalho padrão das telas dentro das abas
        headerShown: false, // Mantido como false para cabeçalhos customizados nas telas
        // Estilo da barra de abas
        tabBarStyle: {
          backgroundColor: colors.background, // Usando 'background' que parece existir
          borderTopColor: colors.background, // Usando 'background' ou outra cor existente se 'tabBorder' não existe
          // Estilo específico para iOS para efeito de transparência/blur
          ...(Platform.OS === 'ios' && {
             position: 'absolute', // Permite que o conteúdo da tela role por baixo da tab bar
             // Usando um fundo translúcido genérico ou uma cor existente com opacidade
             backgroundColor: 'rgba(18, 18, 18, 0.8)', // Exemplo de fundo escuro translúcido
             // Se você tiver uma propriedade para fundo de aba translúcido, use-a aqui
             // backgroundColor: colors.tabBackgroundTranslucent || 'rgba(18, 18, 18, 0.8)',
          }),
        },
        // Estilo do texto do rótulo da aba
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        // Estilo do ícone da aba
        tabBarIconStyle: {
          marginTop: 5, // Ajusta o espaço acima do ícone
        },
      }}>

      {/* --- Definição das Telas de Aba --- */}

      {/* Aba Home - Corresponde ao arquivo app/(tabs)/index.tsx */}
      {/* Como index.tsx renderiza HomeScreen.tsx, esta aba mostrará o conteúdo de HomeScreen */}
      <Tabs.Screen
        name="index" // O nome 'index' corresponde ao arquivo index.tsx
        options={{
          title: 'Home', // Título exibido na aba
          tabBarIcon: ({ color, focused }) => ( // Ícone da aba
            <Ionicons
              name={focused ? 'home' : 'home-outline'} // Ícone diferente quando a aba está ativa
              size={24}
              color={color} // Cor do ícone (vem do tabBarActiveTintColor/tabBarInactiveTintColor)
            />
          ),
          // Se você quisesse um cabeçalho nesta tela específica:
          // headerShown: true,
          // headerTitle: 'CryptoBank Home',
          // headerStyle: { backgroundColor: colors.background }, // Usando 'background'
          // headerTintColor: colors.text, // Usando 'text'
        }}
      />

      {/* Aba Explore - Corresponde ao arquivo app/(tabs)/explore.tsx */}
       <Tabs.Screen
        name="explore" // O nome 'explore' corresponde ao arquivo explore.tsx
        options={{
          title: 'Explore', // Título exibido na aba
          tabBarIcon: ({ color, focused }) => ( // Ícone da aba
            <Ionicons
              name={focused ? 'compass' : 'compass-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* --- Outras Telas (Enviar/Receber) --- */}
      {/* As telas de Enviar (SendCrypto) e Receber (ReceiveCrypto) provavelmente NÃO serão abas.
           Elas geralmente são telas que você navega a partir da Home.
           Você precisaria registrá-las em um Stack Navigator.
           Se o seu _layout.tsx principal (app/_layout.tsx) for um Stack Navigator, você pode registrá-las lá.
           Se as abas estiverem dentro de um Stack (definido em app/_layout.tsx), você pode registrá-las no Stack que envolve as abas.

           Exemplo (SE SendCrypto e ReceiveCrypto estivessem em app/(tabs)/, mas ocultas da tab bar):
           <Tabs.Screen
             name="SendCrypto" // Nome do arquivo app/(tabs)/SendCrypto.tsx
             options={{
               title: 'Enviar Cripto',
               href: null, // Oculta da tab bar
               headerShown: true, // Mostra o cabeçalho para navegação de volta
               headerTitle: 'Enviar Cripto',
               headerStyle: { backgroundColor: colors.background },
               headerTintColor: colors.text,
             }}
           />
           <Tabs.Screen
             name="ReceiveCrypto" // Nome do arquivo app/(tabs)/ReceiveCrypto.tsx
             options={{
               title: 'Receber Cripto',
               href: null, // Oculta da tab bar
               headerShown: true, // Mostra o cabeçalho para navegação de volta
               headerTitle: 'Receber Cripto',
               headerStyle: { backgroundColor: colors.background },
               headerTintColor: colors.text,
             }}
           />
      */}

    </Tabs>
  );
}
