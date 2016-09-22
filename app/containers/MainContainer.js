import React from 'react';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import AV from 'leancloud-storage';
import Main from '../pages/Main';
import Storage from '../utils/Storage';

class MainContainer extends React.Component {
  componentDidMount() {
    // CodePush.sync({
    //   deploymentKey: 'RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul',
    //   updateDialog: {
    //     optionalIgnoreButtonLabel: '稍后',
    //     optionalInstallButtonLabel: '后台更新',
    //     optionalUpdateMessage: 'Reading有新版本了，是否更新？',
    //     title: '更新提示'
    //   },
    //   installMode: CodePush.InstallMode.ON_NEXT_RESTART
    // });
    // AV.init({
    //   appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
    //   appKey: '57qmeEJonefntNqRe17dAgi4'
    // });
    // Storage.get('isInit')
    //   .then((isInit) => {
    //     if (!isInit) {
    //       Storage.save('typeIds', typeIds);
    //       Storage.save('isInit', true);
    //     }
    //   });
  }

  render() {
    return (
      <Main {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { lunbo, carshow, companynews, companyvideo } = state;
  return {
    lunbo,
    carshow,
    companynews,
    companyvideo
  };
}

export default connect(mapStateToProps)(MainContainer);
