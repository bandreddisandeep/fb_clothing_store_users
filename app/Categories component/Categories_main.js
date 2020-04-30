import React, {Component} from 'react';
import {StyleSheet,Text,View,ScrollView,RefreshControl,Animated, TouchableOpacity} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Ionicons } from '@expo/vector-icons';
import { serverId } from 'react-native-dotenv';
//time set to refreshing
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
let dropdownsEXTmen = [];
let dropdownsEXTwomen = [];
let dropdownsEXTkids = [];
export default class Categories_main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    refreshing: false,
     dropdownsMen:[],
     dropdownsWomen:[],
     dropdownsKids:[],
    };
  }

  //refreshing on pullling scroll
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.UNSAFE_componentWillMount();
    wait(1000).then(() => this.setState({ refreshing: false }));

  };
//While loading
  UNSAFE_componentWillMount(){
let loaders =0;
 dropdownsEXTmen = [];
 dropdownsEXTwomen = [];
 dropdownsEXTkids = [];

//fetch according to search element Men
fetch(serverId+'user_get_dropdowns/get_dropdowns.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

    genderType: 'MEN',

  })

}).then((response) => response.json())
  .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
    responseJson.forEach(element => {
    let subelemGRP =[];
    //subelem
    element.forEach(subelem=>{
        subelemGRP.push(<Text style={styles.headList} onPress={()=>this.props.navigation.navigate('Redirect_categories',{categoryName:"MEN's "+subelem,searchGenderType:'MEN',searchSubCategory:['n',subelem]})}>{subelem}</Text>);
        });
        //remove first elem
        subelemGRP.splice(0,1);

      //element
      dropdownsEXTmen.push(<Collapse>
        <CollapseHeader>
            <View style={styles.headBar2}>
              <Text style={styles.headBarTxt2}>{element[0]}</Text>
              <Ionicons style={styles.headBarIcon} name="md-arrow-dropdown" size={25}/>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <Text style={styles.headList} onPress={()=>this.props.navigation.navigate('Redirect_categories',{categoryName:"MEN's "+element[0],searchGenderType:'MEN',searchSubCategory:['y',element[0]]})}>Select All</Text>
        {subelemGRP}
              
        </CollapseBody>
      </Collapse>);
      
  });
  this.setState({dropdownsMen:dropdownsEXTmen});
 // alert('Mensuccess');
}).catch((error) => {
    console.error(error);
  });

  //fetch according to search element Women
fetch(serverId+'user_get_dropdowns/get_dropdowns.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

    genderType: 'WOMEN',

  })

}).then((response) => response.json())
  .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
    responseJson.forEach(element => {
    let subelemGRP =[];
    //subelem
    element.forEach(subelem=>{
        subelemGRP.push(<Text style={styles.headList} onPress={()=>this.props.navigation.navigate('Redirect_categories',{categoryName:"WOMEN's "+subelem,searchGenderType:'WOMEN',searchSubCategory:['n',subelem]})}>{subelem}</Text>);
        });
        //remove first elem
        subelemGRP.splice(0,1);
      //element
      dropdownsEXTwomen.push(<Collapse>
        <CollapseHeader>
            <View style={styles.headBar2}>
              <Text style={styles.headBarTxt2}>{element[0]}</Text>
              <Ionicons style={styles.headBarIcon} name="md-arrow-dropdown" size={25}/>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <Text style={styles.headList} onPress={()=>this.props.navigation.navigate('Redirect_categories',{categoryName:"WOMEN's "+element[0],searchGenderType:'WOMEN',searchSubCategory:['y',element[0]]})}>Select All</Text>
        {subelemGRP}
              
        </CollapseBody>
      </Collapse>);
      
  });
  this.setState({dropdownsWomen:dropdownsEXTwomen});
 // alert('Womensuccess');
}).catch((error) => {
    console.error(error);
  });

  //fetch according to search element Kids
fetch(serverId+'user_get_dropdowns/get_dropdowns.php', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({

    genderType: 'KIDS',

  })

}).then((response) => response.json())
  .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
    responseJson.forEach(element => {
    let subelemGRP =[];
    //subelem
    element.forEach(subelem=>{
        subelemGRP.push(<Text style={styles.headList} onPress={()=>this.props.navigation.navigate('Redirect_categories',{categoryName:"KIDS "+subelem,searchGenderType:'KIDS',searchSubCategory:['n',subelem]})}>{subelem}</Text>);
        });
        //remove first elem
        subelemGRP.splice(0,1);
      //element
      dropdownsEXTkids.push(<Collapse>
        <CollapseHeader>
            <View style={styles.headBar2}>
              <Text style={styles.headBarTxt2}>{element[0]}</Text>
              <Ionicons style={styles.headBarIcon} name="md-arrow-dropdown" size={25}/>
            </View>
        </CollapseHeader>
        <CollapseBody>
        <Text style={styles.headList} onPress={()=>this.props.navigation.navigate('Redirect_categories',{categoryName:"KIDS "+element[0],searchGenderType:'KIDS',searchSubCategory:['y',element[0]]})}>Select All</Text>
        {subelemGRP}
              
        </CollapseBody>
      </Collapse>);
      
  });
  this.setState({dropdownsKids:dropdownsEXTkids});
//  alert('KIDSsuccess');
}).catch((error) => {
    console.error(error);
  });
  
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
      <Collapse>
        <CollapseHeader>
            <View style={styles.headBar}>
              <Text style={styles.headBarTxt}>MEN</Text>
              <Text style={styles.headBarSub}>T-Shirts, Shirts, Jeans, Shoes, Ac...</Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
{this.state.dropdownsMen}
 </CollapseBody>
      </Collapse>

     <Collapse>
        <CollapseHeader>
            <View style={styles.headBar}>
              <Text style={styles.headBarTxt}>WOMEN</Text>
              <Text style={styles.headBarSub}>T-Shirts, Shirts, Jeans, Shoes, Ac...</Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
{this.state.dropdownsWomen}
 </CollapseBody>
      </Collapse>
      
      <Collapse>
        <CollapseHeader>
            <View style={styles.headBar}>
              <Text style={styles.headBarTxt}>KIDS</Text>
              <Text style={styles.headBarSub}>T-Shirts, Shirts, Jeans, Shoes, Ac...</Text>
            </View>
        </CollapseHeader>
        <CollapseBody>
{this.state.dropdownsKids}
 </CollapseBody>
      </Collapse>
      
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  button: {
    padding: 8,
    backgroundColor:'#0275d8',
    height:'21%',
  },
  buttonText: {
    fontSize: 17,
    fontWeight:'bold',
    
  },
  subView: {
    backgroundColor: "#FFFFFF",
    height: 100,
  },
  headBar:{
    backgroundColor:'#0275d8',
    height:120,
    padding:40,
    margin:1,
    alignContent:'center',
    shadowColor: 'grey', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, // Android
      
  },
  headBar2:{
    alignItems: 'center',
    flexDirection: 'row'
  },
  headBarIcon:{

  },
  headBarTxt:{
    fontWeight:'bold',
    fontSize:18,
    color:'white',
  },
  headBarTxt2:{
    marginLeft:40,
    margin:20,
    fontWeight:'bold',
    width:'75%',

  },
  headBarSub:{
paddingTop:5,
    color:'white',
    fontSize:12,
  },
  headList:{
    backgroundColor:'white',
    margin:1,
    padding:18,
    paddingLeft:50,
  }
});