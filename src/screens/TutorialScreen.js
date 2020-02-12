import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Button,
    StatusBar,
    TouchableOpacity,
    View,
    Text,
    Alert,
    Modal,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';

import globalStyles from '../styles/Styles';

class TutorialScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpIcon: true,
        }
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        const { isUpIcon } = this.state;

        const getGraphScreenHeader = () => {
            return (
                <View style={{ flexDirection: "row", backgroundColor: "#22283B" }}>
                    <TouchableOpacity style={globalStyles.iconWrapper}>
                        <Icon name={"help-outline"} size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({isUpIcon: !isUpIcon})}
                        style={globalStyles.iconWrapper}>
                        <Icon name={isUpIcon ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles.iconWrapper}>
                        <Icon name="delete" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.iconWrapper}>
                        <Icon name="add" size={24} color="white" />
                        <View style={styles.highlight}></View>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.tutorialContainer} >

                {/* Header containing logo and skip button */}
                <View style={styles.header}>
                    <View
                        style={{
                            flexDirection: "row",
                            left: 10,
                            flex: 1,
                            alignItems: "center"
                        }}>
                        <View
                            style={{
                                padding: 10,
                                top: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon name={"alarm"} size={24} color="black" />
                        </View>
                        <Text style={[styles.headerText, {fontSize: 27}]}>ActiStack</Text>
                    </View>
                    <TouchableOpacity 
                        style={{alignItems: "flex-end"}}
                        onPress={() => {
                            AsyncStorage.setItem("showTutorial", "false");
                            this.props.navigation.popToTop();
                        }}>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingRight: 12
                            }}>
                            <Text style={[styles.headerText, {fontSize: 18}]}>Skip</Text>
                            <Icon style={{top: 2}} name={"keyboard-arrow-right"} size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Tutorial Pages */}
                <ViewPager style={{ flex: 1, zIndex: 0 }} initialPage={0}>
                    <View key="1" style={[styles.page, { backgroundColor: "#40BA91" }]}>
                        <Text style={styles.pageHeader}>
                            Welcome to ActiStack
                        </Text>
                        <Text style={styles.pageText}>
                            To boost your productivity while having an unregular sleep schedule.
                        </Text>
                    </View>
                    <View key="2" style={[styles.page, { backgroundColor: "#198DE0" }]}>
                        {getGraphScreenHeader()}
                        <Text style={styles.pageHeader}>
                            Your Schedule
                        </Text>
                        <Text style={styles.pageText}>
                            Use the Add Icon in the header bar to add activities to your schedule.
                            You can choose a start time for the first activity you add.
                        </Text>
                    </View>
                    <View key="3" style={[styles.page, { backgroundColor: "#FDAC51" }]}>
                        <Text>Third page</Text>
                    </View>
                </ViewPager>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    tutorialContainer: {
        backgroundColor: "white",
        flex: 1,
    },

    header: {
        flexDirection: "row",
        position: "absolute",
        height: 60,
        alignItems: "center",
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: 0.7,
    },
    headerText: {
        color: "black",
        fontFamily: "DidactGothic-Regular",
    },

    viewPager: {
    },
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    pageHeader: {
        color: "white",
        textAlign: "center",
        fontFamily: "DidactGothic-Regular",
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 30,
        paddingBottom: 30,
    },
    pageText: {
        color: "white",
        textAlign: "center",
        fontFamily: "DidactGothic-Regular",
        fontSize: 20,
    },
    highlight: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "white",
        borderWidth: 1,
        opacity: 0.4,
    }
});

export default TutorialScreen;