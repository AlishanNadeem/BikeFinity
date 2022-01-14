import * as React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

const Profile = () => {
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 24, color: 'black' }}>My Profile</Text>
            <View style={{ flex: 0.3, marginTop: 20, flexDirection: 'row' }}>
                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Avatar rounded icon={{ name: 'home' }} size="xlarge" /> */}
                    <Avatar
                        rounded
                        size={130}
                        overlayContainerStyle={{ backgroundColor: '#011627' }}
                        icon={{ name: 'person', color: 'white', type: 'materialicons' }}
                    />
                </View>
                <View style={{ flex: 0.6, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Alishan Nadeem</Text>
                </View>
            </View>
        </View>
    );
};

export default Profile;
