import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Header from './Header';
import Routines from './Routines';

const HomeContainer = styled.View`
  background-color: white;
`;

function Home(): JSX.Element {
  return (
    <HomeContainer>
      <Header />
      <Routines />
    </HomeContainer>
  );
}

export default Home;
