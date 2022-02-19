import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Axios from 'axios';

import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '../components/Input';
import Button from '../components/Button';
import { BASE_URL } from '../config';

const Calculator = () => {

    const navigation = useNavigation();

    const [make, setMake] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [bikeDetails, setBikeDetails] = useState([]);
    const [engine, setEngine] = useState();
    const [year, setYear] = useState("2022");
    const [kilometers, setKilometers] = useState("");

    //errors state
    const [emptyMake, setEmptyMake] = useState();
    const [emptyModel, setEmptyModel] = useState();
    const [emptyKilometers, setEmptyKilometers] = useState();

    const [loading, setLoading] = useState(false);

    const currentYear = (new Date()).getFullYear();
    const years = Array.from(new Array(43), (val, index) => currentYear - index);

    useEffect(() => {
        Axios.get(`${BASE_URL}/bikefinity/bike/make`)
            .then((res) => {
                setMake(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    //getting bike details according to make
    const getBikeDetails = (value) => {
        Axios.get(`${BASE_URL}/bikefinity/bike/model/${value}`)
            .then((res) => {
                // console.log(res.data)
                setBikeDetails(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickCalculate = () => {
        checkInputField('make')
        checkInputField('model')
        checkInputField('year')
        checkInputField('kilometers')
        if (emptyMake === false && emptyModel === false && emptyKilometers === false) {
            console.log(selectedMake + selectedModel + engine + year + kilometers)
        }
    }

    const checkInputField = (fieldName) => {
        if (fieldName === 'make') {
            if (selectedMake.length === 0) {
                setEmptyMake(true)
            }
        }
        else if (fieldName === 'model') {
            if (selectedModel.length === 0) {
                setEmptyModel(true)
            }
        }
        else if (fieldName === 'year') {
            if (year.length === 0) {
                setEmptyYear(true)
            }
        }
        else if (fieldName === 'kilometers') {
            if (kilometers.length === 0) {
                setEmptyKilometers(true)
            }
        }
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1, padding: 15, backgroundColor: 'white' }} enableOnAndroid extraHeight={150}>
            <View>
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Calculate your Bike Price</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'black' }}>You can estimate your current bike price. Note that once you will fill all the parameters then tap on calculates</Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={{ color: 'black' }}>Make</Text>
                <View style={{ marginTop: 5, borderBottomWidth: 1 }}>
                    <Picker
                        mode="dialog"
                        selectedValue={selectedMake}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemIndex === 0) {
                                setEmptyMake(true);
                                setSelectedMake("");
                                setSelectedModel("");
                                setBikeDetails([]);
                                setEngine();
                            } else {
                                setBikeDetails([]);
                                setEngine();
                                setSelectedMake(itemValue);
                                getBikeDetails(itemValue);
                                setEmptyMake(false);
                            }
                        }}
                    >
                        <Picker.Item label='Select Make' value="" />
                        {
                            make.map((make, index) => {
                                return (<Picker.Item label={make} value={make} key={index} />);
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.errorContainer}>
                    {emptyMake ? <Text style={styles.errorLabel}>Please select make!</Text> : null}
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={{ color: 'black' }}>Model</Text>
                <View style={{ marginTop: 5, borderBottomWidth: 1 }}>
                    <Picker
                        mode="dialog"
                        selectedValue={selectedModel}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemIndex === 0) {
                                setEmptyModel(true);
                                setSelectedModel("");
                                setEngine();
                            } else {
                                setSelectedModel(itemValue);
                                setEngine(bikeDetails[itemIndex - 1].engine);
                                setEmptyModel(false);
                            }
                        }}
                    >
                        <Picker.Item label='Select Model' value="" />
                        {
                            bikeDetails.map((bike, index) => {
                                return (<Picker.Item label={bike.model} value={bike.model} key={index} />);
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.errorContainer}>
                    {emptyModel ? <Text style={styles.errorLabel}>Please select model!</Text> : null}
                </View>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.45 }}>
                    <Text style={{ color: 'black' }}>Engine</Text>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, height: 40, justifyContent: 'center' }}>
                        {
                            engine ? <Text style={{fontSize: 16, color: 'black'}}>{engine}</Text> : <Text>Engine CC</Text>
                        }
                    </View>
                    <View style={styles.errorContainer}>
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
                            }
                        >
                            {
                                years.map((year, index) => {
                                    return (<Picker.Item label={year.toString()} value={year} key={index} />);
                                })
                            }
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
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
                </View>
            </View>
            <View style={{ marginTop: 10, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '80%' }}>
                    <TouchableOpacity onPress={onClickCalculate} disabled={loading ? true : false}>
                        <Button name="Calculate" color="blue" loading={loading} />
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

export default Calculator;