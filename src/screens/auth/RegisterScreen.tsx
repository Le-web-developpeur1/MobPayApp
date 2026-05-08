import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute();
  
  const { numero } = route.params as { numero: string }

  const [phone, setPhone] = useState(numero ||'');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [numeroPiece, setNumeroPiece] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [checked, setChecked] = useState(false);

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

  const handleContinue = () => {
    if (!prenom || !nom || !region || !ville || !adresse || !sexe || !piece || !numeroPiece || !profession || !dateNaissance) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (!checked) {
      Alert.alert('Erreur', 'Veuillez accepter les conditions générales');
      return;
    }

    // Navigation vers vérification OTP
    navigation.navigate(ROUTES.VERIFICATION, { phone });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={scale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inscription</Text>
        <View style={{ width: scale(24) }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={[styles.input, { fontSize: moderateScale(20), fontWeight: '600' }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="+224 626 05 80 33"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Prénom*"
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoComplete="off"
          />

          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Nom de famille*"
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoComplete="off"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />

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
            placeholder="Adresse*"
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

          <View style={{ zIndex: 2000 }}>
            <DropDownPicker
              open={openPiece}
              value={piece}
              items={pieceItems}
              setOpen={setOpenPiece}
              setValue={setPiece}
              setItems={setPieceItems}
              style={styles.dropdown}
              placeholder="Sélectionnez le type de pièce*"
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

          <View style={{ zIndex: 1000 }}>
            <DropDownPicker
              open={openProfession}
              value={profession}
              items={professionItems}
              setOpen={setOpenProfession}
              setValue={setProfession}
              setItems={setProfessionItems}
              style={styles.dropdown}
              placeholder="Sélectionnez la profession*"
              dropDownContainerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              listMode="SCROLLVIEW"
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

          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View style={[styles.checkbox, checked && styles.checkedBox]}>
                {checked && <Ionicons name="checkmark" color={COLORS.white} size={scale(16)} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              J'accepte les{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://mobpay.gn/conditions')}
              >
                Conditions générales
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    paddingBottom: verticalScale(40),
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(25),
    marginTop: verticalScale(10),
  },
  checkbox: {
    width: scale(24),
    height: scale(24),
    borderRadius: moderateScale(6),
    borderWidth: scale(2),
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});
