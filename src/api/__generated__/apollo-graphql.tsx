/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  ISO8601DateTime: any,
};

export type ActiveRecord = {
  createdAt: Scalars['ISO8601DateTime'],
  updatedAt: Scalars['ISO8601DateTime'],
};

export type Annotation = ActiveRecord & {
   __typename?: 'Annotation',
  createdAt: Scalars['ISO8601DateTime'],
  favorited: Scalars['Boolean'],
  id: Scalars['ID'],
  text: Scalars['String'],
  updatedAt: Scalars['ISO8601DateTime'],
  user: User,
};

export type AnnotationConnection = {
   __typename?: 'AnnotationConnection',
  edges?: Maybe<Array<Maybe<AnnotationEdge>>>,
  nodes?: Maybe<Array<Maybe<Annotation>>>,
  pageInfo: PageInfo,
};

export type AnnotationEdge = {
   __typename?: 'AnnotationEdge',
  cursor: Scalars['String'],
  node?: Maybe<Annotation>,
};

export type AnnotationInput = {
  text: Scalars['String'],
  verseId: Scalars['ID'],
};

export type CreateAnnotationInput = {
  annotationInput: AnnotationInput,
  clientMutationId?: Maybe<Scalars['String']>,
};

export type CreateAnnotationPayload = {
   __typename?: 'CreateAnnotationPayload',
  annotation: Annotation,
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
};

