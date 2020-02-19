import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import App, { option, internal } from './App';

test('app component', async () => {

  fetchMock.restore().mock(/https:\/\/api.kanye.rest/, {
    body: { quote: 'Whatever' }
  });

  const { getByTestId } = render(<App />);
  const select = getByTestId('select');
  expect(select).toBeInTheDocument();

  fireEvent.change(select, { target: { value: option.external } });
  const textarea = getByTestId('textarea');
  expect(textarea).toBeInTheDocument();
  expect(textarea.textContent).toBe('Loading...');
  await waitForDomChange();
  expect(textarea.textContent).toBe('Whatever');

  fireEvent.change(select, { target: { value: option.internal } });
  const input = getByTestId('input');
  expect(textarea).not.toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(input.value).toBe(internal);

  fireEvent.change(select, { target: { value: option.empty } });
  expect(textarea).not.toBeInTheDocument();
  expect(input).not.toBeInTheDocument();

});
