/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
};

export type Annotation = Node & {
  __typename?: 'Annotation';
  /** The ID of an object */
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  isFavorite: Scalars['Boolean'];
  numberOfFavorites: Scalars['Int'];
  numberOfReplies: Scalars['Int'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
  verse: Verse;
  verseId: Scalars['ID'];
};

export type AnnotationConnection = {
  __typename?: 'AnnotationConnection';
  edges?: Maybe<Array<Maybe<AnnotationEdge>>>;
  pageInfo: PageInfo;
};

export type AnnotationEdge = {
  __typename?: 'AnnotationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Annotation>;
};

export type AnnotationReply = Node & {
  __typename?: 'AnnotationReply';
  annotation: Annotation;
  annotationId: Scalars['ID'];
  /** The ID of an object */
  id: Scalars['ID'];
  insertedAt: Scalars['DateTime'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['ID'];
};

export type AnnotationReplyConnection = {
  __typename?: 'AnnotationReplyConnection';
  edges?: Maybe<Array<Maybe<AnnotationReplyEdge>>>;
  pageInfo: PageInfo;
};

export type AnnotationReplyEdge = {
  __typename?: 'AnnotationReplyEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AnnotationReply>;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<User>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};


export type DeleteAnnotationPayload = {
  __typename?: 'DeleteAnnotationPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Scalars['Boolean']>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type DeleteAnnotationReplyPayload = {
  __typename?: 'DeleteAnnotationReplyPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Scalars['Boolean']>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type FavoriteAnnotationInput = {
  annotationId: Scalars['ID'];
};

export type FavoriteAnnotationPayload = {
  __typename?: 'FavoriteAnnotationPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Annotation>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type RefreshTokenPayload = {
  __typename?: 'RefreshTokenPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<SessionInfo>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Scalars['Boolean']>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  createAccount: CreateAccountPayload;
  deleteAnnotation: DeleteAnnotationPayload;
  deleteAnnotationReply: DeleteAnnotationReplyPayload;
  favoriteAnnotation: FavoriteAnnotationPayload;
  refreshToken: RefreshTokenPayload;
  resetPassword: ResetPasswordPayload;
  saveAnnotation: SaveAnnotationPayload;
  saveAnnotationReply: SaveAnnotationReplyPayload;
  sendForgotPassword: SendForgotPasswordPayload;
  signIn: SignInPayload;
  signOut: SignOutPayload;
  signOutEverywhere: SignOutPayload;
  unfavoriteAnnotation: UnfavoriteAnnotationPayload;
};


export type RootMutationTypeCreateAccountArgs = {
  input: CreateAccountInput;
};


export type RootMutationTypeDeleteAnnotationArgs = {
  annotationId: Scalars['ID'];
};


export type RootMutationTypeDeleteAnnotationReplyArgs = {
  annotationReplyId: Scalars['ID'];
};


export type RootMutationTypeFavoriteAnnotationArgs = {
  input: FavoriteAnnotationInput;
};


export type RootMutationTypeRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type RootMutationTypeResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type RootMutationTypeSaveAnnotationArgs = {
  input: SaveAnnotationInput;
};


export type RootMutationTypeSaveAnnotationReplyArgs = {
  input: SaveAnnotationReplyInput;
};


export type RootMutationTypeSendForgotPasswordArgs = {
  input: SendForgotPasswordInput;
};


export type RootMutationTypeSignInArgs = {
  input: SignInInput;
};


export type RootMutationTypeSignOutArgs = {
  refreshToken: Scalars['String'];
};


export type RootMutationTypeUnfavoriteAnnotationArgs = {
  input: UnfavoriteAnnotationInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  annotation: Annotation;
  annotationReplies?: Maybe<AnnotationReplyConnection>;
  favoriteAnnotations?: Maybe<AnnotationConnection>;
  me?: Maybe<User>;
  myAnnotations?: Maybe<AnnotationConnection>;
  publicAnnotations?: Maybe<AnnotationConnection>;
  user: User;
  verse: Verse;
  verses?: Maybe<Array<Verse>>;
};


export type RootQueryTypeAnnotationArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeAnnotationRepliesArgs = {
  after?: Maybe<Scalars['String']>;
  annotationId?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type RootQueryTypeFavoriteAnnotationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['ID']>;
};


export type RootQueryTypeMyAnnotationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  verseId?: Maybe<Scalars['ID']>;
};


export type RootQueryTypePublicAnnotationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['ID']>;
  verseId?: Maybe<Scalars['ID']>;
};


export type RootQueryTypeUserArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeVerseArgs = {
  id: Scalars['ID'];
};


export type RootQueryTypeVersesArgs = {
  bookNumber: Scalars['Int'];
  chapterNumber: Scalars['Int'];
};

export type SaveAnnotationInput = {
  deletedAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  insertedAt?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  verseId: Scalars['ID'];
};

export type SaveAnnotationPayload = {
  __typename?: 'SaveAnnotationPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Annotation>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type SaveAnnotationReplyInput = {
  annotationId: Scalars['ID'];
  id?: Maybe<Scalars['ID']>;
  text: Scalars['String'];
};

export type SaveAnnotationReplyPayload = {
  __typename?: 'SaveAnnotationReplyPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<AnnotationReply>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type SendForgotPasswordInput = {
  email: Scalars['String'];
};

export type SendForgotPasswordPayload = {
  __typename?: 'SendForgotPasswordPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Scalars['Boolean']>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type SessionInfo = {
  __typename?: 'SessionInfo';
  accessToken: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  user: User;
  userId?: Maybe<Scalars['ID']>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<SessionInfo>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Scalars['Boolean']>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type UnfavoriteAnnotationInput = {
  annotationId: Scalars['ID'];
};

export type UnfavoriteAnnotationPayload = {
  __typename?: 'UnfavoriteAnnotationPayload';
  /** A list of failed validations. May be blank or null if mutation succeeded. */
  messages?: Maybe<Array<Maybe<ValidationMessage>>>;
  /** The object created/updated/deleted by the mutation. May be null if mutation failed. */
  result?: Maybe<Annotation>;
  /** Indicates if the mutation completed successfully or not.  */
  successful: Scalars['Boolean'];
};

export type User = Node & {
  __typename?: 'User';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
};

/**
 * Validation messages are returned when mutation input does not meet the requirements.
 * While client-side validation is highly recommended to provide the best User Experience,
 * All inputs will always be validated server-side.
 * 
 * Some examples of validations are:
 * 
 * * Username must be at least 10 characters
 * * Email field does not contain an email address
 * * Birth Date is required
 * 
 * While GraphQL has support for required values, mutation data fields are always
 * set to optional in our API. This allows 'required field' messages
 * to be returned in the same manner as other validations. The only exceptions
 * are id fields, which may be required to perform updates or deletes.
 */
export type ValidationMessage = {
  __typename?: 'ValidationMessage';
  /** A unique error code for the type of validation used. */
  code: Scalars['String'];
  /**
   * The input field that the error applies to. The field can be used to
   * identify which field the error message should be displayed next to in the
   * presentation layer.
   * 
   * If there are multiple errors to display for a field, multiple validation
   * messages will be in the result.
   * 
   * This field may be null in cases where an error cannot be applied to a specific field.
   */
  field?: Maybe<Scalars['String']>;
  /**
   * A friendly error message, appropriate for display to the end user.
   * 
   * The message is interpolated to include the appropriate variables.
   * 
   * Example: `Username must be at least 10 characters`
   * 
   * This message may change without notice, so we do not recommend you match against the text.
   * Instead, use the *code* field for matching.
   */
  message?: Maybe<Scalars['String']>;
  /** A list of substitutions to be applied to a validation message template */
  options?: Maybe<Array<Maybe<ValidationOption>>>;
  /**
   * A template used to generate the error message, with placeholders for option substiution.
   * 
   * Example: `Username must be at least {count} characters`
   * 
   * This message may change without notice, so we do not recommend you match against the text.
   * Instead, use the *code* field for matching.
   */
  template?: Maybe<Scalars['String']>;
};

export type ValidationOption = {
  __typename?: 'ValidationOption';
  /** The name of a variable to be subsituted in a validation message template */
  key: Scalars['String'];
  /** The value of a variable to be substituted in a validation message template */
  value: Scalars['String'];
};

export type Verse = {
  __typename?: 'Verse';
  bookNumber: Scalars['Int'];
  chapterNumber: Scalars['Int'];
  id: Scalars['ID'];
  text: Scalars['String'];
  verseNumber: Scalars['Int'];
};

export type AnnotationFragment = (
  { __typename?: 'Annotation' }
  & Pick<Annotation, 'id' | 'text' | 'isFavorite' | 'numberOfFavorites' | 'insertedAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
  ) }
);

