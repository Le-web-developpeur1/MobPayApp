import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
    value?: string;
    onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText} : SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#aaa" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Nom ou numéro..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1E2A4A",
      borderRadius: moderateScale(15),
      paddingHorizontal: scale(15),
      height: verticalScale(50),
      marginVertical: verticalScale(5),
    },
    input: {
      flex: 1,
      marginLeft: scale(10),
      color: "#fff",
    },
  });