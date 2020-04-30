import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Text, View,ScrollView,KeyboardAvoidingView, Platform } from 'react-native';
import Index from './Index';
import { serverId } from 'react-native-dotenv';

import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import {Redirect} from 'react-dom'
export default class Login extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    
    username: '',
    password: '',
    keyboardView:Platform.OS,
    loggedIn:  false,
    
    //set css about to change
    loginTab: { paddingLeft: 45, paddingRight: 45, padding: 20, borderColor: 'black', borderWidth: 1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, backgroundColor: '#0275d8' },
    loginTabText: { fontWeight: 'bold', color: 'white' },

    signupTab: { paddingLeft: 45, paddingRight: 45, borderTopRightRadius: 20, borderBottomRightRadius: 20, padding: 20, borderColor: 'black', borderWidth: 1 },
    signupTabText: { fontWeight: 'bold', color: 'black' },

    //forms
    loginForm: { display: 'flex' },
    signupForm: { display: 'none' },
    scrollView:'',

  }
//sample checking for os
UNSAFE_componentWillMount(){
  AsyncStorage.getItem('Email', (err,res) => {
    if(res!=null){
      {this.props.navigation.navigate('Drawer')};
    }
  });
  globalThis.log=false;
}
  //login function
  //login function
  login = () => {
    //check login
    if(this.state.username!='' && this.state.password!=''){
      
    fetch(serverId + 'App_login/user_login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        username: this.state.username,
        password: this.state.password

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        if (responseJson == 'success') {
          this.setState({ loggedIn: true });
        globalThis.userKey='loggedin';
        AsyncStorage.setItem('Email', this.state.username, () => {
          console.log('success');
        });
        AsyncStorage.setItem('Password', this.state.password, () => {
          console.log('success');
        });
        {this.props.navigation.navigate('Drawer')};
        } else {
          alert('wrong details');

        }
      }).catch((error) => {
        console.error(error);
      });

    }else{
      alert('please enter details');
    }
  }
  toggleloginTab = () => {
    
    this.setState({
      loginTab: {
        paddingLeft: 45,
        paddingRight: 45,
        padding: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#0275d8'
      }
    });
    this.setState({
      loginTabText: {
        fontWeight: 'bold',
        color: 'white'
      }
    });

    this.setState({
      loginForm: {
        display: 'flex',
      }
    });
    //changing other tab normal
    this.setState({
      signupTab: {
        paddingLeft: 45,
        paddingRight: 45,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white'
      }
    });
    this.setState({
      signupTabText: {
        fontWeight: 'bold',
        color: 'black'
      }
    });
    this.setState({
      signupForm: {
        display: 'none',
      }
    });

    this.setState({ username: '' });
    this.setState({ password: '' });

  }

  togglesignupTab = () => {
    this.setState({
      signupTab: {
        paddingLeft: 45,
        paddingRight: 45,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#0275d8'
      }
    });
    this.setState({
      signupTabText: {
        fontWeight: 'bold',
        color: 'white'
      }
    });

    this.setState({
      signupForm: {
        display: 'flex',
      }
    });
    //chnaging otehr tab normal
    this.setState({
      loginTab: {
        paddingLeft: 45,
        paddingRight: 45,
        padding: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: 'white'
      }
    });

    this.setState({ loginTabText: { fontWeight: 'bold', color: 'black' } });

    this.setState({ loginForm: { display: 'none' } });
    this.setState({ username: '' });
    this.setState({ password: '' });
  }

  render() {
    if (!globalThis.log) {
      if(this.state.keyboardView=='ios'){
        return (
          <KeyboardAvoidingView behavior="padding" enabled   keyboardVerticalOffset={0}>
         <ScrollView>
    <View style={styles.container}>

      <View style={styles.navbar}>
        <TouchableOpacity style={this.state.loginTab} onPress={this.toggleloginTab}><Text style={this.state.loginTabText}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity style={this.state.signupTab} onPress={this.togglesignupTab}><Text style={this.state.signupTabText}>SIGNUP</Text></TouchableOpacity>
      </View>
      <View style={this.state.loginForm}>
        <TextInput placeholder="Enter login Username" value={this.state.username} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput secureTextEntry placeholder="Enter login Password" value={this.state.password} type="password" style={styles.input} onChangeText={(password) => this.setState({ password: password })} />
        <View>
        <TouchableOpacity style={styles.button} onPress={this.login}><Text style={styles.buttonText}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}><Text style={styles.buttonText}>GOOGLE LOGIN</Text></TouchableOpacity>
        </View>
      </View>
      <View style={this.state.signupForm}>
        <TextInput placeholder="Enter Last name" value={this.state.lastName} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter First name" value={this.state.firstName} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Username" value={this.state.username} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Email" value={this.state.email} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Phone Number" value={this.state.phoneNumber} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Address" value={this.state.address} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Pincode" value={this.state.pinCode} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Password" value={this.state.password} type="password" style={styles.input} onChangeText={(password) => this.setState({ password: password })} />
        <TextInput placeholder="Confirm Password" value={this.state.ConfirmPassword} type="password" style={styles.input} onChangeText={(password) => this.setState({ password: password })} />
        <TouchableOpacity style={styles.button} onPress={this.login}><Text style={styles.buttonText}>SIGNUP</Text></TouchableOpacity>
      </View>
    </View>
    </ScrollView>
         </KeyboardAvoidingView>
 
       );
      }else{
      return (
         <KeyboardAvoidingView>
         <ScrollView>
    <View style={styles.container}>

      <View style={styles.navbar}>
        <TouchableOpacity style={this.state.loginTab} onPress={this.toggleloginTab}><Text style={this.state.loginTabText}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity style={this.state.signupTab} onPress={this.togglesignupTab}><Text style={this.state.signupTabText}>SIGNUP</Text></TouchableOpacity>
      </View>
      <View style={this.state.loginForm}>
        <TextInput placeholder="Enter login Username" value={this.state.username} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput secureTextEntry placeholder="Enter login Password" value={this.state.password} type="password" style={styles.input} onChangeText={(password) => this.setState({ password: password })} />
        <View>
        <TouchableOpacity style={styles.button} onPress={this.login}><Text style={styles.buttonText}>LOGIN</Text></TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} ><Text style={styles.buttonText}>GOOGLE LOGIN</Text></TouchableOpacity>
        </View>
      </View>
      <View style={this.state.signupForm}>
        <TextInput placeholder="Enter Last name" value={this.state.lastName} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter First name" value={this.state.firstName} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Username" value={this.state.username} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Email" value={this.state.email} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Phone Number" value={this.state.phoneNumber} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Enter Address" value={this.state.address} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Pincode" value={this.state.pinCode} style={styles.input} onChangeText={(username) => this.setState({ username: username })} />
        <TextInput placeholder="Password" value={this.state.password} type="password" style={styles.input} onChangeText={(password) => this.setState({ password: password })} />
        <TextInput placeholder="Confirm Password" value={this.state.ConfirmPassword} type="password" style={styles.input} onChangeText={(password) => this.setState({ password: password })} />
        <TouchableOpacity style={styles.button} onPress={this.login}><Text style={styles.buttonText}>SIGNUP</Text></TouchableOpacity>
      </View>
    </View>
    </ScrollView>
        </KeyboardAvoidingView>

      );
    }
  }
    else {
      return (
         <Index />
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    color: 'black',
    margin: 10,
    padding: 15,
    width: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0275d8',

  },
  button: {
    backgroundColor: '#0275d8',
    padding: 13,
    margin: 10,
    width: 139,
    alignItems: 'center',
    borderRadius: 10,
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 60,
  },
  buttonGroup:{
  },
  googleButton:{
    backgroundColor: 'green',
    padding: 13,
    margin: 10,
    width: 250,
    alignSelf:'center',
    alignItems: 'center',
    borderRadius: 10,
    
  }

});

