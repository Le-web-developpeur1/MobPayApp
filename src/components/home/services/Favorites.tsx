import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "@/src/constants";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const allServices = [
    { name: "Transfert", route: ROUTES.TRANSFERT, icon: "swap-horizontal" },
    { name: "Factures", route: ROUTES.FACTURES, icon: "document-text" },
    { name: "Crédits", route: ROUTES.CREDITS, icon: "phone-portrait" },
    { name: "Retraits", route: ROUTES.RETRAITS, icon: "cash" },
    { name: "Envoi OM", route: ROUTES.CONTACT, params: { type: "EnvoiOM" }, icon: "send" },
    { name: "Réception OM", route: ROUTES.CONTACT, params: { type: "ReceptionOM" }, icon: "download" },
    { name: "Historique", route: ROUTES.HISTORIQUE, icon: "time" },
    { name: "Auto-Débit", route: ROUTES.AUTO_DEBIT, params: { type: "programme" }, icon: "calendar-sharp" },
    { name: "Marchands", route: ROUTES.DETAIL_MARCHAND, icon: "storefront" },
    { name: "Achat credit", route: "Credit", icon: "storefront" },
    { name: "History", route: "History", icon: "time-outline"},
    { name: "Recharger mon compte", route: "Recharger", icon: "card"},
  ];

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  };

  const toggleFavorite = async (service: any) => {
    let updated;
    if (favorites.find((f) => f.name === service.name)) {
      updated = favorites.filter((f) => f.name !== service.name);
    } else {
      updated = [...favorites, service];
    }
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
        <Text style={styles.title}>Mes Favoris</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addText}>Personnaliser</Text>
        </TouchableOpacity>
      </View>

      {/* Favoris affichés en scroll horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: verticalScale(10)}}>
        {favorites.map((fav) => (
          <TouchableOpacity
            key={fav.name}
            style={styles.favItem}
            onPress={() => navigation.navigate(fav.route, fav.params)}
          >
            <Ionicons name={fav.icon as any} size={scale(28)} color="#2A4793" />
            <Text style={styles.favText}>{fav.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal avec grille */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir vos services favoris</Text>
            <FlatList
              data={allServices}
              keyExtractor={(item) => item.name}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.gridItem}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons 
                    name={item.icon as any}
                    size={scale(28)}
                    color={favorites.find((f) => f.name === item.name) ? "#2A4793" : "#999"}
                  />
                  <Text style={styles.gridText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: scale(20) },
  title: { fontSize: moderateScale(20), fontWeight: "bold" },
  favItem: { 
    alignItems: "center", 
    marginRight: scale(15), 
    backgroundColor: "#f0f0f0", 
    padding: scale(10), 
    borderRadius: moderateScale(10) 
  },
  favText: { fontSize: moderateScale(14), color: "#2A4793", marginTop: verticalScale(5) },
  addButton: { backgroundColor: "#F7CE47", padding: verticalScale(8), borderRadius: moderateScale(10) },
  addText: { color: "#2A4793", fontSize: moderateScale(16), textAlign: "center" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: "#fff", padding: scale(20), borderTopLeftRadius: moderateScale(12), borderTopRightRadius: moderateScale(12), maxHeight: "70%" },
  modalTitle: { fontSize: moderateScale(18), fontWeight: "bold", marginBottom: verticalScale(10) },
  gridItem: { flex: 1, alignItems: "center", marginVertical: verticalScale(10) },
  gridText: { fontSize: moderateScale(14), textAlign: "center", marginTop: verticalScale(5) },
  closeButton: { marginTop: verticalScale(15), backgroundColor: "#2A4793", padding: verticalScale(10), borderRadius: moderateScale(8) },
  closeText: { color: "#fff", textAlign: "center", fontSize: moderateScale(16) },
});
