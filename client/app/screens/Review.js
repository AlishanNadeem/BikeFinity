import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import StarRating from 'react-native-star-rating';

import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from 'axios';

import { BASE_URL, PRIMARY_COLOR, SECONDARY_COLOR, STAR_COLOR } from '../config';
import Button from '../components/Button';

const Review = () => {

    const navigation = useNavigation();

    const [make, setMake] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [bikeDetails, setBikeDetails] = useState([]);
    const [bikeId, setBikeId] = useState("");
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    //errors state
    const [emptyMake, setEmptyMake] = useState();
    const [emptyModel, setEmptyModel] = useState();

    useEffect(() => {
        getBikeMake();
        getTopRatedBikes();
    }, []);

    const getBikeMake = () => {
        Axios.get(`${BASE_URL}/bikefinity/bike/make`)
            .then((res) => {
                setMake(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

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

    const getTopRatedBikes = () => {
        Axios.get(`${BASE_URL}/bikefinity/bike/topRatedBikes`)
            .then((res) => {
                setData(res.data);
                setDataIsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onClickGo = (id) => {
        setLoading(true);
        navigation.navigate('ViewReview', {
            id: id
        });
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ borderRadius: 8, flexDirection: 'column', width: 160, backgroundColor: 'white', margin: 4, height: 175, padding: 5 }}
            onPress={() => {
                onClickGo(item._id)
            }}
            // delayPressIn={80}
            activeOpacity={1}
        >
            <View style={{ flex: 0.5, backgroundColor: 'skyblue' }}>
                <Image source={{ uri: `${item.image}` }} style={{ height: 90, width: '100%' }} resizeMode='cover' />
            </View>
            <View style={{ flex: 0.5, padding: 5 }}>
                <Text style={{ color: 'black', marginTop: 15 }}>{item.make}</Text>
                <Text style={{ color: 'black', marginTop: 0, fontWeight: 'bold' }}>{item.model}</Text>
                <View style={{ marginTop: 5, width: '70%' }}>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.averageRating}
                        starSize={18}
                        emptyStarColor={STAR_COLOR}
                        fullStarColor={STAR_COLOR}
                    />
                </View>
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
                                setBikeId("");
                            } else {
                                setBikeDetails([]);
                                setBikeId("");
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
                                setBikeId("");
                            } else {
                                setSelectedModel(itemValue);
                                setBikeId(bikeDetails[itemIndex - 1]._id)
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
                    <TouchableOpacity onPress={() => onClickGo(bikeId)} disabled={loading ? true : false}>
                        <Button name="Go" loading={loading} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={{ color: PRIMARY_COLOR, fontSize: 24 }}>Top Rated Bikes</Text>
            </View>
            <View style={{ marginTop: 2 }}>
                <Text>Here are some of the most rated bikes.</Text>
            </View>
            <View style={{ marginTop: 6, height: 185, backgroundColor: '#F7F7F7' }}>
                {
                    dataIsLoaded ?
                        (
                            <FlatList
                                keyExtractor={(item) => item._id}
                                data={data}
                                renderItem={renderItem}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        ) :
                        (
                            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color='#CA054D' />
                            </View>
                        )
                }
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