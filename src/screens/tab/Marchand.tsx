import MarchandConfirmModal from '@/src/components/modals/MarchandConfirmModal';
import MarchandPaymentModal from '@/src/components/modals/MarchandPaymentModal';
import MarchandReceiptModal from '@/src/components/modals/MarchandReceiptModal';
import RechargeCodeModal from '@/src/components/modals/RechargeCodeModal';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const CATEGORIES = [
    { id: 'all', label: "Tous", icon: 'list-alt' },
    { id: 'sante', label: "Santé", icon: 'medkit' },
    { id: 'alimentation', label: "Alimentation", icon: 'utensils' },
    { id: 'education', label: "Éducation", icon: 'graduation-cap' },
    { id: 'hotel', label: "Hôtel", icon: 'hotel' },
    { id: 'station', label: "Station", icon: 'gas-pump' },
    { id: 'transport', label: "Transport", icon: 'car' },
];

const MARCHANDS_DATA = [
    // Santé
    { id: 1, name: "Pharmacie Centrale", category: 'sante', phone: "40 08 84" },
    { id: 2, name: "Hôpital Ignace Deen", category: 'sante', phone: "60 19 69" },
    { id: 3, name: "Hôpital Sino-Guinéen", category: 'sante', phone: "10 43 68" },
    
    // Alimentation
    { id: 4, name: "Restaurant SLM Lambanyi", category: 'alimentation', phone: "60 04 97" },
    { id: 5, name: "Brioche de Kipé", category: 'alimentation', phone: "40 00 70" },
    { id: 6, name: "Restaurant Chérie Nongo", category: 'alimentation', phone: "30 99 39" },
    
    // Éducation
    { id: 7, name: "Université de Labé", category: 'education', phone: "62 34 56" },
    { id: 8, name: "Université de  Sonfonia", category: 'education', phone: "61 11 22" },
    
    // Hôtel
    { id: 9, name: "Noom Hotel", category: 'hotel', phone: "62 00 00" },
    { id: 10, name: "Riviera Royal Hotel", category: 'hotel', phone: "62 55 55" },
    
    // Station
    { id: 11, name: "Total Station Hamdallaye", category: 'station', phone: "66 00 11" },
    { id: 12, name: "Shell Station Sonfonia", category: 'station', phone: "66 11 22" },
    
    // Transport
    { id: 13, name: "WONSIGA", category: 'transport', phone: "62 99 99" },
    { id: 14, name: "Tic Tac Drive", category: 'transport', phone: "62 88 88" },
];

interface Marchand {
    id: number;
    name: string;
    category: string;
    phone: string;
}

