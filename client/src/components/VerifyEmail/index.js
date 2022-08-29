import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { verifyEmail } from '../../authModules/actions';
import { selectEmailVerified } from '../../authModules/selectors';

const mapStateToProps = (state) => ({
  emailVerified: selectEmailVerified(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      verifyEmail,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
