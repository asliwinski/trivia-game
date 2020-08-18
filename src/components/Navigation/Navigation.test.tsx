import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

test('renders text elements correctly', () => {
  const { getByText } = render(
    <Navigation
      children={<div />}
      currentItem={0}
      itemCount={5}
      setCurrentItem={() => {}}
    />
  );

  const left = getByText(/‹/);
  const right = getByText(/›/);

  expect(left).toBeInstanceOf(HTMLSpanElement);
  expect(right).toBeInstanceOf(HTMLSpanElement);
});

test('calls callback with new item index', () => {
  let currItem = 1;
  function setCurrentItem(currentItem: number): void {
    currItem = currentItem;
  }

  function component() {
    return (
      <Navigation
        children={<div />}
        currentItem={currItem}
        itemCount={5}
        setCurrentItem={setCurrentItem}
      />
    );
  }

  const { getByText, rerender } = render(component());

  const left = getByText(/‹/);
  const right = getByText(/›/);

  right.click();
  rerender(component());

  expect(currItem).toEqual(2);

  left.click();
  rerender(component());

  expect(currItem).toEqual(1);
});

test('respects boundaries', async () => {
  let currItem = 0;
  function setCurrentItem(currentItem: number): void {
    currItem = currentItem;
  }
  function component() {
    return (
      <Navigation
        children={<div />}
        currentItem={currItem}
        itemCount={3}
        setCurrentItem={setCurrentItem}
      />
    );
  }

  const { getByText, rerender } = render(component());

  const left = getByText(/‹/);
  const right = getByText(/›/);

  right.click();
  rerender(component());
  right.click();
  rerender(component());

  expect(currItem).toEqual(2);

  right.click();
  rerender(component());

  expect(currItem).toEqual(2);

  left.click();
  rerender(component());
  left.click();
  rerender(component());

  expect(currItem).toEqual(0);

  left.click();
  rerender(component());

  expect(currItem).toEqual(0);
});
