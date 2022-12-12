import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react'

import App from './app'

const getLoading = () => screen.getByText(/loading/i)
const queryLoading = () => screen.queryByText(/loading/i)
const getRepositories = () => screen.queryByLabelText(/repositories/i)

test('Renders and fetch repositories', async () => {
  render(<App />)
  await waitFor(() => expect(getLoading()).toBeInTheDocument())
  await waitForElementToBeRemoved(queryLoading)
  expect(getRepositories()).toBeInTheDocument()
})
