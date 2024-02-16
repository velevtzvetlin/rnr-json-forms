import React from 'react';
import TextInputWidget from './TextInputWidget';

const PasswordWidget = (props: any) => {
  return (
    <TextInputWidget {...props} secureTextEntry />
  );
}

export default PasswordWidget;
