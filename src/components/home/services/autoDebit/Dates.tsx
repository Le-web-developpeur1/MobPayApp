import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "@/src/constants";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface DatesProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export default function Dates({ startDate, endDate, onStartDateChange, onEndDateChange }: DatesProps) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      {/* Date début */}
      <Text>Date début <Text style={{color:"red"}}>*</Text></Text>
      <TouchableOpacity onPress={() => setShowStartPicker(true)}>
        <TextInput
          value={formatDate(startDate)}
          placeholder="JJ/MM/AAAA"
          mode="outlined"
          editable={false}
          style={styles.input}
          theme={{
            colors: {
              text: COLORS.textPrimary,
              primary: COLORS.primary,
            },
          }}
        />
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) onStartDateChange(date);
          }}
        />
      )}

      {/* Date fin */}
      <Text>Date fin <Text style={{color:"red"}}>*</Text></Text>
      <TouchableOpacity onPress={() => setShowEndPicker(true)}>
        <TextInput
          value={formatDate(endDate)}
          placeholder="JJ/MM/AAAA"
          mode="outlined"
          editable={false}
          style={styles.input}
          theme={{
            colors: {
              text: COLORS.textPrimary,
              primary: COLORS.primary,
            },
          }}
        />
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) onEndDateChange(date);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
  input: {
    marginBottom: verticalScale(15),
    height: verticalScale(45)
  },
});
