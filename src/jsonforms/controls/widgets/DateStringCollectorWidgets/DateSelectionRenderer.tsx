import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text, Icon } from '@rneui/base';
import { computeLabel } from '@jsonforms/core';
import { DateWidgetControl } from './types';
interface DateSelectionRendererWithMode extends DateWidgetControl {
    mode: "date" | "datetime" | "time";
}

const DateSelectionRenderer: React.FC<DateSelectionRendererWithMode> = ({
    data,
    mode,
    onChange,
    required,
    errors,
    uischema
}) => {
    const [modalOpen, toggleModalState] = useState(false);

    const handleConfirm = (date: Date) => {
        let formattedDate;
        switch (mode) {
            case 'datetime': {
                const year = date.getUTCFullYear();
                const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
                const day = date.getUTCDate().toString().padStart(2, '0');
                const hour = date.getUTCHours().toString().padStart(2, '0');
                const minute = date.getUTCMinutes().toString().padStart(2, '0');
                formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
                break;
            }
            case 'date': {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
                const day = date.getDate().toString().padStart(2, '0');
                formattedDate = `${year}-${month}-${day}`;
                break;
            } default: {
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                formattedDate = `${hour}:${minute}`;
            }
        }
        onChange(formattedDate)
        toggleModalState(false)
    }

    const getCurrentDateOrSelection = () => {
        if (!data) {
            return new Date();
        }
        switch (mode) {
            case 'datetime': {
                let dateUTC = new Date(data);
                let offset = dateUTC.getTimezoneOffset();
                let dateLocal = new Date(dateUTC.getTime() - (offset * 60000));
                return dateLocal;
            }
            case 'date': {
                const [year, month, day] = data.split('-');
                const currentDate = new Date();
                currentDate.setFullYear(year, month - 1, day);
                return currentDate;
            } default: {
                const [hours, minutes] = data.split(':')
                const currentDate = new Date();
                currentDate.setHours(hours, minutes, 0);
                return currentDate;
            }
        }
    }


    const renderDatePickerModal = () => {
        return (
            <DateTimePickerModal
                isVisible={modalOpen}
                mode={mode}
                minuteInterval={10}
                date={getCurrentDateOrSelection()}
                onConfirm={handleConfirm}
                onCancel={() => { toggleModalState(false) }}
            />
        )
    }

    const renderSelectionOrPrompt = () => {
        if (!data) {
            return 'Add Date'
        }

        switch (mode) {
            case 'datetime': {
                let dateUTC = new Date(data);
                let offset = dateUTC.getTimezoneOffset();
                let dateLocal = new Date(dateUTC.getTime() - (offset * 60000));
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true, // 24-hour format
                } as const;

                return dateLocal.toLocaleString(undefined, options);
            }
            case 'date': {
                return data
            } default: {
                const [hours, minutes] = data.split(':');
                const hour = parseInt(hours, 10);
                const period = hour < 12 ? 'AM' : 'PM';
                const formattedTime = `${hour % 12}:${minutes} ${period}`;
                return formattedTime
            }
        }
    }

    const getIcon = () => {
        switch (mode) {
            case 'date':
            case 'datetime':
                return 'calendar-today'
            default:
                return 'access-time'
        }
    }

    let labelString = 'Submit Date';
    if (typeof uischema?.label === 'string') {
        labelString = uischema?.label;
    }


    const getIconColor = () => {
        if (errors) {
            return 'red';
        } else if (data) {
            return 'green'
        } return 'black'
    }

    const getIconColorBlackOrError = () => {
        if (errors) {
            return 'red';
        }
        return 'black';
    }


    return (
        <View>
            <TouchableOpacity
                style={
                    [
                        styles.touchableContainer,
                        ...errors ?
                            [styles.touchableContainerError] :
                            [styles.touchableContainerDefault]
                    ]
                }
                onPress={() => {
                    toggleModalState(true);
                }}
            >
                <Icon
                    size={30}
                    color={getIconColor()}
                    name={data ? 'check' : 'more-horiz'}
                />
                <View>
                    <Text>{renderSelectionOrPrompt()}</Text>
                </View>
                <View>
                    <Icon
                        color={getIconColorBlackOrError()}
                        size={30}
                        name={getIcon()} />
                </View>
            </TouchableOpacity>
            {renderDatePickerModal()}
        </View>
    );
}

export default DateSelectionRenderer;

const styles = StyleSheet.create({
    touchableContainer: {
        borderWidth: 1,
        backgroundColor: '#D3D3D3',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3
    },
    touchableContainerError: {
        borderColor: 'red'
    },
    touchableContainerDefault: {
        borderColor: 'black'
    },
})