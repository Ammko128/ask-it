import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import View from "./View";
import { register } from "../../authModules/actions";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      register,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(View);
