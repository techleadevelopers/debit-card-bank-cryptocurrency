import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'; // Ícones
import { LinearGradient } from 'expo-linear-gradient'; // Gradiente


type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;


const navigation = useNavigation<LoginScreenNavigationProp>();


const handleLogin = () => {
    // Lógica de autenticação (pode ser mock, API, etc)
    
    // Se autenticado com sucesso:
    navigation.navigate('HomeScreen');
  };

// --- Paleta de Cores ---
const COLORS = {
  darkBackground: '#0D0F1A',
  inputBackground: '#1A1D2A',
  inputBorder: '#2C2F3A',
  inputFocusedBorderPurple: '#A020F0', // Um roxo vibrante para foco
  inputFocusedBorderBlue: '#00AFFF',   // Azul neon para foco alternativo
  primaryPurple: '#7F00FF',
  gradientPurpleStart: '#A020F0', // Roxo mais claro para início do gradiente
  gradientPurpleEnd: '#651FFF',   // Roxo mais escuro para fim do gradiente
  accentBlue: '#00AFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B0',
  error: '#FF4757',
  shadowPurple: 'rgba(127, 0, 255, 0.5)', // Roxo com opacidade para sombra
  shadowBlue: 'rgba(0, 175, 255, 0.4)',   // Azul com opacidade para sombra
  disabledButton: '#2C2F3A',
};

// --- Componente de Input Customizado ---
interface CustomInputProps {
  label: string;
  iconName: keyof typeof Feather.glyphMap;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  error?: string | null;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  onSubmitEditing?: () => void;
  returnKeyType?: 'next' | 'done' | 'go';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  isPassword,
  showPassword,
  toggleShowPassword,
  error,
  onFocus,
  onBlur,
  isFocused,
  onSubmitEditing,
  returnKeyType,
  keyboardType = 'default',
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View
      style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused, // Efeito de foco na borda
        error && styles.inputWrapperError,
      ]}
    >
      <Feather name={iconName} size={20} color={isFocused ? COLORS.accentBlue : COLORS.textSecondary} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

// --- Tela de Login ---
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const passwordInputRef = useRef<TextInput>(null);

  const validateEmail = (text: string): boolean => {
    if (!text) {
      setEmailError('E-mail é obrigatório.');
      return false;
    }
    // Simples validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Formato de e-mail inválido.');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validatePassword = (text: string): boolean => {
    if (!text) {
      setPasswordError('Senha é obrigatória.');
      return false;
    }
    if (text.length < 6) {
      setPasswordError('Senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    setPasswordError(null);
    return true;
  };

  const handleLogin = async () => {
    setLoginError(null); // Limpa erros anteriores
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);
    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (email === 'teste@exemplo.com' && password === 'senha123') {
      Alert.alert('Login Bem-sucedido!', `Bem-vindo, ${email}!`);
      // Aqui você navegaria para a próxima tela
    } else {
      setLoginError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <MaterialCommunityIcons name="shield-moon" size={80} color={COLORS.primaryPurple} style={styles.logo} />
            <Text style={styles.title}>Bem-vindo de Volta!</Text>
            <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>

            {loginError && <Text style={[styles.errorText, styles.generalError]}>{loginError}</Text>}

            <CustomInput
              label="E-mail"
              iconName="mail"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) validateEmail(text);
              }}
              placeholder="seuemail@exemplo.com"
              error={emailError}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => {
                setFocusedInput(null);
                validateEmail(email);
              }}
              isFocused={focusedInput === 'email'}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              returnKeyType="next"
              keyboardType="email-address"
            />

            <CustomInput
              label="Senha"
              iconName="lock"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) validatePassword(text);
              }}
              placeholder="Sua senha secreta"
              secureTextEntry={!showPassword}
              isPassword
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
              error={passwordError}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => {
                setFocusedInput(null);
                validatePassword(password);
              }}
              isFocused={focusedInput === 'password'}
              // @ts-ignore TODO: verificar ref typing
              ref={passwordInputRef}
              onSubmitEditing={handleLogin}
              returnKeyType="done"
            />

            <TouchableOpacity onPress={() => Alert.alert('Esqueci Senha', 'Funcionalidade a ser implementada.')}>
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} disabled={loading} style={styles.loginButtonContainer}>
              <LinearGradient
                colors={loading ? [COLORS.disabledButton, COLORS.disabledButton] : [COLORS.gradientPurpleStart, COLORS.gradientPurpleEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loginButton}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.textPrimary} />
                ) : (
                  <Text style={styles.loginButtonText}>Entrar</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialLoginContainer}>
              {/* Adicionar botões de login social aqui, se necessário */}
              <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Login Social', 'Login com Google (A Implementar)')}>
                <MaterialCommunityIcons name="google" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Login Social', 'Login com Apple (A Implementar)')}>
                <MaterialCommunityIcons name="apple" size={24} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => Alert.alert('Criar Conta', 'Funcionalidade a ser implementada.')} style={styles.signUpContainer}>
              <Text style={styles.signUpText}>
                Não tem uma conta? <Text style={styles.signUpLink}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    // Efeito neon sutil na sombra do logo (opcional)
    textShadowColor: COLORS.shadowPurple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 12,
    height: 55, // Altura consistente
  },
  inputWrapperFocused: {
    borderColor: COLORS.inputFocusedBorderBlue, // Azul neon no foco
    shadowColor: COLORS.shadowBlue, // Sombra azul neon no foco
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5, // Necessário para sombra no Android
  },
  inputWrapperError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  generalError: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: COLORS.accentBlue,
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 25,
    fontWeight: '600',
  },
  loginButtonContainer: {
    borderRadius: 12,
    // Sombra neon para o botão
    shadowColor: COLORS.shadowPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8, // Para Android
    marginBottom: 25,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55, // Altura consistente
  },
  loginButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.inputBorder,
  },
  dividerText: {
    color: COLORS.textSecondary,
    marginHorizontal: 12,
    fontSize: 12,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    // Sombra sutil (opcional)
    shadowColor: COLORS.shadowBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  signUpContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  signUpText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.accentBlue,
    fontWeight: 'bold',
  },
});

export default LoginScreen;