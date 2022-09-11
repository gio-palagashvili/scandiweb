import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => console.log(`graphql error: ${message}`))
    }
});
const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000/" })
])

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
})
