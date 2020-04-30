import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl, Text, View } from 'react-native';
//home stack navigator
import Redirect_genderType from './Home component/Redirect_genderType';
import Redirect_banners from './Home component/Redirect_banners';
import Single_items from './Items component/Single_items';
import Get_banner_links from './Home component/Get_banner_links';
import Settings from './Profile Component/Settings';
//ctaegories stack navigator
import Categories_main from './Categories component/Categories_main';
import Redirect_categories from './Categories component/Redirect_categories';
//stack navigator
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//bottom tab bar navigation
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile_main from './Profile Component/Profile_main';
import Shortlist_main from './Shortlist component/Shortlist_main'
import Home_main from './Home component/Home_main';
//drawer navigation
import Login from './Login';
import { createDrawerNavigator } from 'react-navigation-drawer';

//bottom tab navigator
const TabNavigator = createBottomTabNavigator({
  Home_navigator: {
      screen: Home_main,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-home' size={32} />
      ),
      
    },
  },
  Categories_index: {
    screen: Categories_main,
      navigationOptions: {
        title:'dfdf',
      tabBarLabel: 'Categories',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-list' size={32} />
      )
    },
  },
  Shortlist_index: {
    screen: Shortlist_main,
    navigationOptions: {
      tabBarLabel: 'Shortlist',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-cart' size={32} /*color="green"*/ />
      )
    },
  },
  Profile_main: {
    screen: Profile_main,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name='ios-person' size={32} />
      )
    },

  },
},{
    initialRouteName: "Home_navigator"
});

// navigation stack navigator
const AppNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions:{
      title:'Clothing Store',
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><Ionicons name='ios-search' size={25} /></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
      
    },

  },
  Redirect_genderType: {
    screen: Redirect_genderType,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.genderName}`,
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><TouchableOpacity onPress={()=>alert('search')}><Ionicons style={{paddingRight:29}} name='ios-search' size={25} /></TouchableOpacity><TouchableOpacity onPress={()=>alert('filter')}><Ionicons name='ios-funnel' size={25} /></TouchableOpacity></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
      
    }),

  },
  Redirect_banners: {
    screen: Redirect_banners,
    navigationOptions:{
      title:'Banners',
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><TouchableOpacity onPress={()=>alert('search')}><Ionicons style={{paddingRight:29}} name='ios-search' size={25} /></TouchableOpacity><TouchableOpacity onPress={()=>alert('filter')}><Ionicons name='ios-funnel' size={25} /></TouchableOpacity></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
    }

  },
  Get_banner_links: {
    screen: Get_banner_links,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><TouchableOpacity onPress={()=>alert('search')}><Ionicons style={{paddingRight:29}} name='ios-search' size={25} /></TouchableOpacity><TouchableOpacity onPress={()=>alert('filter')}><Ionicons name='ios-funnel' size={25} /></TouchableOpacity></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
  }),


  },
  Single_items: {
    screen: Single_items,
       navigationOptions:{
      tabBarVisible:false,
      title:'gender',
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><TouchableOpacity onPress={()=>alert('search')}><Ionicons style={{paddingRight:29}} name='ios-search' size={25} /></TouchableOpacity><TouchableOpacity onPress={()=>alert('filter')}><Ionicons name='ios-funnel' size={25} /></TouchableOpacity></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
      
    }

  },
  Redirect_categories: {
    screen: Redirect_categories,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.categoryName}`,
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><Ionicons name='ios-search' size={25} /></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
      
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.categoryName}`,
      headerRight:()=><View style={{flexDirection:'row',padding:10,alignItems:'center'}}><Ionicons name='ios-search' size={25} /></View>,
      headerStyle:{backgroundColor:'white',borderBottomColor:'lightgrey',borderBottomWidth:1},
      
    }),
  }
}, {
  initialRouteName: "Home"
});
const HomeNavigation = createAppContainer(AppNavigator);


//Drawer navigator from Login screen
const Drawer = createDrawerNavigator(
  {
    Login: { screen: Login,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      } 
    },
    Drawer: { screen: HomeNavigation,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      } 
     },
  },{
    initialRouteName: "Login",
  });
const DrawerLogin = createAppContainer(Drawer);

export default class Index extends React.Component {

  render() {
    return (
      <DrawerLogin />

    );
  }
}


const styles = StyleSheet.create({


});

