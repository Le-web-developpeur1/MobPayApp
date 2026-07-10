import DetailTransaction from '@/src/components/modals/DetailTransactionModal';
import DateRange from '@/src/components/ui/DateRange';
import FiltreHistory from '@/src/components/ui/FiltreHistory';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// Données de démonstration
const mockTransactions = [
  {
    id: '1',
    name: 'Boubacar Bah',
    amount: '600 000',
    date: "01 Fév '26",
    type: 'entrant',
    phone: '626058033',
    typeTransaction: 'Réception OM',
    transferMethod: 'Orange Money',
    transferType: 'Orange Money' as const,
    status: 'success'
  },
  {
    id: '2',
    name: 'Alphonse Kaman',
    amount: '849 000',
    date: "02 Fév '26",
    type: 'sortant',
    phone: '626058033',
    typeTransaction: 'Transfert CashMoov',
    transferMethod: 'CashMoov',
    transferType: 'CashMoov' as const,
    status: 'success'
  },
  {
    id: '3',
    name: 'Rouguiatou Diallo',
    amount: '1 200 000',
    date: "28 Jan '26",
    type: 'sortant',
    phone: '626058033',
    typeTransaction: 'Envoi OM',
    transferMethod: 'Orange Money',
    transferType: 'Orange Money' as const,
    status: 'pending'
  },
  {
    id: '4',
    name: 'Ibrahima Sow',
    amount: '300 000',
    date: "15 Jan '26",
    type: 'entrant',
    phone: '621234567',
    typeTransaction: 'Réception Wave',
    transferMethod: 'Wave',
    transferType: 'Wave' as const,
    status: 'failed'
  },
  {
    id: '5',
    name: 'Yaya Barry',
    amount: '500 000',
    date: "10 Jan '26",
    type: 'sortant',
    phone: '627654321',
    typeTransaction: 'Transfert Wave',
    transferMethod: 'Wave',
    transferType: 'Wave' as const,
    status: 'failed'
  },
  {
    id: '6',
    name: 'Pathe Barry',
    amount: '500 000',
    date: "10 Jan '26",
    type: 'entrant',
    phone: '627654321',
    typeTransaction: 'Transfert International',
    transferMethod: 'Wave',
    transferType: 'International' as const,
    status: 'pending'
  },
];

