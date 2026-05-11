import { COLORS } from '@/src/constants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from "react-native-progress";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export default function Limite() {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingBottom: verticalScale(10)}}>
          <Text>{t('profile.perTransaction')}</Text>
          <Text style={{ fontSize: moderateScale(20), fontWeight: "bold"}}>10 000 000 GNF</Text>
        </View>
        <Progress.Bar progress={0.35} width={scale(290)} color="#2A4793"/>
        <Text style={{ paddingTop: verticalScale(5)}}><Text style={{ color: "#2A4793", fontWeight: "bold"}}>35%</Text> {t('profile.usedThisMonth')}</Text>
      </View>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingBottom: verticalScale(10)}}>
          <Text>{t('profile.perDay')}</Text>
          <Text style={{ fontSize: moderateScale(20), fontWeight: "bold"}}>50 000 000 GNF</Text>
        </View>
        <Progress.Bar progress={0.52} width={scale(290)} color="#2A4793"/>
        <Text style={{ paddingTop: verticalScale(5)}}><Text style={{ color: "#2A4793", fontWeight: "bold"}}>52%</Text> {t('profile.usedThisMonth')}</Text>
      </View>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingBottom: verticalScale(10)}}>
          <Text>{t('profile.perMonth')}</Text>
          <Text style={{ fontSize: moderateScale(20), fontWeight: "bold"}}>200 000 000 GNF</Text>
        </View>
        <Progress.Bar progress={0.70} width={scale(290)} color="#2A4793"/>
        <Text style={{ paddingTop: verticalScale(5)}}><Text style={{ color: "#2A4793", fontWeight: "bold"}}>70%</Text> {t('profile.usedThisMonth')}</Text>
      </View>
      <View 
        style={[{ 
          height: verticalScale(55), 
          paddingHorizontal: scale(15),
          borderColor: "#ccc", 
          borderWidth: scale(0.5), 
          backgroundColor: "white", 
          borderRadius: moderateScale(10),
          marginTop: verticalScale(10),
          alignItems: "center",
          justifyContent: "center",
        }]}
      >
        <Text style={{ color: "#00000095", fontSize: moderateScale(18)}}>{t('profile.increaseLimit')} <Text style={{ color: "#2A4793", fontWeight: "bold", fontSize: moderateScale(20)}}>{t('profile.contactSupport')}</Text></Text>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(15)
  },
  card: {
    height: verticalScale(80), 
    paddingHorizontal: scale(15), 
    borderColor: "#ccc", 
    borderWidth: scale(0.5), 
    backgroundColor: "white", 
    borderRadius: moderateScale(10),
    marginTop: verticalScale(12),
    justifyContent: 'center'
  }
});