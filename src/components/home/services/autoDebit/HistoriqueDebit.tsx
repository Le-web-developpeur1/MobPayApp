import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/src/constants';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { autoDebitStorage, AutoDebitRecord } from '@/src/services/autoDebitStorage';

export default function HistoriqueDebit() {
  const [debits, setDebits] = useState<AutoDebitRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDebits = async () => {
    try {
      const data = await autoDebitStorage.getAll();
      console.log('Débits chargés:', data);
      setDebits(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Erreur lors du chargement des débits:', error);
    }
  };

  useEffect(() => {
    loadDebits();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDebits();
    setRefreshing(false);
  };

  const getFrequencyLabel = (freq: string) => {
    switch (freq) {
      case "day": return "Quotidien";
      case "week": return "Hebdomadaire";
      case "month": return "Mensuel";
      default: return freq;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'completed': return '#6B7280';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return "Actif";
      case 'completed': return "Terminé";
      case 'cancelled': return "Annulé";
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleCancel = (debit: AutoDebitRecord) => {
    Alert.alert(
      "Annuler le débit automatique",
      "Êtes-vous sûr de vouloir annuler ce débit automatique ?",
      [
        { text: "Non", style: "cancel" },
        {
          text: "Oui",
          style: "destructive",
          onPress: async () => {
            try {
              await autoDebitStorage.updateStatus(debit.id, 'cancelled');
              await loadDebits();
              Alert.alert("Succès", "Le débit automatique a été annulé");
            } catch (error) {
              Alert.alert("Erreur", "Impossible d'annuler le débit automatique");
            }
          },
        },
      ]
    );
  };

  const handleDelete = (debit: AutoDebitRecord) => {
    Alert.alert(
      "Supprimer le débit automatique",
      "Êtes-vous sûr de vouloir supprimer définitivement ce débit ?",
      [
        { text: "Non", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await autoDebitStorage.delete(debit.id);
              await loadDebits();
              Alert.alert("Succès", "Le débit a été supprimé");
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer le débit");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: AutoDebitRecord }) => (
    <View style={styles.debitCard}>
      {/* Header simple */}
      <View style={styles.cardHeader}>
        <View style={styles.leftSection}>
          <Text style={styles.amount}>{item.amount} GNF</Text>
          <View style={styles.frequencyRow}>
            <Ionicons name="repeat" size={scale(14)} color={COLORS.primary} />
            <Text style={styles.frequencyText}>{getFrequencyLabel(item.frequency)}</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
          </View>
        </View>
      </View>

      {/* Dates et motif */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={scale(16)} color={COLORS.textSecondary} />
          <Text style={styles.infoText}>
            Du {formatDate(item.startDate)} au {formatDate(item.endDate)}
          </Text>
        </View>
        
        {item.motif && (
          <View style={styles.infoRow}>
            <Ionicons name="document-text" size={scale(16)} color={COLORS.textSecondary} />
            <Text style={styles.infoText} numberOfLines={1}>{item.motif}</Text>
          </View>
        )}
      </View>

      {/* Actions */}
      {item.status === 'active' && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleCancel(item)} style={styles.actionButton}>
            <Ionicons name="pause-circle-outline" size={scale(18)} color="#F59E0B" />
            <Text style={styles.actionText}>Suspendre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)} style={[styles.actionButton, styles.deleteButton]}>
            <Ionicons name="trash-outline" size={scale(18)} color="#EF4444" />
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {item.status !== 'active' && (
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.singleDeleteButton}>
          <Ionicons name="trash-outline" size={scale(18)} color="#EF4444" />
          <Text style={[styles.actionText, { color: '#EF4444' }]}>Supprimer</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={scale(80)} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>Aucun débit automatique</Text>
      <Text style={styles.emptyText}>
        Programmez vos débits automatiques pour simplifier vos paiements récurrents
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={debits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: verticalScale(20),
  },
  debitCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(10),
  },
  
  // Header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  leftSection: {
    flex: 1,
  },
  amount: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(5),
  },
  frequencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  frequencyText: {
    fontSize: moderateScale(13),
    color: COLORS.primary,
    fontWeight: '600',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(6),
  },
  statusText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: COLORS.white,
    textTransform: 'uppercase',
  },

  // Section info
  infoSection: {
    gap: verticalScale(8),
    marginBottom: verticalScale(12),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  infoText: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    flex: 1,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: verticalScale(5),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  singleDeleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: '#FEE2E2',
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(5),
  },
  actionText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#F59E0B',
  },

  // État vide
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(80),
    paddingHorizontal: scale(40),
  },
  emptyTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  emptyText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});
