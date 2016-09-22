import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import ViewPager from 'react-native-viewpager';

//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class FullscreenSlider extends React.Component { 
 constructor(props) {
    super(props);
    var ds = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithPages([]),
    };
  }
  static contextTypes = {
    // router: React.PropTypes.object.isRequired,
    getBarRef: React.PropTypes.func
  };
  componentWillMount() {
    fetch(DEFAULT_URL)
        .then(res => res.json())
        .then(res => this.updateDataSource(res));
  }
  updateDataSource(data){
    this.setState({
      dataSource: this.state.dataSource.cloneWithPages(data['data'].rows),
    });
  }

  render() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage.bind(this)}
        isLoop={this.state.dataSource.length > 1}
        autoPlay={this.state.dataSource.length > 1}/>
    );
  }

  onPress(id){
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }

  _renderPage(
    data: Object,
    pageID: number | string,) {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <Image
          source={{uri: PIC_URL+data.url2}}
          style={styles.page} />
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default FullscreenSlider;