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
import { NEWS_DETAIL_URL } from '../constants/Urls';

let canGoBack = false;

class WebViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.goBack = this.goBack.bind(this);
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
    const { navigator, route } = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title={route.item.title}
          navigator={navigator}
        />  
        <WebView
          ref={(ref) => { this.webview = ref; }}
          automaticallyAdjustContentInsets={false}
          style={{ flex: 1 }}
          source={{ uri: NEWS_DETAIL_URL + route.item.id}}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit={false}
          decelerationRate="normal"
          onShouldStartLoadWithRequest={() => {
            const shouldStartLoad = true;
            return shouldStartLoad;
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          renderLoading={this.renderLoading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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
  }
});

export default WebViewPage;
