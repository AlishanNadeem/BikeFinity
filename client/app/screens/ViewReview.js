import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons'; // have to change the name of object
import Button from "../components/Button";
import StarRating from 'react-native-star-rating';

import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "axios";

import { BASE_URL, STAR_COLOR } from "../config";

//need to loading app loader on start then ad fetched set to false
const ViewReview = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [bike, setBike] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getBike();
        // Axios.get(`${BASE_URL}/bikefinity/user/getReviews/${route.params.id}`)
        //     .then((res) => {
        //         setData(res.data);
        //         setIsLoaded(true);
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, []);

    const getBike = () => {
        Axios.get(`${BASE_URL}/bikefinity/bike/bike/${route.params.id}`)
            .then((res) => {
                setBike(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        isLoaded ?
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 0.3 }}>
                    <Image source={{ uri: `${bike.image}` }} style={{ height: 210, width: '100%' }} />
                </View>
                <View style={{ flex: 0.1, padding: 10, backgroundColor: 'white', justifyContent: 'space-around', flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>
                        <View>
                            <Text style={{ color: 'black', fontSize: 18 }}>{bike.make}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{bike.model}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, backgroundColor: 'white', alignItems: 'flex-end', }}>
                        <View style={{ width: '60%', marginTop: 6 }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={bike.averageRating}
                                starSize={20}
                                emptyStarColor={STAR_COLOR}
                                fullStarColor={STAR_COLOR}
                            />
                        </View>
                        <View style={{ marginTop: 2 }}>
                            <Text style={{ color: 'grey', fontSize: 16, fontWeight: 'bold' }}>{bike.averageRating}/5</Text>
                        </View>
                    </View>

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