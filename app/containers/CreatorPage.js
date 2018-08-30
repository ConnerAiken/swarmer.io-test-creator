import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Creator from '../components/Creator';
import * as CounterActions from '../actions/creator';

function mapStateToProps(state) {
  return {
    creator: state.creator
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Creator);
