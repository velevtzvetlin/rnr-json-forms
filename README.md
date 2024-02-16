# Project Name
@ameripharma/rnr-json-forms
## Description

React native renderers for json forms formatted structures

## Dependencies

This project relies on the following external libraries for essential functionality. Make sure to add them to your project's dependencies.

```json
"@jsonforms/core": "^3.1.0",
"@jsonforms/react": "^3.1.0",
"@meedwire/react-native-image-rotate": "^0.1.2",
"@react-native-community/datetimepicker": "^7.6.2",
"@rneui/base": "^4.0.0-rc.8",
"@types/lodash": "^4.14.202",
"ajv": "^8.0.1",
"ajv-errors": "^3.0.0",
"lodash": "^4.17.21",
"react-native-camera-kit": "^13.0.0",
"react-native-fast-image": "^8.6.3",
"react-native-fs": "^2.20.0",
"react-native-modal-datetime-picker": "^17.1.0",
"react-native-safe-area-context": "^4.9.0",
"react-native-signature-pad": "github:rpmsoftware/react-native-signature-pad",
"react-native-uuid": "^2.0.1",
"react-native-webview": "^13.6.0",
"react-native-vector-icons": "^10.0.3"
```

## Installation Instructions
- npm i
## ios
- pod install
- navigate to node_modules/react-native-vector-icons
- FONTS: drag /Fonts into xcode app target
- add the following to Info.plist

    ```xml
    <key>UIAppFonts</key>
    <array>
    <string>AntDesign.ttf</string>
    <string>Entypo.ttf</string>
    <string>EvilIcons.ttf</string>
    <string>Feather.ttf</string>
    <string>FontAwesome.ttf</string>
    <string>FontAwesome5_Brands.ttf</string>
    <string>FontAwesome5_Regular.ttf</string>
    <string>FontAwesome5_Solid.ttf</string>
    <string>FontAwesome6_Brands.ttf</string>
    <string>FontAwesome6_Regular.ttf</string>
    <string>FontAwesome6_Solid.ttf</string>
    <string>Foundation.ttf</string>
    <string>Ionicons.ttf</string>
    <string>MaterialIcons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
    <string>SimpleLineIcons.ttf</string>
    <string>Octicons.ttf</string>
    <string>Zocial.ttf</string>
    <string>Fontisto.ttf</string>
    </array>
    ```

## android
- android/build.gradle
    - minSdkVersion = 23
    - kotlin_version = "1.8.0"
    - dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
- FONTS: in android/app/build.gradle add the following
    - apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

## Caveats
- in order to leverage schema field default values, the schema needs to be passed through the ajv validator in the following manner to set the defaults in the initial object

```javascript
    const [stateData, setData] = useState({ data: {}, errors: {} });
    useEffect(() => {
        const ajv = createAjv({ useDefaults: true });
        const validate = ajv.compile(schemaObject);
        const formStateCopy = cloneDeep(stateData.data)
        validate(formStateCopy)
        setData({ data: formStateCopy, errors: {} });
    }, [])
```