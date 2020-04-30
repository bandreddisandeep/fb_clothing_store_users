import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, RefreshControl, Text, View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { serverId,product_image_path } from 'react-native-dotenv';

//time set to refreshing
// function wait(timeout) {
//     return new Promise(resolve => {
//         setTimeout(resolve, timeout);
//     });
// }

export default class Single_items extends React.Component {
    state = {
        refreshing: false,
        images: [],
        brandName:'',
        price:'',
        };

    UNSAFE_componentWillMount(){
    //fetch according to search element
    let imagesExt=[];
    fetch(serverId+'users_app/single_items_data.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
          productId: this.props.navigation.state.params.productId,
    
        })
    
      }).then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
          if(responseJson[3]!='none'){
            imagesExt.push(product_image_path+responseJson[3]);
          }
          if(responseJson[4]!='none'){
            imagesExt.push(product_image_path+responseJson[4]);
        }
          if(responseJson[5]!='none'){
            imagesExt.push(product_image_path+responseJson[5]);
        }
        this.setState({images:imagesExt});
        this.setState({brandName:responseJson[0]});
        this.setState({price:responseJson[2]});

        })
        .catch((error) => {
          console.error(error);
        });
    }

    //add product to bag
    addProductToBag = ()=>{
        fetch(serverId+'users_app/add_item_bag.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
        
              productId: this.props.navigation.state.params.productId,
              userId:globalThis.user,
        
            })
        
          }).then((response) => response.json())
            .then((responseJson) => {
alert(responseJson);
            })
            .catch((error) => {
              console.error(error);
            });
    };
    //refreshing on pullling scroll
    // onRefresh = () => {
    //     this.setState({ refreshing: true });
    //     wait(1000).then(() => this.setState({ refreshing: false }));

    // };

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                   <ScrollView contentContainerStyle={{height:'110%'}}>{/* <Text>{this.props.navigation.state.params.productId}</Text> */}
                    <SliderBox sliderBoxHeight={500} images={this.state.images} />
                    {/* <Text>{globalThis.user}</Text> */}
                    <View style={styles.itemView}>
                        <Text style={styles.itemBrand}>{this.state.brandName}</Text>
                        <Text style={styles.itemName}>{this.state.brandName}</Text>
                        <Text style={styles.itemPrice}>${this.state.price}</Text>
                        
                        </View>
                </ScrollView>
                </ScrollView> 
                <View style={styles.bottomBar}>
                    <TouchableOpacity style={styles.bottomBtn} onPress={()=>this.addProductToBag()}><Text style={styles.bottomBtnTxt}>Add to Bag</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.bottomBtn}><Text style={styles.bottomBtnTxt}>Buy now</Text></TouchableOpacity>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        height:'100%',

    },
    scrollView: {
        flex:1,
        height:'120%',   
        justifyContent: 'space-between'
    },
    bottomBtn: {
        //position: 'absolute',

        backgroundColor: '#0275d8',
        padding: 13,
        margin: 10,
        width: '45%',
        alignItems: 'center',
        borderRadius: 10,

    },
    bottomBtnTxt: {
        color: 'white',
        fontWeight: 'bold',
    },
    bottomBar: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        backgroundColor: 'white',
    },
    itemBrand: {
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 17,

    },
    itemName: {
        color: 'grey',
        paddingLeft: 10,
        fontSize: 15,
    },
    itemPrice: {
        paddingTop: 10,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 17,

    },
    itemView:{
        backgroundColor:'white',
        height:'30%',
    }

});

