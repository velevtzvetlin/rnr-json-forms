import React from 'react';
import DateSelectionRenderer from './DateSelectionRenderer';
import { DateWidgetControl } from './types';

const DateWidget: React.FC<DateWidgetControl> = (props) => (
    <DateSelectionRenderer {...props} mode="date" />
);

export default DateWidget;
