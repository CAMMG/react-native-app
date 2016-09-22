import React from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar,
  BackAndroid,
  View
} from 'react-native';

import { registerApp } from 'react-native-wechat';
import Splash from '../pages/Splash';
import { naviGoBack } from '../utils/CommonUtil';
import FullSliderContainer from '../containers/FullSliderContainer';

let tempNavigator;
let isRemoved = false;
let timer;
let nowNav;

class App extends React.Component {
  constructor(props) {
    super(props);
    registerApp('wxb24c445773822c79');
    this.renderScene = this.renderScene.bind(this);
    this.goBack = this.goBack.bind(this);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    return naviGoBack(tempNavigator);
  }

  configureScene() {
    return Navigator.SceneConfigs.PushFromRight;
  }

  renderScene(route, navigator) {
    clearTimeout(timer);
    let count = 0;
    let Component = route.component;
    tempNavigator = navigator;
    if (route.name === 'WebViewPage'||route.name === 'VideoPlayerPage'||route.name === 'FullSlider') {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
      isRemoved = true;
    } else if (isRemoved) {
      BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }
    nowNav = route.name;
    if(nowNav === 'Main'){
      timer = setTimeout(() => {
        if(nowNav === 'Main'){
          navigator.push({
            component: FullSliderContainer,
            name: 'FullSlider',
          });
        }
      }, 30000);
    }
    return (
      <Component navigator={navigator} route={route}/>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          hidden={true}
        />
        <Navigator
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            component: Splash,
            name: 'Splash'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default App;
