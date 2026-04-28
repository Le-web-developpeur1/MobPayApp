import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function Services() {

    const images = [
    { label: "Cash Moov", img: require("@/assets/images/national/PNG.png"),},
    { label: "Orange", img: require("@/assets/images/national/logo-orange.png") },
    { label: "Cellcom", img: require("@/assets/images/national/mtn.png"),},
    { label: "MTN", img: require("@/assets/images/national/cellcom.png"),},
    { label: "International", img: require("@/assets/images/national/globe.jpg"),},
];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Services</Text>
                <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>Voir plus</Text>
                    <Ionicons name="chevron-forward-outline" size={moderateScale(16)} color="#2A4793"/>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={styles.grid}
                showsHorizontalScrollIndicator={false}
            >
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.service}
                    >
                        <View style={styles.iconContainer}>
                            <Image source={image.img} style={styles.image1}/>        
                            
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(27),
        paddingTop: verticalScale(12)
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: verticalScale(5),
    },
    linkButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(2),
    },
    linkText: {
        fontSize: moderateScale(13),
        fontWeight: "700",
        color: "#2A4793",
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: "bold",
    },
    icone: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7CE4790",
        padding: scale(5),
        borderRadius: moderateScale(10),
        width: scale(90),
    },
    label: {
        fontSize: moderateScale(15),
    },
    grid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    service: {
      width: scale(70),
      alignItems: "center",
    },
    iconContainer: {
      width: scale(60),
      height: verticalScale(60),
      borderRadius: moderateScale(20),
      backgroundColor: "#E8ECF5",
      justifyContent: "center",
      alignItems: "center",
    },
    // text: {
    //     fontSize: moderateScale(14),
    //     color: "#4B5563",
    //     flexShrink: scale(1),
    // },
    link: {
        color: "#2A4793",
        fontWeight: "700",
    },
    image1: {
        height: verticalScale(50),
        width: scale(55),
        borderRadius: moderateScale(5),
    },
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
        width: scale(250),
        alignItems: "flex-start",
        
    },
    modalText: {
        fontSize: moderateScale(18),
        marginBottom: verticalScale(20),
    },
    closeButton: {
        backgroundColor: "#2A4793",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20),
        borderRadius: moderateScale(6),
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
    },
    image: {
        width: scale(50), 
        height: verticalScale(50),
        marginHorizontal: scale(20),
        borderRadius: moderateScale(5)
    },
    text: {
        fontSize: moderateScale(13),
        textAlign: "center",
        marginTop: verticalScale(5),
        fontWeight: "700"
    }
})