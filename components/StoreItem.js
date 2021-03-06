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
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.title}</Text>
        <Image source={this.props.image} style={styles.img}/>
        <TouchableOpacity style={styles.touchableOpactiy} onPress={this.props.handleButtonPress}>
            <Text style={styles.addToCart}>Add To Cart</Text>
            <Text style={styles.priceText}>{'$' + this.props.price}</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

{/*
  VERSION 1 Shopping Cards
      <View style={styles.container}>
        <View style={styles.componentContainer}>
          <View style={styles.leftSide}>
            <Text style={styles.titleText}>{this.props.title}</Text> 
            <Text style={styles.priceText}>${this.props.price}</Text>
            <View style={styles.details}>
              <Text style={styles.titleText}>Details</Text>
              <Icon.Ionicons
                name='ios-arrow-down'
                size={26}
                style={{paddingTop: 0, paddingLeft: 5 }}
                color='black'
              />
            </View>
          </View>
          <Image source={this.props.image} style={styles.img}/>
        </View>
        <TouchableOpacity style={styles.touchableOpactiy} onPress={this.props.handleButtonPress}>
          <View style={styles.touchableOpactiy}>
            <Text style={styles.addToCart}>Add To Cart</Text>
          </View>
        </TouchableOpacity>
      </View>
*/}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 125,
    height: 206,
    backgroundColor: 'transparent',
    marginLeft: 5,
    marginRight: 5
  },
  touchableOpactiy: {
    width: '100%',
    padding: 4,
    backgroundColor: '#DDD',
    borderColor: '#AAA',
    borderWidth: 3,
    alignItems: 'center',
    borderRadius: 5,
  },
  addToCart: {
    fontSize: 14,
    color: 'black'
  },
  priceText: {
    fontSize: 24,
    color: 'green',
  },
  img: {
    width: '100%',
    height: 125,
    marginRight: 0,
    borderRadius: 5,
  },  
  titleText: {
    fontSize: 18,
    paddingTop: 0,
    // borderColor: 'black',
    // borderWidth: 1,
    fontWeight: 'bold',
  },
});

{/*
  VERSION 1 Shopping Cards
  componentContainer: {
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

  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5
  },
  leftSide: {  
    flex: 1,
    width: 200,
    flexDirection: 'column',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  img: {
    width: '33%',
    height: 89,
    marginRight: 0,
    // borderRadius: 5,
  },
  details: {
    flexDirection: 'row',
  },
  container: {
    marginBottom: 20,
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
  }
*/}