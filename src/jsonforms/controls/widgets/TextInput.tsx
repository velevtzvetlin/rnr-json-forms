import React from 'react';
import { computeLabel } from '@jsonforms/core';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { noop, pick } from 'lodash';
import {
    TextInput as RNTextInput, StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    empty: {},
    defaults: {
        paddingTop: 5,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        minHeight: 40,
        textAlignVertical: 'center',
    },
});

const allowedAttributes = [
    'allowFontScaling',
    'autoCapitalize',
    'autoCompleteType',
    'autoCorrect',
    'autoFocus',
    'blurOnSubmit',
    'caretHidden',
    'clearButtonMode',
    'clearTextOnFocus',
    'contextMenuHidden',
    'dataDetectorTypes',
    'defaultValue',
    'disableFullscreenUI',
    'editable',
    'enablesReturnKeyAutomatically',
    'importantForAutofill',
    'inlineImageLeft',
    'inlineImagePadding',
    'inputAccessoryViewID',
    'keyboardAppearance',
    'keyboardType',
    'maxFontSizeMultiplier',
    'maxLength',
    'multiline',
    'numberOfLines',
    'onBlur',
    'onChange',
    'onChangeText',
    'onContentSizeChange',
    'onEndEditing',
    'onFocus',
    'onKeyPress',
    'onLayout',
    'onScroll',
    'onSelectionChange',
    'onSubmitEditing',
    'placeholder',
    'placeholderTextColor',
    'returnKeyLabel',
    'returnKeyType',
    'rejectResponderTermination',
    'scrollEnabled',
    'secureTextEntry',
    'selection',
    'selectionColor',
    'selectionState',
    'selectTextOnFocus',
    'showSoftInputOnFocus',
    'spellCheck',
    'textContentType',
    'style',
    'textBreakStrategy',
    'underlineColorAndroid',
    'value',
    'pointerEvents',
];


const TextInput = (props: any) => {
    const { errors } = props;

    return (
        <RNTextInput
            {...pick(props, allowedAttributes)}
            style={[
                { borderWidth: 1, padding: 10, borderRadius: 5 },
                errors && { borderCo213lor: 'red' }, // Change border color to red when errors is truthy
            ]}
            placeholder={props?.uischema?.label || 'Enter text here'}
        />
    );
};

TextInput.propTypes = {
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    hasError: PropTypes.bool,
    className: PropTypes.string,
    onRef: PropTypes.func,
    editable: PropTypes.bool,
};

TextInput.defaultProps = {
    style: styles.empty,
    multiline: false,
    numberOfLines: 1,
    readonly: false,
    disabled: false,
    hasError: false,
    className: '',
    onRef: noop,
    editable: true,
};

export default TextInput;
