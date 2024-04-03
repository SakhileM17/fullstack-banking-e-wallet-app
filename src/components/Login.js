import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { initiateLogin } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

import { ReactComponent as EKQiLogo } from '../assets/EKQiLogo.svg';



/* File contains the Login page of the application */

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMsg: ''
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: 'Please enter all the fields.'
        }
      });
    } else {
       this.setState({
        errorMsg: {
          signin_error: ''
        }
      });
      // login successful
      this.props.dispatch(initiateLogin(email, password));
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {

    const { errorMsg } = this.state;

    return (

      <div className="login-page-container">

        {/* Left side of the login page */}

        <div className='login-page-left-container'>
          
          <div className='login-page-left-text-container'>

            <h1>GoodMorning</h1>
            <p/>
            <p>Havent joined the EKQiBank family yet ? Click the create account button below to become partof the EKQiBank family</p>
          
          </div>

          <div className='login-page-left-link-conatiner'>
            
            <Link to="/register" className="btn btn-secondary">
                Create account
            </Link>

          </div>

        </div>

        {/* right side of the login page */}

        <div className='login-page-right-container'> 
        
          <div className="login-form-container">

            <div className='login-form-logo'>
              < EKQiLogo className='login-ekqi-logo'/>
            </div>

            <div className='login-form-signin'>

              <h2>Sign In</h2>
              <p/>
              <p>Welcome back to EKQiBank, fill in your login details. </p>

            </div>

            <div className='login-form-form-container'>
              
              <Form onSubmit={this.handleLogin}>

                  {errorMsg && errorMsg.signin_error && (
                    <p className="errorMsg centered-message">
                      {errorMsg.signin_error}
                    </p>
                  )}

                  <Form.Group className="login-form-group" controlId="email">

                    <Form.Label className='login-form-label' >Email address : </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.handleInputChange}
                      className='login-form-control'
                    />
                  </Form.Group>

                  <Form.Group className="login-form-group" controlId="password">

                    <Form.Label className='login-form-label'>Password : </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      onChange={this.handleInputChange}
                      className='login-form-control'
                    />
                  </Form.Group>
                  
                  <div className="login-form-button-container">

                    <Button variant="primary" type="submit">
                      Login
                    </Button>

                    <p>By clicking sign in, you agree to the follow the EKQiBank terms and conditions</p>

                  </div>

            
            </Form>

            </div>


            
        </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Login);