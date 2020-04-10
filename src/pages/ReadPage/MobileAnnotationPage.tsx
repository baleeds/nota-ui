import React from 'react';
import { AnnotationDetails } from '../../components/Annotations/AnnotationDetails';
import {
  MobileHeader,
  MobileHeaderNavLink,
} from '../../components/MobileHeader';
import { ReactComponent as ChevronLeftIcon } from '../../icons/chevron_left-24px.svg';
import { useParams } from 'react-router';
import { RouteParams } from '../../base/routes';
import { Block } from '../../components/Block';

interface Props {
  annotationId: string;
}

export const MobileAnnotationPage: React.FC<Props> = ({ annotationId }) => {
  const { bookName, chapterId, verseId } = useParams<RouteParams>();

  return (
    <>
      <MobileHeader>
        <MobileHeaderNavLink to={`/read/${bookName}/${chapterId}/${verseId}`}>
          <ChevronLeftIcon style={{ marginRight: 6 }} />
          Annotations
        </MobileHeaderNavLink>
      </MobileHeader>
      <Block style={{ paddingTop: 72, paddingBottom: 20 }}>
        <AnnotationDetails annotationId={annotationId} />
      </Block>
    </>
  );
};
