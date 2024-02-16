import {
    ControlProps,
    optionIs,
    RankedTester,
    rankWith
} from "@jsonforms/core";
import { Icon } from '@rneui/base';
import SignaturePad from 'react-native-signature-pad';
import { rotate } from '@meedwire/react-native-image-rotate';
import FastImage from "react-native-fast-image";
import RNFS from 'react-native-fs';
import { withJsonFormsControlProps } from "@jsonforms/react";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import withsafeareaLabel from '../hoc/withLabel'


type NullableBase64Data = {
    base64DataUrl: string;
} | null;

const SignaturePadControl = ({ data, errors, path, handleChange, uischema, required, schema }: ControlProps) => {
    const [sigPadOpen, setSigPadOpen] = useState(false);
    const [base64Val, setBase64Val] = useState<NullableBase64Data>(null)

    const onChange = (base64Val: NullableBase64Data) => {
        setBase64Val(base64Val)
    }

    const closeSigpad = () => {
        setSigPadOpen(false);
        setBase64Val(null);
    }

    const openSigpad = () => {
        setSigPadOpen(true)
    }

    const saveSignature = async () => {
        try {
            if (base64Val) {
                const base64Split = base64Val.base64DataUrl.split("data:image/png;base64,"); //base64Image is my image base64 string
                const pathOfRotatedImage = await rotate({ type: 'base64', content: base64Split[1], angle: 90 });
                const rotatedBase64 = await RNFS.readFile(pathOfRotatedImage, 'base64')
                handleChange(path, rotatedBase64);
                closeSigpad();
            } else {
                throw new Error('Invalid signature')
            }
        } catch (error) {
            closeSigpad()
        }
    }

    const renderSigState = () => {
        if (data) {
            return (
                <FastImage
                    style={{ width: 200, height: 100 }}
                    source={{
                        uri: `data:image/png;base64,${data}`,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            )
        }

        return (
            <Text style={
                errors ?
                    styles.promptTextError :
                    styles.promptText
            }>
                Tap to enter signature
            </Text>
        );
    }

    const getIconColor = () => {
        if (errors) {
            return 'red';
        } else if (data) {
            return 'green'
        } return 'black'
    }

    const getIcon = () => {
        return data ? 'check' : 'edit'
    }

    const onError = () => {
        closeSigpad()
    }

    return (
        <View>
            <TouchableOpacity onPress={openSigpad}
                style={
                    [
                        styles.touchableContainer,
                        ...errors ?
                            [styles.touchableContainerError] :
                            [styles.touchableContainerDefault]
                    ]
                }
            >
                <View>
                    {renderSigState()}
                </View>
                <View>
                    <Icon
                        size={30}
                        color={getIconColor()}
                        name={getIcon()}
                    />
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Modal
                    transparent={true}
                    visible={sigPadOpen}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalRowContainer}>
                            <View style={styles.modalButtonsCol}>
                                <TouchableOpacity
                                    onPress={saveSignature}
                                    disabled={!base64Val}
                                    style={styles.rotatedButton}
                                >
                                    <Text style={styles.buttonFont}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={closeSigpad}
                                    style={styles.rotatedButton}
                                >
                                    <Text style={styles.buttonFont}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <SignaturePad
                                    onError={onError}
                                    onChange={onChange}
                                    name=''
                                    penMinWidth={2}
                                    penMaxWidth={3}
                                    useFont={false}
                                    style={styles.sigPadCanvas}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export const signaturePadControlTester: RankedTester = rankWith(
    5,
    optionIs("format", "sigpad"),
);

export default withJsonFormsControlProps(withsafeareaLabel(SignaturePadControl));

const styles = StyleSheet.create({
    touchableContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#D3D3D3',
        padding: 10,
        margin: 10,
        minHeight: 100
    },
    touchableContainerError: {
        borderColor: 'red'
    },
    touchableContainerDefault: {
        borderColor: 'black'
    },
    promptText: {
        color: 'black'
    },
    promptTextError: {
        color: 'red'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(80, 80, 80, 0.3)'
    },
    modalRowContainer: {
        flexDirection: 'row', width: '95%', height: '95%', borderWidth: 3, borderColor: 'black', borderRadius: 5
    },
    modalButtonsCol: { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'grey' },
    rotatedButton: { transform: [{ rotate: '-90deg' }], marginVertical: 40 },
    buttonFont: { fontSize: 20 },
    sigPadCanvas: { backgroundColor: '#FFFFFF' }
});
