import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Axios from 'axios';

import { BASE_URL } from '../config';
import Button from '../components/Button';

const Review = () => {

    const [make, setMake] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [bikeDetails, setBikeDetails] = useState([]);
    const [data, setData] = useState([
        {
            _id: 1,
            name: "ali"
        },
        {
            _id: 2,
            name: "ali"
        },
        {
            _id: 3,
            name: "ali"
        },
        {
            _id: 4,
            name: "ali"
        },
    ])

    const [loading, setLoading] = useState(false);

    //errors state
    const [emptyMake, setEmptyMake] = useState();
    const [emptyModel, setEmptyModel] = useState();

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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ borderRadius: 8, flexDirection: 'column', width: 160, backgroundColor: 'white', margin: 4, height: 175, padding: 5 }}
            onPress={() => {
                onClickAd(item._id)
            }}
            // delayPressIn={80}
            activeOpacity={1}
        >
            <View style={{ flex: 0.5, backgroundColor: 'skyblue' }}>
            </View>
            <View style={{ flex: 0.5, padding: 5 }}>

            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
            <View>
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Reviews</Text>
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
                            } else {
                                setBikeDetails([]);
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
                            } else {
                                setSelectedModel(itemValue);
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
            <View style={{ marginTop: 5, height: 60, alignItems: 'flex-end', justifyContent: 'center' }}>
                <View style={{ width: '30%' }}>
                    <TouchableOpacity disabled={loading ? true : false}>
                        <Button name="Go" loading={loading} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'black', fontSize: 24 }}>Top Rated Bikes</Text>
            </View>
            <View style={{ marginTop: 15, height: 185, backgroundColor: '#F7F7F7' }}>
                <FlatList
                    keyExtractor={(item) => item._id}
                    data={data}
                    renderItem={renderItem}
                    // refreshing={refreshing}
                    // onRefresh={whileOnRefreshing}
                    // ListFooterComponent={renderFooter}
                    // onEndReached={whileOnEndReached}
                    // onEndReachedThreshold={0.5}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
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

export default Review;