import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { COLORS } from "@/src/constants";

const DateRange = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR"); 
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity 
            style={styles.box} 
            onPress={() => setShowStart(true)}
        >
            <Text style={styles.text}>{formatDate(startDate)}</Text>
            <View style={{backgroundColor: COLORS.primary, height: verticalScale(35), width: scale(40), justifyContent: "center", alignItems: "center", borderRadius: moderateScale(8)}}>
            <Ionicons name="calendar" size={22} color={COLORS.white} />

            </View>
        </TouchableOpacity>

        {showStart && (
            <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
                setShowStart(false);
                if (selectedDate) setStartDate(selectedDate);
            }}
            />
        )}

        <TouchableOpacity 
            style={styles.box} 
            onPress={() => setShowEnd(true)}
        >
            <Text style={styles.text}>{formatDate(endDate)}</Text>
            <View style={{backgroundColor: COLORS.primary, height: verticalScale(35), width: scale(40), justifyContent: "center", alignItems: "center", borderRadius: moderateScale(8)}}>
                <Ionicons name="calendar" size={22} color={COLORS.white} />
            </View>
        </TouchableOpacity>

        {showEnd && (
            <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
                setShowEnd(false);
                if (selectedDate) setEndDate(selectedDate);
            }}
            />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scale(1),
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    padding: scale(5),
    marginHorizontal: scale(10),
    justifyContent: "space-between",
  },
  text: {
    fontSize: moderateScale(16),
  },
});

export default DateRange;
