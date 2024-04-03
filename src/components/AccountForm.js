import React, {useState}from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  initiateGetAccntDetails,
  initiateAddAccntDetails,
  initiateUpdateAccntDetails
} from '../actions/account';
import {
  initiateWithdrawAmount,
  initiateDepositAmount
} from '../actions/transactions';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';

import { maskNumber } from '../utils/mask';
import { moneyFormat } from '../utils/moneyformatter';

import AddAccountForm from './AddAccountForm';

import Customconfirmmodal from '../utils/customconfirmmodal';
import CustomSuccessModal from '../utils/customsuccessmodal';


class AccountForm extends React.Component {

  state = {
    amount: '',
    account: this.props.account,
    editAccount: false,
    ifsc: '',
    errorMsg: '',
    successMessage:'',
    isConfirmationOpen: false, // State to manage confirmation modal
    isSuccessConfirmationOpen: false // state to manage success confirmation modal
  };

  componentDidMount() {
    const { email } = this.props;
    if (email) {
      this.props.dispatch(initiateGetAccntDetails());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.account, this.props.account)) {
      this.setState({ account: this.props.account });
    }
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  handleUpdateAccount = (ifsc) => {
    const fieldsToValidate = [{ ifsc }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          update_error: 'Please enter branch code.'
        }
      });
    } else {
      this.setState({
        errorMsg: ''
      });
      this.props.dispatch(initiateUpdateAccntDetails(ifsc));
    }
  };

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleEditAccount = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({ editAccount: !prevState.editAccount }));
  };

  handleInputChange = (event) => {
    this.setState({
      ifsc: event.target.value
    });
  };

  handleOnSubmit = (event) => {

    event.preventDefault();

    let { amount, account } = this.state;

    const { selectedType } = this.props;
    const fieldsToValidate = [{ amount }];

    const allFieldsEntered = validateFields(fieldsToValidate);


    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          [selectedType === 'withdraw'
            ? 'withdraw_error'
            : 'add_error']: 'Opps! Please enter an amount that you would like to withdraw.',
        }, successMessage:''
      });
    } else {
      let { total_balance } = account;
      amount = +amount;
      total_balance = +total_balance;

      if (amount <= 0) {
        this.setState({
          errorMsg: {
            [selectedType === 'withdraw'
              ? 'withdraw_error'
              : 'add_error']: 'Amount must be greater than 0.',
          },
          successMessage: '',
        });
      } else {
        const transactionAmount = moneyFormat(amount);

      const confirmationMsg = selectedType === 'withdraw' ? `Are you sure that you would like to withdraw  ${transactionAmount}` : `Are you sure that you wold like to deposit ${transactionAmount}?`
      
      
      if (selectedType === 'withdraw' && amount <= account.total_balance) {

        this.setState({

          isConfirmationOpen: true // Close the confirmation modal after successful transaction

        });

      } else if (selectedType === 'deposit') {

        this.setState({
          
          isConfirmationOpen: true // Close the confirmation modal after successful transaction
        });
      } else {
        this.setState({
          errorMsg: {
            [selectedType === 'withdraw'
              ? 'withdraw_error'
              : 'add_error']: "Oops, insufficient funds.",
          },
          successMessage: '',
          isConfirmationOpen: false // Close the confirmation modal if transaction fails
        });
      }
      }

      // confirmation step before initiating transactions 

  
      
    
  

    }
  };

  /*  */

  handleConfirmTransaction = () => {

    let { amount, account } = this.state;

    const { selectedType } = this.props;

    if (selectedType === 'withdraw' && amount <= account.total_balance) {

      this.props.dispatch(initiateWithdrawAmount(account.account_id, amount));

      this.setState({

        errorMsg: '',
        amount: '', // Reset amount field;
        successMessage: 'Withdrawal Successful',
        isConfirmationOpen: false, // Close the confirmation modal after successful transaction
        isSuccessConfirmationOpen: true

      });

    } else if (selectedType === 'deposit') {

      this.props.dispatch(initiateDepositAmount(account.account_id, amount));

      this.setState({

        errorMsg: '',
        amount: '', // Reset amount field;
        successMessage: 'Deposit Successful',
        isConfirmationOpen: false, // Close the confirmation modal after successful transaction
        isSuccessConfirmationOpen: true

      });

    } 

  };

  handleCancelTransaction = () => {

    this.setState({
      errorMsg: '',
      amount: '', // Reset amount field;
      isConfirmationOpen: false,
      successMessage: '',
      
    });
  
};

