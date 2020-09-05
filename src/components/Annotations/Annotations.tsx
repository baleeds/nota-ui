import React, { useCallback, useMemo } from 'react';
import { AnnotationSummary } from './AnnotationSummary';
import { extractNodes } from '../../base/utils/extractNodes';
import { Flex } from '../layout/Flex';
import { Box } from '../layout/Box';
import { PageError } from '../PageError';
import { NothingHere } from '../NothingHere';
import { OutlineButton } from '../Buttons';
import { PAGE_SIZE } from '../../base/constants/api';
import produce from 'immer';
import {
  useVerseAnnotationsQuery,
  AnnotationListFragment,
  useMyVerseAnnotationsQuery,
} from '../../api/__generated__/apollo-graphql';
import { useAuth } from '../AuthProvider';
import { Separator } from '../Separator';
import { usePassage } from '../../hooks/usePassage';

interface Props {
  passageId: string;
}

export const Annotations: React.FC<Props> = ({ passageId }) => {
  const { user } = useAuth();
  const { bookName, chapterNumber, verseNumber } = usePassage();
  const versePath = `/read/${bookName}/${chapterNumber}/${verseNumber}`;

  const verseAnnotations = useVerseAnnotationsQuery({
    variables: {
      verseId: passageId,
      first: PAGE_SIZE,
    },
  });
  const myVerseAnnotations = useMyVerseAnnotationsQuery({
    variables: { verseId: passageId, userId: user?.id || '' },
    skip: !user,
  });

  const publicAnnotations = extractNodes<AnnotationListFragment>(
    verseAnnotations.data?.publicAnnotations.edges
  );

  const myAnnotations = extractNodes<AnnotationListFragment>(
    myVerseAnnotations.data?.myAnnotations.edges
  );

  const allAnnotations: AnnotationListFragment[] | undefined = useMemo(() => {
    if (!publicAnnotations) return undefined;
    if (user) {
      if (!myAnnotations) return undefined;
      return [...myAnnotations, ...publicAnnotations];
    }
    return publicAnnotations;
  }, [user, publicAnnotations, myAnnotations]);

  const { pageInfo } = verseAnnotations.data?.publicAnnotations || {};
  const loading = verseAnnotations.loading || myVerseAnnotations.loading;

  const handleShowMore = useCallback(() => {
    if (loading || !pageInfo?.hasNextPage) {
      return;
    }
    verseAnnotations.fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, nextResult) => {
        return produce(previousResult, draftResult => {
          if (
            !draftResult?.publicAnnotations?.edges ||
            !nextResult?.fetchMoreResult?.publicAnnotations.edges
          ) {
            return previousResult;
          }

          draftResult.publicAnnotations.edges.push(
            ...nextResult.fetchMoreResult.publicAnnotations.edges
          );
          draftResult.publicAnnotations.pageInfo =
            nextResult.fetchMoreResult.publicAnnotations.pageInfo;
        });
      },
    });
  }, [pageInfo, verseAnnotations, loading]);

  const renderAnnotations = () => {
    if (loading && !allAnnotations) {
      return new Array(3).fill(null).map((_item, index) => (
        <Box key={`loading-annotation-${index}`}>
          <AnnotationSummary versePath={versePath} />
        </Box>
      ));
    }

    if (verseAnnotations.error || !allAnnotations) {
      return <PageError />;
    }

    if (!allAnnotations.length) {
      return <NothingHere />;
    }

    const renderedAnnotations = allAnnotations.map(annotation => (
      <Box key={annotation.id}>
        <AnnotationSummary annotation={annotation} versePath={versePath} />
      </Box>
    ));

    if (
      myAnnotations &&
      myAnnotations.length &&
      publicAnnotations &&
      publicAnnotations.length
    ) {
      renderedAnnotations.splice(
        myAnnotations?.length,
        0,
        <Box key="annotations-separator">
          <Separator />
        </Box>
      );
    }

    return renderedAnnotations;
  };

  return (
    <Flex column gutter={24} padding={{ b: 24 }}>
      {renderAnnotations()}
      {pageInfo?.hasNextPage && (
        <Box margin={{ t: 24 }}>
          <OutlineButton
            type="button"
            onClick={handleShowMore}
            style={{ width: '100%' }}
            disabled={loading}
          >
            Show more
          </OutlineButton>
        </Box>
      )}
    </Flex>
  );
};
