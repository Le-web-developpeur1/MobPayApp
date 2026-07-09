import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CoffreLockModal from '../components/modals/CoffreLockModal';
import DepotCoffreModal from '../components/modals/DepotCoffreModal';
import HeaderScreen from '../components/ui/HeaderScreen';
import { COLORS } from '../constants';

// Données de démonstration
const mockTransactions = [
  { id: 1, type: 'depot', amount: '100 000', date: '15 Fév 2026', time: '14:30' },
  { id: 2, type: 'retrait', amount: '50 000', date: '10 Fév 2026', time: '09:15' },
  { id: 3, type: 'depot', amount: '200 000', date: '05 Fév 2026', time: '16:45' },
  { id: 4, type: 'retrait', amount: '75 000', date: '01 Fév 2026', time: '11:20' },
];

export default function Coffre() {
  const [visible, setVisible] = useState(true);
  const [locked, setLocked] = useState(false);
  const [unlockDate, setUnlockDate] = useState<Date | null>(null);
  const [lockModalVisible, setLockModalVisible] = useState(false);
  const [depotModalVisble, setDepotModalVisible]  = useState(false);
  const [montant, setMontant]                     = useState(Number);
  const balance = 500000 + montant;

  const handleLockPress = () => {
    if (locked) {
      // Afficher l'alerte avec info sur les frais
      Alert.alert(
        'Déverrouiller le coffre',
        'En déverrouillant votre coffre avant la date prévue, des frais de 1% du montant total seront appliqués. Voulez-vous continuer ?',
        [
          {
            text: 'Annuler',
            style: 'cancel'
          },
          {
            text: 'Déverrouiller',
            onPress: () => {
              setLocked(false);
              setUnlockDate(null);
            }
          }
        ],
        { cancelable: true }
      );
    } else {
      // Ouvrir le modal pour choisir la date
      setLockModalVisible(true);
    }
  };

  const handleConfirmLock = (date: Date) => {
    setLocked(true);
    setUnlockDate(date);
  };

  const formatLockDate = () => {
    if (!unlockDate) return '';
    return unlockDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDepotConfirm = (amount: string) => {
    setMontant(parseFloat(amount));
    setDepotModalVisible(false);
    Alert.alert('Dépôt réussi', `Vous avez déposé ${parseFloat(amount).toLocaleString()} GNF`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <HeaderScreen title='Mon Coffre' />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={scale(24)} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Sécurisez votre argent dans votre coffre personnel. Déposez et retirez quand vous voulez.
            </Text>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View style={styles.balanceLeft}>
                <Ionicons name="wallet" size={scale(24)} color={COLORS.primary} />
                <Text style={styles.balanceLabel}>Solde du coffre</Text>
              </View>
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={visible ? 'eye-outline' : 'eye-off-outline'} 
                  size={scale(22)} 
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {visible ? (
              <Text style={styles.balanceAmount}>{balance.toLocaleString()} <Text style={styles.currency}>GNF</Text></Text>
            ) : (
              <Text style={styles.balanceAmount}>••••••••••</Text>
            )}

            {/* Lock Status Badge */}
            <View style={styles.statusBadge}>
              <View style={[
                styles.statusDot,
                { backgroundColor: locked ? COLORS.error : COLORS.success }
              ]} />
              <Text style={styles.statusText}>
                {locked ? 'Verrouillé' : 'Actif'}
              </Text>
            </View>
          </View>

          {/* Actions Section */}
          <View style={styles.section}>
            <View style={styles.actionsGrid}>
              {/* Déposer */}
              <TouchableOpacity
                style={[styles.actionCard, locked && styles.actionCardDisabled]}
                activeOpacity={0.7}
                disabled={locked}
                onPress={() => setDepotModalVisible(true)}
              >
                <View style={[styles.actionIcon, { backgroundColor: locked ? COLORS.border : COLORS.success }]}>
                  <Ionicons name='add' color={COLORS.white} size={scale(26)} />
                </View>
                <Text style={[styles.actionLabel, locked && styles.actionLabelDisabled]}>Déposer</Text>
              </TouchableOpacity>

              {/* Retirer */}
              <TouchableOpacity
                style={[styles.actionCard, locked && styles.actionCardDisabled]}
                activeOpacity={0.7}
                disabled={locked}
              >
                <View style={[styles.actionIcon, { backgroundColor: locked ? COLORS.border : COLORS.primary }]}>
                  <Ionicons name='remove' color={COLORS.white} size={scale(26)} />
                </View>
                <Text style={[styles.actionLabel, locked && styles.actionLabelDisabled]}>Retirer</Text>
              </TouchableOpacity>

              {/* Bloquer/Débloquer */}
              <TouchableOpacity 
                style={[styles.actionCard, locked && styles.actionCardLocked]}
                onPress={handleLockPress}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.actionIcon, 
                  { backgroundColor: locked ? COLORS.error : COLORS.warning }
                ]}>
                  <Ionicons 
                    name={locked ? 'lock-closed' : 'lock-open'} 
                    color={COLORS.white} 
                    size={scale(26)} 
                  />
                </View>
                <Text style={styles.actionLabel}>
                  {locked ? 'Débloquer' : 'Bloquer'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Lock Info Badge (si verrouillé) */}
            {locked && unlockDate && (
              <View style={styles.lockInfoBadge}>
                <Ionicons name="time-outline" size={scale(16)} color={COLORS.error} />
                <Text style={styles.lockInfoText}>
                  Verrouillé jusqu'au {formatLockDate()}
                </Text>
              </View>
            )}
          </View>
          

          {/* Transactions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name='time-outline' size={scale(20)} color={COLORS.primary}/>
              <Text style={styles.sectionTitle}>Historique des transactions</Text>
            </View>

            {mockTransactions.length > 0 ? (
              mockTransactions.map((transaction) => (
                <View key={transaction.id} style={styles.transactionCard}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'depot' ? COLORS.successLight : COLORS.errorLight }
                  ]}>
                    <Feather 
                      name={transaction.type === 'depot' ? 'arrow-down-left' : 'arrow-up-right'} 
                      size={scale(22)} 
                      color={transaction.type === 'depot' ? COLORS.success : COLORS.error}
                    />
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionType}>
                      {transaction.type === 'depot' ? 'Dépôt' : 'Retrait'}
                    </Text>
                    <View style={styles.transactionDateTime}>
                      <Ionicons name="calendar-outline" size={scale(12)} color={COLORS.textSecondary} />
                      <Text style={styles.transactionDate}>{transaction.date}</Text>
                      <Text style={styles.transactionTime}>{transaction.time}</Text>
                    </View>
                  </View>

                  <View style={styles.transactionRight}>
                    <Text style={[
                      styles.transactionAmount,
                      { color: transaction.type === 'depot' ? COLORS.success : COLORS.error }
                    ]}>
                      {transaction.type === 'depot' ? '+' : '-'}{transaction.amount}
                    </Text>
                    <Text style={styles.transactionCurrency}>GNF</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="folder-open-outline" size={scale(60)} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>Aucune transaction</Text>
                <Text style={styles.emptySubText}>
                  Vos transactions apparaîtront ici
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/** Depot Modal */}
      <DepotCoffreModal
        visible={depotModalVisble}
        onClose={() => setDepotModalVisible(false)}
        onConfirm={handleDepotConfirm}
      />
            
      {/* Lock Modal */}
      <CoffreLockModal
        visible={lockModalVisible}
        onClose={() => setLockModalVisible(false)}
        onConfirm={handleConfirmLock}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(100),
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(15),
    gap: scale(12),
    borderLeftWidth: scale(4),
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
  },
  balanceCard: {
    backgroundColor: COLORS.white,
    padding: scale(12),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  balanceLabel: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  eyeButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(5),
  },
  currency: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    alignSelf: 'flex-start',
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
  },
  statusDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
  },
  statusText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  section: {
    marginBottom: verticalScale(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: "center",
    gap: scale(10),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: scale(10),
  },
  actionCard: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(8),
    borderWidth: scale(2),
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  actionCardDisabled: {
    opacity: 0.5,
    backgroundColor: COLORS.background,
  },
  actionCardLocked: {
    borderColor: COLORS.error,
    borderWidth: scale(2),
  },
  actionIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  actionLabel: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  actionLabelDisabled: {
    color: COLORS.textSecondary,
  },
  lockInfoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    backgroundColor: COLORS.errorLight,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(12),
    borderLeftWidth: scale(3),
    borderLeftColor: COLORS.error,
  },
  lockInfoText: {
    fontSize: moderateScale(12),
    color: COLORS.error,
    fontWeight: '600',
    flex: 1,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: scale(12),
  },
  transactionIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  transactionDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  transactionDate: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
  transactionTime: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    marginLeft: scale(8),
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(2),
  },
  transactionCurrency: {
    fontSize: moderateScale(11),
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: scale(40),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(12),
  },
  emptySubText: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginTop: verticalScale(4),
  },
});
