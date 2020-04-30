import React from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput,KeyboardAvoidingView, ScrollView, RefreshControl, Text, View, TouchableHighlightComponent } from 'react-native';
import { product_image_path, serverId } from 'react-native-dotenv';

//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class Shortlist_main extends React.Component {
  state = {
    refreshing: false,
    bagItems: [],
    Total:0,
  };
  //delete single item from bag
  deleteItemFromBag(elementId) {
    //fetch according to search element
    fetch(serverId + 'users_app/delete_single_item_from_bag.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userId: globalThis.user,
        productId: elementId,

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        this.UNSAFE_componentWillMount();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //delete all item from bag
  deleteAllItemsFromBag() {
    //fetch according to search element
    fetch(serverId + 'users_app/delete_all_items_from_bag.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userId: globalThis.user,

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        this.UNSAFE_componentWillMount();
      })
      .catch((error) => {
        console.error(error);
      });
  }


  UNSAFE_componentWillMount() {
    let bagItemsExt = [];
    let TotalExt=0;
    //fetch according to search element
    fetch(serverId + 'users_app/items_in_bag.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        userId: globalThis.user,

      })

    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        responseJson.forEach(element => {

          TotalExt += parseInt(element[3]);
          bagItemsExt.push(<View style={styles.bagItem}>
            <Image source={{ uri: product_image_path + element[2] }} style={{ width: "30%", height: '100%', borderRadius: 10 }} />
            <View style={styles.bagItemTxt}>
              <Text style={styles.bagItemInnerTxt1}>{element[0]}</Text>
              <Text style={styles.bagItemInnerTxt2}>{element[0]}</Text>
              <Text style={styles.bagItemInnerTxt3}>${element[3]}</Text>
              <View style={styles.bagItemBtn}>
                <TouchableOpacity style={styles.bagItemInnerBtn1} onPress={() => this.deleteItemFromBag(element[1])}><Text style={styles.bagItemInnerBtn1Txt}>Delete</Text></TouchableOpacity>
                <TouchableOpacity style={styles.bagItemInnerBtn2}><Text style={styles.bagItemInnerBtn1Txt}>Buy</Text></TouchableOpacity>
              </View>
            </View>

          </View>);
        });
        this.setState({ bagItems: bagItemsExt });
        this.setState({Total:TotalExt});
      })
      .catch((error) => {
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
    if (this.state.bagItems.length > 0) {
      return (
        <View style={styles.container}>

          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
          <View style={styles.bottomBar1}>
            <TouchableOpacity style={styles.bottomBtn1}><Text style={styles.bottomBtnTxt}></Text></TouchableOpacity>
          </View>
            {this.state.bagItems}
            <View style={styles.billing}>
            <Text style={styles.billingTxt1}>Total:</Text>
            <Text style={styles.billingTxt2}>${this.state.Total}</Text>
          </View>
          </ScrollView>
         
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomBtn} onPress={() => this.deleteAllItemsFromBag()}><Text style={styles.bottomBtnTxt}>Delete Bag</Text></TouchableOpacity>
            <TouchableOpacity style={styles.bottomBtn}><Text style={styles.bottomBtnTxt}>Check out</Text></TouchableOpacity>
          </View>
         
        </View>

      );
    } else {
      return (
        <View style={styles.container}>

          <ScrollView contentContainerStyle={{ height: '100%' }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>

            <View style={{ position: 'relative', flexDirection: 'row', top: 0, backgroundColor: '#0275d8', }}>
              <TouchableOpacity style={styles.bottomBtn} ><Text style={styles.bottomBtnTxt}>Delete Bag</Text></TouchableOpacity>
              <TouchableOpacity style={styles.bottomBtn}><Text style={styles.bottomBtnTxt}>Check out</Text></TouchableOpacity>
            </View>

          </ScrollView>

        </View>

      );
    }

  }
}


const styles = StyleSheet.create({
  container:{
  },
  bagItem: {
    flexDirection:'row',
    height: 200,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    margin: 3,
    shadowColor: 'grey', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 5, //IOS
    elevation: 2, // Android
  },
  bagItemTxt: {
    marginLeft: 20,

  },
  bagItemInnerTxt1: {
    fontWeight: 'bold',

  },
  bagItemInnerTxt2: {
    marginTop: 5,
    color: 'grey',

  },
  bagItemInnerTxt3: {
    fontWeight: 'bold',
    alignContent: 'space-between',
    marginTop: 20,
  },
  bagItemBtn: {
    flexDirection: 'row',
    marginTop: 50,
    alignSelf: 'flex-start',
  },
  bagItemInnerBtn1: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: '40%',
    height: 40,
    alignItems: 'center',
    shadowColor: 'maroon', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
  bagItemInnerBtn2: {
    backgroundColor: '#0275d8',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
    height: 40,
    marginLeft: 5,
    shadowColor: '#0275d8', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
  bagItemInnerBtn1Txt: {
    fontWeight: 'bold',
    color: 'white',
  },
  bottomBtn: {
    //position: 'absolute',
    backgroundColor: 'white',
    padding: 13,
    margin: 10,
    width: '45%',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android

  },
  //duplicate
  bottomBtn1: {
    //position: 'absolute',
    backgroundColor: 'white',
    padding: 13,
    margin: 10,
    width: '45%',
   

  },
  bottomBtnTxt: {
    color: '#0275d8',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    backgroundColor: '#0275d8',
  },
  bottomBar1: {
    position: 'relative',
    flexDirection: 'row',
    top: 0,
    backgroundColor: 'white',
  },
  billing:{
    backgroundColor:'white',
    flexDirection:'row',
    padding:15,
    borderWidth:2,
    borderColor:'grey',
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
//height:'10%',
  },
  billingTxt1:{
    fontWeight:'bold',
    marginLeft:'70%',
    marginRight:'6%',
  },
  billingTxt2:{
    fontWeight:'bold',
    textAlign:'right',
  }

});

