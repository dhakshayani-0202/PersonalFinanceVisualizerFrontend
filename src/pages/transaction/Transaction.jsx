// @ts-nocheck
import React, { useCallback, useState } from 'react';
import TransactionCreation from "./CreateTransaction";
import TransactionList from './transactionList';
import { useDispatch } from 'react-redux';
import { getAllTransactions } from '@/redux/features/transactionSlice';

const Transaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [refreshTransactions, setRefreshTransactions] = useState(() => () => {});

  return (
    <div className="w-full h-[88vh] overflow-y-hidden flex bg-white rounded-lg">
      <div className="w-2/5 pt-4 pl-6">
        <TransactionCreation
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          refreshTransactions={refreshTransactions}
        />
      </div>
      <div className="w-3/5">
        <TransactionList setSelectedTransaction={setSelectedTransaction} onRefetchReady={(refetchFn) => setRefreshTransactions(() => refetchFn)}/>
      </div>
    </div>
  );
};

export default Transaction;
