import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InputContainer = styled.View`
  flex: 1;
  height: 50px;
  flex-direction: row;
  border-width: 1px;
  border-color: black;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  font-size: 16px;
  padding-horizontal: 10px;
`;

const Button = styled.View`
  width: 42px;
  background-color: #49b0ab;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(FontAwesome)`
  color: white;
`;

const SortIcon = styled.Image`
  height: 40px;
  width: 40px;
  margin-left: 10px;
`;

function Search(): JSX.Element {
  return (
    <Container>
      <InputContainer>
        <Input />
        <Button>
          <Icon name="search" size={20} />
        </Button>
      </InputContainer>
      <SortIcon source={require('../assets/sort.png')} />
    </Container>
  );
}

export default Search;
