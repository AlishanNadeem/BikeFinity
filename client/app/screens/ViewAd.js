import React from "react";
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons'; // have to change the name of object
import Button from "../components/Button";

const ViewAd = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.3, backgroundColor: 'skyblue' }}></View>
            <View style={{ flex: 0.15, padding: 10, justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Rs 90,000</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'flex-end', }}>
                        <Icon name='heart-outline' size={24} color='black' />
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'black', fontSize: 18 }}>Suzuki GSXR 1000cc</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.08 }}>
                            <MIcon name="location-pin" size={20} />
                        </View>
                        <View style={{ flex: 0.7 }}>
                            <Text>Karachi, Pakistan</Text>
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
            <View style={{ flex: 0.1, backgroundColor: 'grey' }}>
            </View>
        </View>
    );
};

export default ViewAd;