import { faker } from '@faker-js/faker';
import { UseFormSetValue } from 'react-hook-form';
import { FormValues } from '../types/FormTypes';

export const fillRandomData = (setValue: UseFormSetValue<FormValues>, accountAddress: string | undefined) => {
  const randomTokenName = faker.word.words(3);
  const randomSymbol = () => (randomTokenName.split(' ').map(word => word[0]).join('').toUpperCase());
  setValue('tokenName', randomTokenName);
  setValue('tokenSymbol', randomSymbol());
  setValue('countdownDays', Math.floor(Math.random() * 30) + 1);
  setValue('rate', faker.number.int({ min: 1, max: 100 }));
  setValue('maxSupply', faker.number.int({ min: 1e6, max: 1e8 }));
  setValue('initialOwner', accountAddress || '');
};