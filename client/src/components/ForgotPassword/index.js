import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import View from "./View";
import { forgotPassword } from "../../authModules/actions";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      forgotPassword,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(View);
