import React from 'react';
import { StyleSheet, TouchableOpacity,  Vibration, Platform, ScrollView, RefreshControl, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Login from '../Login';
const language = require('../language.json');
//push notifications
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class Profile_main extends React.Component {
  state = {
    refreshing: false,
    loggdeIn: true,
    expoPushToken: '',
    notification: {},
  };
  //refreshing on pullling scroll
  onRefresh = () => {
    this.setState({ refreshing: true });
    wait(1000).then(() => this.setState({ refreshing: false }));
  };

//notofication function
registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    //alert(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};
 UNSAFE_componentWillMount() {
  
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    alert(notification);
    this.setState({ notification: notification });
  };

//logout
logout(){
  globalThis.log=false;
  this.onRefresh();
}

  render() {
      return (
        <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button}><Ionicons style={styles.iconStart} name="md-person-add"></Ionicons><Text style={styles.buttonText}>Add Employees</Text><Ionicons style={styles.iconEnd} name="ios-arrow-dropright-circle"></Ionicons></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>alert(globalThis.log)}><Ionicons style={styles.iconStart} name="ios-paper"></Ionicons><Text style={styles.buttonText}>Generate Tickets</Text><Ionicons style={styles.iconEnd} name="ios-arrow-dropright-circle"></Ionicons></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Ionicons style={styles.iconStart} name="ios-cash"></Ionicons><Text style={styles.buttonText}>Total Bills</Text><Ionicons style={styles.iconEnd} name="ios-arrow-dropright-circle"></Ionicons></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.navigate('Settings')}><Ionicons style={styles.iconStart} name="md-person-add"></Ionicons><Text style={styles.buttonText}>Log out</Text><Ionicons style={styles.iconEnd} name="ios-arrow-dropright-circle"></Ionicons></TouchableOpacity>
          </View>
        </ScrollView>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    justifyContent: 'center'
  },
  button: {
    padding: 20,
    backgroundColor: 'white',
    width: '99%',
    margin: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: "3%",
    fontSize: 15,
    width: '80%',
  },
  iconEnd: {
    fontSize: 30,

  },
  iconStart: {
    fontSize: 30,
  }

});

