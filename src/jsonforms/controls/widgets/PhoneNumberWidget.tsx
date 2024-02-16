import React from 'react';
import TextInputWidget from './TextInputWidget';

const PhoneNumberWidget = (props: any) => {
    const maskParser = (value: string) => {
        const text = (value === null || value === undefined) ? '' : `${value}`;
        return text.replace(/[^0-9]/g, '');
    };

    function unmask(inputString: string) {
        return inputString.replace(/\D/g, ''); // \D matches non-digits and g stands for global replacement
    }

    const mask = '(999) 999-9999'
    const maskProps = {
        maskParser,
        mask,
        unmask,
        textParser: (value: string) => value,
    }

    return (
        <TextInputWidget
            {...props}
            keyboardType='number-pad'
            maskProps={maskProps}
        />
    );
}

export default PhoneNumberWidget;
