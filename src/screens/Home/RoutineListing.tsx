import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  VirtualizedList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import Search from '../../components/Search';
import RoutineListItem from '../../components/RoutineListItem';
import axios from 'axios';

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

  const getData = (refresh: boolean = false) => {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: 'ddc58e6a-2e69-4f44-97e8-1454eb352069',
      },
    };
    axios
      .get(
        `reminders/all?limit=10&page=${
          pageNumber && !refresh ? pageNumber : 1
        }`,
        config,
      )
      .then(response => {
        const result = response.data;
        if (refresh) {
          setData(result?.docs);
        } else {
          setData([...data, ...result?.docs]);
        }
        setPageNumber(result?.nextPage);
      })
      .catch(error => console.log('error', error)) // handle error scenarios
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getData();
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

  const getItemCount = () => {
    if (text) {
      return filteredArray.length;
    }
    return data?.length || 0;
  };

  const keyExtractor = (item, index) => {
    return item?._id;
  };

  const getItem = (item, index) => {
    return item[index];
  };

  const onRefresh = () => {
    setPageNumber(1);
    getData(true);
    setRefreshing(true);
  };

  const onEndReached = () => {
    if (!isLoading) {
      setIsLoading(true);
      getData();
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
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={item => (
          <RoutineListItem
            title={item.item?.name}
            image={item.item?.visualAidUrl}
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
