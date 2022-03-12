import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image, FlatList, Modal } from 'react-native';
import { Avatar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { FAB } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "axios";
import { useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

import { BASE_URL, STAR_COLOR } from "../config";
import Input from '../components/Input';
import Button from '../components/Button';
import SubmitReview from "./SubmitReview";

//need to loading app loader on start then ad fetched set to false
const ViewReview = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const { token } = useSelector(state => state.auth);

    const [bike, setBike] = useState({});
    const [page, setPage] = useState();

    //errors states
    const [emptyReview, setEmptyReview] = useState();

    const [isLoaded, setIsLoaded] = useState(false);
    const [onEndReached, setOnEndReached] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        getBike();
        getReviews();
    }, [isFocused]);

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

    const getReviews = () => {
        Axios.get(`${BASE_URL}/bikefinity/user/getReviews/${route.params.id}`)
            .then((res) => {
                // console.log(res.data[0].user[0])
                setData(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const whileOnEndReached = () => {
        setOnEndReached(true);
        // setPage(page + 1);
    }

    const handleSubmitReview = () => {
        setReviewModalOpen(!reviewModalOpen);
    }

    const renderItem = ({ item }) => (
        <View style={{ height: 150, marginBottom: 5, padding: 10, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.4, flexDirection: 'row' }}>
                    <View style={{ flex: 0.15  }}>
                        <Avatar
                            rounded
                            size={40}
                            source={{ uri: item.user[0].profilePicture }}
                        />
                    </View>
                    <View style={{ flex: 0.45 }}>
                        <View>
                            <Text style={{ color: 'black', fontSize: 15 }}>{item.user[0].name}</Text>
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
                            {/* <Text style={{ color: 'grey', fontSize: 12 }}>{item.days} ago</Text> */}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.6 }}>
                    <Text style={{ color: 'black' }}>{item.review}</Text>
                </View>
            </View>
        </View>
    );

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {onEndReached ? (
                    <ActivityIndicator
                        size={30}
                        color='#CA054D'
                        style={{ marginLeft: 8 }} />
                ) : null}
            </View>
        );
    };

    return (
        isLoaded ?
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    reviewModalOpen && (
                        <SubmitReview open={reviewModalOpen} bikeId={route.params.id} handleSubmitReview={handleSubmitReview} />
                    )
                }
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
                <View style={{ flex: 0.6, backgroundColor: '#F7F7F7' }}>
                    <FlatList
                        keyExtractor={(item) => item._id}
                        data={data}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={onEndReached ? renderFooter : null}
                        onEndReached={whileOnEndReached}
                    />
                    <FAB
                        style={styles.fab}
                        icon="message"
                        color="white"
                        onPress={handleSubmitReview}
                    />
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
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#011627',
    },
});

export default ViewReview;