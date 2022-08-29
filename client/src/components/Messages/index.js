import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import {
  sendMessage,
  fetchConversations,
  fetchMoreMessages,
  readMessages,
} from '../Profile/modules/actions';
import {
  selectChatIsLoading,
  selectConversations,
} from '../Profile/modules/selectors';

const mapStateToProps = (state) => ({
  conversations: selectConversations(state),
  isLoading: selectChatIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      sendMessage,
      fetchConversations,
      fetchMoreMessages,
      readMessages,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
