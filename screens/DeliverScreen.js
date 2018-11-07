import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View,
  Platform,
  SegmentedControlIOS,
} from 'react-native';
import DeliverItem from '../components/DeliverItem';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Deliver',
  };

  state = {
    selectedIndex: 0,
  }

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
          <DeliverItem/>
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
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
