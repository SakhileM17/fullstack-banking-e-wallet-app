import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { registerNewUser } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';

/* File contains the Register component of the application  */

class Register extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
    successMsg: '',
    errorMsg: '',
    isSubmitted: false
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  registerUser = (event) => {
    event.preventDefault();
    const { first_name, last_name, email, password, cpassword } = this.state;

    const fieldsToValidate = [
      { first_name },
      { last_name },
      { email },
      { password },
      { cpassword }
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signup_error: 'Please enter all the fields.'
        }
      });
    } else {
      if (password !== cpassword) {
        this.setState({
          errorMsg: {
            signup_error: 'Password and confirm password does not match.'
          }
        });
      } else {
        this.setState({ isSubmitted: true });
        this.props
          .dispatch(registerNewUser({ first_name, last_name, email, password }))
          .then((response) => {
            if (response.success) {
              this.setState({
                successMsg: 'User registered successfully.',
                errorMsg: ''
              });
            }
          });
      }
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    const { errorMsg, successMsg, isSubmitted } = this.state;

    return (

      <div className="register-page-container">
        
        {/* Left side of the Register page */}

        <div className='register-page-left-container'>
          
          <div className='register-page-left-text-container'>
            
            <h1>Good Morning</h1><p/>
            
            <p>Already part of our EKQiBank family ? Click the login in button below to continue enjoying our banking services.</p>
          
          </div>

          <div className='register-page-left-link-conatiner'>
            
            <Link to="/" className="btn btn-secondary">
                Login
            </Link>

          </div>
          
        </div>
        
        {/* right side of the login page */}
        
        <div className='register-page-right-container'>
          
          <div className="register-form-container"> 
          
              <div className='register-form-signin'>
                
                <h2>Sign In</h2>
                <p/>
                <p>Welcome back to EKQiBank, fill in your login details. </p>
              
              </div>
              
              <div className='register-form-form-container'>
                
                <Form onSubmit={this.registerUser}>
                  
                  {errorMsg && errorMsg.signup_error ? (
                  
                  <p className="errorMsg centered-message">
                    {errorMsg.signup_error}
                  </p> 
                  ) : ( isSubmitted && (
                  <p className="successMsg centered-message">{successMsg}</p>
                  )
                  )}
                  
                  <Form.Group controlId="first_name">

                    <Form.Label className='register-form-label'>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="Enter first name"
                        onChange={this.handleInputChange}
                      />
                  </Form.Group>

                  <Form.Group controlId="last_name">

                    <Form.Label className='register-form-label'>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      placeholder="Enter last name"
                      onChange={this.handleInputChange}
                    />

                  </Form.Group>

                  <Form.Group controlId="email">
              
                    <Form.Label className='register-form-label'>Email address</Form.Label>
                
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                
                    <Form.Label className='register-form-label'>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="cpassword">
                    <Form.Label className='register-form-label'>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      name="cpassword"
                      placeholder="Enter confirm password"
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>

              <div className="register-form-button-container">
                
                <Button variant="primary" type="submit">
                  Register
                </Button>

                <p>By clicking register, you agree to have read and agree with EKQiBank terms and conditions.</p>
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

export default connect(mapStateToProps)(Register);