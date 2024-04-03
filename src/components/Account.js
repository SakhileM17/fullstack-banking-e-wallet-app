import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import AccountForm from './AccountForm';
import Summary from './Summary';


import { maskNumber } from '../utils/mask';
import { moneyFormat } from '../utils/moneyformatter';

import { greeting } from '../utils/greetings';

class Account extends React.Component {
  state = {
    selectedType: 'withdraw',
  };
  
  setSelectedType = (selectedType) => {
    this.setState({ selectedType });
  };



  render() {

    const { selectedType} = this.state;
    const { account } = this.props;

    const account_no = account.account_no ? maskNumber(account.account_no) : '';
    const account_balance = account.total_balance ? moneyFormat(account.total_balance) : ''; /* Displays money as in Rands */

    const user_greeting = greeting();


    return (
      
      <div className="account-container">

        <div className='account-container-header'>

          <div>
            <h3>{user_greeting}</h3>
          </div>

          <div>
            <h4>Account number : {account && account_no}</h4>
            <h4>Balance : {account && account_balance}</h4>
          </div>

        </div>

        <div>
          <p>Choose transaction : </p>
        </div>

        <div className='account-button-container'>
          <Button
            variant="primary"
            className={`${
              selectedType === 'withdraw' ? 'active account-btn' : 'account-btn'
            }`}
            onClick={() => this.setSelectedType('withdraw')}
          >
            Withdraw
          </Button>

          <Button
            variant="secondary"
            className={`${
              selectedType === 'deposit' ? 'active account-btn' : 'account-btn'
            }`}
            onClick={() => this.setSelectedType('deposit')}
          >
            Deposit
          </Button>

          <Button
            variant="info"
            className={`${
              selectedType === 'summary' ? 'active account-btn' : 'account-btn'
            }`}
            onClick={() => this.setSelectedType('summary')}
          >
            Statement
          </Button>
        </div>

        <div className='account-account-form-container'>
          {selectedType === 'withdraw' || selectedType === 'deposit' ? (
            <AccountForm selectedType={selectedType} />
          ) : (
            <Summary />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // Map Redux state to component props
  account: state.account,
  accountNumber: state.account.accountNumber, // Assuming your Redux state has account number
  balance: state.account.balance, // Assuming your Redux state has balance
});

export default connect(mapStateToProps)(Account);