import {
    and,
    computeLabel,
    ControlProps,
    ControlState,
    isEnumControl,
    scopeEndsWith,
    optionIs,
    RankedTester,
    rankWith,
} from "@jsonforms/core";
import { Control, withJsonFormsControlProps } from "@jsonforms/react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "@rneui/base";
import withSafeAreaLabel from "../hoc/withLabel";

/** this is defined as a class component in order to extend from the jsonforms package's Control class */
export class RadioGroupControl extends Control<ControlProps, ControlState> {
    private onChange = (value: string) => {
        this.props.handleChange(this.props.path, value);
    }

    public render() {
        const { data, errors, schema } = this.props;
        const options = schema.enum;

        return (
            <View>
                <View style={[
                    styles.checkBoxGroupControlContainer,
                    ...errors ?
                        [styles.checkBoxGroupControlContainerError] :
                        []
                ]}>
                    {options?.map((option) => {
                        return (
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent' }}
                                title={option}
                                key={option}
                                checked={data == option}
                                onPress={() => this.onChange(option)}
                                iconType="material"
                                checkedIcon="check-box"
                                uncheckedIcon="check-box-outline-blank"
                            />
                        )
                    })}
                </View>
            </View>
        );
    }
}

export const radioGroupControlTester: RankedTester = rankWith(
    4,
    and(isEnumControl, optionIs("format", "radio")),
);

export default withJsonFormsControlProps(withSafeAreaLabel(RadioGroupControl));

const styles = StyleSheet.create({
    checkBoxGroupControlContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    checkBoxGroupControlContainerError: {
        borderColor: 'red',
    }
})