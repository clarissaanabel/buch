import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider as Provider,
    ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const uploadLink = createUploadLink({
    // Add your backend url
    uri: 'http://localhost:3000/graphql',
    fetch: fetch,
})
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})
const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
    cache: new InMemoryCache({
        addTypename: false,
    }),
})

export default client
