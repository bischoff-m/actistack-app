import React from 'react';
import {
    StyleSheet,
    TouchableOpacity, 
    View, 
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActivityItem = props => {
    const { id, onItemPress, onItemLongPress, onItemFavored } = props;
    let item = global.activityItems[id];

    let timeString = "";
    if(item.hasOwnProperty("duration")) {
        let hours = Math.floor(item.duration / 60);
        let minutes = item.duration % 60;
        if(hours > 0)
            timeString += hours + "h";
        if(minutes > 0)
            timeString += " " + minutes + "min";
    }

    return (
        <>
            <TouchableOpacity onPress={onItemPress} onLongPress={onItemLongPress} style={[styles.container, {backgroundColor: `hsl(${item.hue}, 55%, 80%)`}]}>
                <Text style={[styles.text, {flex: 1}]}>
                    {item.activity}
                </Text>
                <Text style={styles.text}>
                    {timeString}
                </Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
        margin: 1,
        borderRadius: 4,
        paddingLeft: 16,
        paddingRight: 16,
    },
    text: {
        fontSize: 16,
        color: "black"
    },
});

export default ActivityItem;