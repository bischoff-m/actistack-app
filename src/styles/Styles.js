'use strict';

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    body: {
        backgroundColor: "#2D3551",
        flex: 1
    },
    separator: {
        // borderBottomColor: "#e0e0e0",
        borderBottomColor: "transparent",
        borderBottomWidth: 2,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconWrapper: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    }
});