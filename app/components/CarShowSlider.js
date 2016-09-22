import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import BannerShowDetail from '../pages/BannerShowDetail';
import {DEFAULT_PIC_URL} from '../constants/Urls';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
class CarShowSlider extends React.Component { 
  constructor(props) {
    super(props);
    var ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithPages([]),
    };
  }
  componentWillMount() {
    const { dataSource } = this.props;
    this.updateDataSource(dataSource);
  }
  updateDataSource(data){
    this.setState({
      dataSource: this.state.dataSource.cloneWithPages(data),
    });
  }
  render() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage.bind(this)}
        isLoop={this.props.dataSource.length > 1}
        autoPlay={this.props.dataSource.length > 1}/>
    );
  }

  onPress(id){
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
            name: 'BannerShowDetail',
            component: BannerShowDetail,
            id
        });
    }
  }
  _renderPage(
    data: Object,
    pageID: number | string,) {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this,data.url2)}>
        <Image
          source={{uri: DEFAULT_PIC_URL+data.url1}}
          style={styles.page} />
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
    height: deviceWidth*9/16
  },
});

export default CarShowSlider;