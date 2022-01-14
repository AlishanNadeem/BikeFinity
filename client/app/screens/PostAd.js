import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import Axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '../components/Input';
import Button from '../components/Button';
import { BASE_URL } from '../config';

const PostAd = () => {

  const navigation = useNavigation();

  const [adTitle, setAdTitle] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("2022");
  const [make, model] = useState("");
  const [engine, setEngine] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [condition, setCondition] = useState("New");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState({});

  //errors state
  const [emptyAdTitle, setEmptyAdTitle] = useState();
  const [emptyPrice, setEmptyPrice] = useState();
  const [emptyEngine, setEmptyEngine] = useState();
  const [emptyKilometers, setEmptyKilometers] = useState();
  const [emptyDescription, setEmptyDescription] = useState();

  const [loading, setLoading] = useState(false);

  const currentYear = (new Date()).getFullYear();
  const years = Array.from(new Array(43), (val, index) => currentYear - index);

  const postAd = () => {
    Axios.post(`${BASE_URL}/bikefinity/user/postAd`,
      {
        title: adTitle,
        price: price,
        year: year,
        engine: engine,
        kilometers: kilometers,
        condition: condition,
        description: description
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Alert.alert(
            'Success!',
            'Ad Posted Successfully'
          )
          navigation.navigate('MyTabs')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onClickPost = () => {
    checkInputField('adTitle');
    checkInputField('price');
    checkInputField('year');
    checkInputField('engine');
    checkInputField('kilometers');
    checkInputField('description');
    if (emptyAdTitle === false && emptyPrice === false && emptyEngine === false
      && emptyKilometers === false && emptyDescription === false) {
      setLoading(true);
      postAd();
    }
  }

  const checkInputField = (fieldName) => {
    if (fieldName === 'adTitle') {
      if (adTitle.length === 0) {
        setEmptyAdTitle(true)
      }
    }
    else if (fieldName === 'price') {
      if (price.length === 0) {
        setEmptyPrice(true)
      }
    }
    else if (fieldName === 'year') {
      if (year.length === 0) {
        setEmptyYear(true)
      }
    }
    else if (fieldName === 'engine') {
      if (engine.length === 0) {
        setEmptyEngine(true)
      }
    }
    else if (fieldName === 'kilometers') {
      if (kilometers.length === 0) {
        setEmptyKilometers(true)
      }
    }
    else if (fieldName === 'description') {
      if (description.length === 0) {
        setEmptyDescription(true)
      }
    }
  }

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1
    };
    let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ' + response.base64);
        console.log('uri -> ' + response.assets.uri);
        console.log('width -> ' + response.width);
        console.log('height -> ' + response.height);
        console.log('fileSize -> ' + response.fileSize);
        console.log('type -> ' + response.type);
        console.log('fileName -> ' + response.fileName);
        setImage(response);
        console.log(image);
      });
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, padding: 15, backgroundColor: 'white' }} enableOnAndroid extraHeight={150}>
      <View>
        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Post your Ad</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'black' }}>Make sure the information your are providing must be valid.</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ color: 'black' }}>Ad Title</Text>
        <View style={{ marginTop: 5 }}>
          <Input
            name="Enter Title of Ad"
            value={adTitle}
            onChange={
              (value) => {
                setEmptyAdTitle(false);
                setAdTitle(value)
              }
            }
            onBlur={
              () => {
                checkInputField('adTitle')
              }
            }
          />
        </View>
        <View style={styles.errorContainer}>
          {emptyAdTitle ? <Text style={styles.errorLabel}>Title cannot be empty!</Text> : null}
          {adTitle.length > 55 ? <Text style={styles.errorLabel}>Title could not exceed 55 characters.</Text> : null}
        </View>
      </View>
      <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.45 }}>
          <Text style={{ color: 'black' }}>Price</Text>
          <View style={{ marginTop: 5 }}>
            <Input
              name="Enter price"
              value={price}
              type="numeric"
              onChange={
                (value) => {
                  setEmptyPrice(false);
                  setPrice(value)
                }
              }
              onBlur={
                () => {
                  checkInputField('price')
                }
              }
            />
          </View>
          <View style={styles.errorContainer}>
            {emptyPrice ? <Text style={styles.errorLabel}>Price cannot be empty!</Text> : null}
          </View>
        </View>
        <View style={{ flex: 0.45 }}>
          <Text style={{ color: 'black' }}>Year</Text>
          <View style={{ marginTop: 5 }}>
            <Picker
              mode="dropdown"
              selectedValue={year}
              onValueChange={(itemValue, itemIndex) =>
                setYear(itemValue)
              }>
              {
                years.map((year, index) => {
                  return (<Picker.Item label={year.toString()} value={year} key={index} />);
                })
              }
            </Picker>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 0.45 }}>
          <Text style={{ color: 'black' }}>Engine</Text>
          <View style={{ marginTop: 5 }}>
            <Input
              name="Enter CC"
              value={engine}
              type="numeric"
              onChange={
                (value) => {
                  setEmptyEngine(false);
                  setEngine(value)
                }
              }
              onBlur={
                () => {
                  checkInputField('engine')
                }
              }
            />
          </View>
          <View style={styles.errorContainer}>
            {emptyEngine ? <Text style={styles.errorLabel}>Engine cannot be empty!</Text> : null}
            {isNaN(engine) ? <Text style={styles.errorLabel}>Only numbers will accept</Text> : null}
          </View>
        </View>
        <View style={{ flex: 0.45 }}>
          <Text style={{ color: 'black' }}>Kilometers</Text>
          <View style={{ marginTop: 5 }}>
            <Input
              name="Enter kilometers"
              value={kilometers}
              type="numeric"
              onChange={
                (value) => {
                  setEmptyKilometers(false);
                  setKilometers(value)
                }
              }
              onBlur={
                () => {
                  checkInputField('kilometers')
                }
              }
            />
          </View>
          <View style={styles.errorContainer}>
            {emptyKilometers ? <Text style={styles.errorLabel}>Kms cannot be empty!</Text> : null}
            {isNaN(kilometers) ? <Text style={styles.errorLabel}>Only numbers will accept</Text> : null}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'black' }}>Condition</Text>
        <View style={{ marginTop: 5 }}>
          <RadioButton.Group onValueChange={newValue => setCondition(newValue)} value={condition}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 0.45, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ color: 'black' }}>New</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                  <RadioButton value="New" color='#CA054D' uncheckedColor='black' />
                </View>
              </View>
              <View style={{ flex: 0.45, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ color: 'black' }}>Used</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                  <RadioButton value="Used" color='#CA054D' uncheckedColor='black' />
                </View>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
      <View style={{ marginTop: 25 }}>
        <Text style={{ color: 'black' }}>Ad Title</Text>
        <View style={{ marginTop: 5 }}>
          <Input
            name="Enter Title of Ad"
            value={adTitle}
            onChange={
              (value) => {
                setEmptyAdTitle(false);
                setAdTitle(value)
              }
            }
            onBlur={
              () => {
                checkInputField('adTitle')
              }
            }
          />
        </View>
        <View style={styles.errorContainer}>
          {emptyAdTitle ? <Text style={styles.errorLabel}>Title cannot be empty!</Text> : null}
          {adTitle.length > 55 ? <Text style={styles.errorLabel}>Title could not exceed 55 characters.</Text> : null}
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'black' }}>Description</Text>
        <View style={{ marginTop: 5 }}>
          <Input
            name="Write description of your ad"
            value={description}
            multiline={true}
            numberOfLines={6}
            onChange={
              (value) => {
                setEmptyDescription(false);
                setDescription(value)
              }
            }
            onBlur={
              () => {
                checkInputField('description')
              }
            }
          />
        </View>
        <View style={styles.errorContainer}>
          {emptyDescription ? <Text style={styles.errorLabel}>Description cannot be empty!</Text> : null}
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'black' }}>Choose Image</Text>
        <View style={{ marginTop: 5, height: 200, borderWidth: 1, borderRadius: 10 }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => { captureImage('photo') }}>
            <View>
              <Text>Choose Images</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'black' }}>Image</Text>
        <View style={{ marginTop: 5, height: 200, borderWidth: 1, borderRadius: 10 }}>
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, margin: 5 }} />
          <Text>Hellow {image.uri}</Text>
        </View>
      </View>
      <View style={{ marginTop: 10, height: 60, alignItems: 'flex-end', justifyContent: 'center' }}>
        <View style={{ width: '40%' }}>
          <TouchableOpacity onPress={onClickPost} disabled={loading ? true : false}>
            <Button name="Post" loading={loading} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 3,
    height: 17,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  errorLabel: {
    color: '#f39c12', //danger color: #dc3545
    fontSize: 11,
  },
});

export default PostAd;