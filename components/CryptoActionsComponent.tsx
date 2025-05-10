import React, { useState } from 'react';
// Certifique-se de que 'Platform' está importado aqui
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated, Platform } from 'react-native';
// Não precisaremos mais de Feather e Ionicons para os ícones de cripto, mas manteremos Feather para a seta de voltar se necessário.
import { Feather } from '@expo/vector-icons';

// --- Ícones SVG Inline ---
// Usaremos SVGs inline para os ícones de cripto para evitar dependências de imagem externa.
// Estes são exemplos simplificados.

const BitcoinIconSVG = ({ color = '#FFD700', size = 24 }) => (
    <View style={{ width: size, height: size }}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={color}>
            <g id="Bitcoin">
                <path d="M31.712,15.214A15.95,15.95,0,0,0,16,0,15.95,15.95,0,0,0,.288,15.214a16.05,16.05,0,0,0,0,1.572A15.95,15.95,0,0,0,16,32,15.95,15.95,0,0,0,31.712,16.786a16.05,16.05,0,0,0,0-1.572ZM21.479,20.7a3.235,3.235,0,0,1-3.235,3.235H14.281v3.589H11.022V23.934H10.147V20.7h.875V11.381H10.147V8.118h.875V4.529h3.259V8.118h4.063a3.235,3.235,0,0,1,3.235,3.235Zm-3.235-6.151H14.281V17.47H18.244a1.412,1.412,0,0,0,1.412-1.412A1.412,1.412,0,0,0,18.244,14.553Zm-.034-3.172H14.281V8.118H18.21a1.412,1.412,0,0,0,1.412-1.412A1.412,1.412,0,0,0,18.21,5.294H14.281V1.706H18.176a3.235,3.235,0,0,1,3.235,3.235A3.235,3.235,0,0,1,18.176,11.381Z"/>
            </g>
        </svg>
    </View>
);

// Placeholder para USDT (usando o símbolo ₮)
const UsdtIconPlaceholder = ({ color = '#FFFFFF', size = 24 }) => (
     <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.8, color: color, fontWeight: 'bold' }}>₮</Text>
     </View>
);


// --- Componentes de Tela Interna (Dentro do CryptoActionsComponent) ---
// Estes componentes representam as interfaces que aparecem ao clicar em Enviar/Receber.

interface SendCryptoInternalProps {
    onBack: () => void; // Função para voltar para a tela principal
    // Poderia adicionar props aqui para passar dados, como a cripto selecionada (BTC/USDT)
}

const SendCryptoInternal: React.FC<SendCryptoInternalProps> = ({ onBack }) => {
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC'); // Estado para selecionar a cripto

    const handleSend = () => {
        // Lógica de envio aqui (simulada)
        console.log(`Enviando ${amount} ${selectedCrypto} para o endereço: ${address}`);
        // Após enviar, você pode voltar ou mostrar uma confirmação
        // onBack(); // Voltar após simular envio
    };

    return (
        <View style={internalScreenStyles.container}>
            {/* Botão de Voltar no topo */}
             <TouchableOpacity style={internalScreenStyles.closeButton} onPress={onBack}>
                <Feather name="x" size={24} color="#E0E0E0" />
            </TouchableOpacity>

            <Text style={internalScreenStyles.title}>Enviar Cripto</Text>

            {/* Seleção de Cripto com Ícones */}
            <View style={internalScreenStyles.cryptoSelector}>
                <TouchableOpacity
                    style={[internalScreenStyles.cryptoButton, selectedCrypto === 'BTC' && internalScreenStyles.cryptoButtonActive]}
                    onPress={() => setSelectedCrypto('BTC')}
                >
                     <BitcoinIconSVG size={30} color={selectedCrypto === 'BTC' ? '#FFFFFF' : '#FFD700'} /> {/* Ícone Bitcoin */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[internalScreenStyles.cryptoButton, selectedCrypto === 'USDT' && internalScreenStyles.cryptoButtonActive]}
                    onPress={() => setSelectedCrypto('USDT')}
                >
                     <UsdtIconPlaceholder size={30} color={selectedCrypto === 'USDT' ? '#FFFFFF' : '#A0A0A0'} /> {/* Símbolo USDT */}
                </TouchableOpacity>
            </View>

            <TextInput
                style={internalScreenStyles.input}
                placeholder={`Valor (${selectedCrypto})`}
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={internalScreenStyles.input}
                placeholder="Endereço da Carteira"
                placeholderTextColor="#888"
                keyboardType="default"
                autoCapitalize="none"
                value={address}
                onChangeText={setAddress}
            />

            {/* Botão de Enviar - Estilo Neon Roxo Robusto */}
            <TouchableOpacity style={internalScreenStyles.actionButtonNeon} onPress={handleSend}>
                 <Text style={internalScreenStyles.actionButtonTextNeon}>Enviar {selectedCrypto}</Text>
            </TouchableOpacity>

            {/* Removido o botão Voltar da parte inferior, agora está no topo */}
        </View>
    );
};

