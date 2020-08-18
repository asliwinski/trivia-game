import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const NaviButton = styled(Button)`
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  font-size: 130px;
  margin: 20px;
  border: none;
  padding: 30px;
  border-radius: 10px;
  background: none;
  color: lightgray;
  :hover {
    color: black;
  }
  transition: color 0.2s cubic-bezier(0.3, 0, 0.4, 1);
`;

const Span = styled.span`
  height: 164px;
`;

type NavigationProps = {
  children: any;
  currentItem: number;
  setCurrentItem: Function;
  itemCount: number;
};

export default function Navigation({
  children,
  currentItem,
  setCurrentItem,
  itemCount,
}: NavigationProps) {
  const handleClickLeft = () => {
    const newItem = currentItem - 1 < 0 ? 0 : currentItem - 1;

    setCurrentItem(newItem);
  };

  const handleClickRight = () => {
    const newItem =
      currentItem + 1 > itemCount - 1 ? itemCount - 1 : currentItem + 1;

    setCurrentItem(newItem);
  };

  return (
    <>
      <NaviButton onClick={handleClickLeft}>
        <Span>{`‹`}</Span>
      </NaviButton>
      <>{children}</>
      <NaviButton onClick={handleClickRight}>
        <Span>{`›`}</Span>
      </NaviButton>
    </>
  );
}
