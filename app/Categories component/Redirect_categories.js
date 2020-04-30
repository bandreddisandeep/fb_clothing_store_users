import React from 'react';
import {Image, StyleSheet,TouchableOpacity, TextInput, ScrollView, RefreshControl, Text, View } from 'react-native';
import { men_home_main_pic, products_image_path, serverId} from 'react-native-dotenv';

//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

let itemsEXT = [];
export default class Redirect_categories extends React.Component {
  state = {
    refreshing: false,
    items:[],
  };

  UNSAFE_componentWillMount(){
    itemsEXT=[];
//fetch according to search element
fetch(serverId+'users_app/get_items_categoryWise.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        selectedGender: this.props.navigation.state.params.searchGenderType,
        selectedCategoryType: this.props.navigation.state.params.searchSubCategory[0],
        selectedSubCategory: this.props.navigation.state.params.searchSubCategory[1],

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        responseJson.forEach(element => {
            //element
            itemsEXT.push(<TouchableOpacity onPress={()=>this.props.navigation.navigate('Single_items',{productId:element[1]})} style={styles.bannerCard}>
                <Image source={{ uri: products_image_path+element[2] }} style={{height:'80%' }} />
            <Text style={styles.itemBrand}>{element[0]}</Text>
                <Text style={styles.itemName}>{element[0]}</Text>
                <Text style={styles.itemPrice}>${element[3]}</Text>
                </TouchableOpacity>);
            
        });
    this.setState({items:itemsEXT});

      }).catch((error) => {
        console.error(error);
      });
  }

  //refreshing on pullling scroll
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.UNSAFE_componentWillMount();
    wait(1000).then(() => this.setState({ refreshing: false }));

  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
        <View style={styles.container}>
{/* <Text>{this.props.navigation.state.params.gender}</Text> */}
        </View>
        <View style={styles.itemView}>
          
          {this.state.items}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    itemView:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    bannerCard: {
        backgroundColor: 'white',
        height: 340,
        width:'50%',
        borderWidth: 0.5,
        borderColor: 'lightgrey',
      },
      itemBrand:{
        fontWeight:'bold',
        paddingTop:5,
        paddingLeft:5,
        fontSize:13,

      },
      itemName:{
        color:'grey',
        paddingLeft:5,
        fontSize:11,
      },
      itemPrice:{
        paddingTop:5,
        paddingLeft:5,
        fontWeight:'bold',
        fontSize:13,

      }

});

