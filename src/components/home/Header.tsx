import CustomerServiceModal from '@/src/components/modals/CustomerServiceModal';
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, CheckCircle2, ChevronDown, CreditCard, Headphones, Menu, Search } from 'lucide-react-native';
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Circle } from 'react-native-svg';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
    const { t } = useTranslation();
    const unreadCount = 2;
    const navigation = useNavigation<NavigationProps>();

    const [visible, setVisible] = useState(false);
    const [serviceModalVisible, setServiceModalVisible] = useState(false);

    const [selectedNumber, setSelectedNumber] = useState("626 05 80 33");

    const accounts = [
      { number: "626 05 80 33", label: "Principal" },
      { number: "628 34 42 12", label: "Secondaire" },
      { number: "628 14 12 49", label: "Pro" }
    ];
    
    return (
      <>
        <View style={styles.container}>
          <View style={styles.leftSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.PROFILE)}
              style={styles.menuButton}
              activeOpacity={0.7}
            >
              <Menu size={scale(26)} color={COLORS.primary} strokeWidth={2}/>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setVisible(true)}
              style={styles.accountButton}
              activeOpacity={0.7}
            >
              <Text style={styles.number}>{selectedNumber}</Text>
              <ChevronDown size={scale(18)} color={COLORS.primary} strokeWidth={2}/>
            </TouchableOpacity>
          </View>

          <View style={styles.icons}>
            <TouchableOpacity 
              onPress={() => navigation.navigate(ROUTES.SEARCH)}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Search size={scale(24)} color={COLORS.primary} strokeWidth={2}/>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate(ROUTES.NOTIFICATION)}
              activeOpacity={0.7}
            >
              <View style={styles.notificationContainer}>
                <Bell size={scale(24)} color={COLORS.primary} strokeWidth={2}/>
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setServiceModalVisible(true)}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Headphones size={scale(24)} color={COLORS.primary} strokeWidth={2}/>
            </TouchableOpacity>
          </View>

          <CustomerServiceModal
            visible={serviceModalVisible}
            onClose={() => setServiceModalVisible(false)}
          />

          <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
          >
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setVisible(false)}
            >
              <View style={styles.bottomSheet}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalHandle} />
                </View>
                
                <Text style={styles.modalTitle}>Choisir un compte</Text>
                
                {accounts.map((item) => (
                  <TouchableOpacity
                    key={item.number}
                    style={[
                      styles.item,
                      selectedNumber === item.number && styles.itemSelected
                    ]}
                    onPress={() => {
                      setSelectedNumber(item.number);
                      setVisible(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.itemContent}>
                      <View style={styles.itemLeft}>
                        <CreditCard 
                          size={scale(24)} 
                          color={selectedNumber === item.number ? COLORS.primary : COLORS.textSecondary}
                          strokeWidth={2}
                        />
                        <View style={styles.itemTextContainer}>
                          <Text style={[
                            styles.itemNumber,
                            selectedNumber === item.number && styles.itemNumberSelected
                          ]}>
                            {item.number}
                          </Text>
                          <Text style={styles.itemLabel}>{item.label}</Text>
                        </View>
                      </View>
                      {selectedNumber === item.number ? (
                        <CheckCircle2 
                          size={scale(24)}
                          color={COLORS.primary}
                          strokeWidth={2}
                        />
                      ) : (
                        <Circle 
                          color={COLORS.border}
                          strokeWidth={2}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
        
        <View style={styles.info}>
          <Text style={styles.greeting}>
            {t('home.hello')}, <Text style={styles.name}>Boubacar</Text> 👋
          </Text>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: "center",
    gap: scale(12),
    flex: 1,
  },
  menuButton: {
    width: scale(35),
    height: scale(35),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 3,
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    gap: scale(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 3,
  },
  number: {
    fontSize: Platform.OS === "android" ? moderateScale(15) : moderateScale(11),
    fontWeight: "700",
    color: COLORS.primary,
  },
  icons: {
    flexDirection: "row",
    gap: scale(12),
  },
  iconButton: {
    width: scale(35),
    height: scale(35),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 3,
  },
  notificationContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    right: scale(-6),
    top: verticalScale(-6),
    backgroundColor: COLORS.error,
    borderRadius: moderateScale(10),
    width: scale(20),
    height: scale(20),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(2),
    borderColor: COLORS.white,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: moderateScale(11),
    fontWeight: "800",
  },
  info: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(12),
  },
  greeting: {
    fontSize: moderateScale(16),
    color: COLORS.primary,
    fontWeight: '400',
  },
  name: {
    fontWeight: "700",
    fontSize: moderateScale(18),
    color: COLORS.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(30),
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(-4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(12),
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  modalHandle: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: COLORS.border,
    borderRadius: moderateScale(2),
  },
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: verticalScale(20),
  },
  item: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(8),
    backgroundColor: COLORS.background,
  },
  itemSelected: {
    backgroundColor: COLORS.secondary,
    borderWidth: scale(2),
    borderColor: COLORS.primary,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
    flex: 1,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemNumber: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: verticalScale(2),
  },
  itemNumberSelected: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  itemLabel: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
  },
  closeButton: {
    backgroundColor: COLORS.background,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(12),
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  closeButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});