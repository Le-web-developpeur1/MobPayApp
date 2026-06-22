import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const filtered = ['Transfert', 'Status', 'Type'];

const menuOptions: Record<string, string[]> = {
  Transfert: ['CashMoov', 'Orange Money', 'Wave'],
  Status: ['En cours', 'Terminé', 'Échoué'],
  Type: ['Envoyé', 'Reçu', 'Virement'],
};

interface FiltreHistoryProps {
  onFilterChange?: (filters: Record<string, string>) => void;
}

export default function FiltreHistory({ onFilterChange }: FiltreHistoryProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleFilterPress = (filter: string) => {
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  const handleOptionSelect = (filter: string, option: string) => {
    const newOptions = { ...selectedOptions, [filter]: option };
    setSelectedOptions(newOptions);
    setOpenDropdown(null);
    onFilterChange?.(newOptions);
  };

  const clearFilter = (filter: string) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions[filter];
      onFilterChange?.(newOptions);
      return newOptions;
    });
  };

  return (
    <View style={styles.container}>
      {filtered.map((filter) => (
        <View key={filter} style={styles.filterWrapper}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedOptions[filter] && styles.filterButtonActive,
              openDropdown === filter && styles.filterButtonOpen
            ]}
            onPress={() => handleFilterPress(filter)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.filterText,
              selectedOptions[filter] && styles.filterTextActive
            ]}>
              {selectedOptions[filter] || filter}
            </Text>
            {selectedOptions[filter] ? (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  clearFilter(filter);
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-circle" size={scale(18)} color={COLORS.white} />
              </TouchableOpacity>
            ) : (
              <Ionicons 
                name={openDropdown === filter ? "chevron-up" : "chevron-down"} 
                size={scale(16)} 
                color={selectedOptions[filter] ? COLORS.white : COLORS.textSecondary} 
              />
            )}
          </TouchableOpacity>

          {openDropdown === filter && (
            <View style={styles.dropdown}>
              {menuOptions[filter]?.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownItem,
                    selectedOptions[filter] === option && styles.dropdownItemActive
                  ]}
                  onPress={() => handleOptionSelect(filter, option)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.dropdownText,
                    selectedOptions[filter] === option && styles.dropdownTextActive
                  ]}>
                    {option}
                  </Text>
                  {selectedOptions[filter] === option && (
                    <Ionicons name="checkmark" size={scale(18)} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
    zIndex: 1000,
  },
  filterWrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 1000,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  filterText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2000,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  dropdownItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  dropdownText: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  dropdownTextActive: {
    fontWeight: '700',
    color: COLORS.primary,
  },
});
