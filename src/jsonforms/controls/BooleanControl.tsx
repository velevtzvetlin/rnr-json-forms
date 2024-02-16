import {
    and,
    computeLabel,
    ControlProps,
    ControlState,
    isEnumControl,
    scopeEndsWith,
    isStringControl,
    optionIs,
    RankedTester,
    rankWith,
    isBooleanControl,
} from "@jsonforms/core";
// import { Switch } from '@rneui/themed';
import { Switch } from '@rneui/base'
import { Control, withJsonFormsControlProps } from "@jsonforms/react";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import withSafeAreaLabel from "../hoc/withLabel";

/** this is defined as a class component in order to extend from the jsonforms package's Control class */
export class BooleanInputControl extends Control<ControlProps, ControlState> {
    constructor(props: any) {
        super(props);
    }


    private onChange = (value: boolean) => {
        this.props.handleChange(this.props.path, value);
    };

    public render() {
        const { label, data, required, description, errors, schema, visible, uischema } = this.props;
        const isValid = !errors
        return (
            <View
                style={{ margin: 10 }}
            >
                <Text>{this.props?.uischema?.label?.toString() || "Enter text here"}</Text>
                <Switch
                    style={{ margin: 10 }}
                    value={this.props.data}
                    onValueChange={this.onChange}
                />
            </View >
        );
    }
}

export const booleanInputControlTester: RankedTester = rankWith(
    20,
    isBooleanControl,
);

export default withJsonFormsControlProps(withSafeAreaLabel(BooleanInputControl));
