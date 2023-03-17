import axios from 'axios';

export const getData = (setIsLoading, pageNumber, setData, setPageNumber, setRefreshing, data, refresh: boolean = false) => {
    setIsLoading(true);
    const config = {
        headers: {
            Authorization: 'ddc58e6a-2e69-4f44-97e8-1454eb352069',
        },
    };
    axios
        .get(
            `reminders/all?limit=10&page=${pageNumber && !refresh ? pageNumber : 1
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

export const getItemCount = (text, filteredArray, data) => {
    if (text) {
        return filteredArray.length;
    }
    return data?.length || 0;
};

export const keyExtractor = (item, index) => {
    return item?._id;
};

export const getItem = (item, index) => {
    return item[index];
};