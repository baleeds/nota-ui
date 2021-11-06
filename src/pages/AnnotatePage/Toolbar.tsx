import React from 'react';
import styled from 'styled-components/macro';
import { theme } from '../../styles/theme';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';

export const Toolbar: React.FC = () => {
  return (
    <Container id="quill-toolbar">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-blockquote"></button>
      <button className="ql-link"></button>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${theme.blank};

  &.ql-toolbar.ql-snow {
    border: none;
    padding: 0 18px;

    @media screen and (min-width: ${LARGE_SCREEN}px) {
      padding: 0px;
    }

    button {
      height: 60px;
      padding: 18px;
      width: 60px;
      color: ${theme.primaryTextColor};

      .ql-stroke {
        stroke: currentColor !important;
      }
      .ql-fill {
        fill: currentColor !important;
      }

      &:hover {
        color: ${theme.primaryColor};
      }
    }

    .ql-active {
      color: ${theme.primaryColor};
    }
  }
`;
