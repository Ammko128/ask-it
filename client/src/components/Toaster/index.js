import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { selectToasts } from './modules/selectors';
import { hideToast } from './modules/actions';

const mapStateToProps = (state) => ({
  toasts: selectToasts(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      hideToast,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
