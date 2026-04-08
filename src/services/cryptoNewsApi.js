import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://data-api.coindesk.com';

const createRequest = (url) => ({ url });

export const cryptoNewsApi =createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/v1/article/list?lang=EN&limit=${count}&categories=${newsCategory || 'cryptocurrency'}`)
        })
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;