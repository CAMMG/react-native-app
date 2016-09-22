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

import CarShowSlider from '../components/CarShowSlider';
import WebViewPage from '../pages/WebViewPage';
import GridView from '../components/GridView';
import * as lunboAction from '../actions/lunbo';
import * as carshowAction from '../actions/carshow';
import { DEFAULT_PIC_URL } from '../constants/Urls';
import { toastShort } from '../utils/ToastUtil';

let canLoadMore;
let page = 1;
let loadMoreTime = 0;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const splashImg = require('../img/splash.png');
const header = require('../img/show-box-header.png');

class CarShow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    InteractionManager.runAfterInteractions(()=>{
      dispatch(lunboAction.fetchLunbo());
      dispatch(carshowAction.fetchCarshow(true,true,false,1));
    });
  }

  componentWillReceiveProps(nextProps) {
    const { carshow } = this.props;
    if (carshow.isLoadMore && !nextProps.carshow.isLoadMore && !nextProps.carshow.isRefreshing) {
      if (nextProps.carshow.noMore) {
        toastShort('NO MORE DATA');
      }
    }
  }
  renderSlider(){
    const { lunbo, navigator} = this.props; 
    const isEmpty = lunbo.lunboList.length === undefined;
    if(!isEmpty){
      return (
        <CarShowSlider dataSource = {lunbo.lunboList} navigator={navigator}/>
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
      dispatch(carshowAction.fetchCarshow(false,true,true,page));
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }
  onRefresh(){
    const { dispatch } = this.props;
    dispatch(carshowAction.fetchCarshow(true,true,false,1));
    page = 1;
  }
  onPress(item){
    const { navigator } = this.props;
    navigator.push({
      component: WebViewPage,
      name: 'WebViewPage',
      item
    });
  }
  renderItem(item) {
    return (
      <TouchableOpacity key={item.id} onPress={this.onPress.bind(this,item)}>
        <View style={styles.box}>
          <Image source={require('../img/border-bg.png')} style={styles.boxbg} resizeMode={'contain'}>
            <Image source={{uri: DEFAULT_PIC_URL + item.url1}} style={styles.carPic} resizeMode={'cover'}/>
            <View style={styles.title}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.dateText}>{item.modifytime}</Text>
            </View>
          </Image>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { carshow } = this.props; 
    return (
      <View style={{flex:1}}>
        <View>
          {this.renderSlider()}
        </View>
        <Image source={header} style={styles.headerImg}/>
        <GridView
          items={Array.from(carshow.CarshowList)}
          itemsPerRow={2}
          renderItem={this.renderItem.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          isRefreshing={carshow.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
          onScroll={this.onScroll}
        />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  headerImg: {
    width: deviceWidth,
    height: deviceWidth/14
  },
  box: {
    width: deviceWidth/2-20,
    height: (deviceWidth/2-20)*422/449,
    margin: 10,
  },
  boxbg: {
    width: deviceWidth/2-20,
    height: (deviceWidth/2-20)*422/449,
  },
  carPic: {
    width: deviceWidth/2-22,
    height: (deviceWidth/2-22)*9/15,
    marginTop: 1,
    marginLeft: 1
  },
  title: {
    padding: 5
  },
  titleText: {
    fontSize : 12*deviceWidth/416,
    color: '#000',
    fontFamily:'Microsoft YaHei'
  },
  dateText: {
    fontSize : 12*deviceWidth/416,
    textAlign : 'right',
    color : '#aaa',
    fontFamily:'Microsoft YaHei'
  }
});
export default CarShow;
