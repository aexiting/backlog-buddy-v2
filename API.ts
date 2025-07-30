/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBacklogItemInput = {
  id?: string | null,
  title: string,
  type: ItemType,
  rating: number,
  createdAt?: string | null,
  owner: string,
  status: ItemStatus,
  image: string,
};

export enum ItemType {
  GAME = "GAME",
  MANGA = "MANGA",
  ANIME = "ANIME",
}


export enum ItemStatus {
  COMPLETED = "COMPLETED",
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  DROPPED = "DROPPED",
}


export type ModelBacklogItemConditionInput = {
  title?: ModelStringInput | null,
  type?: ModelItemTypeInput | null,
  rating?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  status?: ModelItemStatusInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelBacklogItemConditionInput | null > | null,
  or?: Array< ModelBacklogItemConditionInput | null > | null,
  not?: ModelBacklogItemConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelItemTypeInput = {
  eq?: ItemType | null,
  ne?: ItemType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelItemStatusInput = {
  eq?: ItemStatus | null,
  ne?: ItemStatus | null,
};

export type BacklogItem = {
  __typename: "BacklogItem",
  id: string,
  title: string,
  type: ItemType,
  rating: number,
  createdAt: string,
  owner: string,
  status: ItemStatus,
  image: string,
  updatedAt: string,
};

export type UpdateBacklogItemInput = {
  id: string,
  title?: string | null,
  type?: ItemType | null,
  rating?: number | null,
  createdAt?: string | null,
  owner?: string | null,
  status?: ItemStatus | null,
  image?: string | null,
};

export type DeleteBacklogItemInput = {
  id: string,
};

export type CreateAnimeInput = {
  id?: string | null,
  title: string,
  createdAt?: string | null,
  image: string,
};

export type ModelAnimeConditionInput = {
  title?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelAnimeConditionInput | null > | null,
  or?: Array< ModelAnimeConditionInput | null > | null,
  not?: ModelAnimeConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type Anime = {
  __typename: "Anime",
  id: string,
  title: string,
  createdAt: string,
  image: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateAnimeInput = {
  id: string,
  title?: string | null,
  createdAt?: string | null,
  image?: string | null,
};

export type DeleteAnimeInput = {
  id: string,
};

export type ModelBacklogItemFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelItemTypeInput | null,
  rating?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  status?: ModelItemStatusInput | null,
  image?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelBacklogItemFilterInput | null > | null,
  or?: Array< ModelBacklogItemFilterInput | null > | null,
  not?: ModelBacklogItemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBacklogItemConnection = {
  __typename: "ModelBacklogItemConnection",
  items:  Array<BacklogItem | null >,
  nextToken?: string | null,
};

export type ModelAnimeFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  image?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAnimeFilterInput | null > | null,
  or?: Array< ModelAnimeFilterInput | null > | null,
  not?: ModelAnimeFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelAnimeConnection = {
  __typename: "ModelAnimeConnection",
  items:  Array<Anime | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionBacklogItemFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBacklogItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionBacklogItemFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionAnimeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAnimeFilterInput | null > | null,
  or?: Array< ModelSubscriptionAnimeFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateBacklogItemMutationVariables = {
  input: CreateBacklogItemInput,
  condition?: ModelBacklogItemConditionInput | null,
};

export type CreateBacklogItemMutation = {
  createBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type UpdateBacklogItemMutationVariables = {
  input: UpdateBacklogItemInput,
  condition?: ModelBacklogItemConditionInput | null,
};

export type UpdateBacklogItemMutation = {
  updateBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type DeleteBacklogItemMutationVariables = {
  input: DeleteBacklogItemInput,
  condition?: ModelBacklogItemConditionInput | null,
};

export type DeleteBacklogItemMutation = {
  deleteBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type CreateAnimeMutationVariables = {
  input: CreateAnimeInput,
  condition?: ModelAnimeConditionInput | null,
};

export type CreateAnimeMutation = {
  createAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateAnimeMutationVariables = {
  input: UpdateAnimeInput,
  condition?: ModelAnimeConditionInput | null,
};

export type UpdateAnimeMutation = {
  updateAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteAnimeMutationVariables = {
  input: DeleteAnimeInput,
  condition?: ModelAnimeConditionInput | null,
};

export type DeleteAnimeMutation = {
  deleteAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type SearchBacklogItemsQueryVariables = {
  title?: string | null,
  type?: ItemType | null,
  rating?: number | null,
  owner?: string | null,
  status?: ItemStatus | null,
  from: number,
};

export type SearchBacklogItemsQuery = {
  searchBacklogItems?:  Array< {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null > | null,
};

export type GetBacklogItemQueryVariables = {
  id: string,
};

export type GetBacklogItemQuery = {
  getBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type ListBacklogItemsQueryVariables = {
  filter?: ModelBacklogItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBacklogItemsQuery = {
  listBacklogItems?:  {
    __typename: "ModelBacklogItemConnection",
    items:  Array< {
      __typename: "BacklogItem",
      id: string,
      title: string,
      type: ItemType,
      rating: number,
      createdAt: string,
      owner: string,
      status: ItemStatus,
      image: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAnimeQueryVariables = {
  id: string,
};

export type GetAnimeQuery = {
  getAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListAnimeQueryVariables = {
  filter?: ModelAnimeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnimeQuery = {
  listAnime?:  {
    __typename: "ModelAnimeConnection",
    items:  Array< {
      __typename: "Anime",
      id: string,
      title: string,
      createdAt: string,
      image: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBacklogItemSubscriptionVariables = {
  filter?: ModelSubscriptionBacklogItemFilterInput | null,
  owner?: string | null,
};

export type OnCreateBacklogItemSubscription = {
  onCreateBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBacklogItemSubscriptionVariables = {
  filter?: ModelSubscriptionBacklogItemFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBacklogItemSubscription = {
  onUpdateBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBacklogItemSubscriptionVariables = {
  filter?: ModelSubscriptionBacklogItemFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBacklogItemSubscription = {
  onDeleteBacklogItem?:  {
    __typename: "BacklogItem",
    id: string,
    title: string,
    type: ItemType,
    rating: number,
    createdAt: string,
    owner: string,
    status: ItemStatus,
    image: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAnimeSubscriptionVariables = {
  filter?: ModelSubscriptionAnimeFilterInput | null,
  owner?: string | null,
};

export type OnCreateAnimeSubscription = {
  onCreateAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateAnimeSubscriptionVariables = {
  filter?: ModelSubscriptionAnimeFilterInput | null,
  owner?: string | null,
};

export type OnUpdateAnimeSubscription = {
  onUpdateAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteAnimeSubscriptionVariables = {
  filter?: ModelSubscriptionAnimeFilterInput | null,
  owner?: string | null,
};

export type OnDeleteAnimeSubscription = {
  onDeleteAnime?:  {
    __typename: "Anime",
    id: string,
    title: string,
    createdAt: string,
    image: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