handleContinueTransaction = () => {

  this.setState({
    errorMsg: '',
    amount: '',
    isSuccessConfirmationOpen: false,
    successMessage: ''
  });

};

  handleAddAccount = (account) => {
    const { account_no, bank_name, ifsc } = account;
    this.props
      .dispatch(initiateAddAccntDetails(account_no, bank_name, ifsc))
      .then(() => this.props.dispatch(initiateGetAccntDetails()));
  };

  render() {

    const { selectedType } = this.props;
    const { editAccount, ifsc, errorMsg, account, successMessage, isConfirmationOpen, isSuccessConfirmationOpen } = this.state;

    const account_no = account.account_no ? maskNumber(account.account_no) : '';
    const account_balance = account.total_balance ? moneyFormat(account.total_balance) : ''; /* Displays money as in Rands */
    
    const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

    return account_no ? (

      editAccount ? (

        <div className="edit-account-form">
          <h3>
            Account details
            <a
              href="/#"
              className="edit-account"
              onClick={this.handleEditAccount}
            >
              Go Back
            </a>
          </h3>
          <hr />
          <Form>
            {errorMsg && errorMsg.update_error && (
              <p className="errorMsg">{errorMsg.update_error}</p>
            )}
            



            <Form.Group controlId="acc_no">
              <Form.Label>Account number:</Form.Label>
              <span className="label-value">{account && account_no}</span>
            </Form.Group>
            <Form.Group controlId="bank_name">
              <Form.Label>Bank name:</Form.Label>
              <span className="label-value">
                {account && account.bank_name}
              </span>
            </Form.Group>
            <Form.Group controlId="ifsc">
              <Form.Label>IFSC code:</Form.Label>
              <span className="label-value">{account && account.ifsc}</span>
              <Form.Control
                type="text"
                placeholder="Enter new IFSC code"
                value={ifsc}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            

            <Button
              variant="primary"
              onClick={() => this.handleUpdateAccount(ifsc)}
            >
              Update details
            </Button>
          </Form>
        </div>
      ) : (

        /*  For when the user wants to Deposit or withdraw funds*/

        <div className="account-form-container">
          

          
          
          <Form onSubmit={this.handleOnSubmit} className="account-form">

            <Form.Group controlId="type">

              <div className='account-form-withdraw-heading'>
              <Form.Label><h3>{type}</h3></Form.Label>
              
              </div>

              
            </Form.Group>

            <hr />

            <Form.Group controlId="accnt_no">
              <Form.Label>Account number: </Form.Label>
              <span className="label-value">{account && account_no}</span>
            </Form.Group>
            <Form.Group controlId="accnt_no">
              <Form.Label>Current balance: </Form.Label>
              <span className="label-value">
                 {account && account_balance}
              </span>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter amount to ${selectedType}`}
                value={this.state.amount}
                onChange={this.handleAmountChange}
              />
            </Form.Group>
            {errorMsg && errorMsg.withdraw_error && (
            <p className="errorMsg">{errorMsg.withdraw_error}</p>
          )}
          {errorMsg && errorMsg.add_error && (
            <p className="errorMsg">{errorMsg.add_error}</p>
          )}
          {successMessage && <p className='successMessage'>{successMessage}</p>}

           {/** */}

           {isConfirmationOpen && (
            
      <Customconfirmmodal
        heading={`${selectedType} confirmation`}
        message={`Are you sure that you want to  ${selectedType} R ${this.state.amount}?`}
        onConfirm={this.handleConfirmTransaction}
        onCancel={this.handleCancelTransaction}
      />
    )}

    {isSuccessConfirmationOpen && (

      <CustomSuccessModal 
      
      message={`Your ${selectedType} was successfull.`}
      onConfirm={this.handleContinueTransaction }
      />

    )}

          

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
    ) : (
      <AddAccountForm handleAddAccount={this.handleAddAccount} />
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.auth && state.auth.email,
  account: state.account,
  errors: state.errors,
});

export default connect(mapStateToProps)(AccountForm); 