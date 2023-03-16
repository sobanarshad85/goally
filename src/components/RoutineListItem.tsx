import React from 'react';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const imageUrl = 'https://images.unsplash.com/photo-1526045612212-70caf35c14df';

const ListItemWrapper = styled(View)`
  margin-top: 10px;
  padding-horizontal: 10px;
`;

const ListItemRow = styled(View)`
  flex-direction: row;
`;

const ListItemImage = styled(Image)`
  height: 48px;
  width: 48px;
  border-width: 2px;
  border-color: #72cebc;
  border-radius: 2px;
`;

const ListItemContent = styled(View)`
  padding-horizontal: 10px;
  justify-content: center;
  flex: 1;
`;

const ListItemTitle = styled(Text)`
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
`;

const ListItemStatus = styled(View)`
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
`;

const ListItemIndicator = styled(View)`
  height: 16px;
  width: 16px;
  background-color: #72cebc;
  border-radius: 10px;
  margin-right: 5px;
`;

const ListItemStatusText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
`;

const ListItemChevronView = styled(View)`
  justify-content: center;
`;

const ListItemChevron = styled(Entypo)``;

const ListItemSeparator = styled(View)`
  height: 1px;
  width: 100%;
  background-color: #bac1ca;
  margin-top: 10px;
`;

function RoutineListItem({
  title,
  image,
}: {
  title: string;
  image: string;
}): JSX.Element {
  return (
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
  );
}

export default RoutineListItem;
