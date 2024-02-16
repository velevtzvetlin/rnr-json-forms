import React, { useMemo } from 'react';
import { View } from 'react-native';
import { JsonForms } from "@jsonforms/react";
import { RankedTester, ValidationMode } from "@jsonforms/core";
import * as controls from "./jsonforms/controls";
import * as complex from "./jsonforms/complex";
import * as layouts from "./jsonforms/layouts";
import { createAjv } from '@jsonforms/core';
import ajvErrors from 'ajv-errors';

export * from "./jsonforms/controls";
export * from "./jsonforms/complex";
export * from "./jsonforms/layouts";

export const RNRenderers: { tester: RankedTester; renderer: any }[] = [
    {
        tester: controls.radioGroupControlTester,
        renderer: controls.RadioGroupControl,
    },
    {
        tester: controls.booleanInputControlTester,
        renderer: controls.BooleanControl,
    },
    {
        tester: controls.photoControlTester,
        renderer: controls.PhotoControl,
    },
    {
        tester: controls.signaturePadControlTester,
        renderer: controls.SignaturePadControl,
    },
    {
        tester: controls.stringInputControlTester,
        renderer: controls.StringInputControl,
    },
    {
        tester: controls.checkBoxGroupControlTester,
        renderer: controls.CheckBoxControl,
    },
    { tester: layouts.groupTester, renderer: layouts.GroupLayout },
    { tester: layouts.verticalLayoutTester, renderer: layouts.VerticalLayout },
    { tester: complex.labelRendererTester, renderer: complex.LabelRenderer },
    { tester: complex.categorizationTester, renderer: complex.Categorization },
];

export const RNCells: Array<{ tester: RankedTester; cell: any }> = [];

interface CustomJsonFormsProps {
    schema: any;
    uischema: any;
    data: any;
    onChange: (data: any) => void;
    validationMode: ValidationMode;
}

const CustomJsonForm: React.FC<CustomJsonFormsProps> = (props) => {
    const ajv = useMemo(() => ajvErrors(createAjv({ useDefaults: false, allErrors: true })), []);
    return (
        <View style={{ flex: 1}}>
            <JsonForms
                renderers={RNRenderers}
                cells={RNCells}
                ajv={ajv}
                {...props}
            />
        </View>
    )
}


export default CustomJsonForm;