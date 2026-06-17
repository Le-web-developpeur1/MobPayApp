import { COLORS } from "@/src/constants";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - scale(40);
const CARD_SPACING = scale(15);
const AUTO_SCROLL_INTERVAL = 3000; // 3 secondes

interface CarteData {
  id: string;
  image: any; // Type pour les images require()
  titleKey: string;
  descriptionKeys: string[];
}

export default function CarteInfo() {
  const { t } = useTranslation();
  
  const cartesData: CarteData[] = [
    {
      id: '1',
      image: require('@/assets/OIP.webp'), // Remplace par ton image
      titleKey: 'carousel.internationalTransfers',
      descriptionKeys: [
        'carousel.sendMoney63Countries',
        'carousel.paySuppliers'
      ]
    },
    {
      id: '2',
      image: require('@/assets/OIP.webp'), // Remplace par ton image
      titleKey: 'carousel.guaranteedSecurity',
      descriptionKeys: [
        'carousel.bankLevelEncryption',
        'carousel.biometricAuth'
      ]
    },
    {
      id: '3',
      image: require('@/assets/OIP.webp'), // Remplace par ton image
      titleKey: 'carousel.instant',
      descriptionKeys: [
        'carousel.realTimeTransfers',
        'carousel.instantNotifications'
      ]
    },
  ];

  // Dupliquer les données pour créer l'effet infini
  const infiniteData = [...cartesData, ...cartesData, ...cartesData];
  const ORIGINAL_DATA_LENGTH = cartesData.length;
  const [activeIndex, setActiveIndex] = useState(ORIGINAL_DATA_LENGTH);
  const flatListRef = useRef<FlatList>(null);
  const scrolling = useRef(false);

  useEffect(() => {
    // Scroll initial vers le milieu
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: ORIGINAL_DATA_LENGTH,
        animated: false,
      });
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrolling.current) {
        setActiveIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          
          return nextIndex;
        });
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));
    setActiveIndex(index);
  };

  const onScrollBeginDrag = () => {
    scrolling.current = true;
  };

  const onScrollEndDrag = () => {
    scrolling.current = false;
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));
    
    // Si on est au début ou à la fin, on repositionne sans animation
    if (index <= 0) {
      flatListRef.current?.scrollToIndex({
        index: ORIGINAL_DATA_LENGTH,
        animated: false,
      });
      setActiveIndex(ORIGINAL_DATA_LENGTH);
    } else if (index >= infiniteData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: ORIGINAL_DATA_LENGTH,
        animated: false,
      });
      setActiveIndex(ORIGINAL_DATA_LENGTH);
    }
  };

  const renderItem = ({ item }: { item: CarteData }) => (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image 
          source={item.image} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>{t(item.titleKey)}</Text>
        {item.descriptionKeys.map((key, index) => (
          <Text key={index} style={styles.text}>{t(key)}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ paddingVertical: verticalScale(10), paddingHorizontal: scale(20) }}>
      <FlatList
        ref={flatListRef}
        data={infiniteData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: scale(20) }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
      />

      <View style={styles.dotsContainer}>
        {cartesData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === (activeIndex % ORIGINAL_DATA_LENGTH) && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: scale(15),
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(12),
    width: CARD_WIDTH,
  },
  imageBox: {
    width: '100%',
    height: verticalScale(150),
    overflow: 'hidden',
    borderTopRightRadius: moderateScale(8),
    borderTopLeftRadius: moderateScale(8),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  card: {
    gap: scale(6),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10)
  },
  title: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: moderateScale(16),
    marginBottom: scale(0),
  },
  text: {
    color: COLORS.white,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.textSecondary,
    marginHorizontal: scale(4),
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: scale(24),
  },
});
