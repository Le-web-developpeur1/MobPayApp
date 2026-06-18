import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CompleteProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const [adresse, setAdresse] = useState('');
  const [numeroPiece, setNumeroPiece] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');

  const handleDateChange = (text: string) => {
    // Supprimer tous les caractères non numériques
    const cleaned = text.replace(/[^0-9]/g, '');
    
    let formatted = '';
    
    if (cleaned.length <= 2) {
      // JJ
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      // JJ/MM
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      // JJ/MM/AAAA
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
    
    setDateNaissance(formatted);
  };

  // Région
  const [openRegion, setOpenRegion] = useState(false);
  const [region, setRegion] = useState(null);
  const [regionItems, setRegionItems] = useState([
    { label: 'Conakry', value: 'conakry' },
    { label: 'Kindia', value: 'kindia' },
    { label: 'Boké', value: 'boke' },
    { label: 'Labé', value: 'labe' },
    { label: 'Mamou', value: 'mamou' },
    { label: 'Faranah', value: 'faranah' },
    { label: 'Kankan', value: 'kankan' },
    { label: 'N\'Zérékoré', value: 'nzerekore' },
  ]);

  // Ville
  const [openVille, setOpenVille] = useState(false);
  const [ville, setVille] = useState(null);
  const [villeItems, setVilleItems] = useState([
    { label: 'Ratoma', value: 'ratoma' },
    { label: 'Matam', value: 'matam' },
    { label: 'Kaloum', value: 'kaloum' },
    { label: 'Dixinn', value: 'dixinn' },
    { label: 'Matoto', value: 'matoto' },
  ]);

  // Sexe
  const [openSexe, setOpenSexe] = useState(false);
  const [sexe, setSexe] = useState(null);
  const [sexeItems, setSexeItems] = useState([
    { label: 'Masculin', value: 'masculin' },
    { label: 'Féminin', value: 'feminin' },
  ]);

  // Type de pièce
  const [openPiece, setOpenPiece] = useState(false);
  const [piece, setPiece] = useState(null);
  const [pieceItems, setPieceItems] = useState([
    { label: 'Carte d\'identité', value: 'cni' },
    { label: 'Passeport', value: 'passeport' },
    { label: 'Permis de conduire', value: 'permis' },
  ]);

  // Profession
  const [openProfession, setOpenProfession] = useState(false);
  const [profession, setProfession] = useState(null);
  const [professionItems, setProfessionItems] = useState([
    { label: 'Étudiant', value: 'etudiant' },
    { label: 'Salarié', value: 'salarie' },
    { label: 'Commerçant', value: 'commercant' },
    { label: 'Fonctionnaire', value: 'fonctionnaire' },
    { label: 'Entrepreneur', value: 'entrepreneur' },
    { label: 'Autre', value: 'autre' },
  ]);

  const handleSkip = () => {
    Alert.alert(
      'Compléter plus tard',
      'Vous pouvez compléter votre profil à tout moment depuis les paramètres.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleSave = () => {
    if (!region || !ville || !adresse || !sexe || !piece || !numeroPiece || !profession || !dateNaissance) {
      Alert.alert(t('common.error'), 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation de la date
    if (dateNaissance.length !== 10) {
      Alert.alert(t('common.error'), 'Veuillez entrer une date de naissance valide');
      return;
    }

    // Sauvegarder les informations du profil
    Alert.alert(
      t('common.success'),
      'Votre profil a été complété avec succès',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={scale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compléter mon profil</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Ignorer</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoContainer}>
            <Ionicons name="shield-checkmark" size={scale(24)} color={COLORS.primary} />
            <View style={{ flex: 1, marginLeft: scale(12) }}>
              <Text style={styles.infoTitle}>Pourquoi compléter mon profil ?</Text>
              <Text style={styles.infoText}>
                Ces informations sont nécessaires pour vérifier votre identité et sécuriser vos transactions.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Informations personnelles</Text>

          <View style={{ zIndex: 5000 }}>
            <DropDownPicker
              open={openRegion}
              value={region}
              items={regionItems}
              setOpen={setOpenRegion}
              setValue={setRegion}
              setItems={setRegionItems}
              style={styles.dropdown}
              placeholder="Choisissez une région*"
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              listMode="SCROLLVIEW"
            />
          </View>

          <View style={{ zIndex: 4000 }}>
            <DropDownPicker
              open={openVille}
              value={ville}
              items={villeItems}
              setOpen={setOpenVille}
              setValue={setVille}
              setItems={setVilleItems}
              style={styles.dropdown}
              placeholder="Sélectionnez la ville*"
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              listMode="SCROLLVIEW"
            />
          </View>

          <TextInput
            style={styles.input}
            value={adresse}
            onChangeText={setAdresse}
            placeholder="Adresse complète*"
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoComplete="off"
          />

          <View style={{ zIndex: 3000 }}>
            <DropDownPicker
              open={openSexe}
              value={sexe}
              items={sexeItems}
              setOpen={setOpenSexe}
              setValue={setSexe}
              setItems={setSexeItems}
              style={styles.dropdown}
              placeholder="Sélectionnez le sexe*"
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
            />
          </View>

          <TextInput
            style={styles.input}
            value={dateNaissance}
            onChangeText={handleDateChange}
            placeholder="Date de naissance* (JJ/MM/AAAA)"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
            maxLength={10}
            autoCorrect={false}
            autoComplete="off"
          />

          <Text style={styles.sectionTitle}>Documents d'identité</Text>

          <View style={{ zIndex: 2000 }}>
            <DropDownPicker
              open={openPiece}
              value={piece}
              items={pieceItems}
              setOpen={setOpenPiece}
              setValue={setPiece}
              setItems={setPieceItems}
              style={styles.dropdown}
              placeholder="Type de pièce d'identité*"
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
            />
          </View>

          <TextInput
            style={styles.input}
            value={numeroPiece}
            onChangeText={setNumeroPiece}
            placeholder="Numéro de la pièce*"
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoComplete="off"
          />

          <Text style={styles.sectionTitle}>Informations professionnelles</Text>

          <View style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={openProfession}
              value={profession}
              items={professionItems}
              setOpen={setOpenProfession}
              setValue={setProfession}
              setItems={setProfessionItems}
              style={styles.dropdown}
              placeholder="Sélectionnez votre profession*"
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              listMode="SCROLLVIEW"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            * Champs obligatoires
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  skipText: {
    fontSize: moderateScale(16),
    color: COLORS.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(24),
    borderLeftWidth: scale(4),
    borderLeftColor: COLORS.primary,
  },
  infoTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  infoText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(17),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
    marginTop: verticalScale(8),
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: scale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(14),
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
  },
  dropdown: {
    backgroundColor: COLORS.background,
    borderWidth: scale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(15),
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  placeholderStyle: {
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
  footerText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
});
