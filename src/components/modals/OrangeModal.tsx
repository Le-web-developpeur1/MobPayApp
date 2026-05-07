import { ROUTES } from '@/src/constants';
import { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TransferType = "EnvoiOM" | "ReceptionOM";


interface OrangeModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function OrangeModal({ visible, onClose }: OrangeModalProps) {
    const navigation = useNavigation<NavigationProp>();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.optionContainer}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        onClose();
                                        navigation.navigate(ROUTES.CONTACT, {type: "EnvoiOM" as TransferType})
                                    }}
                                >
                                    <Image 
                                        source={require("@/assets/images/national/logo-orange.png")}
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.text}>Envoyez de l'argent vers un compte Orange Money</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        onClose();
                                        navigation.navigate(ROUTES.CONTACT, {type: "ReceptionOM" as TransferType});

                                    }}
                                >
                                    <Image 
                                        source={require("@/assets/images/national/logo-orange.png")}
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.text}>Recevez de l'argent depuis un compte Orange Money</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: scale(20),
        borderRadius: moderateScale(10),
        width: scale(315),
        alignItems: "flex-start",
        gap: scale(20)
    },
    optionContainer: {
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
    },
    image: {
        width: scale(70), 
        height: verticalScale(70),
        borderRadius: moderateScale(5),
    },
    text: {
        fontSize: moderateScale(12),
        textAlign: "center",
        marginTop: verticalScale(10),
        fontWeight: "600",
        lineHeight: moderateScale(20),
        paddingHorizontal: scale(5),
    },
});