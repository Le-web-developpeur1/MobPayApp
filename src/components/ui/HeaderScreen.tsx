import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type HeaderProps = {
  title: string;
};

export default function HeaderScreen({ title } : HeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backBtn}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(15),
    backgroundColor: "#2A4793"
  },
  backBtn: {
    backgroundColor: "#ffffff20",
    padding: scale(10),
    borderRadius: moderateScale(12),
    marginRight: scale(15),
    marginLeft: scale(10)
  },
  title: {
    color: "#fff",
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },
})