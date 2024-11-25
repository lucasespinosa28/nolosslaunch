import { useState, useEffect } from 'react';

interface CountdownResult {
  countdown: string;
  isRefundDatePassed: boolean;
}

const useCalculateCountdown = (refundDate: string): CountdownResult => {
  const [countdown, setCountdown] = useState<string>('');
  const [isRefundDatePassed, setIsRefundDatePassed] = useState<boolean>(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const refundTime = new Date(refundDate).getTime();
      const distance = refundTime - now;

      if (distance < 0) {
        setIsRefundDatePassed(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [refundDate]);

  return { countdown, isRefundDatePassed };
};

export default useCalculateCountdown;