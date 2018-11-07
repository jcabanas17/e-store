import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class StoreItem extends React.Component {

  handleButtonPress = () => {
    Alert.alert(this.props.title + ' was added to cart');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.componentContainer}>
          <View style={styles.leftSide}>
            <Text style={styles.titleText}>Enter Stuff Here</Text> 
            <View style={styles.details}>
              <Icon.Ionicons
                name='ios-arrow-down'
                size={26}
                style={{paddingTop: 0, paddingLeft: 5 }}
                color='black'
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.touchableOpactiy} onPress={this.props.handleButtonPress}>
          <View style={styles.touchableOpactiy}>
            <Text style={styles.addToCart}>Pick Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 0,
  },
  componentContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#CCCCCC',
    borderRadius: 0,
    borderWidth: 0,
    marginRight: 0,
    alignItems: 'center',
    width: '90%',
    marginBottom: 0,
    paddingLeft: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  touchableOpactiy: {
    padding: 5,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,

  },
  addToCart: {
    fontSize: 20,
    color: 'white'
  },
  leftSide: {  
    flex: 1,
    width: '25%',
    flexDirection: 'column',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  titleText: {
    fontSize: 20,
    paddingTop: 0,
    borderColor: 'black',
    // borderWidth: 1,
    // fontWeight: 'bold',
  },
});