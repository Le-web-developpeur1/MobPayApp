import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';

export default function ServiceScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} edges={['top']}>
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          <Text>Services</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});