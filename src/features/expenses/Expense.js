import React from 'react';
import { useSelector } from 'react-redux';
import { selectExpenseById } from './expensesApiSlice';

const Expense = ({ expenseId }) => {
  const expense = useSelector(state => selectExpenseById(state, expenseId));
  console.log('Expense:', expense);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? '-'
      : date.toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
  };

  if (expense) {
    return (
      <tr>
        <td className="py-3">{expense.expenseId || '-'}</td>
        <td className="py-3">{formatDate(expense.expenseDate)}</td>
        <td className="py-3">{expense.expenseAmount || '-'}</td>
        <td className="py-3">{expense.paymentCategory?.paymentCategory || '-'}</td>
        <td className="py-3">{expense.paymentType?.paymentType || '-'}</td>
      </tr>
    );
  } else {
    return null;
  }
};

export default Expense;