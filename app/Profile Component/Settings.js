import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class Settings extends React.Component {
  state = {
    refreshing: false,
  };
  //refreshing on pullling scroll
  onRefresh = () => {
    this.setState({ refreshing: true });
    wait(1000).then(() => this.setState({ refreshing: false }));

  };
//logout
logout(){
  AsyncStorage.removeItem('Email', (err,res) => {
    console.log('logged out');
  });
  {this.props.navigation.navigate('Login')}
};

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
        <View style={styles.container}>
<Text>Profile </Text>
<TouchableOpacity style={styles.printBtn} onPress={()=>this.logout()}><Text style={styles.printBtnText}>LOGOUT</Text></TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({


});

