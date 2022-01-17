import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons'; // have to change the name of object
import Button from "../components/Button";

import { useNavigation, useRoute } from '@react-navigation/native';
import Axios from "axios";

import { BASE_URL } from "../config";


//need to loading app loader on start then data fetched set to false
const ViewAd = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [data, setData] = useState({});

    useEffect(() => {
        Axios.get(`${BASE_URL}/bikefinity/user/getAd/${route.params.id}`)
        .then((res)=>{
            setData(res.data)
            // console.log(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.3, backgroundColor: 'skyblue' }}></View>
            <View style={{ flex: 0.15, padding: 10, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{data.price}</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'flex-end', }}>
                        <Icon name='heart-outline' size={24} color='black' />
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'black', fontSize: 18 }}>{data.title}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.08 }}>
                            <MIcon name="location-pin" size={20} />
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text>{data.location}</Text>
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
        </View>
    );
};

export default ViewAd;