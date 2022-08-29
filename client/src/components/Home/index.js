import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { submitQuestion } from './modules/actions';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      submitQuestion,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(View);
