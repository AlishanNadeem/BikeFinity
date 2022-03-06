import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Image, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
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

    const [data, setData] = useState([
        {
            _id: 1,
            review: 'good bike',
            user: 'Alishan Nadeem',
            days: '6 days',
            rating: 5,
        },
        {
            _id: 2,
            review: 'fuel average of that bike is amazing',
            user: 'Asim Ebrahim',
            days: '2 days',
            rating: 4,
        },
        {
            _id: 3,
            review: 'Fantasitic bike.',
            user: 'Anas Saleem',
            days: '6 days',
            rating: 5,
        },
        {
            _id: 4,
            review: 'Suspension is not good.',
            user: 'Umer ali',
            days: '1 days',
            rating: 1,
        },
    ])

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

    const renderItem = ({ item }) => (
        <View style={{ height: 150, marginVertical: 2, padding: 2 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4, flexDirection: 'row' }}>
                    <View style={{ flex: 0.15}}>
                        <Avatar.Text size={40} label="XD" style={{ backgroundColor: 'grey' }} color='white' />
                    </View>
                    <View style={{ flex: 0.45 }}>
                        <View>
                            <Text style={{ color: 'black', fontSize: 15 }}>{item.user}</Text>
                        </View>
                        <View style={{ width: '50%', marginTop: 6 }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={item.rating}
                                starSize={12}
                                emptyStarColor={STAR_COLOR}
                                fullStarColor={STAR_COLOR}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.45, alignItems: 'flex-end' }}>
                        <View>
                            <Text style={{ color: 'grey', fontSize: 12 }}>{item.days} ago</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={{color: 'black'}}>{item.review}</Text>
                </View>
            </View>
        </View>
    );

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
                <View style={{ flex: 0.5, paddingHorizontal: 10, backgroundColor: 'white' }}>
                    <FlatList
                        keyExtractor={(item) => item._id}
                        data={data}
                        renderItem={renderItem}
                    />
                </View>
                <View style={{ flex: 0.1, backgroundColor: 'blue', flexDirection: 'row' }}>
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