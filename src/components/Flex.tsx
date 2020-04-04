import styled from 'styled-components';

interface Props {
  column?: boolean;
  flex?: number;
  gutter?: number;
}

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  flex: ${({ flex }) => flex ?? 'unset'};
  ${({ gutter }) =>
    gutter ? `& > .box + .box { margin-top: ${gutter}px }` : ''}
`;
