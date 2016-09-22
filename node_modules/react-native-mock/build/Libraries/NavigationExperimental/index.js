


var _createMockComponent=require('../../components/createMockComponent');var _createMockComponent2=_interopRequireDefault(_createMockComponent);
var _NavigationStateUtils=require('./NavigationStateUtils');var _NavigationStateUtils2=_interopRequireDefault(_NavigationStateUtils);
var _NavigationPropTypes=require('./NavigationPropTypes');var _NavigationPropTypes2=_interopRequireDefault(_NavigationPropTypes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

module.exports={
StateUtils:_NavigationStateUtils2['default'],

AnimatedView:(0,_createMockComponent2['default'])('NavigationAnimatedView'),
Transitioner:(0,_createMockComponent2['default'])('NavigationTransitioner'),

Card:(0,_createMockComponent2['default'])('NavigationCard'),
CardStack:(0,_createMockComponent2['default'])('NavigationCardStack'),
Header:(0,_createMockComponent2['default'])('NavigationHeader'),

PropTypes:_NavigationPropTypes2['default']};/**
 * @see  https://github.com/facebook/react-native/blob/master/Libraries/NavigationExperimental/NavigationExperimental.js
 */