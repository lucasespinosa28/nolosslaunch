import React from 'react';

interface TransactionAlertProps {
  isConfirming: boolean;
  isConfirmed: boolean;
  hash: string | undefined;
}

const TransactionAlert: React.FC<TransactionAlertProps> = ({ isConfirming, isConfirmed, hash }) => {
  let message = '';
  let type = '';

  if (isConfirming) {
    message = 'Transaction is being confirmed...';
    type = 'info';
  } else if (isConfirmed) {
    message = 'Transaction confirmed successfully!';
    type = 'success';
  } else if (hash) {
    message = 'Transaction submitted. Waiting for confirmation...';
    type = 'info';
  }

  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100 text-green-700' : 
                  type === 'info' ? 'bg-blue-100 text-blue-700' : 
                  'bg-yellow-100 text-yellow-700';

  return (
    <div className={`mb-4 mt-4 p-4 rounded-md ${bgColor}`}>
      {message}
    </div>
  );
};

export default TransactionAlert;