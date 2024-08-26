import { useEffect, useState } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountdown = (startDate: string | Date, endDate: string | Date): CountdownValues => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const [countDown, setCountDown] = useState(end - start);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(end - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [end]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number): CountdownValues => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export { useCountdown };