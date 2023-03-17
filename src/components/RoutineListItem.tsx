import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
  _id,
  deleteItem,
}: {
  title: string;
  image: string;
  _id: string;
  deleteItem: (_id: string) => void;
}): JSX.Element {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={() => deleteItem(_id)} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{transform: [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
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
}

export default RoutineListItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    minHeight: '100%',
  },
});
