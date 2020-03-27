import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginJumbotron from '../components/views/user/LoginJumbotron';
import { actions } from '../redux/user';

const mapStateToProps = (state, ownProps) => ({
  from: (ownProps.location && ownProps.location.state) || { pathname: '/' }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitLogin: actions.submitLogin
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginJumbotron);
