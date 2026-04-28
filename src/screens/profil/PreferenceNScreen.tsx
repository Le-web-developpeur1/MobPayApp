import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import Notification from '@/src/components/profil/Notification';

export default function PreferenceNScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2A4793" }}>
        <HeaderScreen title='Préférences Notifications'/>
        <Notification/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});