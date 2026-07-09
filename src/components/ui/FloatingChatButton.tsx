import { COLORS } from '@/src/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { Animated, Image, PanResponder, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FloatingChatButton() {
  const navigation = useNavigation<NavigationProp>();
  
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const offset = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        // Sauvegarde la position actuelle
        pan.setOffset({
          x: offset.current.x,
          y: offset.current.y,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        
        // @ts-ignore
        offset.current.x = pan.x._value;
        // @ts-ignore
        offset.current.y = pan.y._value;
        
        // Si tap (pas de mouvement), ouvre le chatbot
        if (Math.abs(gesture.dx) < 10 && Math.abs(gesture.dy) < 10) {
          navigation.navigate('Chatbot');
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        style={styles.chatbotButton}
        activeOpacity={0.8}
      >
        <Image 
          source={require('@/assets/images/bot-icon.png')} 
          style={styles.chatbotImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 9999,
  },
  chatbotButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  chatbotImage: {
    width: scale(35),
    height: scale(35),
  },
});
