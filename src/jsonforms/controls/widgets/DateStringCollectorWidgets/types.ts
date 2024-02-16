import { ControlProps } from "@jsonforms/core";

export interface DateWidgetControl extends ControlProps {
    onChange: (value: string) => void;
}
