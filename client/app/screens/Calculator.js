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
    const [model, setModel] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [year, setYear] = useState("2022");
    const [engine, setEngine] = useState("");
    const [kilometers, setKilometers] = useState("");

    //errors state
    const [emptyEngine, setEmptyEngine] = useState();
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

    const onClickPost = () => {
        checkInputField('year');
        checkInputField('kilometers');
        // if (emptyAdTitle === false && emptyPrice === false && emptyEngine === false
        //     && emptyKilometers === false) {
        //     setLoading(true);
        // }
    }

    const checkInputField = (fieldName) => {
        if (fieldName === 'year') {
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
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Calculate your bike price</Text>
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
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedMake(itemValue)
                        }
                        style={{}}
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
                    <Text>{selectedMake}</Text>
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={{ color: 'black' }}>Model</Text>
                <View style={{ marginTop: 5, borderBottomWidth: 1 }}>
                    <Picker
                        mode="dialog"
                        selectedValue={selectedModel}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedModel(itemValue)
                        }
                        style={{}}
                    >
                        <Picker.Item label='Select Model' value="" />
                        {
                            model.map((model, index) => {
                                return (<Picker.Item label={model} value={model} key={index} />);
                            })
                        }
                    </Picker>
                </View>
                <View style={styles.errorContainer}>
                    <Text>{selectedMake}</Text>
                </View>
            </View>
            <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.45 }}>
                    <Text style={{ color: 'black' }}>Engine</Text>
                    <View style={{ marginTop: 5, borderBottomWidth: 1, height: 40, justifyContent: 'center' }}>
                        <Text>Engine CC</Text>
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
                    <Text>{selectedMake}</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '80%' }}>
                    <TouchableOpacity onPress={onClickPost} disabled={loading ? true : false}>
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