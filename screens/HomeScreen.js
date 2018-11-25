import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Button,
  SegmentedControlIOS,
  Alert,
  TextInput,
  SectionList,
} from 'react-native';
import StoreItem from '../components/StoreItem';
import TabBarIcon from '../components/TabBarIcon';

import { WebBrowser, Icon } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Shop',
  };

  state = {
    selectedIndex: 0,
    searchText: '',
    isLoading: true,
    itemList: ''

  };

  componentDidMount() {
    return fetch('http://172.20.10.8:9999/items')
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson.results;
      this.setState({
        isLoading: false,
        response: result,

      }, function(){
      });
    })
    .then(() => {
      this.setState({
        itemList: this.generateSections()
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  handleButtonPress = (itemData, event) => {
    Alert.alert(itemData.name + ': added to cart');
  };


  generateSections() {
    data = []
    if(this.state.isLoading === false) {
      for (var i = 0; i < this.state.response.length; i++) {
        if (String(this.state.response[i].title).toLowerCase().indexOf(String(this.state.searchText).toLowerCase()) !== -1) {
          data.push({
            title: this.state.response[i].title, 
            price: this.state.response[i].price,
          })
        }
      }
    }
    sections = [{title: 'Everything', data: data}]
    return sections
  }

  render() {
    return (
      <View style={styles.screenContainer}>         
        <TextInput
          placeholder="Search"
          onChangeText={(searchText) => this.setState({searchText})}
          style={styles.searchBar}
        />
        <View style={styles.headerContainer}>
        {
          Platform.OS === 'ios' 
          ? 
          <SegmentedControlIOS
            values={['U-Store']}
            // , 'C-Store', 'Wawa']}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
            style={styles.segmentedControl}
          />  
          : 
          <Button title="segmented controler unavailable for android"></Button>
        }
        </View>
        <SectionList
          sections={this.generateSections()}
          renderItem={({item}) => 
            <View style={styles.itemContainer}>
              <View style={styles.itemDetailContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text> 

                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-arrow-dropdown-circle' : 'md-arrow-dropdown-circle'}
                  size={26}
                  style={{ marginLeft: 10}}
                  color={'gray'}
                />
              </View>
              <TouchableOpacity style={styles.addToCartButton}><Text style={styles.addToCartText}>Add</Text></TouchableOpacity>
            </View>
          }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
        {/* SCROLLABLE SHOPPING CONTAINER 
        <ScrollView contentContainerStyle={styles.shoppingContainer}>
          <View style={styles.storeWrapper}>
            <Text style={styles.departmentTitle}>Snacks</Text>

            <ScrollView horizontal={true} contentContainerStyle={styles.departmentContainer}> 
            {this.state.isLoading === false ? 
            this.state.response.map((item, index) => 
              <StoreItem 
                title={item.title}
                price={item.price}
                image={require("../assets/images/sushi.png")}
                description="Really Yummy Food"
                handleButtonPress={this.handleButtonPress.bind(null, {name: item.title})}
                storeID={0}
                key={index}
              />) : ''
            }       
            </ScrollView>
          </View>
        </ScrollView>
*/}

{/* DEFUNCT
          {this.state.response.map((item, key) => {
            
            return (

              this.state.searchText==='' ?
              item.storeID === this.state.selectedIndex ?
              <StoreItem 
              title={item.name}
              price={item.price}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null,item)}
              storeID={item.storeID}
              key={key}
              />
              : ''
              :
              String(item.name).toLowerCase().indexOf(String(this.state.searchText).toLowerCase()) !== -1 ?
              item.storeID === this.state.selectedIndex ?
              <StoreItem 
              title={item.name}
              price={item.price}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null,item)}
              storeID={item.storeID}
              key={key}
              />
              : ''
              : ''
            )
          })}
*/}          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  shoppingContainer: {
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  segmentedControl: {
    width: "100%",
    height: 40,
  },
  searchBar: {
    fontSize: 18,
    height: 45,
    marginLeft: 10,
    marginRight: 10
  },
  departmentTitle: {
    fontSize: 24,
    color: 'black',
    backgroundColor: '#EEE',
    height: 30,
    paddingLeft: 10,
    paddingTop: 2,
    textAlign: 'center'
  },
  // departmentScroll: {
  //   backgroundColor: 'white',
  //   borderColor: 'red',
  //   borderWidth: 2,
  // },
  department: {
    borderColor: 'black',
    borderWidth: 1,
  },
  departmentContainer: {
    marginBottom: 5
  },
  storeWrapper: {
    width: '100%'
  },
  debugText: {
    fontSize: 14
  },
  sectionHeader: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#DDD',
  },
  itemTitle: {
    // padding: 10,
    fontSize: 20,
    marginLeft: 15
    // height: 44,
  },
  itemPrice: {
    // padding: 10,
    marginLeft: 10,
    fontSize: 20,
    // height: 44,
    color: 'green'
  },
  addToCartText: {
    // padding: 10,
    fontSize: 20,
    // height: 44,
  },
  addToCartButton: {
    backgroundColor: 'skyblue',
    padding: 5,
    marginRight: 15
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  itemDetailContainer: {
    flexDirection: 'row',
  }


});
