import React from 'react';
import { View, Text } from 'react-native';

const Review = () => {
    return(
        <View style={{flex: 1, backgroundColor: 'white', padding: 15}}>
            <View>
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Reviews</Text>
            </View>
        </View>
    );
};

export default Review;