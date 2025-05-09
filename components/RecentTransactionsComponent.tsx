import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Interface para os dados de transação
interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  data: string;
}

// Props para o RecentTransactionsComponent
interface RecentTransactionsComponentProps {
  transacoes: Transaction[];
}

// Componente para as transações recentes
const RecentTransactionsComponent: React.FC<RecentTransactionsComponentProps> = ({ transacoes }) => (
  <View style={styles.recentTransactionsContainer}>
    <Text style={styles.sectionTitle}>Transações Recentes</Text>
    {transacoes.map((transacao) => (
      <View key={transacao.id} style={styles.transactionItem}>
        <View>
          <Text style={styles.transactionDescription}>{transacao.descricao}</Text>
          <Text style={styles.transactionDate}>{transacao.data}</Text>
        </View>
        <Text style={[styles.transactionValue, transacao.valor < 0 ? styles.negativeValue : styles.positiveValue]}>
          {transacao.valor.toFixed(2).replace('.', ',')}
        </Text>
      </View>
    ))}
    {transacoes.length === 0 && <Text style={styles.emptyTransactions}>Nenhuma transação recente.</Text>}
    {transacoes.length > 0 && (
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>Ver Todas</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  recentTransactionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#64B5F6',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#212121',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#E0F7FA',
  },
  transactionDate: {
    fontSize: 12,
    color: '#B0BEC5',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positiveValue: {
    color: '#4CAF50',
  },
  negativeValue: {
    color: '#F44336',
  },
  emptyTransactions: {
    color: '#B0BEC5',
    fontStyle: 'italic',
    marginTop: 10,
  },
  viewAllButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#64B5F6',
    fontWeight: 'bold',
  },
});

export default RecentTransactionsComponent;