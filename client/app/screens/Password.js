import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import Axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation, useRoute } from '@react-navigation/native';

import Input from '../components/Input';
import Button from '../components/Button';
import { BASE_URL } from '../config';

const Password = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emptyPassword, setEmptyPassword] = useState();
    const [emptyConfirmPassword, setEmptyConfirmPassword] = useState();
    const [isMatched, setIsMatched] = useState();
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const reset = () => {
        setPassword("");
        setConfirmPassword("");
        setEmptyPassword();
        setEmptyConfirmPassword();
        setIsMatched();
        setLoading(false);
    }

    const registerUser = () => {
        Axios.post(`${BASE_URL}/bikefinity/auth/signup`,
            {
                name: route.params.name,
                email: route.params.email,
                contactNumber: route.params.number,
                location: route.params.location,
                password: password
            })
            .then((res) => {
                if (res.status === 200) {
                    ToastAndroid.show("Registered Succussfully", ToastAndroid.LONG);
                    loginUser();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const loginUser = () => {
        Axios.post('http://10.0.2.2:5000/bikefinity/auth/login',
            {
                email: route.params.email,
                password: password
            })
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'MyTabs'
                        }]
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickRegister = () => {
        checkInputField('password');
        checkInputField('confirmPassword');
        if (emptyPassword === false && emptyConfirmPassword === false && isMatched) {
            setLoading(true);
            registerUser();
        }
    };

    const onChangePassword = (value) => {
        setEmptyPassword(false);
        setPassword(value);
    };

    const onChangeConfirmPassword = (value) => {
        setEmptyConfirmPassword(false);
        setConfirmPassword(value);
        checkPasswordMatch(value);
    };

    const checkInputField = (fieldName) => {
        if (fieldName === "password") {
            if (password.length === 0) {
                setEmptyPassword(true)
            }
        }
        else if (fieldName === "confirmPassword") {
            if (confirmPassword.length === 0) {
                setIsMatched()
                setEmptyConfirmPassword(true)
            }
        }
    }

    const checkPasswordMatch = (confirmPassword) => {
        if (password.length > 0) {
            if (confirmPassword === password) {
                setIsMatched(true);
            }
            else {
                setIsMatched(false);
            }
        } else {
            setIsMatched();
        }
    }

    useEffect(
        () => reset()
        , []);

    return (
        <KeyboardAwareScrollView style={{ flex: 1, padding: 20, backgroundColor: 'white' }} enableOnAndroid extraHeight={150}>
            <View>
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Continue..</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'black' }}>Choose a strong password.</Text>
            </View>
            <View style={{ marginTop: 40 }}>
                <Text style={{ color: 'black' }}>Password</Text>
                <View style={{ marginTop: 5 }}>
                    <Input
                        name="Enter your Password"
                        icon="lock"
                        secureTextEntry={true}
                        value={password}
                        onChange={onChangePassword}
                        onBlur={
                            () => {
                                checkInputField('password')
                            }
                        }
                    />
                </View>
                <View style={styles.errorContainer}>
                    {emptyPassword ? <Text style={styles.errorLabel}>Password cannot be empty!</Text> : null}
                </View>
            </View>
            <View>
                <Text style={{ color: 'black' }}>Confirm Password</Text>
                <View style={{ marginTop: 5 }}>
                    <Input
                        name="Confirm your Password"
                        icon="lock-clock"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                        onBlur={
                            () => {
                                checkInputField('confirmPassword')
                            }
                        }
                    />
                </View>
                <View style={styles.errorContainer}>
                    {
                        isMatched === true ?
                            <Text style={[styles.errorLabel, { color: '#28a745' }]}>Password matched.</Text>
                            :
                            isMatched === false ?
                                <Text style={styles.errorLabel}>Password doesn't match.</Text>
                                : null
                    }
                    {emptyConfirmPassword ? <Text style={styles.errorLabel}>This field cannot be empty!</Text> : null}
                </View>
            </View>
            <View style={{ marginTop: 20, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '80%' }}>
                    <TouchableOpacity onPress={onClickRegister} disabled={loading ? true : false}>
                        <Button name="Register" loading={loading} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

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
        fontSize: 12.5,
    },
});

export default Password;