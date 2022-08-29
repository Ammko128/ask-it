import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { logout } from '../../authModules/actions';
import {
  fetchCurrentUser,
  fetchNotifications,
  readNotifications,
  fetchMessagesCount,
} from '../Profile/modules/actions';
import { selectNotifications, selectMessagesCount } from '../Profile/modules/selectors';

const mapStateToProps = (state) => ({
  notifications: selectNotifications(state),
  messages: selectMessagesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      logout,
      fetchCurrentUser,
      fetchNotifications,
      readNotifications,
      fetchMessagesCount,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
