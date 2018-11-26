import React from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'expo';


export default class Delivery extends React.Component {
  state = {
    isLoading: true,
    isLoadingStoreName: true
  }

  storeName(storeURL) {
    return fetch(storeURL)
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson;
      this.setState({
        isLoadingStoreName: false,
        storeName: result.name
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
    });
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

  componentDidMount() {
    return fetch(this.props.url)
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson;
      // this.storeName(result.store)
      this.setState({
        isLoading: false,
        response: result,
        orderer: result.orderer,
        deliverer: result.deliverer,
        store: result.store,
        orderTotal: result.orderTotal,
        items: result.items,
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render() {
    return (
      this.state.isLoading === false ?
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.itemCountContainer}>
            <Text style={styles.itemCount}>{this.state.items.length}</Text>
          </View>
          <Text style={styles.itemCountText}>item{this.state.items.length > 1 ? 's' : ''}</Text>
          <Text style={styles.orderTotal}>${this.state.orderTotal}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.earn}>Earn ${((1000*this.distance(
            this.state.response.deliv_lat,
            this.state.response.deliv_lng,
            this.props.lat,
            this.props.lng)/1.4/60*2+5)*8/60).toFixed(2)}</Text>
        </View>
        <View style={styles.rightWrapper}>
          <View style={styles.rightContainer}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'}
              size={24}
              color={'black'}
            />
            <Text style={styles.time}>{Number((1000*this.distance(
              this.state.response.deliv_lat,
              this.state.response.deliv_lng,
              this.props.lat,
              this.props.lng)/1.4/60*2+5).toFixed(0))} min</Text>
          </View>
          <TouchableOpacity style={styles.pickUpButton}><Text style={styles.pickUpText}>Pick Up</Text></TouchableOpacity>
        </View>
      </View>
      : <Text>'loading'</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
  },
  leftContainer: {
    alignItems: 'center'
  },
  rightContainer: {
    flexDirection: 'row',
  },
  rightWrapper: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  orderTotal: {
    color: 'green',
    fontSize: 20,
  },
  itemCountContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 20
  },
  itemCount: {
    fontSize: 30,
  },
  itemCountText: {
    fontSize: 10
  },
  time: {
    marginTop: 3,
    marginLeft: 5,
    fontSize: 16,
  },
  earn: {
    fontSize: 32,
  },
  pickUpButton: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5
  },
  pickUpText: {
    fontSize: 20
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

