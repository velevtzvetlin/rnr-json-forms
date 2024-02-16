import React from "react";
import {
    computeLabel
} from "@jsonforms/core";
import { Text, View } from "react-native";

const withSafeAreaLabel = (WrappedComponent: any) => {
    return (props: any) => {
        const { uischema, required, errors } = props;
        let labelString = 'Submit Signature';
        if (typeof uischema?.label === 'string') {
            labelString = uischema?.label;
        }

        const renderErrorString = () => {
            if (errors) {
                return (<Text style={{ color: 'red' }}>{errors}</Text>)
            }
            return null;
        }

        return (
            <View style={{ flex: 1, margin: 10 }}>
                <Text> {computeLabel(
                    labelString,
                    !!required,
                    !!uischema?.options?.hideRequiredAsterisk,
                )}</Text>
                <WrappedComponent
                    {...props}
                />
                {renderErrorString()}
            </View>
        )
    }
};

export default withSafeAreaLabel;