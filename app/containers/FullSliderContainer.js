import React from 'react';
import { connect } from 'react-redux';
import FullScreenPage from '../pages/FullScreenPage';

class FullSliderContainer extends React.Component {
  render() {
    return (
      <FullScreenPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { lunbo } = state;
  return {
    lunbo,
  };
}

export default connect(mapStateToProps)(FullSliderContainer);