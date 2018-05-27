import { bindActionCreators } from "redux";
import { cloneElement } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "./actions/actionCreators";

const mapStateToProps = state => ({
  story: state.story,
  poll: state.poll
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

const Main = props => cloneElement(props.children, props);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
