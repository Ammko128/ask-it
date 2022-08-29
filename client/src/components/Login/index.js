import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import View from "./View";
import { login } from "../../authModules/actions";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      login,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(View);