export default function Marchand() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    
    // Modals state
    const [selectedMarchand, setSelectedMarchand] = useState<Marchand | null>(null);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [codeModalVisible, setCodeModalVisible] = useState(false);
    const [receiptModalVisible, setReceiptModalVisible] = useState(false);
    
    // Transaction data
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentNote, setPaymentNote] = useState("");

    // Filtrer les marchands
    const getFilteredMarchands = () => {
        let filtered = MARCHANDS_DATA;

        // Filtrer par catégorie
        if (selectedCategory !== "all") {
            filtered = filtered.filter(m => m.category === selectedCategory);
        }

        // Filtrer par recherche
        if (search) {
            filtered = filtered.filter(m => 
                m.name.toLowerCase().includes(search.toLowerCase()) ||
                m.phone.includes(search)
            );
        }

        return filtered;
    };

    const filteredMarchands = getFilteredMarchands();

    // Handlers
    const handleMarchandSelect = (marchand: Marchand) => {
        setSelectedMarchand(marchand);
        setPaymentModalVisible(true);
    };

    const handlePaymentSubmit = (amount: string, note: string) => {
        setPaymentAmount(amount);
        setPaymentNote(note);
        setPaymentModalVisible(false);
        setTimeout(() => setConfirmModalVisible(true), 300);
    };

    const handleConfirm = () => {
        setConfirmModalVisible(false);
        setTimeout(() => setCodeModalVisible(true), 300);
    };

    const handleCodeSubmit = () => {
        setCodeModalVisible(false);
        setTimeout(() => setReceiptModalVisible(true), 300);
    };

    const handleCloseReceipt = () => {
        setReceiptModalVisible(false);
        // Reset state
        setSelectedMarchand(null);
        setPaymentAmount("");
        setPaymentNote("");
    };

    return (
        <SafeAreaView style={styles.safe}>
            <HeaderScreen title='Paiement marchand' />
            <View 
                style={styles.container}
               
            >
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name='search' size={scale(20)} color={COLORS.textSecondary} />
                    <TextInput 
                        placeholder='Rechercher un marchand'
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor={COLORS.textSecondary}
                    />
                    {search && (
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <Ionicons name='close-circle' size={scale(20)} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryItem}
                                onPress={() => setSelectedCategory(cat.id)}
                                activeOpacity={0.7}
                            >
                                <View style={[
                                    styles.categoryCircle,
                                    selectedCategory === cat.id && styles.categoryCircleSelected
                                ]}>
                                    <FontAwesome5 
                                        name={cat.icon} 
                                        size={scale(30)} 
                                        color={COLORS.white}
                                    />
                                </View>
                                <Text style={[
                                    styles.categoryLabel,
                                    selectedCategory === cat.id && styles.categoryLabelSelected
                                ]}>
                                    {cat.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Marchands List */}
                <ScrollView 
                    style={styles.marchandsSection}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {filteredMarchands.length > 0 ? (
                        filteredMarchands.map((marchand, index) => (
                            <TouchableOpacity
                                key={marchand.id}
                                style={[
                                    styles.marchandItem,
                                    index !== filteredMarchands.length - 1 && styles.marchandItemBorder
                                ]}
                                onPress={() => handleMarchandSelect(marchand)}
                                activeOpacity={0.7}
                            >
                                {/* Logo Circle */}
                                <View style={styles.marchandLogo}>
                                    <FontAwesome5 
                                        name={CATEGORIES.find(c => c.id === marchand.category)?.icon || 'store'} 
                                        size={scale(24)} 
                                        color={COLORS.primary}
                                    />
                                </View>

                                {/* Info */}
                                <View style={styles.marchandInfo}>
                                    <Text style={styles.marchandName}>
                                        {marchand.name}
                                    </Text>
                                    <Text style={styles.marchandPhone}>
                                        {marchand.phone}
                                    </Text>
                                </View>

                                {/* Arrow */}
                                <Ionicons name="chevron-forward" size={scale(20)} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Ionicons name="search-outline" size={scale(50)} color={COLORS.textSecondary} />
                            <Text style={styles.emptyText}>Aucun marchand trouvé</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

            {/* Modals */}
            {selectedMarchand && (
                <>
                    <MarchandPaymentModal
                        visible={paymentModalVisible}
                        onClose={() => setPaymentModalVisible(false)}
                        onSubmit={handlePaymentSubmit}
                        marchandName={selectedMarchand.name}
                        marchandPhone={selectedMarchand.phone}
                    />
                    
                    <MarchandConfirmModal
                        visible={confirmModalVisible}
                        onClose={() => setConfirmModalVisible(false)}
                        onConfirm={handleConfirm}
                        marchandName={selectedMarchand.name}
                        marchandPhone={selectedMarchand.phone}
                        amount={paymentAmount}
                        note={paymentNote}
                    />
                    
                    <RechargeCodeModal
                        visible={codeModalVisible}
                        onClose={() => setCodeModalVisible(false)}
                        onSubmit={handleCodeSubmit}
                    />
                    
                    <MarchandReceiptModal
                        visible={receiptModalVisible}
                        onClose={handleCloseReceipt}
                        marchandName={selectedMarchand.name}
                        marchandPhone={selectedMarchand.phone}
                        amount={paymentAmount}
                        note={paymentNote}
                    />
                </>
            )}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: scale(20),
        marginTop: verticalScale(15),
        paddingHorizontal: scale(15),
        borderRadius: moderateScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        gap: scale(10),
    },
    input: {
        flex: 1,
        height: verticalScale(48),
        fontSize: moderateScale(15),
        color: COLORS.textPrimary,
    },
    categoriesSection: {
        marginTop: verticalScale(12),
        paddingHorizontal: scale(20),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(15),
        paddingHorizontal: scale(20),
    },
    categoriesContainer: {
        gap: scale(20),
        paddingBottom: verticalScale(20),
    },
    categoryItem: {
        alignItems: 'center',
        gap: scale(5),
    },
    categoryCircle: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
    },
    categoryCircleSelected: {
        opacity: 1,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    categoryLabel: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    categoryLabelSelected: {
        color: COLORS.textPrimary,
        fontWeight: '700',
    },
    marchandsSection: {
        marginHorizontal: scale(20),
        borderRadius: moderateScale(16),
        padding: scale(5),
        marginBottom: verticalScale(20),
    },
    marchandItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(16),
        gap: scale(12),
    },
    marchandItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
    },
    marchandLogo: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    marchandInfo: {
        flex: 1,
    },
    marchandName: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    marchandPhone: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: verticalScale(40),
    },
    emptyText: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginTop: verticalScale(12),
    },
});
