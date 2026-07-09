import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS, ROUTES } from '@/src/constants';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Platform, ScrollView  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { RootStackParamList } from '@/src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConfirmModal } from '@/src/components/modals/ConfirmModal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DetailsInterRouteProp = RouteProp<RootStackParamList, 'RechargeInternational'>;


export default function RechargeInternational() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DetailsInterRouteProp>();
    const country = route.params?.country || '';

    const [phone, setPhone] = useState(route.params?.phone || '');
    const [name, setName]   = useState(route.params?.name || '');

    const [gnf, setGnf]                         = useState('');
    const [xof, setXof]                         = useState('');
    const [fraisValue, setFraisValue]           = useState(0);
    const [taxeValue, setTaxeValue]             = useState(0);
    const [montantFacturer, setMontantFacturer] = useState(0);
    const [visible, setVisible]                 = useState(false);


    const tauxFrais = 0.01; // 1%
    const tauxValue = 0.5;

    const handleContactPress = () => {
        // Passer country à Contact pour qu'il puisse le repasser à DetailsInternational
        navigation.navigate(ROUTES.CONTACT, { 
          type: 'RechargeInternational',
          country: country
        });
      };

    const handleGnfChange = (val: string) => {
        setGnf(val);
        const recu = Number(val);
        if (!isNaN(recu)) {
          setXof((recu * tauxValue).toString());
        }
    };

    const handleXofChange = (val: string) => {
        setXof(val);
        const recu = Number(val);
        if (!isNaN(recu)) {
          setGnf((recu / tauxValue).toString());
        }
    };
    useEffect(() => {
        const recu = Number(gnf);
        const frais = recu * 0.01;
        const taxe = 0;
        const facturer = recu + taxe + frais;
        setFraisValue(frais);
        setTaxeValue(taxe);
        setMontantFacturer(facturer);
    }, [gnf, xof]);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

  return (
   <SafeAreaView style={styles.safe}>
        <HeaderScreen title='Rechargement Interantional'/>
       <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Détails de la transaction</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value={country}
                            editable={false}
                            placeholderTextColor={COLORS.textSecondary}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Numéro de l'expéditeur"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        placeholderTextColor={COLORS.textSecondary}
                    />
                    <TouchableOpacity onPress={handleContactPress}>
                        <FontAwesome6 name="user" size={moderateScale(20)} color={COLORS.primary} />
                    </TouchableOpacity>
                    </View>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'expéditeur"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={COLORS.textSecondary}
                    />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Montant en GNF"
                            keyboardType="numeric"
                            onChangeText={handleGnfChange}
                            value={gnf}
                            placeholderTextColor={COLORS.textSecondary}
                        />
                            <Text style={styles.currency}>GNF</Text>
                    </View>
                
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Montant en XOF"
                            keyboardType="numeric"
                            onChangeText={handleXofChange}
                            value={xof}
                            placeholderTextColor={COLORS.textSecondary}
                        />
                        <Text style={styles.currency}>XOF</Text>
                    </View>
                    <View style={styles.fraisCard}>
                        <View style={styles.fraisRow}>
                        <Text style={styles.fraisLabel}>Taux de change</Text>
                        <Text style={styles.fraisValue}>{tauxValue}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.fraisRow}>
                        <Text style={styles.fraisLabel}>Frais</Text>
                        <Text style={styles.fraisValue}>{formatNumber(fraisValue)} GNF</Text>
                        </View>
                        <View style={styles.fraisRow}>
                        <Text style={styles.fraisLabel}>Taxe</Text>
                        <Text style={styles.fraisValue}>{taxeValue} GNF</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.fraisRow}>
                        <Text style={styles.totalLabel}>Montant à facturer</Text>
                        <Text style={styles.totalValue}>{formatNumber(montantFacturer)} GNF</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setVisible(true)}
                    >
                        <Text style={styles.buttonText}>Suivant</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
       </KeyboardAvoidingView>
       <ConfirmModal
               visible={visible}
               onClose={() => setVisible(false)}
               beneficiaire={{ name: name, phone: phone }}
               transaction={{ 
                 montant: formatNumber(Number(gnf)), 
                 frais: formatNumber(fraisValue), 
                 taxe: `${taxeValue} GNF`, 
                 total: formatNumber(montantFacturer) 
               }}
               isInternational={true}
               country={country}
               amountReceived={`${formatNumber(Number(xof))} XOF`}
               exchangeRate={`1 GNF = ${tauxValue} XOF`}
               transactionType="cashmoov"
             />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    keyboardView: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
      scrollView: {
        flex: 1,
    },
      scrollContent: {
        paddingBottom: verticalScale(20),
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: scale(15),
    },
    title: {
        paddingVertical: verticalScale(10),
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: scale(15),
        marginBottom: verticalScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(2) },
        shadowOpacity: 0.05,
        shadowRadius: moderateScale(4),
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: moderateScale(15),
        color: COLORS.textPrimary,
        paddingVertical: verticalScale(14),
    },
    currency: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.primary,
        marginLeft: scale(10),
    },
    fraisCard: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: moderateScale(12),
        padding: scale(16),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(15),
      },
      fraisRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(6),
      },
      fraisLabel: {
        fontSize: moderateScale(14),
        color: COLORS.textPrimary,
        fontWeight: '500',
      },
      fraisValue: {
        fontSize: moderateScale(14),
        color: COLORS.primary,
        fontWeight: '600',
      },
      divider: {
        height: scale(1),
        backgroundColor: COLORS.primary + '20',
        marginVertical: verticalScale(8),
      },
      totalLabel: {
        fontSize: moderateScale(15),
        color: COLORS.textPrimary,
        fontWeight: '700',
      },
      totalValue: {
        fontSize: moderateScale(16),
        color: COLORS.primary,
        fontWeight: '700',
      },
      button: {
        backgroundColor: COLORS.primary,
        paddingVertical: verticalScale(14),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(4) },
        shadowOpacity: 0.15,
        shadowRadius: moderateScale(8),
        elevation: 5,
      },
      buttonText: {
        color: COLORS.white,
        fontWeight: '700',
        fontSize: moderateScale(16),
      },
      // ⚠️ NOUVEAUX STYLES - À VALIDER
      recuCard: {
        backgroundColor: COLORS.success + '15',
        borderRadius: moderateScale(12),
        padding: scale(16),
        marginTop: verticalScale(8),
        marginBottom: verticalScale(12),
        borderLeftWidth: scale(4),
        borderLeftColor: COLORS.success,
      },
      recuLabel: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        marginBottom: verticalScale(6),
      },
      recuAmount: {
        fontSize: moderateScale(22),
        fontWeight: '700',
        color: COLORS.success,
        marginBottom: verticalScale(4),
      },
      recuSubtext: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
        fontWeight: '600',
      },
      dividerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(15),
      },
      dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
      },
      dividerText: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
        marginHorizontal: scale(10),
      },
});