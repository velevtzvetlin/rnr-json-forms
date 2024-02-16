import React from 'react';
import TextInputWidget from './TextInputWidget';
import { ControlProps } from '@jsonforms/core';

const EmailWidget = (props: ControlProps & { onChange: (value: string) => void }) => {
  return (
    <TextInputWidget {...props} keyboardType="email-address" />
  );
}

export default EmailWidget;
