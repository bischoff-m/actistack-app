import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
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

    
    getNewHueFromArray(allHues) {
        // if its the first hue, return a random color
        if(allHues.length === 0)
            return Math.floor(Math.random() * 360);
        
        allHues.sort((a, b) => a > b);
        // iterate all hues and get candidates with maximum distance
        let candidates = [];
        var maxDiff = -1;
        for(var i = 0; i < allHues.length; i++) {
            // calculate hue difference between hue[i] and hue[i+1]
            let curDiff = (allHues[(i + 1) % allHues.length] - allHues[i]);
            if(curDiff <= 0)
                curDiff += 360;
            // check if hue[i] is a candidate
            if(maxDiff < curDiff) {
                candidates = [allHues[i]];
                maxDiff = curDiff;
            } else if(maxDiff === curDiff) {
                candidates.push(allHues[i]);
            }
        }
        // choose random used hue to insert new hue next to it
        var chosen = candidates[Math.floor(Math.random() * candidates.length)]
        return (chosen + Math.round(maxDiff / 2)) % 360;
    }

    render() {
        const { isUpIcon } = this.state;

        const getGraphScreenHeader = (focus) => {
            return (
                <View style={{ flexDirection: "row", backgroundColor: "#22283B" }}>
                    <TouchableOpacity style={globalStyles.iconWrapper}>
                        <Icon name={"help-outline"} size={24} color="white" />
                        {focus == 0 && <View style={styles.highlight}></View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({isUpIcon: !isUpIcon})}
                        style={globalStyles.iconWrapper}>
                        <Icon name={isUpIcon ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="white" />
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

        const getActivityItem = (color, name, duration) => {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: color,
                        flexDirection: 'row',
                        height: 56,
                        alignItems: 'center',
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
        };

        const getGraphItem = (hue, name, duration, time) => {
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
        };

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
                <ViewPager style={styles.viewPager} initialPage={0}>
                    <View key="0" style={[styles.page, styles.page0]}>
                        <Text style={styles.pageHeader}>
                            Welcome to ActiStack
                        </Text>
                        <Text style={styles.pageText}>
                            To boost your productivity while having an unregular sleep schedule.
                        </Text>
                    </View>

                    <View key="1" style={[styles.page, styles.page1]}>
                        {getGraphScreenHeader(3)}
                        <Text style={styles.pageHeader}>
                            Your Schedule
                        </Text>
                        <Text style={styles.pageText}>
                            Use the <Text style={{textDecorationLine: "underline"}}>Add Icon</Text> in the header bar to add activities to your schedule.
                            You can choose a start time for the first activity you add.
                        </Text>
                    </View>

                    <View key="2" style={[styles.page, styles.page2]}>
                        {getActivityItem("hsl(32, 98%, 65%)", "Lecture", "1h 30min")}
                        {getActivityItem("hsl(200, 98%, 65%)", "Work", "")}
                        <Text style={styles.pageHeader}>
                            Adding Activities
                        </Text>
                        <Text style={styles.pageText}>
                            Enter a <Text style={{textDecorationLine: "underline"}}>name</Text> and hit enter to create a new activity.
                        </Text>
                        <Text style={styles.pageText}>
                            Choose a <Text style={{textDecorationLine: "underline"}}>duration</Text> or hit cancel to get a get an item without a duration.
                        </Text>
                    </View>

                    <View key="3" style={[styles.page, styles.page3]}>
                        {getActivityItem("hsl(32, 98%, 65%)", "Lecture", "1h 30min")}
                        {getActivityItem("hsl(200, 98%, 65%)", "Work", "")}
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
                                {getGraphItem("hsl(32, 98%, 65%)", "Lecture", 90, "14:30")}
                                {getGraphItem("hsl(200, 98%, 65%)", "Work", 90, "16:00")}
                            </View>
                        </View>

                        <Text style={styles.pageHeader}>
                            Your Schedule
                        </Text>
                        <Text style={styles.pageText}>
                            After selecting an activity, it gets <Text style={{textDecorationLine: "underline"}}>inserted</Text> to your schedule.
                        </Text>
                        <Text style={styles.pageText}>
                            Again, long press to <Text style={{textDecorationLine: "underline"}}>delete</Text> an item.
                        </Text>
                    </View>

                    <View key="5" style={[styles.page, styles.page5]}>
                        {getGraphScreenHeader(1)}
                        <Text style={styles.pageHeader}>
                            Switching Direction
                        </Text>
                        <Text style={styles.pageText}>
                            The arrow button determines whether the activity is inserted at the <Text style={{textDecorationLine: "underline"}}>top or bottom</Text>.
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
    page3: { backgroundColor: "hsl(287, 90%, 55%)" },
    page4: { backgroundColor: "hsl(150, 98%, 40%)" },
    page5: { backgroundColor: "hsl(4, 90%, 65%)" },
    page6: { backgroundColor: "hsl(197, 90%, 65%)" },
});

export default TutorialScreen;