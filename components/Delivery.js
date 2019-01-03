import React from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert
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
        orderer: null
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
  fetchItem(itemURL) {
    if (itemURL == null) {
      this.setState({
        items: []
      })
      return Promise.resolve();
    }
    return fetch(itemURL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.state.price += parseFloat(responseJson.price)
      if (this.state.items == []){
        this.setState({
          items: [responseJson],
          isLoadingItems: false,
          price: this.state.price
        })  
      }
      else {
        items = this.state.items
        items.push(responseJson)
        this.setState({
          items: items,
          isLoadingItems: false
        }) 
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getItems(){
    for (var item in this.props.json.items) {
      this.fetchItem(this.props.json.items[item])
    }
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
        {this.state.isLoadingItems === false ? '' : <Text>Items Loading</Text>}

        {/* ORDER INFO */}
        {this.state.isLoadingStore === false ?
        <Text style={styles.text}>store: {this.state.store.name}</Text>
        : 'loading'
        }
        <Text style={styles.text}>no. items: {this.props.json.items.length}</Text>
        <Text style={styles.text}>order total: ${this.state.price}</Text>
        <Text style={styles.text}>time active: {minsActive}min(s)</Text>
        {this.state.isLoadingOrderer === false ?

        this.state.orderer != null ?
        <Text style={styles.text}>orderer: {this.state.orderer.username}</Text> : <Text style={styles.text}>orderer: NULL</Text>
        : 'loading'
        }

        {/* BUTTON 1 */}
        <TouchableOpacity style={styles.pickUpButton}>
          <Text style={styles.buttonText}>pick up</Text>
        </TouchableOpacity>
        {/* BUTTON 2 */}
        <TouchableOpacity style={styles.delButton} onPress={this.props.delete}>
          <Text style={styles.buttonText}>delete</Text>
        </TouchableOpacity>
      </View>

      : <Text>'loading'</Text>
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

