import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
export const isAndroid = () => Platform.OS === 'android';
export const platformSpecificFileSystemPrefix = isAndroid()
    ? `file://`
    : '';
export const appFileSpace = `${RNFS.DocumentDirectoryPath}/FloCare`
export const tempStorage = `${appFileSpace}/tempStorage`;

const maskOptions = {
    undefined: /^$/,
    a: /^[A-Za-zÀ-ÖØ-öø-ÿ]$/,
    9: /^[0-9]$/,
    '*': /^.$/,
};

const defaultParser = (value: string) => ((value === null || value === undefined) ? '' : `${value}`);

export const formatMask = (value: string, mask: string, maskParser: Function) => {
    const parse = maskParser || defaultParser;
    const text = parse(value);
    let result = '';
    let cursorText = 0;
    let cursorMask = 0;
    for (; cursorText < text.length; cursorText += 1) {
        let charText = text[cursorText];
        let charMask;
        let extras = '';
        do {
            charMask = mask[cursorMask];
            cursorMask += 1;
            if (!(charMask in maskOptions)) {
                extras += charMask;
                if (charMask === charText) {
                    cursorText += 1;
                    charText = text[cursorText] || '';
                    result += extras;
                    extras = '';
                }
            }
        } while (!(charMask in maskOptions));
        if (maskOptions[charMask as keyof typeof maskOptions].test(charText)) {
            result += extras + charText;
        }
    }
    return result;
};

