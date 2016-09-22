/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
  StyleSheet,
  WebView,
  BackAndroid,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';

import * as WeChat from 'react-native-wechat';
import ReadingToolbar from '../components/ReadingToolbar';
import { toastShort } from '../utils/ToastUtil';
import LoadingView from '../components/LoadingView';
import { naviGoBack } from '../utils/CommonUtil';
import { formatStringWithHtml } from '../utils/FormatUtil';
import { DEFAULT_PIC_URL } from '../constants/Urls';
// import Video from 'react-native-video';
import {Video} from 'react-native-media-kit';

let canGoBack = false;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class VideoPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

   state = {
     rate: 1,
     volume: 1,
     muted: false,
     resizeMode: 'contain',
     duration: 0.0,
     currentTime: 0.0,
   };

   onLoad(data) {
     this.setState({duration: data.duration});
   }

   onProgress(data) {
     this.setState({currentTime: data.currentTime});
   }

   getCurrentTimePercentage() {
     if (this.state.currentTime > 0) {
       return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
     } else {
       return 0;
     }
   }

   renderRateControl(rate) {
     const isSelected = (this.state.rate == rate);

     return (
       <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
           {rate}x
         </Text>
       </TouchableOpacity>
     )
   }

   renderResizeModeControl(resizeMode) {
     const isSelected = (this.state.resizeMode == resizeMode);

     return (
       <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
           {resizeMode}
         </Text>
       </TouchableOpacity>
     )
   }

   renderVolumeControl(volume) {
     const isSelected = (this.state.volume == volume);

     return (
       <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
         <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
           {volume * 100}%
         </Text>
       </TouchableOpacity>
     )
   }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  goBack() {
    if (canGoBack) {
      this.webview.goBack();
      return true;
    }
    return naviGoBack(this.props.navigator);
  }

  renderLoading() {
    return <LoadingView />;
  }

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    const { navigator, route } = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title={route.item.title}
          navigator={navigator}
        />
        <View style={styles.container2}>
        <Video
          style={{width: deviceWidth, height: deviceWidth / (16/9),marginTop: deviceHeight/5}}
          src={ DEFAULT_PIC_URL + route.item.url1}
          autoplay={true}
          preload={'auto'}
          loop={false}
          controls={true}
          muted={false}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  spinnerContent: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * (7 / 10),
    height: Dimensions.get('window').width * (7 / 10) * 0.68,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
    marginTop: 5
  },
  shareContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: deviceHeight/10,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});

export default VideoPlayerPage;
