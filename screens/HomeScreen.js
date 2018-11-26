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
  constructor (props) {
    super(props)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleClearCart = this.handleClearCart.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
  }

  static navigationOptions = {
    title: 'Shop',
  };

  state = {
    selectedIndex: 0,
    searchText: '',
    isLoading: true,
    itemList: '',
    latitude: null,
    longitude: null,
    posError: null,
    total: 0,
    cartEmpty: true,
    confirmOrder: false
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          posError: null,
        });
      },
      (error) => this.setState({ posError: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
    return fetch('http://172.20.10.8:9999/items')
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson.results;
      for (var item in result) {
        result[item].count = 0
      }
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

  handleClearCart() {
    for (var item in this.state.response) {
      this.state.response[item].count = 0
    }
    this.setState({
      response: this.state.response,
      total: 0,
      cartEmpty: true
    })
  }

  handleOrder() {
    this.setState({
      confirmOrder: true
    })
  }

  placeOrder() {
    fetch('http://172.20.10.8:9999/orders/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderer: 'http://localhost:9999/users/2/',
        deliverer: null,
        store: 'http://localhost:9999/stores/1/',
        deliv_lat: this.state.latitude.toFixed(6),
        deliv_lng: this.state.longitude.toFixed(6),
        items: [],
      }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        orderResponse: responseJson
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  orderDetails() {
    comps = []
    deliveryFee = 2.36
    key = 0
    for (var item in this.state.response) {
      if (this.state.response[item].count > 0) {
        comps.push(<Text key={key} style={{fontSize: 18}}>{this.state.response[item].count} x {this.state.response[item].title}: ${this.state.response[item].price*this.state.response[item].count}</Text>)
      }
      key++
    }
    comps.push(<View key={key++} style={{borderColor: 'black', borderWidth: 1, width: 150}}></View>)
    comps.push(<Text key={key++} style={{fontSize: 18}}>Subtotal: ${this.state.total.toFixed(2)}</Text>)
    comps.push(<View key={key++} style={{borderColor: 'black', borderWidth: 1, width: 150}}></View>)
    comps.push(<Text key={key++} style={{fontSize: 18}}>Delivery Fee: ${deliveryFee}</Text>)
    comps.push(<View key={key++} style={{borderColor: 'black', borderWidth: 1, width: 150}}></View>)
    comps.push(<Text key={key++} style={{fontSize: 24}}>Total: ${(deliveryFee+this.state.total).toFixed(2)}</Text>)
    return comps
  }

  handleButtonPress(item) {
    item.count += 1
    this.state.total += parseFloat(item.price)
    this.setState({
      response: this.state.response,
      total: this.state.total,
      cartEmpty: false
    })
    // Alert.alert(""+this.state.total.toFixed(2))
  }

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
        {this.state.confirmOrder === false ?     
        <TextInput
          placeholder="Search"
          onChangeText={(searchText) => this.setState({searchText})}
          style={styles.searchBar}
        /> : ''}
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
        <Text>{JSON.stringify(this.state.orderResponse)}</Text>

        {this.state.confirmOrder === false ?
        <ScrollView contentContainerStyle={styles.shoppingContainer}>
        {this.state.isLoading === false ?
        this.state.response.map((item, index1, index2, index3) => {
          return(
            <View key={index1} style={styles.itemContainer}>
              <Text key={index1} style={styles.itemTitle}>{item.title}</Text>
              <Text key={index2} style={styles.itemPrice}>${item.price}</Text>
              {item.count > 1 ? <Text key={index3} style={styles.itemTitle}>X</Text> : ''}
              <TouchableOpacity style={styles.addToCartButton} onPress={()=>this.handleButtonPress(item)}>
                {item.count === 0 ?
                <Text style={styles.addToCartText}>Add</Text>
                :
                <Text style={styles.addToCartText}>{item.count}</Text>
                }
              </TouchableOpacity>
            </View>
          )
        }
        )
        : ''}
        </ScrollView>
        : '' }

        {this.state.confirmOrder === false ?
        this.state.cartEmpty ? '' :
        <View style={styles.cartContainer}>
          <Text style={styles.cartText}>Total: ${this.state.total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkOutButton} onPress={()=>this.handleOrder()}>
            <Text style={styles.checkOutButtonText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearCheckoutButton} onPress={()=>this.handleClearCart()}>
            <Text style={styles.checkOutButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={styles.confirmOrderContainer}>
          <Text style={{fontSize: 24}}>Confirm Order</Text>
          {this.orderDetails()}
          <TouchableOpacity style={styles.checkOutButton} onPress={()=>this.placeOrder()}>
            <Text style={styles.checkOutButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
        
      }
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginRight: 10
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEE',
    // borderColor: 'black',
    // borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  itemDetailContainer: {
    flexDirection: 'row',
  },
  cartContainer: {
    backgroundColor: '#EEE',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  cartText: {
    fontSize: 24
  },
  checkOutButton: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginRight: 5
  },
  clearCheckoutButton: {
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 5
  },
  checkOutButtonText: {
    fontSize: 20
  },
  confirmOrderContainer: {
    backgroundColor: '#EEE',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  }


});
