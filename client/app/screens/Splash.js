import React, {useEffect} from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';

const Splash = () => {

  return(
    <View style={styles.parentView}>
      <View style={{flex:0.3}} />
      <View style={[styles.center, {flex:0.3}]}>
        <Image
        source={require('../assets/logos/white-logo-2x.png')}
        />
      </View>
      <View style={[styles.center, {flex:0.1}]}>
        <ActivityIndicator size="large" color='#CA054D'/>
      </View>
      <View style={{flex:0.3}} />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: '#011627'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Splash;