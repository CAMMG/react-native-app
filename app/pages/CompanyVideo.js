import React from 'react';
import {
  Dimensions,
  InteractionManager,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import VideoPlayerPage from '../pages/VideoPlayerPage';
import GridView from '../components/GridView';
import * as lunboAction from '../actions/lunbo';
import * as companyvideoAction from '../actions/companyvideo';
import { DEFAULT_PIC_URL } from '../constants/Urls';
import { toastShort } from '../utils/ToastUtil';

let canLoadMore;
let page = 1;
let loadMoreTime = 0;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const splashImg = require('../img/splash.png');
const header = require('../img/video-header.png');

class CompanyVideo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    InteractionManager.runAfterInteractions(()=>{
      dispatch(companyvideoAction.fetchVideoHeader());
      dispatch(companyvideoAction.fetchCompanyVideo(true,true,false,1));
    }); 
  }

  componentWillReceiveProps(nextProps) {
    const { companyvideo } = this.props;
    if (companyvideo.isLoadMore && !nextProps.companyvideo.isLoadMore && !nextProps.companyvideo.isRefreshing) {
      if (nextProps.companynews.noMore) {
        toastShort('NO MORE DATA');
      }
    }
  }
  renderHeader(){
    const { companyvideo } = this.props; 
    const isEmpty = companyvideo.VideoHeader.length === undefined ||companyvideo.VideoHeader.length === 0;
    if(!isEmpty){
      return (
        <Image source={{uri: DEFAULT_PIC_URL + companyvideo.VideoHeader[0].url1}} style={styles.videoHead}/>
      );
    }
  }

  onScroll(){
    if (!canLoadMore) {
      canLoadMore = true;
    }
  }
  onEndReached(){
    const time = Date.parse(new Date()) / 1000;
    if (canLoadMore && time - loadMoreTime > 1) {
      page++;
      const { dispatch } = this.props;
      dispatch(companyvideoAction.fetchCompanyVideo(false,true,true,page));
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }
  onRefresh(){
    const { dispatch } = this.props;
    dispatch(companyvideoAction.fetchCompanyVideo(true,true,false,1));
    page = 1;
  }
  onPress(item){
    const { navigator } = this.props;
    navigator.push({
      component: VideoPlayerPage,
      name: 'VideoPlayerPage',
      item
    });
  }
  renderItem(item) {
    return (
        <TouchableOpacity key={item.id} onPress={this.onPress.bind(this,item)}>
          <View style={styles.box}>
            <Image source={{uri: DEFAULT_PIC_URL + item.url2}} style={styles.boxbg} resizeMode={'cover'}>
              <Image source={require('../img/play.png')} style={styles.play} resizeMode={'cover'}/>
              <View style={styles.title}>
                <Text style={styles.titleText}>{item.title}</Text>
              </View>
            </Image>
          </View>
        </TouchableOpacity>
    );
  }

  render() {
    const { companyvideo } = this.props; 
    return (
      <View style={{flex:1}}>
        <View>
          {this.renderHeader()}
        </View>
        <Image source={header} style={styles.headerImg}/>
        <GridView
          items={Array.from(companyvideo.CompanyVideoList)}
          itemsPerRow={2}
          renderItem={this.renderItem.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          isRefreshing={companyvideo.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
          onScroll={this.onScroll}
        />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  videoHead: {
    width: deviceWidth,
    height: deviceWidth*9/16,
  },
  headerImg: {
    width: deviceWidth,
    height: deviceWidth/14
  },
  box: {
    width: deviceWidth/2-20,
    height: deviceWidth/4,
    margin: 10,
    borderColor:'#000',
    backgroundColor:'#333'
  },
  boxbg: {
    width: deviceWidth/2-20,
    height: deviceWidth/4,
  },
  play: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: deviceWidth/8-25,
    left: deviceWidth/4-35
  },
  title: {
    paddingTop: deviceWidth/5,
    paddingLeft: 5
  },
  titleText: {
    fontSize : 14*deviceWidth/416,
    color: '#fff',
    fontFamily:'Microsoft YaHei'
  },
});

export default CompanyVideo;