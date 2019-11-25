import React from 'react';
import { UNKNOWN_ERROR } from '../base/constants/messages';

interface Props {
  message?: string;
}

export const ErrorDisplay: React.FC<Props> = ({ message = UNKNOWN_ERROR }) => {
  return <div>{message}</div>;
};
