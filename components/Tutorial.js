import React from "react";
import {
    StyleSheet,
    TouchableOpacity, 
    View, 
    Text,
    Modal
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tutorial = props => {
    const {  } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Does this work?
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#22283B",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        color: "white"
    },
});

export default Tutorial;