interface ReceiveCryptoInternalProps {
    onBack: () => void; // Função para voltar para a tela principal
    // Poderia adicionar props aqui para passar dados, como a cripto selecionada
}

const ReceiveCryptoInternal: React.FC<ReceiveCryptoInternalProps> = ({ onBack }) => {
    const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC'); // Estado para selecionar a cripto
    // Em um app real, você geraria e exibiria o endereço e QR code aqui

    return (
        <View style={internalScreenStyles.container}>
            {/* Botão de Voltar no topo */}
             <TouchableOpacity style={internalScreenStyles.closeButton} onPress={onBack}>
                <Feather name="x" size={24} color="#E0E0E0" />
            </TouchableOpacity>

            <Text style={internalScreenStyles.title}>Receber Cripto</Text>
            <Text style={internalScreenStyles.subtitle}>Seu endereço para receber {selectedCrypto}:</Text>

             {/* Seleção de Cripto com Ícones */}
            <View style={internalScreenStyles.cryptoSelector}>
                <TouchableOpacity
                    style={[internalScreenStyles.cryptoButton, selectedCrypto === 'BTC' && internalScreenStyles.cryptoButtonActive]}
                    onPress={() => setSelectedCrypto('BTC')}
                >
                     <BitcoinIconSVG size={30} color={selectedCrypto === 'BTC' ? '#FFFFFF' : '#FFD700'} /> {/* Ícone Bitcoin */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[internalScreenStyles.cryptoButton, selectedCrypto === 'USDT' && internalScreenStyles.cryptoButtonActive]}
                    onPress={() => setSelectedCrypto('USDT')}
                >
                     <UsdtIconPlaceholder size={30} color={selectedCrypto === 'USDT' ? '#FFFFFF' : '#A0A0A0'} /> {/* Símbolo USDT */}
                </TouchableOpacity>
            </View>

            {/* Placeholder para Endereço e QR Code */}
            <View style={internalScreenStyles.addressContainer}>
                <Text style={internalScreenStyles.addressText}>
                    {selectedCrypto === 'BTC' ? 'bc1q...seuendereco...xyz' : '0x...seuenderecousdt...123'}
                </Text>
                {/* Placeholder para QR Code */}
                <View style={internalScreenStyles.qrCodePlaceholder}>
                    <Text style={internalScreenStyles.qrCodeText}>QR Code</Text>
                </View>
            </View>

            {/* Removido o botão Voltar da parte inferior, agora está no topo */}
        </View>
    );
};

