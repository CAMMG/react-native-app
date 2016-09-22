import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import {DEFAULT_PIC_URL} from '../constants/Urls';
import { naviGoBack } from '../utils/CommonUtil';
import FullScreenSlider from '../components/FullScreenSlider';
import * as lunboAction from '../actions/lunbo';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
class FullScreenPage extends React.Component { 
  constructor(props) {
    super(props);
    var ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithPages([]),
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
      dispatch(lunboAction.fetchLunbo());
  }
  renderSlider(){
    const { lunbo, navigator} = this.props; 
    const isEmpty = lunbo.lunboList.length === undefined;
    if(!isEmpty){
      return (
        <FullScreenSlider dataSource = {lunbo.lunboList} navigator={navigator}/>
      );
    }
  }
  render() {
    return (
      <View>
        {this.renderSlider()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default FullScreenPage;