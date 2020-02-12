import React from 'react';
import {
    StyleSheet,
    TouchableOpacity, 
    View, 
    Text
} from 'react-native';
import moment from "moment";

import globalStyles from '../styles/Styles';

const GraphItem = props => {
    const { id, time, onLongPress, duration = -1 } = props;
    let item = global.activityItems[id];
    let timeObj = moment(time);

    let flexStyle = {}
    if(item.hasOwnProperty("duration")) {
        flexStyle = {flex: item.duration}
    } else if(duration > -1) {
        flexStyle = {flex: duration}
    }

    return (
        <TouchableOpacity style={[styles.container, flexStyle]} onLongPress={onLongPress}>
            <View style={[globalStyles.centered, styles.activityContainer, {backgroundColor: `hsl(${item.hue}, 55%, 60%)`}]}>
                <Text style={[styles.activityText]}>
                    {item.activity}
                </Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {timeObj.format("HH:mm")}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopColor: "white",
        borderTopWidth: 1,
        flexDirection: "row",
    },
    activityContainer: {
        flex: 4,
        // elevation: 10,
    },
    timeContainer: {
        flex: 1,
    },

    activityText: {
        fontSize: 16,
        color: "white"
    },
    timeText: {
        fontSize: 16,
        color: "white",
        textAlign: "right"
    }
});

export default GraphItem;