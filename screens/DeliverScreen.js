import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View,
  Platform,
  SegmentedControlIOS,
  Text,
  SectionList,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import Delivery from '../components/Delivery';

import { AsyncStorage } from 'react-native'

export default class DeliverScreen extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static navigationOptions = {
    title: 'Deliver',
  };

  state = {
    latitude: null,
    longitude: null,
    posError: null,
    isLoadingOrders: true,
  }

  handleDelete(url) {
      headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      if (this.state.token != null) {
        // headers.set('Authorization',('Token ' + this.state.token))
      }
    fetch(url, {
        method: 'DELETE',
        headers: headers   
      })
    .then(() => {
      headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      if (this.state.token != null) {
        // headers.set('Authorization',('Token ' + this.state.token))
      }
      fetch('http://172.20.10.8:9999/orders/', {
        method: 'GET',
        headers: headers, 
      })
      .then((response) => response.json())
      .then((responseJson) => {
        result = responseJson.results;
        this.setState({
          isLoadingOrders: false,
          orderResponse: result,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      })
    })
    .catch((error) =>{
      console.error(error);
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
      }
      else {
        // Alert.alert("no credentials found")
      }
    } catch (error) {
      console.error(error)
    }
  }

  addListener() {
    this.props.navigation.addListener('willFocus', (playload) => {

      headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      if (this.state.token != null) {
        // headers.set('Authorization',('Token ' + this.state.token))
      }
      fetch('http://172.20.10.8:9999/orders/', {
        method: 'GET',
        headers: headers,    
      })
      .then((response) => response.json())
      .then((responseJson) => {
        result = responseJson.results;
        this.setState({
          isLoadingOrders: false,
          orderResponse: result,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    })
  }

  componentDidMount() {
    this.getToken().then(() => {
      this.addListener()
    })
    .then(() => {

      headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      })
      if (this.state.token != null) {
        // headers.set('Authorization',('Token ' + this.state.token))
      }
      fetch('http://172.20.10.8:9999/orders/', {
        method: 'GET',
        headers: headers   
      })
      .then((response) => response.json())
      .then((responseJson) => {
        result = responseJson.results;
        this.setState({
          isLoadingOrders: false,
          orderResponse: result,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    })
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

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <ScrollView contentContainerStyle={styles.orderContainer}>   
        {/*<Text>{JSON.stringify(this.state.orderResponse, null, '\t')}</Text>*/}
  
        {/* ALL PENDING ORDERS DISPLAYED HERE */}
        {this.state.isLoadingOrders === false && this.state.orderResponse != null ?
        this.state.orderResponse.map((order, index) => {
          return(<Delivery key={index} json={order} delete={() => this.handleDelete(order.url)}/>)
        }
        )
        : ''}
        

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'orange',
    flex: 1
  },
  segmentedControl: {
    width: "100%",
    height: 40,
  },
  orderContainer: {
  }
});
