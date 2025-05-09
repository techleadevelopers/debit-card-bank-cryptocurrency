import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Import the icon library - you might need to install react-native-vector-icons
// and link it to your project depending on your React Native version and setup.
// For Expo projects, it's usually included by default.
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Using FontAwesome for the Bitcoin icon

// Props para o CreditCardComponent
interface CreditCardComponentProps {
  limiteCartao: number;
  faturaAtual: number;
}

// Componente para o cartão de crédito
const CreditCardComponent: React.FC<CreditCardComponentProps> = ({ limiteCartao, faturaAtual }) => (
  <View style={styles.cardContainer}>
    <LinearGradient
      colors={['#6A1B9A', '#4A148C']}
      style={styles.creditCard}
    >
      {/* Bitcoin Icon */}
      {/* Position absolute to place it in the background and center it */}
      <FontAwesome
        name="bitcoin" // Using the bitcoin icon from FontAwesome
        size={150} // Adjust size as needed
        color="#E1BEE7" // Icon color, matching the cardTitle/cardLabel color for harmony
        style={styles.bitcoinIcon}
      />

      {/* Card Content - ensure content is above the icon */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Cartão de Crédito</Text>
        <Text style={styles.cardNumber}>**** **** **** 1234</Text>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardLabel}>Limite</Text>
            <Text style={styles.cardValue}>R$ {limiteCartao.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.cardSeparator} />
          <View>
            <Text style={styles.cardLabel}>Fatura Atual</Text>
            <Text style={styles.cardValue}>R$ {faturaAtual.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    shadowColor: '#6A1B9A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  creditCard: {
    backgroundColor: '#6A1B9A', // This background color might be less visible due to LinearGradient
    borderRadius: 15,
    padding: 20,
    // Add relative positioning to allow absolute positioning of the icon inside
    position: 'relative',
    overflow: 'hidden', // Hide parts of the icon that go outside the rounded corners
  },
  bitcoinIcon: {
    position: 'absolute', // Position the icon absolutely
    // Center the icon using top, left, and transform
    top: '50%',
    left: '50%',
    // Translate back by half of the icon's width and height to truly center it
    transform: [{ translateX: -75 }, { translateY: -75 }], // -75 is half of the size 150
    opacity: 0.15, // Set opacity to 15%. Change to 0.75 if you prefer 75% opacity.
    zIndex: 1, // Ensure icon is behind the content
  },
  cardContent: {
    zIndex: 2, // Ensure content is above the icon
  },
  cardTitle: {
    fontSize: 18,
    color: '#E1BEE7',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    letterSpacing: 2,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 12,
    color: '#E1BEE7',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardSeparator: {
    width: 1,
    height: '80%',
    backgroundColor: '#9C27B0',
  },
});

export default CreditCardComponent;
