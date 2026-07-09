import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DetailTransaction from '../../components/modals/DetailTransactionModal';
import { COLORS } from '../../constants';

const week = [
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév '26",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Réception OM",
        status: "success"
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Transfert Cash Moov",
        status: "pending"
    },
];
const month = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Envoi OM",
        status: "pending"
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc '25",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Recharge Crédit",
        status: "success"
    },
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév '26",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Réception OM",
        status: "success"
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Transfert Cash Moov",
        status: "pending"
    },
];
const all = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Envoi OM",
        status: "pending"
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc '25",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Recharge Crédit",
        status: "success"
    },
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév '26",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Réception OM",
        status: "success"
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Transfert Cash Moov",
        status: "pending"
    },
];
const year = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Envoi OM",
        status: "pending"
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc '25",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Recharge Crédit",
        status: "success"
    },
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév '26",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Réception OM",
        status: "success"
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Transfert Cash Moov",
        status: "pending"
    },
];

export default function HistoriqueScreen() {
    const { t } = useTranslation();
    const [activTab, setActivTab] = useState<"all" | "week" | "month" | "year">("all");
    const [modalVisible, setModalVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    
    // Filtres
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "success" | "pending">("all");
    const [typeFilter, setTypeFilter] = useState<"all" | "entrant" | "sortant">("all");

    // Fonction pour formater la date avec des slashes
    const formatDateInput = (text: string, setter: (value: string) => void) => {
        // Enlever tout ce qui n'est pas un chiffre
        const cleaned = text.replace(/\D/g, '');
        
        let formatted = '';
        
        if (cleaned.length > 0) {
            // Ajouter les 2 premiers chiffres (jour)
            formatted = cleaned.substring(0, 2);
            
            if (cleaned.length >= 3) {
                // Ajouter le slash et les 2 chiffres suivants (mois)
                formatted += '/' + cleaned.substring(2, 4);
            }
            
            if (cleaned.length >= 5) {
                // Ajouter le slash et les 2 derniers chiffres (année)
                formatted += '/' + cleaned.substring(4, 6);
            }
        }
        
        setter(formatted);
    };

    const getDataByTab = () => {
        return activTab === "all" ? all : activTab === "week" ? week : activTab === "month" ? month : year;
    };

    // Fonction pour filtrer les données
    const getFilteredData = () => {
        let filteredData = getDataByTab();

        // Filtre par statut
        if (statusFilter !== "all") {
            filteredData = filteredData.filter(item => item.status === statusFilter);
        }

        // Filtre par type
        if (typeFilter !== "all") {
            filteredData = filteredData.filter(item => item.type === typeFilter);
        }

        // TODO: Filtre par date si besoin (nécessite conversion de date)
        
        return filteredData;
    };

    const data = getFilteredData();

    const handleTransactionPress = (item: any) => {
        setSelectedTransaction(item);
        setModalVisible(true);
    };

    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setStatusFilter("all");
        setTypeFilter("all");
    };

    const applyFilters = () => {
        setFilterModalVisible(false);
    };

    const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || startDate !== "" || endDate !== "";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header comme Shopping */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('history.title')}</Text>
      </View>

      {/* Contenu */}
      <View style={styles.container}>
        <Text style={{paddingBottom: verticalScale(10), fontSize: moderateScale(18)}}>{t('history.allTransactions')}</Text>

        {/* Cartes de résumé */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.successLight }]}>
              <Feather name="arrow-down-left" size={scale(18)} color={COLORS.success} />
            </View>
            <Text style={styles.summaryLabel}>{t('history.totalReceived')}</Text>
            <Text style={styles.summaryAmount}>1 500 000</Text>
            <Text style={styles.summaryCurrency}>GNF {t('history.thisMonth')}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.errorLight }]}>
              <Feather name="arrow-up-right" size={scale(18)} color={COLORS.error} />
            </View>
            <Text style={styles.summaryLabel}>{t('history.totalSent')}</Text>
            <Text style={styles.summaryAmount}>1 500 000</Text>
            <Text style={styles.summaryCurrency}>GNF {t('history.thisMonth')}</Text>
          </View>
        </View>

        {/* Filtres */}
        <View style={styles.filterRow}>
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[styles.filterButton, activTab === "all" && styles.filterButtonActive]}
              onPress={() => setActivTab("all")}
            >
              <Text style={[styles.filterText, activTab === "all" && styles.filterTextActive]}>
                {t('history.all')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterButton, activTab === "week" && styles.filterButtonActive]}
              onPress={() => setActivTab("week")}
            >
              <Text style={[styles.filterText, activTab === "week" && styles.filterTextActive]}>
                {t('history.week')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterButton, activTab === "month" && styles.filterButtonActive]}
              onPress={() => setActivTab("month")}
            >
              <Text style={[styles.filterText, activTab === "month" && styles.filterTextActive]}>
                {t('history.month')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.filterButton, activTab === "year" && styles.filterButtonActive]}
              onPress={() => setActivTab("year")}
            >
              <Text style={[styles.filterText, activTab === "year" && styles.filterTextActive]}>
                {t('history.year')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.advancedFilterButton, hasActiveFilters && styles.advancedFilterButtonActive]}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons 
              name="filter" 
              size={scale(18)} 
              color={hasActiveFilters ? COLORS.white : COLORS.primary} 
            />
            {hasActiveFilters && <View style={styles.filterBadge} />}
          </TouchableOpacity>
        </View>

        {/* Liste des transactions */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.transactionCard}
              onPress={() => handleTransactionPress(item)}
              activeOpacity={0.7}
            >
              {/* Côté gauche avec icône et info */}
              <View style={styles.leftSection}>
                <View style={[
                  styles.iconContainer,
                  item.type === "entrant" ? styles.iconContainerEntrant : styles.iconContainerSortant
                ]}>
                  <Feather 
                    name={item.type === "sortant" ? "arrow-up-right" : "arrow-down-left"} 
                    color={item.type === "entrant" ? COLORS.success : COLORS.error} 
                    size={scale(22)}
                  />
                </View>
                
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.transactionType}>{item.typeTransaction}</Text>
                  <View style={styles.phoneRow}>
                    <Ionicons name="call-outline" size={scale(11)} color={COLORS.textSecondary} />
                    <Text style={styles.transactionPhone}>{item.phone}</Text>
                  </View>
                </View>
              </View>
              
              {/* Côté droit avec montant et statut */}
              <View style={styles.transactionRight}>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.type === "entrant" ? COLORS.success : COLORS.error }
                  ]}
                  numberOfLines={1}
                >
                  {item.type === "entrant" ? "+" : "-"}{item.amount} GNF
                </Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
                <View style={[
                  styles.statusBadge,
                  item.status === "success" ? styles.statusSuccess : styles.statusPending
                ]}>
                  <View style={[
                    styles.statusDot,
                    item.status === "success" ? styles.dotSuccess : styles.dotPending
                  ]} />
                  <Text style={[
                    styles.statusText,
                    item.status === "success" ? styles.statusSuccessText : styles.statusPendingText
                  ]}>
                    {item.status === "success" ? t('common.success') : t('transactions.statusPending')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <DetailTransaction
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        amount={selectedTransaction?.amount || ""}
        status="success"
        name={selectedTransaction?.name || ""}
        date={selectedTransaction?.date || ""}
        transactionId={`TXN${Date.now()}`}
        fees="5 000"
        number={selectedTransaction?.phone || ""}
        note={selectedTransaction?.note}
        transferType={selectedTransaction?.typeTransaction}
      />

      {/* Modal de filtre avancé */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>{t('history.filter')}</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Filtre par date */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Filtrer par date</Text>
                <View style={styles.dateInputRow}>
                  <View style={styles.dateInputContainer}>
                    <Text style={styles.dateLabel}>Du</Text>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="JJ/MM/AA"
                      value={startDate}
                      onChangeText={(text) => formatDateInput(text, setStartDate)}
                      keyboardType="numeric"
                      maxLength={8}
                    />
                  </View>
                  <View style={styles.dateInputContainer}>
                    <Text style={styles.dateLabel}>{t('history.to')}</Text>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="JJ/MM/AA"
                      value={endDate}
                      onChangeText={(text) => formatDateInput(text, setEndDate)}
                      keyboardType="numeric"
                      maxLength={8}
                    />
                  </View>
                </View>
              </View>

              {/* Filtre par statut */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Filtrer par statut</Text>
                <View style={styles.statusFilterRow}>
                  <TouchableOpacity
                    style={[styles.statusChip, statusFilter === "all" && styles.statusChipActive]}
                    onPress={() => setStatusFilter("all")}
                  >
                    <Text style={[styles.statusChipText, statusFilter === "all" && styles.statusChipTextActive]}>
                      Tous
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusChip, statusFilter === "success" && styles.statusChipActive]}
                    onPress={() => setStatusFilter("success")}
                  >
                    <View style={[styles.statusDot, styles.dotSuccess]} />
                    <Text style={[styles.statusChipText, statusFilter === "success" && styles.statusChipTextActive]}>
                      Réussi
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusChip, statusFilter === "pending" && styles.statusChipActive]}
                    onPress={() => setStatusFilter("pending")}
                  >
                    <View style={[styles.statusDot, styles.dotPending]} />
                    <Text style={[styles.statusChipText, statusFilter === "pending" && styles.statusChipTextActive]}>
                      En cours
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Filtre par type */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Filtrer par type</Text>
                <View style={styles.statusFilterRow}>
                  <TouchableOpacity
                    style={[styles.statusChip, typeFilter === "all" && styles.statusChipActive]}
                    onPress={() => setTypeFilter("all")}
                  >
                    <Text style={[styles.statusChipText, typeFilter === "all" && styles.statusChipTextActive]}>
                      Tous
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusChip, typeFilter === "entrant" && styles.statusChipActive]}
                    onPress={() => setTypeFilter("entrant")}
                  >
                    <Feather name="arrow-down-left" size={scale(14)} color={typeFilter === "entrant" ? COLORS.white : COLORS.success} />
                    <Text style={[styles.statusChipText, typeFilter === "entrant" && styles.statusChipTextActive]}>
                      Reçu
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.statusChip, typeFilter === "sortant" && styles.statusChipActive]}
                    onPress={() => setTypeFilter("sortant")}
                  >
                    <Feather name="arrow-up-right" size={scale(14)} color={typeFilter === "sortant" ? COLORS.white : COLORS.error} />
                    <Text style={[styles.statusChipText, typeFilter === "sortant" && styles.statusChipTextActive]}>
                      Envoyé
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Boutons d'action */}
            <View style={styles.filterActions}>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>{t('history.reset')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>{t('history.apply')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: COLORS.background,
    paddingTop: verticalScale(10),
  },
  summaryRow: {
    flexDirection: "row",
    marginBottom: verticalScale(15),
    gap: scale(12),
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: scale(15),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  summaryLabel: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(4),
  },
  summaryAmount: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(2),
  },
  summaryCurrency: {
    fontSize: moderateScale(11),
    color: COLORS.textSecondary,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginBottom: verticalScale(15),
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    padding: scale(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  advancedFilterButton: {
    width: scale(44),
    height: scale(44),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
    position: "relative",
  },
  advancedFilterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterBadge: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.secondary,
  },
  filterButton: {
    flex: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  scrollContent: {
    paddingBottom: verticalScale(100),
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  transactionType: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(4),
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
  transactionPhone: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
  transactionRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  transactionAmount: {
    fontSize: moderateScale(17),
    fontWeight: "700",
    marginBottom: verticalScale(6),
  },
  transactionDate: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginBottom: verticalScale(8),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
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
  statusText: {
    fontSize: moderateScale(11),
    fontWeight: "600",
  },
  statusSuccessText: {
    color: COLORS.success,
  },
  statusPendingText: {
    color: '#FFA500',
  },
  // Styles du modal de filtre
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },
  filterModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30),
    maxHeight: '80%',
  },
  filterModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  filterModalTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  filterSection: {
    marginBottom: verticalScale(25),
  },
  filterSectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  dateInputRow: {
    flexDirection: "row",
    gap: scale(12),
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(6),
  },
  dateInput: {
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusFilterRow: {
    flexDirection: "row",
    gap: scale(10),
    flexWrap: "wrap",
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  statusChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusChipText: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  statusChipTextActive: {
    color: COLORS.white,
  },
  filterActions: {
    flexDirection: "row",
    gap: scale(12),
    marginTop: verticalScale(20),
  },
  resetButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.background,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  resetButtonText: {
    fontSize: moderateScale(15),
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  applyButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: moderateScale(15),
    fontWeight: "700",
    color: COLORS.white,
  },
});
