import { COLORS } from '@/src/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Calendar, ChevronRight, Download, FileText, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../components/ui/HeaderScreen';

type PeriodType = 'custom' | 'year' | 'month';

export default function ReleveScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('custom');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<{ month: number; year: number } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // États pour afficher/masquer les DateTimePickers et Modals
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  
  // Valeurs temporaires pour les pickers
  const [tempYear, setTempYear] = useState<number>(new Date().getFullYear());
  const [tempMonth, setTempMonth] = useState<number>(new Date().getMonth());
  const [tempMonthYear, setTempMonthYear] = useState<number>(new Date().getFullYear());

  // Générer toutes les années depuis 2000 jusqu'à aujourd'hui
  const getYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    const startYear = 2012;
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  // Noms des mois
  const getMonthName = (monthIndex: number) => {
    const date = new Date(2024, monthIndex, 1);
    return date.toLocaleDateString('fr-FR', { month: 'long' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const formatYear = (year: number) => {
    return year.toString();
  };

  const formatMonth = (month: { month: number; year: number }) => {
    const date = new Date(month.year, month.month, 1);
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  const handleDownload = async () => {
    if (selectedPeriod === 'custom' && (!startDate || !endDate)) {
      Alert.alert(
        t('statement.error') || 'Erreur',
        t('statement.selectPeriod') || 'Veuillez sélectionner une période'
      );
      return;
    }

    if (selectedPeriod === 'year' && !selectedYear) {
      Alert.alert(
        t('statement.error') || 'Erreur',
        t('statement.selectYear') || 'Veuillez sélectionner une année'
      );
      return;
    }

    if (selectedPeriod === 'month' && !selectedMonth) {
      Alert.alert(
        t('statement.error') || 'Erreur',
        t('statement.selectMonth') || 'Veuillez sélectionner un mois'
      );
      return;
    }

    if (selectedPeriod === 'custom' && startDate && endDate && startDate > endDate) {
      Alert.alert(
        t('statement.error') || 'Erreur',
        t('statement.invalidPeriod') || 'La date de début doit être antérieure à la date de fin'
      );
      return;
    }

    setIsDownloading(true);

    // Simuler le téléchargement
    setTimeout(() => {
      setIsDownloading(false);
      Alert.alert(
        t('statement.success') || 'Succès',
        t('statement.downloadSuccess') || 'Votre relevé a été téléchargé avec succès',
        [
          {
            text: t('common.ok') || 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }, 2000);
  };

  return (
    <>
      <HeaderScreen title={t('statement.title') || 'Relevé de compte'} />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <FileText size={moderateScale(32)} color={COLORS.primary} strokeWidth={2} />
            <Text style={styles.infoTitle}>
              {t('statement.infoTitle') || 'Téléchargez votre relevé'}
            </Text>
            <Text style={styles.infoDescription}>
              {t('statement.infoDescription') || 'Obtenez un relevé détaillé de toutes vos transactions'}
            </Text>
          </View>

          {/* Period Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('statement.periodType') || 'Type de période'}
            </Text>
            
            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'custom' && styles.periodOptionSelected
              ]}
              onPress={() => setSelectedPeriod('custom')}
              activeOpacity={0.7}
            >
              <View style={styles.periodOptionContent}>
                <View style={[
                  styles.radio,
                  selectedPeriod === 'custom' && styles.radioSelected
                ]}>
                  {selectedPeriod === 'custom' && <View style={styles.radioDot} />}
                </View>
                <View style={styles.periodInfo}>
                  <Text style={styles.periodTitle}>
                    {t('statement.customPeriod') || 'Période personnalisée'}
                  </Text>
                  <Text style={styles.periodDescription}>
                    {t('statement.customPeriodDesc') || 'Date de début et de fin'}
                  </Text>
                </View>
              </View>
              <Calendar size={moderateScale(22)} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'year' && styles.periodOptionSelected
              ]}
              onPress={() => setSelectedPeriod('year')}
              activeOpacity={0.7}
            >
              <View style={styles.periodOptionContent}>
                <View style={[
                  styles.radio,
                  selectedPeriod === 'year' && styles.radioSelected
                ]}>
                  {selectedPeriod === 'year' && <View style={styles.radioDot} />}
                </View>
                <View style={styles.periodInfo}>
                  <Text style={styles.periodTitle}>
                    {t('statement.byYear') || 'Par année'}
                  </Text>
                  <Text style={styles.periodDescription}>
                    {t('statement.byYearDesc') || 'Toute une année'}
                  </Text>
                </View>
              </View>
              <Calendar size={moderateScale(22)} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.periodOption,
                selectedPeriod === 'month' && styles.periodOptionSelected
              ]}
              onPress={() => setSelectedPeriod('month')}
              activeOpacity={0.7}
            >
              <View style={styles.periodOptionContent}>
                <View style={[
                  styles.radio,
                  selectedPeriod === 'month' && styles.radioSelected
                ]}>
                  {selectedPeriod === 'month' && <View style={styles.radioDot} />}
                </View>
                <View style={styles.periodInfo}>
                  <Text style={styles.periodTitle}>
                    {t('statement.byMonth') || 'Par mois'}
                  </Text>
                  <Text style={styles.periodDescription}>
                    {t('statement.byMonthDesc') || 'Un mois spécifique'}
                  </Text>
                </View>
              </View>
              <Calendar size={moderateScale(22)} color={COLORS.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Custom Period Selection */}
          {selectedPeriod === 'custom' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('statement.definePeriod') || 'Définir la période'}
              </Text>

              <TouchableOpacity 
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => setShowStartPicker(true)}
              >
                <View style={styles.dateInputContent}>
                  <View style={styles.iconCircle}>
                    <Calendar size={moderateScale(20)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <View style={styles.dateInputInfo}>
                    <Text style={styles.dateInputTitle}>
                      {t('statement.startDate') || 'Date de début'}
                    </Text>
                    <Text style={[styles.dateInputValue, !startDate && styles.dateInputPlaceholder]}>
                      {startDate 
                        ? formatDate(startDate)
                        : t('statement.selectDate') || 'Sélectionner'
                      }
                    </Text>
                  </View>
                </View>
                <ChevronRight size={moderateScale(20)} color={COLORS.textSecondary} strokeWidth={2} />
              </TouchableOpacity>

              {showStartPicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowStartPicker(false);
                    if (selectedDate) setStartDate(selectedDate);
                  }}
                  maximumDate={new Date()}
                />
              )}

              <TouchableOpacity 
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => setShowEndPicker(true)}
              >
                <View style={styles.dateInputContent}>
                  <View style={styles.iconCircle}>
                    <Calendar size={moderateScale(20)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <View style={styles.dateInputInfo}>
                    <Text style={styles.dateInputTitle}>
                      {t('statement.endDate') || 'Date de fin'}
                    </Text>
                    <Text style={[styles.dateInputValue, !endDate && styles.dateInputPlaceholder]}>
                      {endDate 
                        ? formatDate(endDate)
                        : t('statement.selectDate') || 'Sélectionner'
                      }
                    </Text>
                  </View>
                </View>
                <ChevronRight size={moderateScale(20)} color={COLORS.textSecondary} strokeWidth={2} />
              </TouchableOpacity>

              {showEndPicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowEndPicker(false);
                    if (selectedDate) setEndDate(selectedDate);
                  }}
                  maximumDate={new Date()}
                  minimumDate={startDate || undefined}
                />
              )}

              <View style={styles.noteCard}>
                <Text style={styles.noteText}>
                  {t('statement.periodNote') || 'La période maximale est de 12 mois'}
                </Text>
              </View>
            </View>
          )}

          {/* Year Selection */}
          {selectedPeriod === 'year' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('statement.selectYear') || 'Sélectionner une année'}
              </Text>
              
              <TouchableOpacity 
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => {
                  setTempYear(selectedYear || new Date().getFullYear());
                  setShowYearModal(true);
                }}
              >
                <View style={styles.dateInputContent}>
                  <View style={styles.iconCircle}>
                    <Calendar size={moderateScale(20)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <View style={styles.dateInputInfo}>
                    <Text style={styles.dateInputTitle}>
                      {t('statement.year') || 'Année'}
                    </Text>
                    <Text style={[styles.dateInputValue, !selectedYear && styles.dateInputPlaceholder]}>
                      {selectedYear 
                        ? formatYear(selectedYear)
                        : t('statement.selectDate') || 'Sélectionner'
                      }
                    </Text>
                  </View>
                </View>
                <ChevronRight size={moderateScale(20)} color={COLORS.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          )}

          {/* Month Selection */}
          {selectedPeriod === 'month' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('statement.selectMonth') || 'Sélectionner un mois'}
              </Text>
              
              <TouchableOpacity 
                style={styles.dateInput}
                activeOpacity={0.7}
                onPress={() => {
                  if (selectedMonth) {
                    setTempMonth(selectedMonth.month);
                    setTempMonthYear(selectedMonth.year);
                  } else {
                    setTempMonth(new Date().getMonth());
                    setTempMonthYear(new Date().getFullYear());
                  }
                  setShowMonthModal(true);
                }}
              >
                <View style={styles.dateInputContent}>
                  <View style={styles.iconCircle}>
                    <Calendar size={moderateScale(20)} color={COLORS.primary} strokeWidth={2} />
                  </View>
                  <View style={styles.dateInputInfo}>
                    <Text style={styles.dateInputTitle}>
                      {t('statement.month') || 'Mois'}
                    </Text>
                    <Text style={[styles.dateInputValue, !selectedMonth && styles.dateInputPlaceholder]}>
                      {selectedMonth 
                        ? formatMonth(selectedMonth)
                        : t('statement.selectDate') || 'Sélectionner'
                      }
                    </Text>
                  </View>
                </View>
                <ChevronRight size={moderateScale(20)} color={COLORS.textSecondary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          )}

          {/* Download Button */}
          <TouchableOpacity
            style={[
              styles.downloadButton,
              isDownloading && styles.downloadButtonDisabled
            ]}
            onPress={handleDownload}
            disabled={isDownloading}
            activeOpacity={0.8}
          >
            <Download size={moderateScale(20)} color={COLORS.white} strokeWidth={2} />
            <Text style={styles.downloadButtonText}>
              {isDownloading 
                ? t('statement.downloading') || 'Téléchargement...'
                : t('statement.download') || 'Télécharger le relevé'
              }
            </Text>
          </TouchableOpacity>

          {/* Format Info */}
          <View style={styles.formatInfo}>
            <Text style={styles.formatText}>
              {t('statement.formatInfo') || 'Le relevé sera téléchargé au format PDF'}
            </Text>
          </View>
        </ScrollView>

        {/* Year Picker Modal */}
        <Modal
          visible={showYearModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowYearModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {t('statement.selectYear') || 'Sélectionner une année'}
                </Text>
                <TouchableOpacity onPress={() => setShowYearModal(false)}>
                  <X size={moderateScale(24)} color={COLORS.textPrimary} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tempYear}
                  onValueChange={(itemValue) => setTempYear(itemValue)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  {getYears().map((year) => (
                    <Picker.Item key={year} label={year.toString()} value={year} />
                  ))}
                </Picker>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={() => setShowYearModal(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonCancelText}>
                    {t('common.cancel') || 'Annuler'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={() => {
                    setSelectedYear(tempYear);
                    setShowYearModal(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonConfirmText}>
                    {t('common.confirm') || 'Confirmer'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Month Picker Modal */}
        <Modal
          visible={showMonthModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowMonthModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {t('statement.selectMonth') || 'Sélectionner un mois'}
                </Text>
                <TouchableOpacity onPress={() => setShowMonthModal(false)}>
                  <X size={moderateScale(24)} color={COLORS.textPrimary} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <View style={styles.pickerContainer}>
                <View style={styles.doublePickerRow}>
                  <View style={styles.doublePickerColumn}>
                    <Text style={styles.pickerLabel}>{t('statement.month') || 'Mois'}</Text>
                    <Picker
                      selectedValue={tempMonth}
                      onValueChange={(itemValue) => setTempMonth(itemValue)}
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <Picker.Item 
                          key={i} 
                          label={getMonthName(i).charAt(0).toUpperCase() + getMonthName(i).slice(1)} 
                          value={i} 
                        />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.doublePickerColumn}>
                    <Text style={styles.pickerLabel}>{t('statement.year') || 'Année'}</Text>
                    <Picker
                      selectedValue={tempMonthYear}
                      onValueChange={(itemValue) => setTempMonthYear(itemValue)}
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {getYears().map((year) => (
                        <Picker.Item key={year} label={year.toString()} value={year} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={() => setShowMonthModal(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonCancelText}>
                    {t('common.cancel') || 'Annuler'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={() => {
                    setSelectedMonth({ month: tempMonth, year: tempMonthYear });
                    setShowMonthModal(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonConfirmText}>
                    {t('common.confirm') || 'Confirmer'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30),
  },
  infoCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: moderateScale(16),
    padding: scale(20),
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },
  infoTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: verticalScale(12),
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  infoDescription: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  section: {
    marginBottom: verticalScale(25),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  periodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    padding: scale(16),
    marginBottom: verticalScale(10),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  periodOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  periodOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radio: {
    width: scale(20),
    height: scale(20),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: moderateScale(5),
    backgroundColor: COLORS.primary,
  },
  periodInfo: {
    flex: 1,
  },
  periodTitle: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  periodDescription: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    padding: scale(16),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  dateInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    flex: 1,
  },
  iconCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateInputInfo: {
    flex: 1,
  },
  dateInputTitle: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(4),
  },
  dateInputValue: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  dateInputPlaceholder: {
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  noteCard: {
    backgroundColor: COLORS.warningLight,
    borderRadius: moderateScale(10),
    padding: scale(12),
    marginTop: verticalScale(8),
  },
  noteText: {
    fontSize: moderateScale(12),
    color: COLORS.warning,
    textAlign: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(14),
    padding: scale(16),
    gap: scale(10),
    marginTop: verticalScale(10),
  },
  downloadButtonDisabled: {
    opacity: 0.6,
  },
  downloadButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
  formatInfo: {
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  formatText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingBottom: verticalScale(30),
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  pickerContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  picker: {
    width: '100%',
    height: verticalScale(180),
  },
  pickerItem: {
    fontSize: moderateScale(18),
    color: COLORS.textPrimary,
  },
  pickerLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  doublePickerRow: {
    flexDirection: 'row',
    gap: scale(15),
  },
  doublePickerColumn: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: scale(12),
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  modalButton: {
    flex: 1,
    padding: scale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalButtonConfirm: {
    backgroundColor: COLORS.primary,
  },
  modalButtonCancelText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  modalButtonConfirmText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.white,
  },
});