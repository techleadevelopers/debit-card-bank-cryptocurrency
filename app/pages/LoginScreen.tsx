import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const handleLogin = () => {
        // Aqui você pode adicionar a lógica de autenticação

        // Navegar para a HomeScreen após o login
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao CryptoBank!</Text>
            <Text style={styles.subtitle}>
                Acesse sua conta e gerencie suas finanças digitais com segurança.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#d3d3d3"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#d3d3d3"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                Não tem uma conta?{' '}
                <Text style={styles.linkText}>Cadastre-se aqui</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Fundo escuro
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: '#ffffff', // Texto branco
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#d3d3d3', // Texto mais suave
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#6200ea', // Roxo
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#ffffff', // Texto branco
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#6200ea', // Roxo
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff', // Texto branco
        fontSize: 18,
    },
    footerText: {
        color: '#d3d3d3',
        textAlign: 'center',
        marginTop: 20,
    },
    linkText: {
        color: '#6200ea', // Roxo
        fontWeight: 'bold',
    },
});

export default LoginScreen;