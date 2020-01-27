import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Alert } from 'react-native';

import GraphScreen from './screens/GraphScreen';
import ActivityScreen from './screens/ActivityScreen';


// set global error handler and display caught errors as alert
const defaultHandler = ErrorUtils.getGlobalHandler();
const globalErrorHandler = (error, isFatal) => {
    let title = isFatal ? 'Fatal Error' : 'Warning';
    if(isFatal)
        var content = 'Congrats, you discovered a fatal error! This will most likely crash the app. Please contact the delevoper, so he can fix it for you.';
    else
        var content = 'You discovered a rather harmless error. Maybe the app will no longer work. Please contact the delevoper, so he can fix it for you.';
    content += '\n\n' + error;
    Alert.alert(
        title,
        content,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ],
        { cancelable: false },
    );
    if(__DEV__)
        defaultHandler(error, isFatal);
}
ErrorUtils.setGlobalHandler(globalErrorHandler);



const RootStack = createStackNavigator(
    {
        Graph: { screen: GraphScreen },
        Activity: { screen: ActivityScreen },
    },
    {
        initialRouteName: 'Graph',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#22283B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}