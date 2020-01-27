import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    TextInput,
    View,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import globalStyles from '../styles/Styles';
import ActivityItem from '../components/ActivityItem';

class ActivityScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPicker: false,
            activityName: '',
            keyCount: -1
        }

        // add all activities to state.activityItems and do update
        if(Object.keys(global.activityItems).length > 0) {
            // set keyCount
            for(let key of Object.keys(global.activityItems)) 
                this.state.keyCount = Math.max(this.state.keyCount, parseInt(key));
        } else {
            AsyncStorage.getItem("activityItems").then((items) => {
                if(!items)
                    return;
                
                global.activityItems = JSON.parse(items);
                for(let key of Object.keys(global.activityItems)) 
                    this.state.keyCount = Math.max(this.state.keyCount, parseInt(key));
                this.updateState();
            });
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Activities",
            headerRight: () => (
                <View style={{
                        flexDirection: "row",
                    }}>
                    <TouchableOpacity
                        onPress={navigation.getParam('onPressHeaderDelete')}
                        style={{
                            width: 56,
                            height: 56,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icon name="delete" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={navigation.getParam('onPressHeaderShuffle')}
                        style={{
                            width: 56,
                            height: 56,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icon name="color-lens" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        }
    };

    // set handler for header buttons
    componentDidMount() {
        // set status bar color to have the same color when app was reopened
        StatusBar.setBackgroundColor('#22283B');

        // set handler for header buttons
        this.props.navigation.setParams({
                onPressHeaderDelete: () => {
                    Alert.alert(
                        'Delete Activities',
                        'All added activities will be deleted.',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: "Delete",
                                onPress: () => {
                                    global.activityItems = {};
                                    this.updateState();
                                    // update graph screen to ensure no deleted activity is still shown in graph
                                    this.props.navigation.getParam("updateParent")();
                                },
                            },
                        ],
                        { cancelable: false },
                    );
                },
                onPressHeaderShuffle: () => {
                    Alert.alert(
                        'Shuffle Colors',
                        'This will assign new colors to all activities.',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: "Assign",
                                onPress: () => {
                                    this.pickNewRandomHues();
                                    // update graph screen to paint the graph items in new colors
                                    this.props.navigation.getParam("updateParent")();
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                },
        });
    }

    // generate the next key for activity item
    getNextKey() {
        return (++this.state.keyCount).toString();
    }

    // save activityItems and do update
    updateState() {
        AsyncStorage.setItem("activityItems", JSON.stringify(global.activityItems));
        this.setState({
            showPicker: false,
            activityName: ''
        });
    }

    onDurationChosen(event, time) {
        this.textInput.setNativeProps({text: ''});
        let key = this.getNextKey();
        var allHues = [];
        Object.values(global.activityItems).forEach(item => allHues.push(item.hue));
        let attributes = {
            activity: this.state.activityName,
            hue: this.getNewHueFromArray(allHues),
            favorite: "no"
        };
        if(time) {
            attributes.duration = time.getMinutes() + (time.getHours() * 60);
        }
        global.activityItems[key] = attributes;
        this.updateState();
    }

    onItemLongPress(id) {
        delete global.activityItems[id];
        this.updateState();
        // update graphScreen in case a used activityItem was deleted
        this.props.navigation.getParam("updateParent")();
    }

    onItemFavored(id) {
        // TODO
    }

    // returns a new hue value so that all used hue values always have the maximum distance from one another
    // after calculating the candidates with maximum distance, a candidate gets randomly choosen and
    // a hue value with maximum distance is returned
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
    
    // sets random but evenly distributed new hue values to all activityItems
    // is called when header shuffle button is pressed
    pickNewRandomHues() {
        // get a new hue value for each activityItem
        var chosenHues = [];
        Object.keys(global.activityItems).forEach(() => {
            let newHue = this.getNewHueFromArray(chosenHues);
            chosenHues.push(newHue);
            chosenHues.sort((a, b) => a > b);
        })

        // shuffle chosenHues array
        var currentIndex = chosenHues.length, temporaryValue, randomIndex;
        // while there remain elements to shuffle
        while (0 !== currentIndex) {
            // pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // swap it with the current element
            temporaryValue = chosenHues[currentIndex];
            chosenHues[currentIndex] = chosenHues[randomIndex];
            chosenHues[randomIndex] = temporaryValue;
        }
        
        // set chosenHues to activityItems
        for (let i = 0; i < chosenHues.length; i++) {
            var key = Object.keys(global.activityItems)[i];
            var item = global.activityItems[key];
            item["hue"] = chosenHues[i];
        }
        this.updateState();
    }

    render() {
        const { navigation } = this.props;

        // create ActivityItem for each entry in state array
        let ids = Object.keys(global.activityItems);
        let activityComponents = ids.map((id) => {
            return (
                <View key={id}>
                    <ActivityItem
                        id={id}
                        onItemPress={() => {navigation.getParam("onItemSelected")(id)}}
                        onItemLongPress={this.onItemLongPress.bind(this, id)}
                        onItemFavored={this.onItemFavored.bind(this, id)} />
                </View>
            )
        }); 

        return (
            <>
                <StatusBar barStyle='light-content' backgroundColor='#22283B' />
                <SafeAreaView style={globalStyles.body}>
                    {/* Input Text Field */}
                    <TextInput
                        ref={component => this.textInput = component}
                        style={styles.activityInput}
                        placeholder="Add an activity..."
                        onSubmitEditing={(event) => {
                            this.setState({
                                showPicker: true,
                                activityName: event.nativeEvent.text.trim()
                            })
                        }}
                    />
                    <View style={globalStyles.separator} />

                    {/* Activity List */}
                    <ScrollView>
                        { activityComponents }
                    </ScrollView>

                    {/* Time Picker */}
                    { this.state.showPicker && <DateTimePicker
                                value={new Date(0)}
                                mode={"time"}
                                is24Hour={true}
                                display={"clock"}
                                onChange={this.onDurationChosen.bind(this)} />
                    }
                </SafeAreaView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    activityInput: {
        padding: 16,
        backgroundColor: "white"
    },
});

export default ActivityScreen;