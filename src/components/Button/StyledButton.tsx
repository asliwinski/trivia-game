import styled, { css } from 'styled-components';
import Button from './Button';

export const StyledButton = styled(Button)`
  font-size: 12px;
  font-weight: 800;
  margin: 20px;
  border: none;
  padding: 30px;
  border-radius: 10px;
  ${({ isSet }: { isSet?: boolean }) => {
    return (
      isSet &&
      css`
        background-color: lightskyblue;
      `
    );
  }}
  :hover {
    background-color: darkgray;
  }
  transition: background-color 0.3s cubic-bezier(0.3, 0, 0.4, 1);
`;
