import React from "react";
import {
    ControlProps,
    ControlState,
    isStringControl,
    RankedTester,
    rankWith,
} from "@jsonforms/core";
import { Control, withJsonFormsControlProps } from "@jsonforms/react";
import { StyleSheet, View } from "react-native";
import EmailWidget from "./widgets/EmailWidget";
import TextInputWidget from "./widgets/TextInputWidget";
import DateWidget from "./widgets/DateStringCollectorWidgets/DateWidget";
import DateTimeWidget from "./widgets/DateStringCollectorWidgets/DateTimeWidget";
import TimeWidget from "./widgets/DateStringCollectorWidgets/TimeWidget";
import PasswordWidget from "./widgets/PasswordWidget";
import PhoneNumberWidget from "./widgets/PhoneNumberWidget";
import withSafeAreaLabel from "../hoc/withLabel";

/** this is defined as a class component in order to extend from the jsonforms package's Control class */
export class StringInputControl extends Control<ControlProps, ControlState> {
    private onChange = (value: string) => {
        this.props.handleChange(this.props.path, value);
    }
    /********
     * 
     *
     *  formats: 
     * date
     * datetime
     * time
     * email
     * password
     * weight
     * 
     * 
     ********/

    private getDefaultWidget = () => {
        const { uischema } = this.props;
        const format = uischema?.options?.format;
        switch (format) {
            case 'date':
                return DateWidget;
            case 'datetime':
                return DateTimeWidget;
            case 'time':
                return TimeWidget;
            case 'email':
                return EmailWidget
            case 'password':
                return PasswordWidget
            case 'phoneNumber':
                return PhoneNumberWidget
            default:
                return TextInputWidget;
        }
    }

    render() {
        const Widget = this.getDefaultWidget();
        return (
            <View
                style={{ margin: 10 }}
            >
                <Widget
                    {...this.props}
                    onChange={this.onChange}
                />
            </View >
        );
    }
}

export const stringInputControlTester: RankedTester = rankWith(
    3,
    isStringControl,
);

export default withJsonFormsControlProps(withSafeAreaLabel(StringInputControl));