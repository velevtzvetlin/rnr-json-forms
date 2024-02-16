import React, { useEffect, useState, useCallback } from 'react';
import { debounce, isFunction } from 'lodash';
import { formatMask } from '../../utils';
import TextInput from './TextInput';

interface TextInputWidgetProps {
    data: any;
    onChange: (value: string) => void;
    keyboardType?: string;
    maskProps: {
        textParser: (value: string) => string;
        unmask: (value: string) => string;
        mask?: string | ((value: string, direction: 'in' | 'out') => string);
        maskParser: (value: string) => string;
    }
}

const TextInputWidget = (props: any) => {
    const { data, onChange } = props;
    const [localValue, setLocalValue] = useState('');

    const debouncedOnChange = useCallback(
        debounce((newValue: string) => {
            onChange(newValue);
        }, 300),
        []
    );

    const parse = (text: string) => {
        const { maskProps } = props;
        const { mask, textParser, maskParser } = maskProps;
        if (!mask) {
            return textParser(text);
        }
        if (isFunction(mask)) {
            return textParser(mask(text, 'out'));
        }
        return textParser(formatMask(text, mask, maskParser));
    };

    const handleInputChange = (value: string) => {
        const { maskProps } = props;
        const { unmask } = maskProps;
        const maskedValue = parse(value);
        setLocalValue(maskedValue);
        debouncedOnChange(unmask(maskedValue));
    };

    useEffect(() => {
        const maskedVal = data ? parse(data) : ''
        setLocalValue(maskedVal)
    }, [])


    return (
        <TextInput
            key={'test'}
            value={localValue}
            onChangeText={handleInputChange}
            {...props}
        />
    );
};
export default TextInputWidget;


TextInputWidget.defaultProps = {
    maskProps: {
        textParser: (value: string) => value,
        unmask: (value: string) => value,
        maskParser: (value: string) => value
    }
};