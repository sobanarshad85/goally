import React, { useEffect, useState } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Search from '../../components/Search';
import Entypo from 'react-native-vector-icons/Entypo';
import RoutineListItem from '../../components/RoutineListItem';

const Container = styled.View`
  padding: 10px;
  flex: 1;
`;

function RoutineListing(): JSX.Element {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getData = (refresh: boolean = false) => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'ddc58e6a-2e69-4f44-97e8-1454eb352069'
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      `https://devapi.getgoally.com/v1/api/reminders/all?limit=10&page=${
        pageNumber && !refresh ? pageNumber : 1
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (refresh) {
          setData(result?.docs);
        } else {
          setData([...data, ...result?.docs]);
        }
        setPageNumber(result?.nextPage);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getData();
  }, []);

  const getItemCount = () => {
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
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return null;
  };

  return (
    <Container>
      <Search />
      <VirtualizedList
        data={data}
        getItemCount={getItemCount}
        getItem={getItem}
        renderItem={(item) => (
          <RoutineListItem
            title={item.item?.name}
            image={item.item?.visualAidUrl}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Container>
  );
}

export default RoutineListing;
