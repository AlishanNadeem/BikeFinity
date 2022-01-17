import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons'; // have to change the name of object
import Button from "../components/Button";

import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "axios";

import { BASE_URL } from "../config";

//need to loading app loader on start then ad fetched set to false
const ViewAd = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [ad, setAd] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Axios.get(`${BASE_URL}/bikefinity/user/getAd/${route.params.id}`)
            .then((res) => {
                setAd(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        isLoaded ?
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.3, backgroundColor: 'skyblue' }}></View>
                <View style={{ flex: 0.15, padding: 10, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{ad.price}</Text>
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'flex-end', }}>
                            <Icon name='heart-outline' size={24} color='black' />
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: 'black', fontSize: 18 }}>{ad.title}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.08 }}>
                                <MIcon name="location-pin" size={20} />
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <Text>{ad.location}</Text>
                            </View>
                            <View style={{ flex: 0.22, alignItems: 'center' }}>
                                <Text>10/12/2021</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.45, padding: 10 }}>
                    <ScrollView>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Details</Text>
                        <View>

                        </View>
                        <View>

                        </View>
                        <View>

                        </View>
                        <View>

                        </View>
                        <View>

                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.1, backgroundColor: 'blue' }}>
                </View>
            </View> :
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color='#CA054D' />
            </View>
    );
};

export default ViewAd;