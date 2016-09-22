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
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  StatusBar
} from 'react-native';

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import CarShow from './CarShow';
import CompanyNews from './CompanyNews';
import CompanyVideo from './CompanyVideo';
import FullSliderContainer from '../containers/FullSliderContainer';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { navigator } = this.props;
    //   this.timer = setTimeout(() => {
    //   navigator.push({
    //     component: FullSliderContainer,
    //     name: 'FullSlider',
    //   });
    // }, 5000);
  }

  render() { 
    return (
        <View style={styles.container}>
          <ScrollableTabView
            renderTabBar={() =>
              <DefaultTabBar
                underlineHeight={2}
                tabStyle={{ paddingBottom: 0 }}
              />
            }
          >
          <View tabLabel={'汽车展示'}
                style={{ flex: 1 }}>
            <CarShow {...this.props}/>
          </View>
          <View tabLabel={'企业新闻'}
                style={{ flex: 1 }}>
            <CompanyNews {...this.props}/>
          </View>
          <View tabLabel={'企业视频'}
                style={{ flex: 1 }}>
            <CompanyVideo {...this.props}/>
          </View>
          </ScrollableTabView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default Main;
