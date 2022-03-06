import { theme } from '../styles/theme';
import styled from 'styled-components/macro';

export const P = styled.p`
  color: ${theme.primaryTextColor};
  line-height: 1.3em;
`;

export const H3 = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
`;

export const ArticleTypography = styled.div`
  p {
    margin-bottom: 24px;
    color: ${theme.primaryTextColor};
    font-size: 1.125rem;
    line-height: 1.5;
  }

  blockquote {
    border-left: 4px solid ${theme.borderColor};
    margin: 24px;
    padding: 8px 12px;
    font-style: italic;
    color: ${theme.primaryTextColor};
    font-size: 1.125rem;
    line-height: 1.5;
  }
`;
