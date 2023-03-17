import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Header from './Header';
import Routines from './Routines';
import RoutineListing from './RoutineListing';

const HomeContainer = styled.View`
  background-color: white;
  flex: 1;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
`;

function Home(): JSX.Element {
  return (
    <HomeContainer>
      <BackgroundImage
        source={require('../../assets/morning.png')}
        resizeMethod="auto"
        resizeMode="contain"
        imageStyle={styles.imageStyle}>
        <Header />
        <Routines />
        <RoutineListing />
      </BackgroundImage>
    </HomeContainer>
  );
}

export default Home;

const styles = StyleSheet.create({
  imageStyle: {
    height: 250,
    width: 'auto',
    marginTop: 350,
    opacity: 0.25,
  },
});
