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
  Alert
} from 'react-native';
import StoreItem from '../components/StoreItem';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Shop',
  };

  state = {
    selectedIndex: 0,
    itemList: [
    {name: 'Tylenol', price: 3.99, storeID: 0},
    {name: 'Spicy Cheetos', price: 2.99, storeID: 0},
    {name: 'Sushi', price: 5.99, storeID: 0},
    {name: 'Hoagie', price: 7.99, storeID: 2},
    {name: 'Lunchables', price: 2.49, storeID: 1},
    ]
  };

  handleButtonPress = (itemData, event) => {
    
    Alert.alert(itemData.name + ' was added to cart');
  };


  render() {

    return (
      <View style={styles.screenContainer}>
        <View style={styles.headerContainer}>
        {
          Platform.OS === 'ios' 
          ? 
          <SegmentedControlIOS
            values={['U-Store', 'C-Store', 'Wawa']}
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
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.state.itemList.map((item, key) => {
            
            return (
              item.storeID === this.state.selectedIndex ?
              <StoreItem 
              title={item.name}
              price={item.price}
              image={require("../assets/images/sushi.png")}
              description="Really Yummy Food"
              handleButtonPress={this.handleButtonPress.bind(null,item)}
              storeID={item.storeID}
              key={key}
              />
              : ''
            )
          })}
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  segmentedControl: {
    width: "100%",
    height: 40,
  }
});
