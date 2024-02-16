import React from 'react';
import DateSelectionRenderer from './DateSelectionRenderer';
import { DateWidgetControl } from './types';

const DateTimeWidget: React.FC<DateWidgetControl> = props => (
    <DateSelectionRenderer {...props} mode="datetime" />
);

export default DateTimeWidget;
