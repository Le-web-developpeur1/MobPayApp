import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Limite from '@/src/components/profil/Limite'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderScreen from '@/src/components/ui/HeaderScreen'

export default function LimiteScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2A4793"}}>
        <HeaderScreen title='Limites de transfert'/>
        <Limite/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})