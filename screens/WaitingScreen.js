import React from 'react';
import { 
  Text,
  StyleSheet,
  Button, 
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class WaitingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.handleCancelOrder = this.handleCancelOrder.bind(this)
  }
  static navigationOptions = {
    title: 'Waiting',
  };

  handleCancelOrder() {
    Alert.alert('Order Canceled')
    // MAKE SURE TO DELETE ORDER HERE
    this.props.navigation.navigate('Main')
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.title}>Order Status</Text>
        <Text style={styles.text}>Placed</Text>
        <TouchableOpacity style={styles.cancelOrderButton} onPress={()=>this.handleCancelOrder()}>
          <Text style={styles.cancelOrderButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 20,
    color: 'orange'
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelOrderButton: {
    backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    alignItems: 'center'
  },
  cancelOrderButtonText: {
    fontSize: 20,
  }
});