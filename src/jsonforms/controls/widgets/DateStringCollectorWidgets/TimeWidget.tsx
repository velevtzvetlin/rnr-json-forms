import React from 'react';
import DateSelectionRenderer from './DateSelectionRenderer';
import { DateWidgetControl } from './types';

const TimeWidget: React.FC<DateWidgetControl> = props => (
    <DateSelectionRenderer {...props} mode="time" />
);

export default TimeWidget;
