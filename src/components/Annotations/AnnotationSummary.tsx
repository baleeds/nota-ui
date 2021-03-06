import React from 'react';
import { AnnotationListFragment } from '../../api/__generated__/apollo-graphql';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { AnnotationHeader } from './AnnotationHeader';
import { AnnotationActivitySummary } from './AnnotationActivitySummary';
import { getVersePath } from '../../base/utils/getVersePath';

interface Props {
  annotation?: AnnotationListFragment;
}

export const AnnotationSummary: React.FC<Props> = ({ annotation }) => {
  const versePath = annotation ? getVersePath(annotation.verseId) : '';

  return (
    <div>
      <AnnotationHeader annotation={annotation} />
      {annotation ? (
        <TextContainer>
          <TextLink to={`/read/${versePath}/${annotation.id}`}>
            <p dangerouslySetInnerHTML={{ __html: annotation.text }} />
            <AnnotationActivitySummary annotation={annotation} />
          </TextLink>
        </TextContainer>
      ) : (
        <TextContainer>
          <Skeleton count={3} />
        </TextContainer>
      )}
    </div>
  );
};

const TextContainer = styled.div`
  color: ${theme.primaryTextColor};
  line-height: 1.3;
  font-size: 1rem;
`;

const TextLink = styled(Link)`
  color: ${theme.primaryTextColor};
  text-decoration: none;
`;
