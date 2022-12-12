import React from 'react'
import { graphql } from 'msw'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
  within,
} from '@testing-library/react'

import App from './app'
import server from '../../test/server'

const getLoading = () => screen.getByText(/loading/i)
const queryLoading = () => screen.queryByText(/loading/i)
const getRepositories = () => screen.queryByLabelText(/repositories/i)
const getErrorMessage = () => screen.getByText(/there was an error/i)
const getFirstRepository = () => screen.getByTestId('repository-0')

describe('Github viewwe', () => {
  it('Renders and fetch repositories', async () => {
    render(<App />)
    await waitFor(() => expect(getLoading()).toBeInTheDocument())
    await waitForElementToBeRemoved(queryLoading)
    expect(getRepositories()).toBeInTheDocument()
  })

  it('Renders repository information', async () => {
    render(<App />)
    await waitFor(() => expect(getRepositories()).toBeInTheDocument())
    const firstRepository = getFirstRepository()
    expect(firstRepository).toBeInTheDocument()
    expect(
      within(firstRepository).getByText('The Original React'),
    ).toBeInTheDocument()
    expect(within(firstRepository).getByText('🍴 50,000')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🌟 100,000')).toBeInTheDocument()
  })

  it('Render repository name as link', async () => {
    render(<App />)
    await waitFor(() => expect(getRepositories()).toBeInTheDocument())
    const firstRepository = getFirstRepository()
    expect(firstRepository).toBeInTheDocument()
    const repositoryName =
      within(firstRepository).getByText('The Original React')
    expect(repositoryName.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/facebook/react',
    )
  })

  it('Triggers error boundary when there is an error at fetching', async () => {
    jest.spyOn(console, 'error')
    server.use(
      graphql.query('GetRepositories', (req, res, ctx) => res(ctx.status(500))),
    )

    render(<App />)

    await waitFor(() => expect(getErrorMessage()).toBeInTheDocument())
    expect(console.error).toHaveBeenCalled()
  })
})
