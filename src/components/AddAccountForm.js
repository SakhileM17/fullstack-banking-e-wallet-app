import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';

class AddAccountForm extends React.Component {
  state = {
    account_no: '',
    bank_name: '',
    ifsc: '',
    errorMsg: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAddAccount = (event) => {
    event.preventDefault();
    const { account_no, bank_name, ifsc } = this.state;
    const fieldsToValidate = [{ account_no }, { bank_name }, { ifsc }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          add_error: 'Please enter all the fields.'
        }
      });
    } else {
      this.props.handleAddAccount(this.state);
    }
  };

  render() {
    const { account_no, bank_name, ifsc, errorMsg } = this.state;
    return (

      <div className="edit-account-form">
        <Form onSubmit={this.handleAddAccount} className="account-form">
          {errorMsg && errorMsg.add_error && (
            <p className="errorMsg centered-message">{errorMsg.add_error}</p>
          )}

          <Form.Group controlId="type">
            <Form.Label><h4>Create EKQi Wallent Account Account</h4></Form.Label>
            <p>Welcome to EKQiBank eWallet Portal as new user, please add your bank details by filling in your details. </p>
          </Form.Group>

          <hr />
          <Form.Group controlId="accnt_no">
            <Form.Label>Account number: </Form.Label>
            <Form.Control
              type="number"
              name="account_no"
              placeholder="Enter your account number"
              value={account_no}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="accnt_no">
            <Form.Label>Bank name: </Form.Label>
            <Form.Control
              type="text"
              name="bank_name"
              placeholder="Enter your bank name"
              value={bank_name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="ifsc">
            <Form.Label>Branch Code:</Form.Label>
            <Form.Control
              type="text"
              name="ifsc"
              placeholder="Enter your Branch code"
              value={ifsc}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(AddAccountForm);