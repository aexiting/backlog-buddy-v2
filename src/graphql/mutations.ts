/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createBacklogItem = /* GraphQL */ `mutation CreateBacklogItem(
  $input: CreateBacklogItemInput!
  $condition: ModelBacklogItemConditionInput
) {
  createBacklogItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBacklogItemMutationVariables,
  APITypes.CreateBacklogItemMutation
>;
export const updateBacklogItem = /* GraphQL */ `mutation UpdateBacklogItem(
  $input: UpdateBacklogItemInput!
  $condition: ModelBacklogItemConditionInput
) {
  updateBacklogItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBacklogItemMutationVariables,
  APITypes.UpdateBacklogItemMutation
>;
export const deleteBacklogItem = /* GraphQL */ `mutation DeleteBacklogItem(
  $input: DeleteBacklogItemInput!
  $condition: ModelBacklogItemConditionInput
) {
  deleteBacklogItem(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBacklogItemMutationVariables,
  APITypes.DeleteBacklogItemMutation
>;
export const createAnime = /* GraphQL */ `mutation CreateAnime(
  $input: CreateAnimeInput!
  $condition: ModelAnimeConditionInput
) {
  createAnime(input: $input, condition: $condition) {
    id
    title
    createdAt
    image
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAnimeMutationVariables,
  APITypes.CreateAnimeMutation
>;
export const updateAnime = /* GraphQL */ `mutation UpdateAnime(
  $input: UpdateAnimeInput!
  $condition: ModelAnimeConditionInput
) {
  updateAnime(input: $input, condition: $condition) {
    id
    title
    createdAt
    image
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAnimeMutationVariables,
  APITypes.UpdateAnimeMutation
>;
export const deleteAnime = /* GraphQL */ `mutation DeleteAnime(
  $input: DeleteAnimeInput!
  $condition: ModelAnimeConditionInput
) {
  deleteAnime(input: $input, condition: $condition) {
    id
    title
    createdAt
    image
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAnimeMutationVariables,
  APITypes.DeleteAnimeMutation
>;
