import React from 'react';
import {TouchableOpacity, View, TextInput} from 'react-native';
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

const SearchButton = styled.TouchableOpacity`
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

const Search = ({
  isDataAscending,
  setIsDataAscending,
  setText,
  text,
}: {
  isDataAscending: boolean;
  setIsDataAscending: (isDataAscending: boolean) => void;
  setText: (text: string) => void;
  text: string;
}): JSX.Element => {
  const toggleSorting = () => setIsDataAscending(!isDataAscending);
  return (
    <Container>
      <InputContainer>
        <Input value={text} onChangeText={setText} />
        <SearchButton>
          <Icon name="search" size={20} />
        </SearchButton>
      </InputContainer>
      <TouchableOpacity onPress={toggleSorting}>
        <SortIcon source={require('../assets/sort.png')} />
      </TouchableOpacity>
    </Container>
  );
};

export default Search;
