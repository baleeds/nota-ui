import React, { useMemo } from 'react';
import styled from 'styled-components';
import { usePassage } from '../../hooks/usePassage';
import { Block } from '../../components/Block';
import { H3 } from '../../components/Typography';
import { VerseDetailsContent } from './VerseDetailsContent';
import { useParams } from 'react-router';
import { RouteParams } from '../../base/routes';
import { Link } from '../../components/Link';
import { ReactComponent as ChevronLeftIcon } from '../../icons/chevron_left-24px.svg';
import { AnnotationDetails } from '../../components/Annotations/AnnotationDetails';
import { Separator } from '../../components/Separator';
import { Box } from '../../components/layout/Box';
import { Flex } from '../../components/layout/Flex';

interface Props {
  passageKey: string;
}

export const DesktopSidecar: React.FC<Props> = ({ passageKey }) => {
  const { bookName, chapterNumber, verseNumber, fullName } = usePassage();
  const { annotationId } = useParams<RouteParams>();
  const top = useMemo(() => window.scrollY, [passageKey]); // eslint-disable-line

  if (!verseNumber || !fullName) {
    return null;
  }

  const renderHeader = () => {
    if (annotationId) {
      return (
        <Link
          to={`/read/${bookName}/${chapterNumber}/${verseNumber}`}
          style={{ lineHeight: 1 }}
        >
          <Title>
            <Flex alignItems="center">
              <ChevronLeftIcon width={20} height={20} />
              Annotations
            </Flex>
          </Title>
        </Link>
      );
    }
    return <Title>{fullName}</Title>;
  };

  return (
    <Container style={{ transform: `translateY(${top}px)` }}>
      <Block>
        <Flex spaceBetween margin={{ tb: 28 }}>
          {renderHeader()}
        </Flex>
      </Block>
      <Separator />
      {annotationId ? (
        <Box margin={{ tb: 24 }} padding={{ lr: 16 }}>
          <AnnotationDetails annotationId={annotationId} />
        </Box>
      ) : (
        <VerseDetailsContent />
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  transition: transform 0.1s ease-in-out;
`;

const Title = styled(H3)`
  svg {
    fill: currentColor;
    margin-right: 6px;
  }
`;
