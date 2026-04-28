import { COLORS } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type QrScanRouteProp = RouteProp<RootStackParamList, 'QrScan'>;

// Précalcul des dimensions pour éviter les conflits avec react-native-reanimated
const SIZES = {
  scanHeight: scale(250),
  scanWidth: scale(280),
  iconLarge: scale(80),
  iconMedium: scale(60),
  iconSmall: scale(40),
  iconButton: scale(28),
  iconTiny: scale(20),
  buttonSize: scale(40),
  cornerSize: scale(30),
};

export default function QrScannerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<QrScanRouteProp>();
  
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string>('');
  const [flashEnabled, setFlashEnabled] = useState(false);

  const returnScreen = route.params?.returnScreen;

  // Animation pour la ligne de scan
  const scanLinePosition = useSharedValue(0);

  useEffect(() => {
    // Demander la permission au montage du composant si pas encore accordée
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    // Animation de la ligne de scan
    scanLinePosition.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scanLinePosition.value * SIZES.scanHeight,
        },
      ],
    };
  });

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    setScannedData(data);

    // Parser les données JSON si possible
    try {
      const parsedData = JSON.parse(data);
      
      // Si on a un écran de retour, naviguer avec les données
      if (returnScreen && parsedData.name && parsedData.phone) {
        setTimeout(() => {
          navigation.navigate(returnScreen as any, {
            name: parsedData.name,
            phone: parsedData.phone,
          });
        }, 1000);
      }
    } catch (error) {
      // Si ce n'est pas du JSON, on affiche juste les données brutes
      console.log('Not JSON data:', data);
    }
  };

  const handleRescan = () => {
    setScanned(false);
    setScannedData('');
  };

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (!result.granted && !result.canAskAgain) {
      // L'utilisateur a refusé définitivement
      Alert.alert(
        'Permission requise',
        'Veuillez autoriser l\'accès à la caméra dans les paramètres de votre appareil pour scanner des QR codes.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Ouvrir les paramètres', onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  // Permission en cours de chargement
  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Ionicons name="camera-outline" size={SIZES.iconMedium} color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Permission refusée
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="camera-outline" size={SIZES.iconLarge} color={COLORS.error} />
          <Text style={styles.errorTitle}>Accès caméra requis</Text>
          <Text style={styles.errorText}>
            L'application a besoin d'accéder à votre caméra pour scanner les QR codes.
          </Text>
          
          {permission.canAskAgain ? (
            <TouchableOpacity style={styles.permissionButton} onPress={handleRequestPermission}>
              <Ionicons name="camera" size={SIZES.iconTiny} color={COLORS.white} />
              <Text style={styles.permissionButtonText}>Autoriser l'accès</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.permissionButton} onPress={() => Linking.openSettings()}>
              <Ionicons name="settings" size={SIZES.iconTiny} color={COLORS.white} />
              <Text style={styles.permissionButtonText}>Ouvrir les paramètres</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerButton} />
          <Text style={styles.headerTitle}>Scanner QR Code</Text>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setFlashEnabled(!flashEnabled)}
          >
            <Ionicons
              name={flashEnabled ? 'flashlight' : 'flashlight-outline'}
              size={SIZES.iconButton}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        {/* Camera View */}
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            enableTorch={flashEnabled}
          />
          
          {/* Overlay sombre avec découpe - en dehors de CameraView */}
          <View style={styles.overlay}>
            {/* Top overlay */}
            <View style={styles.overlayTop} />

            {/* Middle row avec les côtés */}
            <View style={styles.overlayMiddle}>
              <View style={styles.overlaySide} />

              {/* Zone de scan */}
              <View style={styles.scanArea}>
                {/* Coins du cadre */}
                <View style={[styles.corner, styles.cornerTopLeft]} />
                <View style={[styles.corner, styles.cornerTopRight]} />
                <View style={[styles.corner, styles.cornerBottomLeft]} />
                <View style={[styles.corner, styles.cornerBottomRight]} />

                {/* Ligne de scan animée */}
                {!scanned && (
                  <Animated.View style={[styles.scanLine, scanLineStyle]} />
                )}

                {/* Icône de succès si scanné */}
                {scanned && (
                  <View style={styles.successIcon}>
                    <Ionicons name="checkmark-circle" size={SIZES.iconMedium} color={COLORS.success} />
                  </View>
                )}
              </View>

              <View style={styles.overlaySide} />
            </View>

            {/* Bottom overlay */}
            <View style={styles.overlayBottom} />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          {!scanned ? (
            <>
              <Ionicons name="qr-code-outline" size={SIZES.iconSmall} color={COLORS.primary} />
              <Text style={styles.instructionsTitle}>Scannez un QR Code</Text>
              <Text style={styles.instructionsText}>
                Placez le QR code dans le cadre pour le scanner automatiquement
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={SIZES.iconSmall} color={COLORS.success} />
              <Text style={styles.successTitle}>QR Code scanné avec succès!</Text>
              
              {/* Affichage des données scannées */}
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Données scannées:</Text>
                <View style={styles.dataBox}>
                  <Text style={styles.dataText} selectable>
                    {scannedData}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.rescanButton} onPress={handleRescan}>
                <Ionicons name="refresh" size={SIZES.iconTiny} color={COLORS.white} />
                <Text style={styles.rescanButtonText}>Scanner à nouveau</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(16),
    color: COLORS.white,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  errorTitle: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  errorText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
    paddingHorizontal: scale(20),
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginTop: verticalScale(30),
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  permissionButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  headerButton: {
    width: SIZES.buttonSize,
    height: SIZES.buttonSize,
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.white,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayMiddle: {
    flexDirection: 'row',
    height: SIZES.scanWidth,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scanArea: {
    width: SIZES.scanWidth,
    height: SIZES.scanWidth,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: SIZES.cornerSize,
    height: SIZES.cornerSize,
    borderColor: COLORS.secondary,
    borderWidth: 4,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: moderateScale(8),
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: moderateScale(8),
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: moderateScale(8),
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: moderateScale(8),
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  successIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -SIZES.cornerSize }, { translateY: -SIZES.cornerSize }],
  },
  instructionsContainer: {
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(40),
    alignItems: 'center',
  },
  instructionsTitle: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  instructionsText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  successTitle: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.success,
    textAlign: 'center',
  },
  dataContainer: {
    width: '100%',
    marginTop: verticalScale(20),
  },
  dataLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: verticalScale(8),
  },
  dataBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: moderateScale(12),
    padding: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dataText: {
    fontSize: moderateScale(14),
    color: COLORS.white,
    lineHeight: moderateScale(20),
  },
  rescanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginTop: verticalScale(20),
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  rescanButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});