export type CreateUserInput = {
  email: Scalars['String'],
  isAdmin: Scalars['Boolean'],
  username: Scalars['String'],
  displayName: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type CreateUserPayload = {
   __typename?: 'CreateUserPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  user?: Maybe<User>,
};

export type Error = {
   __typename?: 'Error',
  field: Scalars['String'],
  message: Scalars['String'],
};

export type FavoriteAnnotationInput = {
  annotationId: Scalars['ID'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type FavoriteAnnotationPayload = {
   __typename?: 'FavoriteAnnotationPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  success?: Maybe<Scalars['Boolean']>,
};

export type InvalidateTokenInput = {
  userId: Scalars['ID'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type InvalidateTokenPayload = {
   __typename?: 'InvalidateTokenPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  success: Scalars['Boolean'],
};


export type Mutation = {
   __typename?: 'Mutation',
  createAnnotation?: Maybe<CreateAnnotationPayload>,
  createUser?: Maybe<CreateUserPayload>,
  favoriteAnnotation?: Maybe<FavoriteAnnotationPayload>,
  invalidateToken?: Maybe<InvalidateTokenPayload>,
  refreshTokens?: Maybe<RefreshTokensPayload>,
  resetPassword?: Maybe<ResetPasswordPayload>,
  sendResetPassword?: Maybe<SendResetPasswordPayload>,
  signInUser?: Maybe<SignInUserPayload>,
  suspendUser?: Maybe<SuspendUserPayload>,
  unfavoriteAnnotation?: Maybe<UnfavoriteAnnotationPayload>,
  unsuspendUser?: Maybe<UnsuspendUserPayload>,
  updatePassword?: Maybe<UpdatePasswordPayload>,
};


export type MutationCreateAnnotationArgs = {
  input: CreateAnnotationInput
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationFavoriteAnnotationArgs = {
  input: FavoriteAnnotationInput
};


export type MutationInvalidateTokenArgs = {
  input: InvalidateTokenInput
};


export type MutationRefreshTokensArgs = {
  input: RefreshTokensInput
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
};


export type MutationSendResetPasswordArgs = {
  input: SendResetPasswordInput
};


export type MutationSignInUserArgs = {
  input: SignInUserInput
};


export type MutationSuspendUserArgs = {
  input: SuspendUserInput
};


export type MutationUnfavoriteAnnotationArgs = {
  input: UnfavoriteAnnotationInput
};


export type MutationUnsuspendUserArgs = {
  input: UnsuspendUserInput
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput
};

export type PageInfo = {
   __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  annotation: Annotation,
  annotations: AnnotationConnection,
  me?: Maybe<User>,
  myAnnotations: AnnotationConnection,
  user: User,
  users: UserConnection,
  verse: Verse,
};


export type QueryAnnotationArgs = {
  annotationId: Scalars['ID']
};


export type QueryAnnotationsArgs = {
  verseId: Scalars['ID'],
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryMyAnnotationsArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  userId: Scalars['ID']
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryVerseArgs = {
  verseId: Scalars['ID']
};

export type RefreshTokensInput = {
  refreshToken: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type RefreshTokensPayload = {
   __typename?: 'RefreshTokensPayload',
  accessToken?: Maybe<Scalars['String']>,
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  refreshToken?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type ResetPasswordInput = {
  password: Scalars['String'],
  resetPasswordToken: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type ResetPasswordPayload = {
   __typename?: 'ResetPasswordPayload',
  accessToken?: Maybe<Scalars['String']>,
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  refreshToken?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type SendResetPasswordInput = {
  email: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type SendResetPasswordPayload = {
   __typename?: 'SendResetPasswordPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  success: Scalars['Boolean'],
};

export type SignInUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type SignInUserPayload = {
   __typename?: 'SignInUserPayload',
  accessToken?: Maybe<Scalars['String']>,
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  refreshToken?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type SuspendUserInput = {
  userId: Scalars['ID'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type SuspendUserPayload = {
   __typename?: 'SuspendUserPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  user?: Maybe<User>,
};

export type UnfavoriteAnnotationInput = {
  annotationId: Scalars['ID'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type UnfavoriteAnnotationPayload = {
   __typename?: 'UnfavoriteAnnotationPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  success?: Maybe<Scalars['Boolean']>,
};

export type UnsuspendUserInput = {
  userId: Scalars['ID'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type UnsuspendUserPayload = {
   __typename?: 'UnsuspendUserPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  user?: Maybe<User>,
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String'],
  newPassword: Scalars['String'],
  clientMutationId?: Maybe<Scalars['String']>,
};

export type UpdatePasswordPayload = {
   __typename?: 'UpdatePasswordPayload',
  clientMutationId?: Maybe<Scalars['String']>,
  errors?: Maybe<Array<Maybe<Error>>>,
  user?: Maybe<User>,
};

export type User = ActiveRecord & {
   __typename?: 'User',
  createdAt: Scalars['ISO8601DateTime'],
  displayName: Scalars['String'],
  email: Scalars['String'],
  id: Scalars['ID'],
  isActive: Scalars['Boolean'],
  isAdmin: Scalars['Boolean'],
  updatedAt: Scalars['ISO8601DateTime'],
  username: Scalars['String'],
};

export type UserConnection = {
   __typename?: 'UserConnection',
  edges?: Maybe<Array<Maybe<UserEdge>>>,
  nodes?: Maybe<Array<Maybe<User>>>,
  pageInfo: PageInfo,
};

export type UserEdge = {
   __typename?: 'UserEdge',
  cursor: Scalars['String'],
  node?: Maybe<User>,
};

export type Verse = ActiveRecord & {
   __typename?: 'Verse',
  createdAt: Scalars['ISO8601DateTime'],
  id: Scalars['ID'],
  numberOfAnnotations?: Maybe<Scalars['Int']>,
  numberOfMyAnnotations?: Maybe<Scalars['Int']>,
  updatedAt: Scalars['ISO8601DateTime'],
};

export type MeFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email'>
);

export type PublicAnnotationFragment = (
  { __typename?: 'Annotation' }
  & Pick<Annotation, 'id' | 'text' | 'createdAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'displayName'>
  ) }
);

export type ResetPasswordMutationVariables = {
  input: ResetPasswordInput
};


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: Maybe<(
    { __typename?: 'ResetPasswordPayload' }
    & Pick<ResetPasswordPayload, 'accessToken' | 'refreshToken'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & MeFragment
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'field' | 'message'>
    )>>> }
  )> }
);

export type SendResetPasswordMutationVariables = {
  input: SendResetPasswordInput
};


export type SendResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { sendResetPassword: Maybe<(
    { __typename?: 'SendResetPasswordPayload' }
    & Pick<SendResetPasswordPayload, 'success'>
  )> }
);

export type SignInUserMutationVariables = {
  input: SignInUserInput
};


export type SignInUserMutation = (
  { __typename?: 'Mutation' }
  & { signInUser: Maybe<(
    { __typename?: 'SignInUserPayload' }
    & Pick<SignInUserPayload, 'accessToken' | 'refreshToken'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & MeFragment
    )>, errors: Maybe<Array<Maybe<(
      { __typename?: 'Error' }
      & Pick<Error, 'field' | 'message'>
    )>>> }
  )> }
);

export type PublicAnnotationsQueryVariables = {
  first?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  verseId: Scalars['ID']
};


export type PublicAnnotationsQuery = (
  { __typename?: 'Query' }
  & { annotations: (
    { __typename?: 'AnnotationConnection' }
    & { edges: Maybe<Array<Maybe<(
      { __typename?: 'AnnotationEdge' }
      & { node: Maybe<(
        { __typename?: 'Annotation' }
        & PublicAnnotationFragment
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  ) }
);

export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  email
}
    `;
export const PublicAnnotationFragmentDoc = gql`
    fragment PublicAnnotation on Annotation {
  id
  text
  createdAt
  user {
    id
    username
    displayName
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    accessToken
    refreshToken
    user {
      ...Me
    }
    errors {
      field
      message
    }
  }
}
    ${MeFragmentDoc}`;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendResetPasswordDocument = gql`
    mutation SendResetPassword($input: SendResetPasswordInput!) {
  sendResetPassword(input: $input) {
    success
  }
}
    `;
export type SendResetPasswordMutationFn = ApolloReactCommon.MutationFunction<SendResetPasswordMutation, SendResetPasswordMutationVariables>;

/**
 * __useSendResetPasswordMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordMutation, { data, loading, error }] = useSendResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<SendResetPasswordMutation, SendResetPasswordMutationVariables>(SendResetPasswordDocument, baseOptions);
      }
export type SendResetPasswordMutationHookResult = ReturnType<typeof useSendResetPasswordMutation>;
export type SendResetPasswordMutationResult = ApolloReactCommon.MutationResult<SendResetPasswordMutation>;
export type SendResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>;
export const SignInUserDocument = gql`
    mutation SignInUser($input: SignInUserInput!) {
  signInUser(input: $input) {
    accessToken
    refreshToken
    user {
      ...Me
    }
    errors {
      field
      message
    }
  }
}
    ${MeFragmentDoc}`;
export type SignInUserMutationFn = ApolloReactCommon.MutationFunction<SignInUserMutation, SignInUserMutationVariables>;

/**
 * __useSignInUserMutation__
 *
 * To run a mutation, you first call `useSignInUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInUserMutation, { data, loading, error }] = useSignInUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInUserMutation, SignInUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInUserMutation, SignInUserMutationVariables>(SignInUserDocument, baseOptions);
      }
export type SignInUserMutationHookResult = ReturnType<typeof useSignInUserMutation>;
export type SignInUserMutationResult = ApolloReactCommon.MutationResult<SignInUserMutation>;
export type SignInUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInUserMutation, SignInUserMutationVariables>;
export const PublicAnnotationsDocument = gql`
    query PublicAnnotations($first: Int, $after: String, $verseId: ID!) {
  annotations(first: $first, after: $after, verseId: $verseId) {
    edges {
      node {
        ...PublicAnnotation
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    ${PublicAnnotationFragmentDoc}`;

/**
 * __usePublicAnnotationsQuery__
 *
 * To run a query within a React component, call `usePublicAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicAnnotationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      verseId: // value for 'verseId'
 *   },
 * });
 */
export function usePublicAnnotationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicAnnotationsQuery, PublicAnnotationsQueryVariables>) {
        return ApolloReactHooks.useQuery<PublicAnnotationsQuery, PublicAnnotationsQueryVariables>(PublicAnnotationsDocument, baseOptions);
      }
export function usePublicAnnotationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicAnnotationsQuery, PublicAnnotationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PublicAnnotationsQuery, PublicAnnotationsQueryVariables>(PublicAnnotationsDocument, baseOptions);
        }
export type PublicAnnotationsQueryHookResult = ReturnType<typeof usePublicAnnotationsQuery>;
export type PublicAnnotationsLazyQueryHookResult = ReturnType<typeof usePublicAnnotationsLazyQuery>;
export type PublicAnnotationsQueryResult = ApolloReactCommon.QueryResult<PublicAnnotationsQuery, PublicAnnotationsQueryVariables>;