import React from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import { Icon } from 'expo';


export default class Delivery extends React.Component {
  constructor (props) {
    super(props)
  }

  state = {
    isLoading: true,
    isLoadingOrderer: true,
    isLoadingStore: true,
    isLoadingItems: true,

    items: [],
    price: 0
  }

  fetchStore(storeURL) {
    return fetch(storeURL)
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson;
      this.setState({
        isLoadingStore: false,
        store: result
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  fetchOrderer(ordererURL) {
    if (ordererURL == null) {
      this.setState({
        isLoadingOrderer: false,
        orderer: {username: 'null'}
      })
      return Promise.resolve();
    }
    return fetch(ordererURL)
    .then((response) => response.json())
    .then((responseJson) => {
      result = responseJson
      this.setState({
        isLoadingOrderer: false,
        orderer: result
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }
  fetchItem(itemURL, count) {
    if (itemURL == null) {
      this.setState({
        items: []
      })
      return Promise.resolve();
    }
    return fetch(itemURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.state.price += parseFloat(responseJson.price)*count
      items = this.state.items

      for (var i = 0; i < count; i++){
        items.push(responseJson)
      }
      this.setState({
        items: items,
        price: this.state.price
      }) 
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getItems(){
    for (var orderitem in this.props.json.items) {
      this.fetchItem(this.props.json.items[orderitem].item, this.props.json.items[orderitem].count)
    }
    this.setState({
      isLoadingItems: false
    })
  }

  componentDidMount() {
    return this.fetchOrderer(this.props.json.orderer)
    .then(() => {
      this.fetchStore(this.props.json.store)
      this.getItems()
    })
    .then(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  render() {
    let minsActive = Math.ceil((Date.now() - Date.parse(this.props.json.created)) / 60000)

    return (
      this.state.isLoading === false ?
      <View style={styles.container}>
        {/*<Text>{JSON.stringify(this.state.store,null,'\t')}</Text>*/}
      
        <Text style={styles.linkText} onPress={() => {
            destination = this.props.json.deliv_lat+','+this.props.json.deliv_lng
            origin = this.state.store.lat+','+this.state.store.lng
            url = 'https://www.google.com/maps/dir/?api=1&travelmode=walking&destination='+destination+'&origin='+origin
            // Alert.alert(url)
            Linking.openURL(url)
          }
        }>Directions</Text>
        
        {this.state.isLoadingItems === false ? '' : <Text style={styles.text}>Items loading...</Text>}

        {/* ORDER INFO */}
        <Text style={styles.text}>store: {this.state.isLoadingStore === false ? this.state.store.name : 'loading...'}</Text>
        
        <Text style={styles.text}>no. items: {this.state.isLoadingItems === false ? this.state.items.length : 'loading...'}</Text>

        <Text style={styles.text}>order total: {this.state.isLoadingItems === false ? '$'+this.state.price : 'loading...'}</Text>
        <Text style={styles.text}>time active: {minsActive}min(s)</Text>

        
        <Text style={styles.text}>orderer: {this.state.isLoadingOrderer === false ? this.state.orderer.username: 'loading...'}</Text>

        {/* BUTTON 1 */}
        <TouchableOpacity style={styles.pickUpButton}>
          <Text style={styles.buttonText}>pick up</Text>
        </TouchableOpacity>
        {/* BUTTON 2 */}
        <TouchableOpacity style={styles.delButton} onPress={this.props.delete}>
          <Text style={styles.buttonText}>delete</Text>
        </TouchableOpacity>
      </View>

      : 
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  text:{
    fontSize: 20
  },
  linkText:{
    fontSize: 20,
    color: 'blue'
  },
  buttonText: {
    fontSize: 20
  },
  delButton: {
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    margin: 5
  },
  pickUpButton: {
    backgroundColor: 'skyblue',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    margin: 5,
  },
})

