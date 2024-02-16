import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import { withJsonFormsControlProps } from "@jsonforms/react";
import {
    ControlProps,
    optionIs,
    RankedTester,
    rankWith,
} from "@jsonforms/core";
import RNFS from 'react-native-fs';
import { Icon } from '@rneui/base';
import FastImage from "react-native-fast-image";
import { Camera } from 'react-native-camera-kit';
import withSafeAreaLabel from "../hoc/withLabel";

type NullablePhotoState = {
    uri: string;
    name: string
} | null;

interface CameraInstance {
    capture: () => Promise<NullablePhotoState>;
}


const PhotoControl = ({ data, handleChange, path, uischema, errors }: ControlProps) => {
    const [pendingFile, setPendingFile] = useState<string | null>(null);
    const [photoCaptureOpen, setPhotoCaptureOpen] = useState(false)
    const cameraRef = useRef<CameraInstance | null>(null);

    const renderFormUi = () => {
        if (data) {
            return (
                <FastImage
                    style={{ height: 100, width: 200 }}
                    source={{
                        uri: `data:image/jpeg;base64,${data}`
                    }}
                    resizeMode={FastImage.resizeMode.contain} />
            )
        }

        return (
            <Text style={
                errors ?
                    styles.promptTextError :
                    styles.promptText
            }>
                Tap to add photo
            </Text>
        );
    }

    const openPhotoCaptureFlow = () => {
        setPhotoCaptureOpen(true)
    }

    const cancelPhotoCapture = () => {
        setPhotoCaptureOpen(false);
        setPendingFile(null);
    }

    const capturePhoto = async (): Promise<void> => {
        try {
            const pendingFile = await cameraRef?.current?.capture();
            if (pendingFile) {
                const fileUri = pendingFile.uri;
                const base64Image = await RNFS.readFile(fileUri!, 'base64');
                setPendingFile(base64Image);
            } else {
                throw new Error('Invalid photo from camera component');
            }
        } catch (error) {
            cancelPhotoCapture();
        }
    };

    const save = async () => {
        try {
            if (pendingFile) {
                // const sourceFilePath = pendingFile.uri;
                // const destinationFilePath = `${tempStorage}/${pendingFile.name}`;
                // await RNFS.moveFile(sourceFilePath, destinationFilePath)
                handleChange(path, pendingFile);
                cancelPhotoCapture();
            } else {
                throw new Error('Invalid photo')
            }
        } catch (e) {
            cancelPhotoCapture()
        }
    }

    const getIconColor = () => {
        if (errors) {
            return 'red';
        } else if (data) {
            return 'green'
        } return 'black'
    }

    const getIcon = () => {
        return data ? 'check' : 'add-a-photo'
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={openPhotoCaptureFlow}
                style={[styles.formButtonContainer, ...errors ? [styles.formButtonContainerErrors] : [styles.formButtonBasic]]}
            >
                <View>
                    {renderFormUi()}
                </View>
                <View>
                    <Icon
                        size={30}
                        color={getIconColor()}
                        name={getIcon()}
                    />
                </View>
            </TouchableOpacity>
            <SafeAreaView style={{ flex: 1 }}>
                <Modal transparent={true} visible={photoCaptureOpen}>
                    <View style={styles.container}>
                        <View style={styles.modalContainerContents}>
                            <Camera
                                flashMode={'off'}
                                zoomMode='off'
                                style={pendingFile ? styles.shrink : styles.expand}
                                ref={cameraRef}
                                saveToCameraRoll={false}
                            />
                            <FastImage
                                style={pendingFile ? styles.expand : styles.shrink}
                                source={{
                                    uri: pendingFile ? `data:image/jpeg;base64,${pendingFile}` : ''
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={cancelPhotoCapture}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={styles.bottomBarButtonContainer}>
                                {Boolean(!pendingFile) && (
                                    <TouchableOpacity onPress={capturePhoto} style={styles.captureButton} >
                                        <Text style={{ color: 'white' }}>Capture</Text>
                                    </TouchableOpacity>
                                )}
                                {Boolean(pendingFile) && (
                                    <TouchableOpacity
                                        style={styles.confirmButton}
                                        onPress={save}
                                    >
                                        <Text style={styles.confirmText}>Confirm</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    )
}

export const photoControlTester: RankedTester = rankWith(
    5,
    optionIs("format", "photo"),
);

export default withJsonFormsControlProps(withSafeAreaLabel(PhotoControl));


const styles = StyleSheet.create({
    formButtonContainer: {
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
    formButtonContainerErrors: {
        borderColor: 'red'
    },
    formButtonBasic: {
        borderColor: 'black'
    },
    promptText: {
        color: 'black'
    },
    promptTextError: {
        color: 'red'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(80, 80, 80, 0.3)'
    },
    modalContainerContents: {
        flexDirection: 'row',
        width: '95%',
        height: '95%',
        borderWidth: 1,
        orderColor: 'black',
        borderRadius: 5
    },
    bottomBarButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120
    },
    captureButton: {
        backgroundColor: 'green',
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    cancelButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        borderWidth: 2,
        borderColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    confirmButton: {
        position: 'absolute',
        right: 20,
        borderWidth: 2,
        padding: 8,
        borderRadius: 5
    },
    confirmText: {
        fontSize: 20,
        fontWeight: '700',
    },
    cancelText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'red'
    },
    shrink: { opacity: 0, height: 0 },
    expand: { flex: 1 },
});
