import React from 'react';
import { AnnotationListFragment } from '../../api/__generated__/apollo-graphql';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Skeleton from 'react-loading-skeleton';
import { Link, useHistory } from 'react-router-dom';
import { AnnotationHeader } from './AnnotationHeader';
import { AnnotationActivitySummary } from './AnnotationActivitySummary';

interface Props {
  annotation?: AnnotationListFragment;
  versePath: string;
}

export const AnnotationSummary: React.FC<Props> = ({
  annotation,
  versePath,
}) => {
  const history = useHistory();
  return (
    <div>
      <AnnotationHeader annotation={annotation} />
      {annotation ? (
        <TextContainer>
          <TextLink to={`${versePath}/${annotation.id}`}>
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
