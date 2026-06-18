import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatbotScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! 👋 Je suis votre assistant CashMoov. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Messages suggérés
  const suggestedMessages = [
    'Comment effectuer un transfert ?',
    'Quels sont les frais ?',
    'Aide pour recharger mon compte',
    'Contacter le support',
  ];

  useEffect(() => {
    // Auto-scroll vers le bas quand un nouveau message arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simuler une réponse du bot (à remplacer par l'API plus tard)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Réponses simulées (à remplacer par l'API)
  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('transfert') || lowerText.includes('envoyer')) {
      return 'Pour effectuer un transfert :\n1. Allez sur l\'écran d\'accueil\n2. Cliquez sur "Transfert"\n3. Choisissez le type de transfert\n4. Suivez les étapes\n\nBesoin d\'aide supplémentaire ?';
    }
    if (lowerText.includes('frais') || lowerText.includes('coût')) {
      return 'Les frais varient selon le type de transaction :\n• Transfert national : 1-2%\n• Transfert international : 3-5%\n• Achat crédit : 0%\n\nConsultez la section "Frais" dans votre profil pour plus de détails.';
    }
    if (lowerText.includes('recharger') || lowerText.includes('recharge')) {
      return 'Pour recharger votre compte :\n1. Allez dans "Me recharger"\n2. Choisissez une méthode (Agent, Orange Money, etc.)\n3. Suivez les instructions\n\nC\'est rapide et sécurisé !';
    }
    if (lowerText.includes('support') || lowerText.includes('aide') || lowerText.includes('contact')) {
      return 'Pour contacter notre support :\nAppelez le +224 621 64 00 00\nEmail : support@cashmoov.com\n\nNotre équipe est disponible 24/7 !';
    }
    if (lowerText.includes('bonjour') || lowerText.includes('salut') || lowerText.includes('hello')) {
      return 'Bonjour ! 👋 Comment puis-je vous aider avec CashMoov aujourd\'hui ?';
    }

    return 'Je ne comprends pas bien votre question. Pour une assistance personnalisée, notre équipe support est disponible au +224 621 64 00 00 ou via support@cashmoov.com. Que puis-je faire d\'autre pour vous ?';
  };

  const handleSuggestedMessage = (message: string) => {
    setInputText(message);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.botMessageContainer,
        ]}
      >
        {!isUser && (
          <View style={styles.botAvatar}>
            {/* Remplace cette ligne par ton image : 
            <Image 
              source={require('@/assets/images/bot-avatar.png')} 
              style={styles.avatarImage}
            />
            */}
            <Ionicons name="chatbubble-ellipses" size={scale(20)} color={COLORS.white} />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        {isUser && (
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={scale(20)} color={COLORS.white} />
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={scale(24)} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Assistant CashMoov</Text>
            <View style={styles.statusContainer}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.statusText}>En ligne</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={scale(20)} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {/* Typing indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.botAvatar}>
                <Ionicons name="chatbubble-ellipses" size={scale(20)} color={COLORS.white} />
              </View>
              <View style={styles.typingBubble}>
                <View style={styles.typingDots}>
                  <View style={[styles.dot, styles.dot1]} />
                  <View style={[styles.dot, styles.dot2]} />
                  <View style={[styles.dot, styles.dot3]} />
                </View>
              </View>
            </View>
          )}

          {/* Suggested messages */}
          {messages.length === 1 && (
            <View style={styles.suggestedContainer}>
              <Text style={styles.suggestedTitle}>Questions fréquentes :</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {suggestedMessages.map((msg, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestedButton}
                    onPress={() => handleSuggestedMessage(msg)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.suggestedText}>{msg}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Écrivez votre message..."
                placeholderTextColor={COLORS.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={inputText.trim() === ''}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="send"
                  size={scale(20)}
                  color={inputText.trim() === '' ? COLORS.textSecondary : COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    gap: scale(12),
  },
  backButton: {
    padding: scale(5),
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.white,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(2),
    gap: scale(5),
  },
  onlineIndicator: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: moderateScale(12),
    color: COLORS.white,
    opacity: 0.9,
  },
  moreButton: {
    padding: scale(5),
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(15),
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(15),
    alignItems: 'flex-end',
    gap: scale(5),
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
  },
  botAvatar: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(17.5),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(17.5),
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '70%',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(15),
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: moderateScale(5),
  },
  botBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: moderateScale(5),
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  messageText: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(20),
  },
  userText: {
    color: COLORS.white,
  },
  botText: {
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: moderateScale(10),
    color: COLORS.textSecondary,
    marginTop: verticalScale(4),
    textAlign: "right"
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: scale(8),
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(15),
  },
  typingBubble: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(5),
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  typingDots: {
    flexDirection: 'row',
    gap: scale(5),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.textSecondary,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
  suggestedContainer: {
    paddingHorizontal: scale(15),
    marginTop: verticalScale(10),
  },
  suggestedTitle: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(10),
    fontWeight: '600',
  },
  suggestedButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    marginRight: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  suggestedText: {
    fontSize: moderateScale(13),
    color: COLORS.primary,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderTopWidth: scale(1),
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(25),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
    gap: scale(10),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    maxHeight: verticalScale(100),
    paddingVertical: verticalScale(5),
  },
  sendButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.background,
  },
});
