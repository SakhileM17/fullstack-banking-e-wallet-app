import React, { useState } from 'react';
import { moneyFormat } from '../utils/moneyformatter';

/* This file contains the bank statement of the account holder, shows bank statement for when account holder wants to view on screen */

const Report = ({ transactions }) => {

  /* Bank statement consists of paginations and currenely has 15 transactions per paginations */
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 15;

  // Calculate the index range for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (

    <div className="report-table">

      {/* Bank Statement - this table is the user bank statement */}

      <table className="table table-striped table-hover">

        <thead>
          <tr>
            <th>Date</th>
            <th>Deposits</th>
            <th>Withdrawals</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.formatted_date}</td>
              <td>{transaction.deposit_amount ? moneyFormat(transaction.deposit_amount) : ''}</td>
              <td>{transaction.withdraw_amount ? moneyFormat(transaction.withdraw_amount) : ''}</td>
              <td>{transaction.balance ? moneyFormat(transaction.balance) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Report;
