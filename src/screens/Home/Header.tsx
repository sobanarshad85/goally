import React from 'react';
import {Text, Image, View} from 'react-native';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #182545;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 400;
`;

const HeaderImage = styled.Image`
  height: 36px;
  width: 36px;
`;

function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <HeaderImage source={require('../../assets/home.png')} />
      <HeaderText>Routines</HeaderText>
      <HeaderImage source={require('../../assets/settings.png')} />
    </HeaderContainer>
  );
}

export default Header;
