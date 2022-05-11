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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 0.3 }}>
                    <Image source={{ uri: ad.image }} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
                </View>
                <View style={{ flex: 0.15, padding: 10, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.8 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Rs. {ad.price}</Text>
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
                <View style={{ flex: 0.48, padding: 10 }}>
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>Details</Text>
                    <ScrollView style={{ marginTop: 10 }}>
                        <View style={styles.item}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.label}>Year</Text>
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{ad.year}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.item}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.label}>Make</Text>
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{ad.make}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.item}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.label}>Model</Text>
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{ad.model}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.item}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.label}>Engine</Text>
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{ad.engine} cc</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.item}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.label}>Kilometers</Text>
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{ad.kilometers} kms</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.item}>
                            <View style={{ flex: 0.3 }}>
                                <Text style={styles.label}>Condition</Text>
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-end' }}>
                                <Text style={styles.label}>{ad.condition}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.item}>
                            <Text style={styles.label}>Description</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.label}>{ad.description}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.07, backgroundColor: 'white', flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#011627', width: '90%', height: 40, borderRadius: 5 }}>
                            <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="phone" color='white' size={22} />
                            </View>
                            <View style={{ flex: 0.75, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>Call</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#011627', width: '90%', height: 40, borderRadius: 5, justifyContent: 'center' }}>
                            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                <Icon name="message" color='white' size={22} />
                            </View>
                            <View style={{ flex: 0.7, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>SMS</Text>
                            </View>
                        </View>
                    </View>
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

export default ViewAd;