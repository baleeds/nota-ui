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
  /** 
 * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC and any UTC offset other than 0 will be rejected.
 */
  DateTime: any,
};

export type Annotation = {
   __typename?: 'Annotation',
  deletedAt?: Maybe<Scalars['DateTime']>,
  id: Scalars['ID'],
  insertedAt: Scalars['DateTime'],
  lastSyncedAt?: Maybe<Scalars['DateTime']>,
  text: Scalars['String'],
  updatedAt: Scalars['DateTime'],
  user: User,
  userId: Scalars['ID'],
  verse: Verse,
  verseId: Scalars['ID'],
};


export type RootMutationType = {
   __typename?: 'RootMutationType',
  refreshToken: Scalars['String'],
  saveAnnotation: SaveAnnotationPayload,
  saveAnnotations: SaveAnnotationsPaylaod,
  syncAnnotations: SyncAnnotationsPayload,
};


export type RootMutationTypeRefreshTokenArgs = {
  token: Scalars['String']
};


export type RootMutationTypeSaveAnnotationArgs = {
  input: SaveAnnotationInput
};


export type RootMutationTypeSaveAnnotationsArgs = {
  input: Array<SaveAnnotationInput>
};


export type RootMutationTypeSyncAnnotationsArgs = {
  input: SyncAnnotationsInput
};

export type RootQueryType = {
   __typename?: 'RootQueryType',
  annotation: Annotation,
  annotations?: Maybe<Array<Annotation>>,
  me: User,
  publicAnnotations?: Maybe<Array<Annotation>>,
  user: User,
  users?: Maybe<Array<User>>,
  verse: Verse,
  verses?: Maybe<Array<Verse>>,
};


export type RootQueryTypeAnnotationArgs = {
  id: Scalars['ID']
};


export type RootQueryTypeAnnotationsArgs = {
  userId?: Maybe<Scalars['ID']>
};


export type RootQueryTypePublicAnnotationsArgs = {
  verseId: Scalars['ID']
};


export type RootQueryTypeUserArgs = {
  id: Scalars['ID']
};


export type RootQueryTypeVerseArgs = {
  id: Scalars['ID']
};


export type RootQueryTypeVersesArgs = {
  bookNumber: Scalars['Int'],
  chapterNumber: Scalars['Int']
};

export type SaveAnnotationInput = {
  deletedAt?: Maybe<Scalars['DateTime']>,
  id?: Maybe<Scalars['ID']>,
  insertedAt?: Maybe<Scalars['DateTime']>,
  text: Scalars['String'],
  updatedAt?: Maybe<Scalars['DateTime']>,
  verseId: Scalars['ID'],
};

export type SaveAnnotationPayload = {
   __typename?: 'SaveAnnotationPayload',
  annotation: Annotation,
};

export type SaveAnnotationsPaylaod = {
   __typename?: 'SaveAnnotationsPaylaod',
  annotations: Array<Maybe<Annotation>>,
};

export type SyncAnnotationsInput = {
  annotations: Array<Maybe<SaveAnnotationInput>>,
  lastSyncedAt: Scalars['DateTime'],
};

export type SyncAnnotationsPayload = {
   __typename?: 'SyncAnnotationsPayload',
  annotations: Array<Maybe<Annotation>>,
  upsertedAnnotations: Array<Maybe<Annotation>>,
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  lastName?: Maybe<Scalars['String']>,
};

export type Verse = {
   __typename?: 'Verse',
  annotations?: Maybe<Array<Annotation>>,
  bookNumber: Scalars['Int'],
  chapterNumber: Scalars['Int'],
  id: Scalars['ID'],
  text: Scalars['String'],
  verseNumber: Scalars['Int'],
};


export type VerseAnnotationsArgs = {
  userId?: Maybe<Scalars['ID']>
};

export type PublicAnnotationFragment = (
  { __typename?: 'Annotation' }
  & Pick<Annotation, 'id' | 'text' | 'verseId' | 'insertedAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
  ) }
);

export type PublicAnnotationsQueryVariables = {
  verseId: Scalars['ID']
};


export type PublicAnnotationsQuery = (
  { __typename?: 'RootQueryType' }
  & { publicAnnotations: Maybe<Array<(
    { __typename?: 'Annotation' }
    & PublicAnnotationFragment
  )>> }
);

export const PublicAnnotationFragmentDoc = gql`
    fragment PublicAnnotation on Annotation {
  id
  text
  verseId
  insertedAt
  user {
    id
    firstName
    lastName
  }
}
    `;
export const PublicAnnotationsDocument = gql`
    query PublicAnnotations($verseId: ID!) {
  publicAnnotations(verseId: $verseId) {
    ...PublicAnnotation
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