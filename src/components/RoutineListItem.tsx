import React from 'react';
import {Dimensions, Animated} from 'react-native';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ListItemWrapper = styled.View`
  margin-top: 10px;
  padding-horizontal: 10px;
`;

const ListItemRow = styled.View`
  flex-direction: row;
`;

const ListItemImage = styled.Image`
  height: 48px;
  width: 48px;
  border-width: 2px;
  border-color: #72cebc;
  border-radius: 2px;
`;

const ListItemContent = styled.View`
  padding-horizontal: 10px;
  justify-content: center;
  flex: 1;
`;

const ListItemTitle = styled.Text`
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
`;

const ListItemStatus = styled.View`
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
`;

const ListItemIndicator = styled.View`
  height: 16px;
  width: 16px;
  background-color: #72cebc;
  border-radius: 10px;
  margin-right: 5px;
`;

const ListItemStatusText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

const ListItemChevronView = styled.View`
  justify-content: center;
`;

const ListItemChevron = styled(Entypo)``;

const ListItemSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #bac1ca;
  margin-top: 10px;
`;

const DeleteBox = styled.View`
  background-color: red;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-height: 100%;
`;

const DeleteBoxText = styled(Animated.Text)`
  transform: [{scale: ${props => props.scale}}];
`;

const RoutineListItem = ({
  title,
  image,
  _id,
  deleteItem,
}: {
  title: string;
  image: string;
  _id: string;
  deleteItem: (_id: string) => void;
}): JSX.Element => {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={() => deleteItem(_id)} activeOpacity={0.6}>
        <DeleteBox>
          <DeleteBoxText scale={scale}>Delete</DeleteBoxText>
        </DeleteBox>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <ListItemWrapper>
        <ListItemRow>
          <ListItemImage source={{uri: image}} />
          <ListItemContent>
            <ListItemTitle>{title}</ListItemTitle>
            <ListItemStatus>
              <ListItemIndicator />
              <ListItemStatusText>Running Now</ListItemStatusText>
            </ListItemStatus>
          </ListItemContent>
          <ListItemChevronView>
            <ListItemChevron name="chevron-right" size={24} color="black" />
          </ListItemChevronView>
        </ListItemRow>
        <ListItemSeparator />
      </ListItemWrapper>
    </Swipeable>
  );
};

export default RoutineListItem;
