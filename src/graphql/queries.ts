/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const searchBacklogItems = /* GraphQL */ `query SearchBacklogItems(
  $title: String
  $type: ItemType
  $rating: Int
  $owner: String
  $status: ItemStatus
  $from: Int!
) {
  searchBacklogItems(
    title: $title
    type: $type
    rating: $rating
    owner: $owner
    status: $status
    from: $from
  ) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    image
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchBacklogItemsQueryVariables,
  APITypes.SearchBacklogItemsQuery
>;
export const getBacklogItem = /* GraphQL */ `query GetBacklogItem($id: ID!) {
  getBacklogItem(id: $id) {
    id
    title
    type
    rating
    createdAt
    owner
    status
    image
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBacklogItemQueryVariables,
  APITypes.GetBacklogItemQuery
>;
export const listBacklogItems = /* GraphQL */ `query ListBacklogItems(
  $filter: ModelBacklogItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listBacklogItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      type
      rating
      createdAt
      owner
      status
      image
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBacklogItemsQueryVariables,
  APITypes.ListBacklogItemsQuery
>;
export const getAnime = /* GraphQL */ `query GetAnime($id: ID!) {
  getAnime(id: $id) {
    id
    title
    createdAt
    image
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAnimeQueryVariables, APITypes.GetAnimeQuery>;
export const listAnime = /* GraphQL */ `query ListAnime(
  $filter: ModelAnimeFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnime(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      createdAt
      image
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListAnimeQueryVariables, APITypes.ListAnimeQuery>;
