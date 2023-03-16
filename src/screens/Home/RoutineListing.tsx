import React from 'react';
import {Text, Image, View, TextInput} from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Search from '../../components/Search';

function RoutineListing(): JSX.Element {
  return (
    <View style={{padding: 10}}>
      <Search />
    </View>
  );
}

export default RoutineListing;