export type AnnotationListFragment = (
  { __typename?: 'Annotation' }
  & Pick<Annotation, 'id' | 'text' | 'insertedAt' | 'isFavorite' | 'numberOfFavorites' | 'verseId'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
  ) }
);

export type MeFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email'>
);

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = (
  { __typename?: 'RootMutationType' }
  & { createAccount: (
    { __typename?: 'CreateAccountPayload' }
    & Pick<CreateAccountPayload, 'successful'>
    & { result?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type FavoriteAnnotationMutationVariables = Exact<{
  input: FavoriteAnnotationInput;
}>;


export type FavoriteAnnotationMutation = (
  { __typename?: 'RootMutationType' }
  & { favoriteAnnotation: (
    { __typename?: 'FavoriteAnnotationPayload' }
    & Pick<FavoriteAnnotationPayload, 'successful'>
    & { result?: Maybe<(
      { __typename?: 'Annotation' }
      & Pick<Annotation, 'id' | 'isFavorite' | 'numberOfFavorites'>
    )>, messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'RootMutationType' }
  & { resetPassword: (
    { __typename?: 'ResetPasswordPayload' }
    & Pick<ResetPasswordPayload, 'result'>
    & { messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type SaveAnnotationMutationVariables = Exact<{
  input: SaveAnnotationInput;
}>;


export type SaveAnnotationMutation = (
  { __typename?: 'RootMutationType' }
  & { saveAnnotation: (
    { __typename?: 'SaveAnnotationPayload' }
    & Pick<SaveAnnotationPayload, 'successful'>
    & { result?: Maybe<(
      { __typename?: 'Annotation' }
      & Pick<Annotation, 'id'>
    )>, messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type SendForgotPasswordMutationVariables = Exact<{
  input: SendForgotPasswordInput;
}>;


export type SendForgotPasswordMutation = (
  { __typename?: 'RootMutationType' }
  & { sendForgotPassword: (
    { __typename?: 'SendForgotPasswordPayload' }
    & Pick<SendForgotPasswordPayload, 'successful'>
    & { messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'RootMutationType' }
  & { signIn: (
    { __typename?: 'SignInPayload' }
    & { result?: Maybe<(
      { __typename?: 'SessionInfo' }
      & Pick<SessionInfo, 'accessToken' | 'refreshToken'>
      & { user: (
        { __typename?: 'User' }
        & MeFragment
      ) }
    )>, messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type SignOutMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type SignOutMutation = (
  { __typename?: 'RootMutationType' }
  & { signOut: (
    { __typename?: 'SignOutPayload' }
    & Pick<SignOutPayload, 'result'>
    & { messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type UnfavoriteAnnotationMutationVariables = Exact<{
  input: UnfavoriteAnnotationInput;
}>;


export type UnfavoriteAnnotationMutation = (
  { __typename?: 'RootMutationType' }
  & { unfavoriteAnnotation: (
    { __typename?: 'UnfavoriteAnnotationPayload' }
    & Pick<UnfavoriteAnnotationPayload, 'successful'>
    & { result?: Maybe<(
      { __typename?: 'Annotation' }
      & Pick<Annotation, 'id' | 'isFavorite' | 'numberOfFavorites'>
    )>, messages?: Maybe<Array<Maybe<(
      { __typename?: 'ValidationMessage' }
      & Pick<ValidationMessage, 'field' | 'message'>
    )>>> }
  ) }
);

export type AnnotationQueryVariables = Exact<{
  annotationId: Scalars['ID'];
}>;


export type AnnotationQuery = (
  { __typename?: 'RootQueryType' }
  & { annotation: (
    { __typename?: 'Annotation' }
    & AnnotationFragment
  ) }
);

export type CollectionAnnotationsQueryVariables = Exact<{
  userId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type CollectionAnnotationsQuery = (
  { __typename?: 'RootQueryType' }
  & { publicAnnotations?: Maybe<(
    { __typename?: 'AnnotationConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AnnotationEdge' }
      & { node?: Maybe<(
        { __typename?: 'Annotation' }
        & AnnotationListFragment
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  )> }
);

export type FavoriteAnnotationsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
}>;


export type FavoriteAnnotationsQuery = (
  { __typename?: 'RootQueryType' }
  & { favoriteAnnotations?: Maybe<(
    { __typename?: 'AnnotationConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AnnotationEdge' }
      & { node?: Maybe<(
        { __typename?: 'Annotation' }
        & AnnotationListFragment
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  )> }
);

export type MyCollectionAnnotationsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: Maybe<Scalars['String']>;
}>;


export type MyCollectionAnnotationsQuery = (
  { __typename?: 'RootQueryType' }
  & { myAnnotations?: Maybe<(
    { __typename?: 'AnnotationConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AnnotationEdge' }
      & { node?: Maybe<(
        { __typename?: 'Annotation' }
        & AnnotationListFragment
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  )> }
);

export type MyVerseAnnotationsQueryVariables = Exact<{
  verseId: Scalars['ID'];
}>;


export type MyVerseAnnotationsQuery = (
  { __typename?: 'RootQueryType' }
  & { myAnnotations?: Maybe<(
    { __typename?: 'AnnotationConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AnnotationEdge' }
      & { node?: Maybe<(
        { __typename?: 'Annotation' }
        & AnnotationListFragment
      )> }
    )>>> }
  )> }
);

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserProfileQuery = (
  { __typename?: 'RootQueryType' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
  ) }
);

export type VerseAnnotationsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  verseId: Scalars['ID'];
}>;


export type VerseAnnotationsQuery = (
  { __typename?: 'RootQueryType' }
  & { publicAnnotations?: Maybe<(
    { __typename?: 'AnnotationConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AnnotationEdge' }
      & { node?: Maybe<(
        { __typename?: 'Annotation' }
        & AnnotationListFragment
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  )> }
);

export const AnnotationFragmentDoc = gql`
    fragment Annotation on Annotation {
  id
  text
  isFavorite
  numberOfFavorites
  insertedAt
  user {
    id
    firstName
    lastName
  }
}
    `;
export const AnnotationListFragmentDoc = gql`
    fragment AnnotationList on Annotation {
  id
  text
  insertedAt
  isFavorite
  numberOfFavorites
  verseId
  user {
    id
    firstName
    lastName
  }
}
    `;
export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  email
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    result {
      id
    }
    messages {
      field
      message
    }
    successful
  }
}
    `;
export type CreateAccountMutationFn = ApolloReactCommon.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, baseOptions);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = ApolloReactCommon.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const FavoriteAnnotationDocument = gql`
    mutation FavoriteAnnotation($input: FavoriteAnnotationInput!) {
  favoriteAnnotation(input: $input) {
    successful
    result {
      id
      isFavorite
      numberOfFavorites
    }
    messages {
      field
      message
    }
  }
}
    `;
export type FavoriteAnnotationMutationFn = ApolloReactCommon.MutationFunction<FavoriteAnnotationMutation, FavoriteAnnotationMutationVariables>;

/**
 * __useFavoriteAnnotationMutation__
 *
 * To run a mutation, you first call `useFavoriteAnnotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavoriteAnnotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favoriteAnnotationMutation, { data, loading, error }] = useFavoriteAnnotationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFavoriteAnnotationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FavoriteAnnotationMutation, FavoriteAnnotationMutationVariables>) {
        return ApolloReactHooks.useMutation<FavoriteAnnotationMutation, FavoriteAnnotationMutationVariables>(FavoriteAnnotationDocument, baseOptions);
      }
export type FavoriteAnnotationMutationHookResult = ReturnType<typeof useFavoriteAnnotationMutation>;
export type FavoriteAnnotationMutationResult = ApolloReactCommon.MutationResult<FavoriteAnnotationMutation>;
export type FavoriteAnnotationMutationOptions = ApolloReactCommon.BaseMutationOptions<FavoriteAnnotationMutation, FavoriteAnnotationMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    result
    messages {
      field
      message
    }
  }
}
    `;
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
export const SaveAnnotationDocument = gql`
    mutation SaveAnnotation($input: SaveAnnotationInput!) {
  saveAnnotation(input: $input) {
    result {
      id
    }
    messages {
      field
      message
    }
    successful
  }
}
    `;
export type SaveAnnotationMutationFn = ApolloReactCommon.MutationFunction<SaveAnnotationMutation, SaveAnnotationMutationVariables>;

/**
 * __useSaveAnnotationMutation__
 *
 * To run a mutation, you first call `useSaveAnnotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAnnotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAnnotationMutation, { data, loading, error }] = useSaveAnnotationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAnnotationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveAnnotationMutation, SaveAnnotationMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveAnnotationMutation, SaveAnnotationMutationVariables>(SaveAnnotationDocument, baseOptions);
      }
export type SaveAnnotationMutationHookResult = ReturnType<typeof useSaveAnnotationMutation>;
export type SaveAnnotationMutationResult = ApolloReactCommon.MutationResult<SaveAnnotationMutation>;
export type SaveAnnotationMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveAnnotationMutation, SaveAnnotationMutationVariables>;
export const SendForgotPasswordDocument = gql`
    mutation SendForgotPassword($input: SendForgotPasswordInput!) {
  sendForgotPassword(input: $input) {
    successful
    messages {
      field
      message
    }
  }
}
    `;
export type SendForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<SendForgotPasswordMutation, SendForgotPasswordMutationVariables>;

/**
 * __useSendForgotPasswordMutation__
 *
 * To run a mutation, you first call `useSendForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendForgotPasswordMutation, { data, loading, error }] = useSendForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendForgotPasswordMutation, SendForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<SendForgotPasswordMutation, SendForgotPasswordMutationVariables>(SendForgotPasswordDocument, baseOptions);
      }
export type SendForgotPasswordMutationHookResult = ReturnType<typeof useSendForgotPasswordMutation>;
export type SendForgotPasswordMutationResult = ApolloReactCommon.MutationResult<SendForgotPasswordMutation>;
export type SendForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<SendForgotPasswordMutation, SendForgotPasswordMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    result {
      accessToken
      refreshToken
      user {
        ...Me
      }
    }
    messages {
      field
      message
    }
  }
}
    ${MeFragmentDoc}`;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut($refreshToken: String!) {
  signOut(refreshToken: $refreshToken) {
    result
    messages {
      field
      message
    }
  }
}
    `;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const UnfavoriteAnnotationDocument = gql`
    mutation UnfavoriteAnnotation($input: UnfavoriteAnnotationInput!) {
  unfavoriteAnnotation(input: $input) {
    successful
    result {
      id
      isFavorite
      numberOfFavorites
    }
    messages {
      field
      message
    }
  }
}
    `;
export type UnfavoriteAnnotationMutationFn = ApolloReactCommon.MutationFunction<UnfavoriteAnnotationMutation, UnfavoriteAnnotationMutationVariables>;

/**
 * __useUnfavoriteAnnotationMutation__
 *
 * To run a mutation, you first call `useUnfavoriteAnnotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfavoriteAnnotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfavoriteAnnotationMutation, { data, loading, error }] = useUnfavoriteAnnotationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnfavoriteAnnotationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnfavoriteAnnotationMutation, UnfavoriteAnnotationMutationVariables>) {
        return ApolloReactHooks.useMutation<UnfavoriteAnnotationMutation, UnfavoriteAnnotationMutationVariables>(UnfavoriteAnnotationDocument, baseOptions);
      }
export type UnfavoriteAnnotationMutationHookResult = ReturnType<typeof useUnfavoriteAnnotationMutation>;
export type UnfavoriteAnnotationMutationResult = ApolloReactCommon.MutationResult<UnfavoriteAnnotationMutation>;
export type UnfavoriteAnnotationMutationOptions = ApolloReactCommon.BaseMutationOptions<UnfavoriteAnnotationMutation, UnfavoriteAnnotationMutationVariables>;
export const AnnotationDocument = gql`
    query Annotation($annotationId: ID!) {
  annotation(id: $annotationId) {
    ...Annotation
  }
}
    ${AnnotationFragmentDoc}`;

/**
 * __useAnnotationQuery__
 *
 * To run a query within a React component, call `useAnnotationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnotationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnotationQuery({
 *   variables: {
 *      annotationId: // value for 'annotationId'
 *   },
 * });
 */
export function useAnnotationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AnnotationQuery, AnnotationQueryVariables>) {
        return ApolloReactHooks.useQuery<AnnotationQuery, AnnotationQueryVariables>(AnnotationDocument, baseOptions);
      }
export function useAnnotationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AnnotationQuery, AnnotationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AnnotationQuery, AnnotationQueryVariables>(AnnotationDocument, baseOptions);
        }
export type AnnotationQueryHookResult = ReturnType<typeof useAnnotationQuery>;
export type AnnotationLazyQueryHookResult = ReturnType<typeof useAnnotationLazyQuery>;
export type AnnotationQueryResult = ApolloReactCommon.QueryResult<AnnotationQuery, AnnotationQueryVariables>;
export const CollectionAnnotationsDocument = gql`
    query CollectionAnnotations($userId: ID!, $first: Int, $after: String) {
  publicAnnotations(userId: $userId, first: $first, after: $after) {
    edges {
      node {
        ...AnnotationList
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
    ${AnnotationListFragmentDoc}`;

/**
 * __useCollectionAnnotationsQuery__
 *
 * To run a query within a React component, call `useCollectionAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionAnnotationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCollectionAnnotationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollectionAnnotationsQuery, CollectionAnnotationsQueryVariables>) {
        return ApolloReactHooks.useQuery<CollectionAnnotationsQuery, CollectionAnnotationsQueryVariables>(CollectionAnnotationsDocument, baseOptions);
      }
export function useCollectionAnnotationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollectionAnnotationsQuery, CollectionAnnotationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CollectionAnnotationsQuery, CollectionAnnotationsQueryVariables>(CollectionAnnotationsDocument, baseOptions);
        }
export type CollectionAnnotationsQueryHookResult = ReturnType<typeof useCollectionAnnotationsQuery>;
export type CollectionAnnotationsLazyQueryHookResult = ReturnType<typeof useCollectionAnnotationsLazyQuery>;
export type CollectionAnnotationsQueryResult = ApolloReactCommon.QueryResult<CollectionAnnotationsQuery, CollectionAnnotationsQueryVariables>;
export const FavoriteAnnotationsDocument = gql`
    query FavoriteAnnotations($first: Int!, $after: String, $userId: ID!) {
  favoriteAnnotations(first: $first, after: $after, userId: $userId) {
    edges {
      node {
        ...AnnotationList
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
    ${AnnotationListFragmentDoc}`;

/**
 * __useFavoriteAnnotationsQuery__
 *
 * To run a query within a React component, call `useFavoriteAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteAnnotationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFavoriteAnnotationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FavoriteAnnotationsQuery, FavoriteAnnotationsQueryVariables>) {
        return ApolloReactHooks.useQuery<FavoriteAnnotationsQuery, FavoriteAnnotationsQueryVariables>(FavoriteAnnotationsDocument, baseOptions);
      }
export function useFavoriteAnnotationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FavoriteAnnotationsQuery, FavoriteAnnotationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FavoriteAnnotationsQuery, FavoriteAnnotationsQueryVariables>(FavoriteAnnotationsDocument, baseOptions);
        }
export type FavoriteAnnotationsQueryHookResult = ReturnType<typeof useFavoriteAnnotationsQuery>;
export type FavoriteAnnotationsLazyQueryHookResult = ReturnType<typeof useFavoriteAnnotationsLazyQuery>;
export type FavoriteAnnotationsQueryResult = ApolloReactCommon.QueryResult<FavoriteAnnotationsQuery, FavoriteAnnotationsQueryVariables>;
export const MyCollectionAnnotationsDocument = gql`
    query MyCollectionAnnotations($first: Int!, $after: String) {
  myAnnotations(first: $first, after: $after) {
    edges {
      node {
        ...AnnotationList
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
    ${AnnotationListFragmentDoc}`;

/**
 * __useMyCollectionAnnotationsQuery__
 *
 * To run a query within a React component, call `useMyCollectionAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCollectionAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCollectionAnnotationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useMyCollectionAnnotationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyCollectionAnnotationsQuery, MyCollectionAnnotationsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyCollectionAnnotationsQuery, MyCollectionAnnotationsQueryVariables>(MyCollectionAnnotationsDocument, baseOptions);
      }
export function useMyCollectionAnnotationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyCollectionAnnotationsQuery, MyCollectionAnnotationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyCollectionAnnotationsQuery, MyCollectionAnnotationsQueryVariables>(MyCollectionAnnotationsDocument, baseOptions);
        }
export type MyCollectionAnnotationsQueryHookResult = ReturnType<typeof useMyCollectionAnnotationsQuery>;
export type MyCollectionAnnotationsLazyQueryHookResult = ReturnType<typeof useMyCollectionAnnotationsLazyQuery>;
export type MyCollectionAnnotationsQueryResult = ApolloReactCommon.QueryResult<MyCollectionAnnotationsQuery, MyCollectionAnnotationsQueryVariables>;
export const MyVerseAnnotationsDocument = gql`
    query MyVerseAnnotations($verseId: ID!) {
  myAnnotations(verseId: $verseId, first: 100) {
    edges {
      node {
        ...AnnotationList
      }
    }
  }
}
    ${AnnotationListFragmentDoc}`;

/**
 * __useMyVerseAnnotationsQuery__
 *
 * To run a query within a React component, call `useMyVerseAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyVerseAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyVerseAnnotationsQuery({
 *   variables: {
 *      verseId: // value for 'verseId'
 *   },
 * });
 */
export function useMyVerseAnnotationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyVerseAnnotationsQuery, MyVerseAnnotationsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyVerseAnnotationsQuery, MyVerseAnnotationsQueryVariables>(MyVerseAnnotationsDocument, baseOptions);
      }
export function useMyVerseAnnotationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyVerseAnnotationsQuery, MyVerseAnnotationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyVerseAnnotationsQuery, MyVerseAnnotationsQueryVariables>(MyVerseAnnotationsDocument, baseOptions);
        }
export type MyVerseAnnotationsQueryHookResult = ReturnType<typeof useMyVerseAnnotationsQuery>;
export type MyVerseAnnotationsLazyQueryHookResult = ReturnType<typeof useMyVerseAnnotationsLazyQuery>;
export type MyVerseAnnotationsQueryResult = ApolloReactCommon.QueryResult<MyVerseAnnotationsQuery, MyVerseAnnotationsQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile($userId: ID!) {
  user(id: $userId) {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
      }
export function useUserProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = ApolloReactCommon.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const VerseAnnotationsDocument = gql`
    query VerseAnnotations($first: Int, $after: String, $verseId: ID!) {
  publicAnnotations(first: $first, after: $after, verseId: $verseId) {
    edges {
      node {
        ...AnnotationList
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
    ${AnnotationListFragmentDoc}`;

/**
 * __useVerseAnnotationsQuery__
 *
 * To run a query within a React component, call `useVerseAnnotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerseAnnotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerseAnnotationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      verseId: // value for 'verseId'
 *   },
 * });
 */
export function useVerseAnnotationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VerseAnnotationsQuery, VerseAnnotationsQueryVariables>) {
        return ApolloReactHooks.useQuery<VerseAnnotationsQuery, VerseAnnotationsQueryVariables>(VerseAnnotationsDocument, baseOptions);
      }
export function useVerseAnnotationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VerseAnnotationsQuery, VerseAnnotationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VerseAnnotationsQuery, VerseAnnotationsQueryVariables>(VerseAnnotationsDocument, baseOptions);
        }
export type VerseAnnotationsQueryHookResult = ReturnType<typeof useVerseAnnotationsQuery>;
export type VerseAnnotationsLazyQueryHookResult = ReturnType<typeof useVerseAnnotationsLazyQuery>;
export type VerseAnnotationsQueryResult = ApolloReactCommon.QueryResult<VerseAnnotationsQuery, VerseAnnotationsQueryVariables>;