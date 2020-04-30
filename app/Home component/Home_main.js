import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl, Text, Image, View } from 'react-native';
import { men_home_main_pic, women_home_main_pic, kids_home_main_pic, home_home_main_pic, beauty_home_main_pic,banners_image_path,serverId } from 'react-native-dotenv';
//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

let bannersEXT = [];
export default class Home_main extends React.Component {
  state = {
    refreshing: false,
    banners:[],
  };

  UNSAFE_componentWillMount(){
    bannersEXT=[];
    fetch(serverId+'Banners/get_banners_admin.php', {
    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        responseJson.forEach(element => {
          //genderTypeData.push({ 'value': element });
          bannersEXT.push(<TouchableOpacity style={styles.bannerCard} onPress={()=>this.props.navigation.navigate('Redirect_banners',{bannerId:element[0]})}>
            <Image source={{ uri: banners_image_path+element[1] }} style={{height:'100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
            </TouchableOpacity>);
        });
        this.setState({banners:bannersEXT});
        
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
        <ScrollView horizontal={true} indicatorStyle='white' contentContainerStyle={styles.HorizontalscrollView}>
          <View style={styles.horizontalContainer}>

            <TouchableOpacity style={styles.slidingBtn} onPress={()=>this.props.navigation.navigate('Redirect_genderType',{gender:'MEN',genderName:"MEN's Wear"})}><Image source={{ uri: men_home_main_pic }} style={{ width: "100%", height: '75%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /><Text style={styles.sliderTxt}>MEN</Text></TouchableOpacity>
            <TouchableOpacity style={styles.slidingBtn} onPress={()=>this.props.navigation.navigate('Redirect_genderType',{gender:'WOMEN',genderName:"WOMEN's Wear"})}><Image source={{ uri: women_home_main_pic }} style={{ width: "100%", height: '75%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /><Text style={styles.sliderTxt}>WOMEN</Text></TouchableOpacity>
            <TouchableOpacity style={styles.slidingBtn} onPress={()=>this.props.navigation.navigate('Redirect_genderType',{gender:'KIDS',genderName:"KIDS Wear"})}><Image source={{ uri: kids_home_main_pic }} style={{ width: "100%", height: '75%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /><Text style={styles.sliderTxt}>KIDS</Text></TouchableOpacity>
            <TouchableOpacity style={styles.slidingBtn} onPress={()=>this.props.navigation.navigate('Redirect_genderType',{gender:'HOME',genderName:"HOME Accessories"})}><Image source={{ uri: home_home_main_pic }} style={{ width: "100%", height: '75%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /><Text style={styles.sliderTxt}>HOME</Text></TouchableOpacity>
            <TouchableOpacity style={styles.slidingBtn} onPress={()=>this.props.navigation.navigate('Redirect_genderType',{gender:'BEAUTY',genderName:"BEAUTY Products"})}><Image source={{ uri: beauty_home_main_pic }} style={{ width: "100%", height: '75%', borderTopLeftRadius: 5, borderTopRightRadius: 5 }} /><Text style={styles.sliderTxt}>BEAUTY</Text></TouchableOpacity>
          </View>
        </ScrollView>
        <Text style={styles.messageDark}>Hi this is a new message to all users around germany about our clothing store Hi this is a new message to all users around germany about our clothing store Hi this is a new message to all users around germany about our clothing store Hi this is a new message to all users around germany about our clothing store</Text>
        <View>
          
          {this.state.banners}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',

  },
  slidingBtn: {
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 10,
    width: 110,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 80,
    shadowColor: 'grey', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
  },
  HorizontalscrollView: {
    width: 610,
    backgroundColor: 'white',
    height: 100,

  },
  messageDark: {
    backgroundColor: 'white',
    minHeight: 100,
    color: 'orange',
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'justify',
    borderColor: 'rgb(240,240,240)',
    borderWidth: 7,
    //fontStyle:'italic'

  },
  sliderTxt: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'grey',
  },
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

