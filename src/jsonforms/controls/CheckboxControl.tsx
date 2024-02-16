import {
    and,
    computeLabel,
    ControlProps,
    ControlState,
    isPrimitiveArrayControl,
    RankedTester,
    rankWith,
    JsonSchema4
} from "@jsonforms/core";
import { Control, withJsonFormsControlProps } from "@jsonforms/react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "@rneui/base";
import withSafeAreaLabel from "../hoc/withLabel";


/** this is defined as a class component in order to extend from the jsonforms package's Control class */
export class CheckBoxGroupControl extends Control<ControlProps, ControlState> {
    private onChange(value: string) {
        const { data } = this.props;
        let payload;
        if (data) {
            const index = data.findIndex((item: any) => item === value);
            if (index >= 0) {
                payload = [...data.slice(0, index), ...data.slice(index + 1)]
            } else {
                payload = [...data, value]
            }
        } else {
            payload = [value]
        }


        this.props.handleChange(this.props.path, payload);
    }

    public render() {
        const { data, description, errors, schema } =
            this.props;

        const isValid = errors.length === 0;
       const options = (schema.items as JsonSchema4)?.enum || [];

        return (
            <View>
                <View style={[
                    styles.radioControlContainer,
                    ...errors ?
                        [styles.radioControlContainerError] :
                        []
                ]}>
                    {options.map((option: string) => {
                        return (
                            <View key={option} style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <CheckBox
                                    containerStyle={{ backgroundColor: 'transparent' }}
                                    title={option}
                                    checked={data && data.includes(option)}
                                    onPress={() => this.onChange(option)}
                                    iconType="material"
                                    checkedIcon="radio-button-checked"
                                    uncheckedIcon="radio-button-unchecked"
                                />
                            </View>
                        )
                    })}
                </View>
            </ View>
        );
    }
}

const styles = StyleSheet.create({
    radioControlContainer: {
        borderWidth: 1, borderRadius: 5, borderColor: 'black'
    },
    radioControlContainerError: {
        borderColor: 'red',
    }
})

export const checkBoxGroupControlTester: RankedTester = rankWith(
    15,
    and(isPrimitiveArrayControl)
);

export default withJsonFormsControlProps(withSafeAreaLabel(CheckBoxGroupControl));