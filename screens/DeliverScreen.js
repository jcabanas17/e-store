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


export default class DeliverScreen extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  static navigationOptions = {
    title: 'Deliver',
  };

  state = {
    selectedIndex: 0,
    latitude: null,
    longitude: null,
    posError: null,
    isLoadingOrders: true,
  }

  handleDelete(url) {
    fetch(url, {method: 'DELETE'})
    .then(() => {
      fetch('http://172.20.10.8:9999/orders')
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
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (playload)=>{
      fetch('http://172.20.10.8:9999/orders')
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
    })
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
        <ScrollView contentContainerStyle={styles.shoppingContainer}>
        {this.state.isLoadingOrders === false ?
        this.state.orderResponse.map((order, index) => {
          return(<Delivery key={index} url={order.url} lat={this.state.latitude} lng={this.state.longitude} delete={() => this.handleDelete(order.url)}/>)
        }
        )
        : ''}
        </ScrollView>
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
  segmentedControl: {
    width: "100%",
    height: 40,
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
    marginLeft: 15,
    fontSize: 20,
    // height: 44,
    color: 'green'
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  shoppingContainer: {

  }
});
