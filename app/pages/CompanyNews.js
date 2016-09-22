import React from 'react';
import {
  Dimensions,
  InteractionManager,
  Image,
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Text,
  TouchableOpacity
} from 'react-native';

import WebViewPage from '../pages/WebViewPage';
import * as lunboAction from '../actions/lunbo';
import * as companynewsAction from '../actions/companynews';
import { DEFAULT_PIC_URL } from '../constants/Urls';
import { toastShort } from '../utils/ToastUtil';

let canLoadMore;
let page = 1;
let loadMoreTime = 0;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const header = require('../img/news-box-header.png');

class companynews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    InteractionManager.runAfterInteractions(()=>{
      dispatch(companynewsAction.fetchNewsTop());
      dispatch(companynewsAction.fetchCompanyNews(true,true,false,1));
    }); 
  }

  componentWillReceiveProps(nextProps) {
    const { companynews } = this.props;
    if (companynews.isLoadMore && !nextProps.companynews.isLoadMore && !nextProps.companynews.isRefreshing) {
      if (nextProps.companynews.noMore) {
        toastShort('NO MORE DATA');
      }
    }
    const isEmpty = companynews.CompanyNewsList.length === undefined || companynews.CompanyNewsList.length === 0;
    if(!isEmpty){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(companynews.CompanyNewsList)
      })
    }
  }
  renderHeader(){
    const { companynews } = this.props; 
    const isEmpty = companynews.CompanyNewsTop.length === undefined || companynews.CompanyNewsTop.length == 0;
    if(!isEmpty){
      let newsTop = companynews.CompanyNewsTop[0];
      return (
        <TouchableOpacity  onPress={this.onPress.bind(this,newsTop)} >
          <View style={styles.headerbox}>
            <Image source={{uri: DEFAULT_PIC_URL + newsTop.url1}} style={styles.headercarPic} resizeMode={'cover'}/>
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>{newsTop.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
      dispatch(companynewsAction.fetchCompanyNews(false,true,true,page));
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }
  onRefresh(){
    const { dispatch } = this.props;
    dispatch(companynewsAction.fetchCompanyNews(true,true,false,1));
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
        <TouchableOpacity key={item.id} onPress={this.onPress.bind(this,item)} >
          <View style={styles.box}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.dateText}>{item.modifytime}发布</Text>
            </View>
            <Image source={{uri: DEFAULT_PIC_URL + item.url1}} style={styles.carPic} resizeMode={'cover'}/>
          </View>
        </TouchableOpacity>
    );
  }

  render() {
    const { companynews } = this.props; 
    return (
      <View style={{flex:1}}>
        <View>
          {this.renderHeader()}
        </View>
        <Image source={header} style={styles.headerImg}/>
        <ListView
            style={styles.view}
            onScroll={this.onScroll.bind(this)}
            dataSource={this.state.dataSource}
            renderRow={this.renderItem.bind(this)}
            onEndReached={this.onEndReached.bind(this)}
            onScroll={this.onScroll}
            refreshControl={
                      <RefreshControl
                        refreshing={companynews.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        colors={['#eee', '#ddd', '#fff']}
                      />
                    }
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
    flex: 1,
    flexDirection: 'row',
    marginLeft: deviceWidth/40,
    marginRight: deviceWidth/40,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth: 1,
    borderColor:'#ddd',
  },
  carPic: {
    width: (deviceWidth-40)/3,
    height: (deviceWidth-40)/3,
  },
  title: {
    flex: 4,
    paddingTop: 20,
    paddingRight: 20 
  },
  titleText: {
    fontSize : 16*deviceWidth/416,
    color: '#000',
    fontFamily:'Microsoft YaHei'
  },
  dateText: {
    fontSize : 12*deviceWidth/416,
    textAlign : 'right',
    color : '#aaa',
    fontFamily:'Microsoft YaHei',
    position: 'absolute',
    bottom:0
  },
  headerbox: {
    width: deviceWidth,
    height:deviceWidth*9/16,
  },
  headercarPic: {
    width: deviceWidth,
    height: deviceWidth*9/16,
  },
  headertitle: {
    position: 'absolute',
    bottom: 0,
    padding: 10
  },
  headertitleText: {
    fontSize : 16*deviceWidth/416,
    color: '#fff'
  }
});

export default companynews;