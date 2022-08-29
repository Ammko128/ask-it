import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import View from './View';
import { selectIsLoading, selectTopContributors } from './modules/selectors';
import { fetchTopContributors } from './modules/actions';

const mapStateToProps = (state) => ({
  topContributors: selectTopContributors(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchTopContributors,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
