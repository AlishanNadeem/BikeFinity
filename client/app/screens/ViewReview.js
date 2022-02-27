import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons'; // have to change the name of object
import Button from "../components/Button";

import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "axios";

import { BASE_URL } from "../config";

//need to loading app loader on start then ad fetched set to false
const ViewReview = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [bike, setBike] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Axios.get(`${BASE_URL}/bikefinity/bike/bike/${route.params.id}`)
            .then((res) => {
                setBike(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
        // Axios.get(`${BASE_URL}/bikefinity/user/getReviews/${route.params.id}`)
        //     .then((res) => {
        //         setData(res.data);
        //         setIsLoaded(true);
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, [])

    return (
        isLoaded ?
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 0.3 }}>
                    <Image source={{ uri: `data:image/jpeg;base64,${bike.image}` }} style={{ height: 210, width: '100%' }} />
                </View>
                <View style={{ flex: 0.15, padding: 10, justifyContent: 'space-around' }}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{bike.make}</Text>
                    {/* <View>
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
                    </View> */}
                </View>
                <View style={{ flex: 0.48, padding: 10 }}>
                </View>
                <View style={{ flex: 0.07, backgroundColor: 'white', flexDirection: 'row' }}>
                </View>
            </View> :
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color='#CA054D' />
            </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginVertical: 15
    },
    label: {
        color: 'black',
        fontSize: 15,
    }
})

export default ViewReview;