// Estilos para as telas internas (Enviar/Receber) - Definidos aqui para serem usados pelos componentes internos
const internalScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        // Fundo do card - Sólido escuro para cobrir a Home
        backgroundColor: 'rgba(150, 74, 221, 0.15)', // neon roxo bem translúcido
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30, // Aumentado padding para visual de card
        position: 'absolute', // Posiciona sobre o conteúdo do CryptoActionsComponent
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1, // Garante que fique por cima do conteúdo principal do CryptoActionsComponent
        borderRadius: 20, // Bordas mais arredondadas para o card
       


         // Glassmorphism effect
      borderWidth: 1.5,
      borderColor: 'rgba(160, 45, 184, 0.2)', // Borda translúcida
      overflow: 'hidden',
    
      shadowColor: '#8A2BE2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.9,
      shadowRadius: 20,
      elevation: 25,
    
        
    },
    
     closeButton: {
        position: 'absolute', // Posiciona no canto superior direito
        top: 40, // Ajuste conforme necessário para o cabeçalho
        right: 20,
        zIndex: 2, // Acima do container principal
        padding: 10, // Área de clique maior
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E0E0E0',
        marginBottom: 30, // Mais espaço abaixo do título
         // Fonte mais moderna (exemplo, pode precisar carregar uma fonte customizada)
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
     subtitle: {
        fontSize: 16,
        color: '#A0A0A0',
        textAlign: 'center',
        marginBottom: 30, // Mais espaço abaixo do subtítulo
         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
    cryptoSelector: {
        flexDirection: 'row',
        marginBottom: 40, // Mais espaço abaixo da seleção
    },
    cryptoButton: {
        paddingVertical: 15, // Ajustado padding
        paddingHorizontal: 25, // Ajustado padding
        borderRadius: 12, // Mais arredondado
        marginHorizontal: 10, // Mais espaço entre botões
        backgroundColor: 'transparent', // Fundo transparente
        borderWidth: 2, // Borda mais visível
        borderColor: '#444',
        flexDirection: 'row', // Para alinhar ícone e texto
        alignItems: 'center',
        justifyContent: 'center', // Centraliza conteúdo
        minWidth: 100, // Largura mínima ajustada
    },
    cryptoButtonActive: {
      backgroundColor: 'rgba(46, 128, 221, 0.1)',
        borderColor: 'rgba(46, 128, 221, 0.47)',
    },
    cryptoButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8, // Espaço entre ícone e texto
         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
     cryptoIconPlaceholder: {
        fontSize: 24, // Tamanho do símbolo
        color: '#FFFFFF', // Cor do símbolo
        fontWeight: 'bold',
     },
    input: {
        width: '100%',
        height: 35, // Altura maior para inputs
        backgroundColor: 'rgba(150, 74, 221, 0.25)', // neon roxo bem translúcido
        borderRadius: 8, // Mais arredondado
        paddingHorizontal: 18, // Mais padding horizontal
        fontSize: 18, // Fonte maior no input
        color: '#FFFFFF',
        marginBottom: 20, // Mais espaço entre inputs
        borderWidth: 1,
        borderColor: '#3A3A3A',

        // Glassmorphism effect
      overflow: 'hidden',
    
      shadowColor: '#8A2BE2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.9,
      shadowRadius: 4,
      elevation: 25,

         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
    // Estilo para o botão de Enviar - Neon Roxo Robusto
    actionButtonNeon: {
      width: '40%',
      height: 42, // levei pra 50 pra ficar mais robusto
      backgroundColor: 'rgba(138, 43, 226, 0.25)', // neon roxo bem translúcido
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    
      // Glassmorphism effect
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.2)', // Borda translúcida
      overflow: 'hidden',
    
      shadowColor: '#8A2BE2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.9,
      shadowRadius: 10,
      elevation: 25,
    
      // opcional: se tiver react-native-blur no projeto
      // backdropFilter: 'blur(15px)',  // Isso só funciona em web ou com libs específicas no native
    },
    

     actionButtonTextNeon: {
        color: '#FFFFFF', // Texto branco
        fontSize: 13, // Fonte maior
        fontWeight: 'bold',
        textShadowColor: '#FFFFFF', // Sombra sutil no texto
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10, // Sombra de texto mais pronunciada
         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
     addressContainer: {
        backgroundColor: '#2C2C2C',
        borderRadius: 5, // Mais arredondado
        padding: 25, // Mais padding
        alignItems: 'center',
        marginBottom: 30, // Mais espaço
        width: '80%',
    },
    addressText: {
        color: '#E0E0E0',
        fontSize: 14, // Fonte maior
        marginBottom: 20, // Mais espaço
        textAlign: 'center',
         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
    qrCodePlaceholder: {
        width: 180, // Tamanho maior
        height: 180, // Tamanho maior
        backgroundColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12, // Mais arredondado
    },
    qrCodeText: {
        color: '#E0E0E0',
        fontSize: 18, // Fonte maior
         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
    backButton: {
        marginTop: 40, // Mais espaço acima
        paddingVertical: 12, // Mais padding
        paddingHorizontal: 25, // Mais padding
        backgroundColor: '#444', // Cor para o botão Voltar
        borderRadius: 10, // Mais arredondado
    },
    backButtonText: {
        color: '#E0E0E0',
        fontSize: 18, // Fonte maior
         // Fonte mais moderna
        fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    },
});


// --- CryptoActionsComponent (Gerencia a exibição das telas internas) ---
// Este componente AGORA precisa de uma prop para informar ao pai sobre o estado da tela interna.

interface CryptoActionsComponentProps {
    // Callback para informar ao componente pai se uma tela interna está ativa
    onInternalViewChange?: (isActive: boolean) => void;
}

const CryptoActionsComponent: React.FC<CryptoActionsComponentProps> = ({ onInternalViewChange }) => {
    // Estado para controlar qual tela interna está visível: 'none', 'send', 'receive'
    const [currentInternalView, setCurrentInternalView] = useState<'none' | 'send' | 'receive'>('none');

    // Efeito para notificar o pai quando a tela interna muda
    React.useEffect(() => {
        if (onInternalViewChange) {
            onInternalViewChange(currentInternalView !== 'none');
        }
    }, [currentInternalView, onInternalViewChange]);


    // Função para abrir a tela de Enviar
    const handleEnviar = () => {
        console.log('Botão Enviar Cripto clicado. Abrindo tela interna de envio...');
        setCurrentInternalView('send');
    };

    // Função para abrir a tela de Receber
    const handleReceber = () => {
        console.log('Botão Receber Cripto clicado. Abrindo tela interna de recebimento...');
        setCurrentInternalView('receive');
    };

    // Função para voltar para a tela principal do CryptoActionsComponent
    const goBackFromInternalView = () => {
        setCurrentInternalView('none');
    };

    // Renderiza a tela interna apropriada ou o conteúdo principal
    return (
        <View style={styles.cryptoActionsContainer}>
            {/* Conteúdo principal do CryptoActionsComponent - visível APENAS quando nenhuma tela interna está aberta */}
            {currentInternalView === 'none' && (
                <> {/* Fragmento para agrupar os elementos */}
                    <Text style={styles.sectionTitle}>Enviar e Receber Cripto</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleEnviar}>
                            <Feather name="arrow-up" size={24} color="#4CAF50" />
                            <Text style={styles.actionButtonText}>Enviar</Text>
                            <Text style={styles.actionButtonSubtitle}>BTC e USDT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleReceber}>
                            <Feather name="arrow-down" size={24} color="#2196F3" />
                            <Text style={styles.actionButtonText}>Receber</Text>
                            <Text style={styles.actionButtonSubtitle}>BTC e USDT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {/* Renderiza a tela interna de Enviar se currentInternalView for 'send' */}
            {/* Posiciona sobre o conteúdo principal */}
            {currentInternalView === 'send' && <SendCryptoInternal onBack={goBackFromInternalView} />}

            {/* Renderiza a tela interna de Receber se currentInternalView for 'receive' */}
            {/* Posiciona sobre o conteúdo principal */}
            {currentInternalView === 'receive' && <ReceiveCryptoInternal onBack={goBackFromInternalView} />}

        </View>
    );
};

// Seus estilos originais para CryptoActionsComponent (Mantidos)
const styles = StyleSheet.create({
  cryptoActionsContainer: {
    backgroundColor: '#121212',
    marginBottom: -370,
    // Adicione position: 'relative' para que os filhos absolutos (telas internas) se posicionem corretamente dentro dele
    position: 'relative',
    bottom: 150,
    // Defina uma altura mínima ou flex: 1 para que o container tenha dimensão para as telas internas
    // Altura mínima pode ser útil se o conteúdo da home for menor que as telas internas
    minHeight: 400, // Aumentado minHeight para acomodar as telas internas maiores
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#64B5F6',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#E0F7FA',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actionButtonSubtitle: {
    color: '#B0BEC5',
    fontSize: 12,
  },
});

export default CryptoActionsComponent;
