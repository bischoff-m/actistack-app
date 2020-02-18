import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ViewPager from "@react-native-community/viewpager";
import AsyncStorage from "@react-native-community/async-storage";

import globalStyles from "../styles/Styles";

// this tutorial screen features 7 pages that explain how to use the app
// it is triggered the first time the app gets opened and each time
// the help button in the header of GraphScreen is pressed
class TutorialScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpIcon: true,
            activePage: 0,
        }
    }

    static navigationOptions = {
        header: null,
    }


    getPageIndicators() {
        let indicators = [];
        for (let i = 0; i < 7; i++) {
            const white = "rgba(255, 255, 255, 0.9)";
            const black = "rgba(50, 50, 50, 0.7)";
            const color = i === this.state.activePage ? white : black;
            const indicator = (
                <TouchableOpacity
                    key={i}
                    style={{padding: 4.5}}
                    onPress={() => {
                        if(this.viewpager)
                            this.viewpager.setPage(i);
                    }}
                >
                    <View style={{
                        backgroundColor: color,
                        width: 7,
                        height: 7,
                        borderRadius: 3.5,
                        elevation: 2,
                    }}></View>
                </TouchableOpacity>
            );
            indicators.push(indicator);
        }
        return indicators;
    }
    
    getGraphScreenHeader(focus) {
        return (
            <View style={{ flexDirection: "row", backgroundColor: "#22283B" }}>
                <TouchableOpacity style={globalStyles.iconWrapper}>
                    <Icon name={"help-outline"} size={24} color="white" />
                    {focus == 0 && <View style={styles.highlight}></View>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.setState({isUpIcon: !this.state.isUpIcon})}
                    style={globalStyles.iconWrapper}>
                    <Icon name={this.state.isUpIcon ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="white" />
                    {focus == 1 && <View style={styles.highlight}></View>}
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.iconWrapper}>
                    <Icon name="delete" size={24} color="white" />
                    {focus == 2 && <View style={styles.highlight}></View>}
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.iconWrapper}>
                    <Icon name="add" size={24} color="white" />
                    {focus == 3 && <View style={styles.highlight}></View>}
                </TouchableOpacity>
            </View>
        );
    };

    getActivityItem(color, name, duration) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: color,
                    flexDirection: "row",
                    height: 56,
                    alignItems: "center",
                    margin: 1,
                    borderRadius: 4,
                    paddingLeft: 16,
                    paddingRight: 16,
                    elevation: 3,
                }}
            >
                <Text style={{flex: 1, fontSize: 16, color: "black"}}>
                    {name}
                </Text>
                <Text style={{fontSize: 16, color: "black"}}>
                    {duration}
                </Text>
            </TouchableOpacity>
        );
    }

    getGraphItem(hue, name, duration, time) {
        return (
            <TouchableOpacity
                style={{
                    borderTopColor: "white",
                    borderTopWidth: 1,
                    flexDirection: "row",
                    flex: duration,
                }} 
            >
                <View style={[globalStyles.centered, {backgroundColor: `hsl(${hue}, 55%, 60%)`, flex: 1, elevation: 5}]}>
                    <Text style={{fontSize: 16, color: "white"}}>
                        {name}
                    </Text>
                </View>
                <View style={{width: 60}}>
                    <Text style={{fontSize: 16, color: "white", textAlign: "right"}}>
                        {time}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
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
                                alignItems: "center",
                                justifyContent: "center",
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


                {/* Footer containing page indicatiors */}
                <View style={styles.footer}>
                    {this.getPageIndicators()}
                </View>


                {/* Tutorial Pages */}
                <ViewPager
                    style={styles.viewPager}
                    initialPage={this.state.activePage}
                    onPageSelected={(event) => this.setState({activePage: event.nativeEvent.position})}
                    ref={(viewpager) => {this.viewpager = viewpager}}
                >
                    <View key="0" style={[styles.page, styles.page0]}>
                        <Text style={styles.pageHeader}>
                            Welcome to ActiStack
                        </Text>
                        <Text style={styles.pageText}>
                            To boost your productivity while having an unregular sleep schedule.
                        </Text>
                    </View>

                    <View key="1" style={[styles.page, styles.page1]}>
                        {this.getGraphScreenHeader(3)}
                        <Text style={styles.pageHeader}>
                            Your Schedule
                        </Text>
                        <Text style={styles.pageText}>
                            Use the <Text style={{textDecorationLine: "underline"}}>Add Icon</Text> in the header bar to add activities to your schedule.
                            You can choose a start time for the first activity you add.
                        </Text>
                    </View>

                    <View key="2" style={[styles.page, styles.page2]}>
                        {this.getActivityItem("hsl(32, 98%, 65%)", "Lecture", "1h 30min")}
                        {this.getActivityItem("hsl(200, 98%, 65%)", "Work", "")}
                        <Text style={styles.pageHeader}>
                            Adding Activities
                        </Text>
                        <Text style={styles.pageText}>
                            Enter a <Text style={{textDecorationLine: "underline"}}>name</Text> and hit enter to create a new activity.
                        </Text>
                        <Text style={styles.pageText}>
                            Choose a <Text style={{textDecorationLine: "underline"}}>duration</Text> or hit cancel to get an item without a duration.
                        </Text>
                    </View>

                    <View key="3" style={[styles.page, styles.page3]}>
                        {this.getActivityItem("hsl(32, 98%, 65%)", "Lecture", "1h 30min")}
                        {this.getActivityItem("hsl(200, 98%, 65%)", "Work", "")}
                        <Text style={styles.pageHeader}>
                            Using Activities
                        </Text>
                        <Text style={styles.pageText}>
                            You can <Text style={{textDecorationLine: "underline"}}>delete</Text> an activity item by doing a long press.
                        </Text>
                        <Text style={styles.pageText}>
                            To <Text style={{textDecorationLine: "underline"}}>use</Text> it, just click on it.
                        </Text>
                    </View>

                    <View key="4" style={[styles.page, styles.page4]}>
                        <View style={{padding: 10}}>
                            <View style={{
                                height: 200,
                                width: 250,
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                overflow: "hidden",
                                zIndex: 50,
                            }}>
                                {this.getGraphItem("hsl(32, 98%, 65%)", "Lecture", 90, "14:30")}
                                {this.getGraphItem("hsl(200, 98%, 65%)", "Work", 90, "16:00")}
                            </View>
                        </View>

                        <Text style={styles.pageHeader}>
                            Your Schedule
                        </Text>
                        <Text style={styles.pageText}>
                            After selecting an activity, it gets <Text style={{textDecorationLine: "underline"}}>inserted</Text> into your schedule.
                        </Text>
                        <Text style={styles.pageText}>
                            Again, long press to <Text style={{textDecorationLine: "underline"}}>delete</Text> an item.
                        </Text>
                    </View>

                    <View key="5" style={[styles.page, styles.page5]}>
                        {this.getGraphScreenHeader(1)}
                        <Text style={styles.pageHeader}>
                            Switching Direction
                        </Text>
                        <Text style={styles.pageText}>
                            The arrow button indicates whether the activity is inserted at the <Text style={{textDecorationLine: "underline"}}>top or bottom</Text>.
                        </Text>
                    </View>

                    <View key="6" style={[styles.page, styles.page6]}>
                        <Text style={styles.pageHeader}>
                            You are good to go!
                        </Text>
                        <Text style={styles.pageText}>
                            Start with planning your next day.
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#425ec2",
                                width: 120,
                                height: 36,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 2,
                                top: 50,
                                elevation: 3,
                            }}
                            onPress={() => {
                                AsyncStorage.setItem("showTutorial", "false");
                                this.props.navigation.popToTop();
                            }}
                        >
                            <Text style={{
                                color: "white",
                                fontWeight: "bold",

                            }}>END TUTORIAL</Text>
                        </TouchableOpacity>
                    </View>
                </ViewPager>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    tutorialContainer: {
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

    footer: {
        flexDirection: "row",
        position: "absolute",
        zIndex: 100,
        left: 0,
        right: 0,
        bottom: 30,
        justifyContent: "center",
    },

    viewPager: {
        flex: 1,
        zIndex: 0,
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
        paddingBottom: 20,
    },
    pageText: {
        color: "white",
        textAlign: "center",
        fontFamily: "DidactGothic-Regular",
        fontSize: 20,
        paddingTop: 10,
    },
    highlight: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "white",
        borderWidth: 1,
        opacity: 0.4,
    },
    page0: { backgroundColor: "hsl(205, 80%, 50%)" },
    page1: { backgroundColor: "hsl(32, 98%, 65%)" },
    page2: { backgroundColor: "hsl(160, 50%, 50%)" },
    page3: { backgroundColor: "hsl(287, 40%, 50%)" },
    page4: { backgroundColor: "hsl(150, 98%, 40%)" },
    page5: { backgroundColor: "hsl(4, 90%, 65%)" },
    page6: { backgroundColor: "hsl(197, 90%, 65%)" },
});

export default TutorialScreen;