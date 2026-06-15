import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
    const { t } = useTranslation();
    const unreadCount = 2;
    const navigation = useNavigation<NavigationProps>();

    const [ visible, setVisible] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState("626058033");

    const accounts = ["626058033", "628344212", "628141249"];
    
    return (
      <>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: scale(8)}}>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.PROFILE)}
              >
                <Ionicons name="menu" size={25} color="#2A4793" style={{ marginRight: 5 }} />
              </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(true)}>
               <Text style={styles.number}>{selectedNumber} ▼</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SEARCH)}>
                <Ionicons name="search-outline" size={scale(24)} color={"#2A4793"}/>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={styles.icon}
                  onPress={() => navigation.navigate(ROUTES.NOTIFICATION)}
              >
                  <View style={{ position: "relative"}}>
                      <Ionicons name="notifications-outline" size={scale(24)} color={COLORS.primary}/>
                      {unreadCount > 0 && (
                          <View style={styles.badge}>
                              <Text style={styles.badgeText}>{unreadCount}</Text>
                          </View>
                      )}
                  </View>
              </TouchableOpacity>
            </View>

            <Modal
              visible={visible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.bottomSheet}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.modalTitle}>Choisir un compte</Text>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                      <Ionicons name="close" size={scale(20)} />
                    </TouchableOpacity>
                  </View>
                  {accounts.map((item) => (
                      <TouchableOpacity
                      key={item}
                      style={styles.item}
                      onPress={() => {
                        setSelectedNumber(item);
                        setVisible(false);
                      }}
                    >
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                      <Text style={styles.itemText}>{item}</Text>
                      <Ionicons  
                        name={selectedNumber === item ? "radio-button-on" : "radio-button-off"}
                        size={scale(24)}
                        color={selectedNumber === item ? COLORS.primary : "#aaa"}
                      />
                    </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{t('home.hello')} <Text style={styles.name}>Boubacar</Text> 👋</Text>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scale(25),
        paddingTop: verticalScale(10),
        alignItems: "center",
        paddingBottom: verticalScale(10)
    },
    info: {
        flexDirection: "column",
        gap: scale(5),
        paddingHorizontal: scale(25),
        paddingBottom: verticalScale(10)
    },
    greeting: {
        fontSize: moderateScale(14),
        color: COLORS.textPrimary,
    },
    name: {
        fontWeight: "bold",
        fontSize: moderateScale(22),
        color: COLORS.textPrimary,
    },
    icons: {
        flexDirection: "row",
        gap: 15,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        position: "absolute",
        right: scale(-5),
        top: verticalScale(-5),
        backgroundColor: COLORS.secondary,
        borderRadius: moderateScale(10),
        width: scale(18),
        height: verticalScale(18),
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: COLORS.primary,
        fontSize: moderateScale(10),
        fontWeight: "bold",
    },
    number: {
        fontSize: moderateScale(20),
        fontWeight: "bold",
        color: "#333",
    },
    modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // pousse le contenu en bas
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  searchContainer: {
      paddingHorizontal: scale(25),
      paddingBottom: verticalScale(10),
  },
  searchInput: {
    borderWidth: scale(1),
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    fontSize: moderateScale(16),
    backgroundColor: "#fff",
  },
});