import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import View from "./View";
import { resetPassword } from "../../authModules/actions";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      resetPassword,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(View);
