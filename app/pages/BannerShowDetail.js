import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  BackAndroid,
  Image
} from 'react-native';

import { naviGoBack } from '../utils/CommonUtil';
import {DEFAULT_PIC_URL} from '../constants/Urls';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

class BannerShowDetail extends React.Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  onPress(){
    const { navigator } = this.props;
    if(navigator) {
        naviGoBack(navigator);
    }
  }

  render() {
    const { route } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <Image
          style={{ width: maxWidth, height: maxHeight }}
          source={{uri:DEFAULT_PIC_URL + route.id}}
        />
      </TouchableOpacity>
    );
  }
}

export default BannerShowDetail;
