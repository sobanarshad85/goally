import React from 'react';
import {
  Text,
  Image,
  View,
  Switch,
  ImageURISource,
  ImageStyle,
} from 'react-native';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';

interface RoutineProps {
  icon: ImageURISource;
  iconStyle: ImageStyle;
  title: string;
  nightMode?: boolean;
  flagValue: boolean;
  setFlagValue: (flagValue: boolean) => void;
  days: string;
  time: string;
}

function Routine({
  icon,
  iconStyle,
  title,
  nightMode,
  days,
  time,
  flagValue,
  setFlagValue,
}: RoutineProps): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>
      <RoutineWrapper nightMode={nightMode}>
        <RoutineHeader>
          <TextContainer>
            <RoutineHeaderText nightMode={nightMode}>{days}</RoutineHeaderText>
            <RoutineHeaderText nightMode={nightMode}>{time}</RoutineHeaderText>
          </TextContainer>
          <Icon source={icon} style={iconStyle} />
        </RoutineHeader>
        <RoutineFooter>
          <Switch
            onValueChange={setFlagValue}
            value={flagValue}
            trackColor={{false: '#72777F', true: '#72CEBC'}}
            ios_backgroundColor="#72777F"
          />
          <Entypo
            name="chevron-right"
            size={24}
            color={nightMode ? 'white' : 'black'}
          />
        </RoutineFooter>
      </RoutineWrapper>
    </Container>
  );
}

const Container = styled.View`
  width: 48.5%;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 500;
  text-align: center;
`;

const RoutineWrapper = styled.View<{nightMode?: boolean}>`
  margin-top: 5px;
  flex-direction: column;
  padding: 10px 12px;
  border-radius: 12px;
  justify-content: space-between;
  min-height: 102.8px;
  background-color: ${({nightMode}: {nightMode: boolean}) =>
    nightMode ? '#103C58' : '#CFE4FF'};
`;

const RoutineHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextContainer = styled.View``;

const RoutineHeaderText = styled.Text<{nightMode?: boolean}>`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({nightMode}: {nightMode: boolean}) =>
    nightMode ? 'white' : 'black'};
`;

const Icon = styled(Image)``;

const RoutineFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightIcon = styled(Image)`
  height: 24px;
  width: 24px;
`;

export default Routine;
