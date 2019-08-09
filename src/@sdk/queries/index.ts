import {
  ApolloClient,
  ApolloQueryResult,
  QueryOptions as ApolloQueryOptions
} from "apollo-client";
import gql from "graphql-tag";

import { RequireOnlyOne } from "../tsHelpers";
import * as Checkout from "./checkout";
import * as Product from "./products";
import { getCheckout, getCheckoutVariables } from "./types/getCheckout";
import { getUserCheckout } from "./types/getUserCheckout";
import { OrderByToken, OrderByTokenVariables } from "./types/OrderByToken";
import {
  ProductDetails,
  ProductDetailsVariables
} from "./types/ProductDetails";
import { UserDetails } from "./types/UserDetails";
import * as User from "./user";

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  CheckoutDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<getCheckoutVariables>
  ): Promise<ApolloQueryResult<getCheckout>> =>
    client.query({
      query: gql`
        ${Checkout.getCheckoutQuery}
      `,
      ...options,
    }),
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductDetailsVariables>
  ): Promise<ApolloQueryResult<ProductDetails>> =>
    client.query({
      query: gql`
        ${Product.productDetails}
      `,
      ...options,
    }),
  UserCheckout: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): Promise<ApolloQueryResult<getUserCheckout>> =>
    client.query({
      query: gql`
        ${Checkout.getUserCheckoutQuery}
      `,
      ...options,
    }),
  UserDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): Promise<ApolloQueryResult<UserDetails>> =>
    client.query({
      query: gql`
        ${User.getUserDetailsQuery}
      `,
      ...options,
    }),
  UserOrders: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): Promise<ApolloQueryResult<OrderByToken>> =>
    client.query({
      query: gql`
        ${User.orderDetailsByTokenQuery}
      `,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
