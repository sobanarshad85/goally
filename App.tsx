import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import styled from 'styled-components/native';

import Home from './src/screens/Home';

const SafeArea = styled.SafeAreaView`
  background-color: #182545;
  flex: 1;
`;

function App(): JSX.Element {
  return (
    <SafeArea>
      <StatusBar barStyle={'light-content'} />
      <Home />
    </SafeArea>
  );
}

export default App;
