import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  VirtualizedList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import Search from '../../components/Search';
import RoutineListItem from '../../components/RoutineListItem';
import {getData, getItemCount, keyExtractor, getItem} from './Controller';

const Container = styled.View`
  padding: 10px 10px 0px 10px;
  flex: 1;
`;

const RoutineListing = (): JSX.Element => {
  const [isDataAscending, setIsDataAscending] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    getData(
      setIsLoading,
      pageNumber,
      setData,
      setPageNumber,
      setRefreshing,
      data,
    );
  }, []);

  useEffect(() => {
    const sortedData = [...data];
    if (isDataAscending) {
      sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setData(sortedData);
  }, [isDataAscending]);

  const filteredArray = useMemo(() => {
    if (text) {
      return data.filter(obj =>
        obj.name.toLowerCase().includes(text.toLowerCase()),
      );
    }
    return data;
  }, [data, text]);

  const onRefresh = () => {
    setPageNumber(1);
    getData(
      setIsLoading,
      pageNumber,
      setData,
      setPageNumber,
      setRefreshing,
      data,
      true,
    );
    setRefreshing(true);
  };

  const onEndReached = () => {
    if (!isLoading) {
      setIsLoading(true);
      getData(
        setIsLoading,
        pageNumber,
        setData,
        setPageNumber,
        setRefreshing,
        data,
      );
    }
  };

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return null;
  };

  const deleteItem = id => {
    const updatedItems = [...data].filter(item => item._id !== id);
    setData(updatedItems);
  };

  return (
    <Container>
      <Search
        isDataAscending={isDataAscending}
        setIsDataAscending={setIsDataAscending}
        setText={setText}
        text={text}
      />
      <VirtualizedList
        data={filteredArray}
        getItemCount={() => getItemCount(text, filteredArray, data)}
        getItem={getItem}
        renderItem={item => (
          <RoutineListItem
            title={item.item?.name}
            image={item.item?.visualAidUrl}
            _id={item.item?._id}
            deleteItem={deleteItem}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={keyExtractor}
        onEndReached={text ? null : onEndReached}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{flexGrow: 1}}
      />
    </Container>
  );
};

export default RoutineListing;
