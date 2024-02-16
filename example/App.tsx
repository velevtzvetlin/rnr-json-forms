/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';
import { CustomJsonForm } from '@ameripharma/rnr-json-forms'
import { createAjv } from '@jsonforms/core';
import { cloneDeep } from 'lodash';
import { request, PERMISSIONS, Permission } from 'react-native-permissions';

function App(): React.JSX.Element {
  const [stateData, setData] = useState({ data: {}, errors: {} });

  const requestCameraPermission = async () => {
    try {
      let permission;
      if (Platform.OS === 'android') {
        permission = await requestAndroidPermission(PERMISSIONS.ANDROID.CAMERA);
      } else if (Platform.OS === 'ios') {
        permission = await requestIOSPermission(PERMISSIONS.IOS.CAMERA);
      }
      return permission;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const requestAndroidPermission = async (permissionType: Permission) => {
    const status = await request(permissionType);
    return status;
  };

  const requestIOSPermission = async (permissionType: Permission) => {
    const status = await request(permissionType);
    return status;
  };

  const schemaObject = {
    type: "object",
    properties: {
      date: {
        type: "string",
        title: "date only"
      },
      done: {
        type: "boolean",
        title: "boolean done...",
        default: false
      },
      selectedOptions: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "Option 1",
            "Option 2",
            "Option 3"
          ]
        },
        minItems: 1
      },
      lotStickerPhoto: {
        type: "string"
      },
      signatureTwo: {
        type: "string",
        title: "siglabel..."
      },
      phoneNumber: {
        type: "string",
        title: "phone number field",
        pattern: "^[0-9]{10}$"
      },
      chronic: {
        type: "string",
        title: "Chronic label",
        enum: [
          "op1",
          "op2",
          "op3",
          "op4",
          "op5"
        ]
      },
      firstName: {
        type: "string",
        title: "patient first name",
        minLength: 3
      },
    }
  };

  useEffect(() => {
    requestCameraPermission();
    const ajv = createAjv({ useDefaults: true });
    const validate = ajv.compile(schemaObject);
    const formStateCopy = cloneDeep(stateData.data)
    validate(formStateCopy)
    setData({ data: formStateCopy, errors: {} });
  }, [])

  const item = {
    type: "Category",
    elements: [
      {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/done",
            label: "Did patient faint"
          },
          {
            type: "Control",
            scope: "#/properties/selectedOptions",
            label: "select one or more"
          },
          {
            type: "Control",
            scope: "#/properties/date",
            options: {
              hideRequiredAsterisk: false,
              format: "date"
            },
            label: "just a date"
          },
          {
            type: "Control",
            scope: "#/properties/signatureTwo",
            options: {
              format: "sigpad"
            },
            label: "Patient Signature"
          },
          {
            type: "Control",
            scope: "#/properties/phoneNumber",
            label: "Enter Phone number",
            options: {
              hideRequiredAsterisk: false,
              format: "phoneNumber"
            }
          },
          {
            type: "Control",
            scope: "#/properties/chronic",
            options: {
              format: "radio"
            },
            label: "radio label from ui schema"
          },
          {
            type: "Control",
            scope: "#/properties/firstName",
            label: "first name"
          },
          {
            type: "Control",
            scope: "#/properties/lotStickerPhoto",
            options: {
              format: "photo"
            },
            label: "Lot sticker photo"
          }
        ]
      }
    ]
  }

  const uiSchema = {
    type: "Categorization",
    elements: [item]
  };

  console.log('====================================');
  console.log("stateData", stateData);
  console.log('====================================');

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
        <CustomJsonForm
          schema={schemaObject}
          uischema={uiSchema}
          validationMode='NoValidation'
          data={stateData.data}
          onChange={(data) => {
            setData(data);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;