export default function History() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const getFilteredTransactions = () => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch = 
        transaction.name.toLowerCase().includes(search.toLowerCase()) ||
        transaction.phone.includes(search) ||
        transaction.transferType.toLowerCase().includes(search.toLowerCase());

      const matchesTransfert = !filters.Transfert || transaction.transferMethod === filters.Transfert;

      let matchesStatus = true;
      if (filters.Status) {
        if (filters.Status === 'Terminé') matchesStatus = transaction.status === 'success';
        else if (filters.Status === 'En cours') matchesStatus = transaction.status === 'pending';
        else if (filters.Status === 'Échoué') matchesStatus = transaction.status === 'failed';
      }

      let matchesType = true;
      if (filters.Type) {
        if (filters.Type === 'Envoyé') matchesType = transaction.type === 'sortant';
        else if (filters.Type === 'Reçu') matchesType = transaction.type === 'entrant';
      }

      return matchesSearch && matchesTransfert && matchesStatus && matchesType;
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const handleTransactionPress = (item: any) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };
    
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <HeaderScreen title='Historique des transactions' />
      
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name='search' size={scale(20)} color={COLORS.textSecondary} style={styles.searchIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Rechercher une transaction..."
              placeholderTextColor={COLORS.textSecondary}
              value={search}
              onChangeText={setSearch}
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                colors: {
                  text: COLORS.textPrimary,
                  primary: 'transparent',
                },
              }}
            />
          </View>
        </View>

        <DateRange/>

        <FiltreHistory onFilterChange={setFilters} />

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.transactionCard}
                activeOpacity={0.7}
                onPress={() => handleTransactionPress(item)}
              >
                <View style={styles.leftSection}>
                  <View style={[
                    styles.iconContainer,
                    item.type === 'entrant' ? styles.iconContainerEntrant : styles.iconContainerSortant
                  ]}>
                    <Feather 
                      name={item.type === 'sortant' ? 'arrow-up-right' : 'arrow-down-left'} 
                      color={item.type === 'entrant' ? COLORS.success : COLORS.error} 
                      size={scale(22)}
                    />
                  </View>
                  
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.transactionType}>{item.typeTransaction}</Text>
                    <View style={styles.phoneRow}>
                      <Ionicons name='call-outline' size={scale(11)} color={COLORS.textSecondary} />
                      <Text style={styles.transactionPhone}>{item.phone}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.transactionRight}>
                  <Text
                    style={[
                      styles.transactionAmount,
                      { color: item.type === 'entrant' ? COLORS.success : COLORS.error }
                    ]}
                    numberOfLines={1}
                  >
                    {item.type === 'entrant' ? '+' : '-'}{item.amount} GNF
                  </Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                  <View style={[
                    styles.statusBadge,
                    item.status === 'success' 
                      ? styles.statusSuccess 
                      : item.status === 'pending' 
                      ? styles.statusPending 
                      : styles.statusFailed
                  ]}>
                    <View style={[
                      styles.statusDot,
                      item.status === 'success' 
                        ? styles.dotSuccess 
                        : item.status === 'pending' 
                        ? styles.dotPending 
                        : styles.dotFailed
                    ]} />
                    <Text style={[
                      styles.statusText,
                      item.status === 'success' 
                        ? styles.statusSuccessText 
                        : item.status === 'pending' 
                        ? styles.statusPendingText 
                        : styles.statusFailedText
                    ]}>
                      {item.status === 'success' ? 'Réussi' : item.status === 'pending' ? 'En cours' : 'Échoué'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={scale(60)} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>Aucune transaction trouvée</Text>
              <Text style={styles.emptySubText}>
                Essayez de modifier vos filtres ou votre recherche
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <DetailTransaction
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        amount={selectedTransaction?.amount || ""}
        status={selectedTransaction?.status === 'success' ? 'success' : selectedTransaction?.status === 'pending' ? 'pending' : 'failed'}
        name={selectedTransaction?.name || ""}
        date={selectedTransaction?.date || ""}
        transactionId={`TXN${Date.now()}`}
        fees="5 000"
        number={selectedTransaction?.phone || ""}
        note="Transaction mobile"
        transferType={selectedTransaction?.typeTransaction}
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
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(15),
  },
  searchContainer: {
    marginBottom: verticalScale(15),
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: moderateScale(15),
    height: verticalScale(50),
  },
  scrollContent: {
    paddingBottom: verticalScale(100),
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(15),
    padding: scale(16),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: scale(4),
    borderLeftColor: COLORS.primary,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  iconContainerEntrant: {
    backgroundColor: COLORS.successLight,
  },
  iconContainerSortant: {
    backgroundColor: COLORS.errorLight,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  transactionType: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(4),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  transactionPhone: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    marginBottom: verticalScale(6),
  },
  transactionDate: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: verticalScale(8),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(8),
  },
  statusSuccess: {
    backgroundColor: COLORS.successLight,
  },
  statusPending: {
    backgroundColor: '#FFF4E5',
  },
  statusFailed: {
    backgroundColor: '#FFE5E5',
  },
  statusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
  },
  dotSuccess: {
    backgroundColor: COLORS.success,
  },
  dotPending: {
    backgroundColor: '#FFA500',
  },
  dotFailed: {
    backgroundColor: COLORS.error,
  },
  statusText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  statusSuccessText: {
    color: COLORS.success,
  },
  statusPendingText: {
    color: '#FFA500',
  },
  statusFailedText: {
    color: COLORS.error,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  emptyText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(16),
  },
  emptySubText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginTop: verticalScale(8),
    textAlign: 'center',
    paddingHorizontal: scale(40),
  },
});