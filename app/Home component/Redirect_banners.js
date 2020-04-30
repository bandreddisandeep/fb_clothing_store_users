import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl, Text, View,Image } from 'react-native';
import {banners_image_path,serverId } from 'react-native-dotenv';

//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

let bannersEXT = [];
export default class Redirect_banners extends React.Component {
  state = {
    refreshing: false,   
     banners:[],
  };

  UNSAFE_componentWillMount(){
    bannersEXT=[];
//fetch according to search element
fetch(serverId+'Banners/get_all_banners.php', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      bannerId: this.props.navigation.state.params.bannerId,

    })

  }).then((response) => response.json())
    .then((responseJson) => {
      // Showing response message coming from server after inserting records.
          //element
          if(responseJson[5]!='Select All'){
            titleName = responseJson[3]+"'s "+responseJson[5];
          }else if(responseJson[4]!='Select All'){
            titleName = responseJson[3]+"'s "+responseJson[4];
          }else{
            titleName = responseJson[3]+"'s "+'Wear';
          }
          bannersEXT.push(<TouchableOpacity onPress={()=>this.props.navigation.navigate('Get_banner_links',{name:titleName,genderType:responseJson[3],category:responseJson[4],subCategory:responseJson[5]})} style={styles.bannerCard}>
          <Image source={{ uri: banners_image_path+responseJson[0] }} style={{height:'100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
          </TouchableOpacity>);
           //element
           bannersEXT.push(<TouchableOpacity onPress={()=>this.props.navigation.navigate('Get_banner_links',{name:titleName,genderType:responseJson[3],category:responseJson[4],subCategory:responseJson[5]})} style={styles.bannerCard}>
            <Image source={{ uri: banners_image_path+responseJson[1] }} style={{height:'100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
            </TouchableOpacity>);
             //element
          bannersEXT.push(<TouchableOpacity onPress={()=>this.props.navigation.navigate('Get_banner_links',{name:titleName,genderType:responseJson[3],category:responseJson[4],subCategory:responseJson[5]})} style={styles.bannerCard}>
            <Image source={{ uri: banners_image_path+responseJson[2] }} style={{height:'100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
            </TouchableOpacity>);
          
  this.setState({banners:bannersEXT});

    }).catch((error) => {
      console.error(error);
    });
}
  //refreshing on pullling scroll
  onRefresh = () => {
    this.setState({ refreshing: true });
    wait(1000).then(() => this.setState({ refreshing: false }));

  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
        <View style={styles.container}>
        {/* <Text>{this.props.navigation.state.params.bannerId}</Text> */}
        {this.state.banners}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({

    bannerCard: {
        backgroundColor: 'white',
        height: 300,
        borderWidth: 5,
        borderColor: 'rgb(240,240,240)',
        shadowColor: 'grey', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 2, //IOS
        elevation: 2, // Android
      }
});

