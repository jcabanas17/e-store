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

import { AsyncStorage } from 'react-native'

import { WebBrowser, Icon } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.handleItemButtonPress = this.handleItemButtonPress.bind(this)
    this.handleClearCart = this.handleClearCart.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
  }

  static navigationOptions = {
    title: 'Shop',
  };

  state = {
    // AUTHENTICATION
    isAuthenticated: false,
    token: null,

    // SHOPPING
    isLoadingItems: true,
    items: null,
    searchText: '',

    // POSITIONING DATA
    latitude: null,
    longitude: null,
    posError: null,

    // Order Data
    cartEmpty: true,
    orderTotal: 0,
    confirmOrderState: false,
    orderResponse: null,
  };

  componentDidMount() {
    // get authentication token from async storage then fetch items
    return this.getToken()
    .then(() => {
      this.fetchItems()
      this.getPos()
    })
  }

  async getToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.setState({
          token: value,
          isAuthenticated: true,
        })
        // Alert.alert(value)
      }
      else {
       Alert.alert("no credentials found")
      }
    } catch (error) {
      console.error(error)
    }
  }

  fetchItems() {
    headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    if (this.state.token != null) {
      // headers.set('Authorization',('Token ' + this.state.token))
    }
    return fetch('http://172.20.10.8:9999/items/', {
      method: 'GET',
      headers: headers  
    })
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson.results
      for (var item in result) {
        result[item].count = 0
      }
      this.setState({
        isLoadingItems: false,
        items: result,

      }, function(){
      });
    })
  }

  getPos() {
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
    )
    return null
  }

  handleClearCart() {
    for (var item in this.state.items) {
      this.state.items[item].count = 0
    }
    this.setState({
      items: this.state.items,
      orderTotal: 0,
      cartEmpty: true
    })
  }

  handleOrder() {
    this.setState({
      confirmOrderState: true
    })
  }

  placeOrder() {
    let items = []
    let store = ''

    // Collect items
    for (var item in this.state.items) {
      if (this.state.items[item].count > 0) {
        if (store == ''){
          store = this.state.items[item].store
        }
        else {
          if (this.state.items[item].store != store) {
            throw 'Error: items from multiple stores' 
            Alert.alert('Error: items from multiple stores')
          }
        }

        let orderitem = {}
        orderitem['count'] = this.state.items[item].count
        orderitem['item'] = this.state.items[item].url
        orderitem['order'] = null
        items.push(orderitem)

      }
    }

    headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    if (this.state.token != null) {
      // headers.set('Authorization',('Token ' + this.state.token))
    }
    fetch('http://172.20.10.8:9999/orders/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        orderer: 'http://localhost:9999/users/2/',
        deliverer: null,
        store: store,
        deliv_lat: this.state.latitude.toFixed(6),
        deliv_lng: this.state.longitude.toFixed(6),
        items: items,
      }),
    })
    .then(response => {
      response.json()
    })
    .then((responseJson) => {
      this.setState({
        orderResponse: responseJson
      })
      Alert.alert('Order Placed')
      this.handleClearCart()
      this.setState({
        confirmOrderState: false
      })
    })
    // .then(() => {this.props.navigation.navigate('Waiting')})
    .catch((error) =>{
      console.error(error);
    });
  }

  handleItemButtonPress(item) {
    item.count += 1
    this.state.orderTotal += parseFloat(item.price)
    this.setState({
      items: this.state.items,
      orderTotal: this.state.orderTotal,
      cartEmpty: false
    })
  }

  renderSearchBar() {
    return (
    <TextInput
      placeholder="Search"
      onChangeText={(searchText) => this.setState({searchText})}
      style={styles.searchBar}
    /> 
    )
  }

  renderItems() {
    return(
      <ScrollView contentContainerStyle={styles.shoppingContainer}>
      {/* ONLY GENERATE ITEMS IF THEY ARE LOADED */}
      {this.state.isLoadingItems === false && this.state.items != null ?
      
      this.state.items.map((item, index) => {
        return(
          // GENERATE ITEMS IF SEARCH STRING IS SUBSTRING OF ITEM TITLE 
          item.title.toLowerCase().indexOf(String(this.state.searchText).toLowerCase()) !== -1 ?  
          <View key={index++} style={styles.itemContainer}>
            <Text key={index++} style={styles.itemTitle}>{item.title}</Text>
            <Text key={index++} style={styles.itemPrice}>${item.price}</Text>
            {item.count > 1 ? <Text key={index++} style={styles.itemTitle}>X</Text> : ''}
            <TouchableOpacity style={styles.blueButton} onPress={()=>this.handleItemButtonPress(item)}>
              {item.count === 0 ?
              <Text style={styles.buttonText}>Add</Text>
              :
              <Text style={styles.buttonText}>{item.count}</Text>
              }
            </TouchableOpacity>
          </View>
          : '' )
        })
      : 
      <Text style={styles.itemTitle}>No items to display</Text> } 
      </ScrollView>
    )
  }

  renderCart() {
    return(
      this.state.cartEmpty ? '' :
      <View style={styles.cartContainer}>
        <Text style={styles.cartText}>Total: ${this.state.orderTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.blueButton} onPress={()=>this.handleOrder()}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redButton} onPress={()=>this.handleClearCart()}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderOrderDetails() {
    comps = []
    deliveryFee = 2.00
    key = 0

    comps.push(
      <View key={key++} style={styles.tableRow}>
        <Text key={key++} style={styles.detailTextBold}>Item</Text>
        <Text key={key++} style={styles.detailTextBold}>Price</Text>
        <Text key={key++} style={styles.detailTextBold}>Qty.</Text>
        <Text key={key++} style={styles.detailTextBold}>Total</Text>
      </View>
    )

    for (var item in this.state.items) {
      let itemPrice = this.state.items[item].price
      let itemCount = this.state.items[item].count
      if (this.state.items[item].count > 0) {
        comps.push(
          <View key={key++} style={styles.tableRow}>
            <Text key={key++} style={styles.detailText}>{this.state.items[item].title}</Text>
            <Text key={key++} style={styles.detailText}>{itemPrice}</Text>
            <Text key={key++} style={styles.detailText}>{itemCount}</Text>
            <Text key={key++} style={styles.detailText}>{(itemCount*itemCount).toFixed(2)}</Text>
          </View>
        )
      }
    }
    comps.push(
      <View key={key++} style={styles.tableRow}>
        <Text key={key++} style={styles.detailText}>Subtotal</Text>
        <Text key={key++} style={styles.detailText}>{this.state.orderTotal.toFixed(2)}</Text>
      </View>
    )
    comps.push(
      <View key={key++} style={styles.tableRow}>
        <Text key={key++} style={styles.detailText}>Delivery Fee</Text>
        <Text key={key++} style={styles.detailText}>{deliveryFee.toFixed(2)}</Text>
      </View>
    )
    comps.push(
      <View key={key++} style={styles.tableRow}>
        <Text key={key++} style={styles.detailTextBold}>Total</Text>
        <Text key={key++} style={styles.detailTextBold}>{(deliveryFee+this.state.orderTotal).toFixed(2)}</Text>
      </View>
    )
    return comps
  }

  renderConfirmOrder() {
    return(
      <View>
        <ScrollView contentContainerStyle={styles.confirmOrderContainer}>
          <Text style={styles.confirmOrderTitle}>Confirm Order</Text>
          {this.renderOrderDetails()}
        </ScrollView>
        <View>
          <TouchableOpacity style={styles.blueButton} onPress={()=> {
              if (this.state.latitude !== null) {
                try {
                  this.placeOrder() 

                }
                catch (e) {
                  Alert.alert(String(e))
                }

                
              }
              else {Alert.alert('Order Error: location unavailable')}
            }
          }>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.redButton} onPress={()=>this.setState({confirmOrderState: false})}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          {this.state.orderResponse != null ? <Text>{this.state.orderResponse}</Text> : ''}
        </View>
      </View>
      
    )
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        {/* SEARCH BAR */}
        {this.state.confirmOrderState === false ? this.renderSearchBar() : ''}

        {/* ITEM LIST */}
        {this.state.confirmOrderState === false ? this.renderItems() : '' }

        {/* CART */}
        {this.state.confirmOrderState === false ? this.renderCart() : '' }

        {/* CONFIRM ORDER */}
        {this.state.confirmOrderState === true ? this.renderConfirmOrder() : '' }
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // CONTAINERS
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  shoppingContainer: {
  },
  confirmOrderContainer: {
    backgroundColor: '#EEE',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEE',
    marginBottom: 5,
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    padding: 10,
  },
  cartContainer: {
    backgroundColor: '#EEE',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  // MISC
  searchBar: {
    fontSize: 18,
    height: 45,
    margin: 5,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#DDD'
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  // TEXT
  itemTitle: {
    fontSize: 20,
    marginLeft: 15
  },
  confirmOrderTitle: {
    fontSize: 24,
    marginBottom: 10
  },
  itemPrice: {
    marginLeft: 10,
    fontSize: 20,
    color: 'green'
  },
  cartText: {
    fontSize: 24
  },
  detailText: {
    fontSize: 18
  },
  detailTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 3,
  },
  buttonText: {
    fontSize: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  // BUTTONS
  blueButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
});
