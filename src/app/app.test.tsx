import React from 'react'
import { graphql } from 'msw'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './app'
import server from '../../test/server'

const getLoading = () => screen.getByTestId('repository-skeleton-0')
const queryLoading = () => screen.queryByTestId('repository-skeleton-0')
const getRepositories = () => screen.queryByLabelText(/repositories/i)
const getErrorMessage = () => screen.getByText(/there was an error/i)
const getFirstRepository = () => screen.getByTestId('repository-0')
const getSearchBox = () => screen.getByLabelText(/search/i)
const waitForLoading = async () => {
  await waitFor(() => expect(getLoading()).toBeInTheDocument())
  await waitForElementToBeRemoved(queryLoading)
}
const getNextPageButton = () => screen.getByLabelText(/next page/i)
const getPreviousPageButton = () => screen.getByLabelText(/previous page/i)
const getFirstPageButton = () => screen.getByLabelText(/first page/i)

describe('Github viewer', () => {
  it('Renders and fetch repositories', async () => {
    render(<App />)
    await waitForLoading()
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

  it('Searchs repository by query', async () => {
    render(<App />)
    await waitFor(() => expect(getRepositories()).toBeInTheDocument())
    const searchBox = getSearchBox()
    userEvent.type(searchBox, 'awesome{enter}')

    await waitForLoading()

    const firstRepository = getFirstRepository()
    expect(firstRepository).toBeInTheDocument()
    expect(
      within(firstRepository).getByText('awesome-react'),
    ).toBeInTheDocument()
    expect(within(firstRepository).getByText('🍴 6,435')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🌟 52,745')).toBeInTheDocument()
  })

  it('Shows no repositor message when no repositories are found', async () => {
    render(<App />)
    await waitFor(() => expect(getRepositories()).toBeInTheDocument())
    const searchBox = getSearchBox()
    userEvent.type(searchBox, 'aaaaaaaaaaa{enter}')

    await waitForLoading()

    expect(screen.getByText(/no repositories are found/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /please use the search box at the top to look for repositories/i,
      ),
    ).toBeInTheDocument()
  })

  it('Triggers error boundary when there is an error at fetching', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})

    server.use(
      graphql.query('GetRepositories', (req, res, ctx) => res(ctx.status(500))),
    )

    render(<App />)

    const searchBox = getSearchBox()
    userEvent.type(searchBox, 'this is a failing request{enter}')

    await waitFor(() => expect(getErrorMessage()).toBeInTheDocument())
    expect(console.error).toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalled()
  })

  it('Changes number of reports per page when change page size', async () => {
    render(<App />)

    expect(screen.getAllByLabelText('repository').length).toBe(10)
    expect(
      (screen.getByRole('option', { name: 'Show 10' }) as HTMLOptionElement)
        .selected,
    ).toBe(true)
    userEvent.selectOptions(
      screen.getByTestId('pageSizeSelect'),
      (screen.getByRole('option', { name: 'Show 30' }) as HTMLOptionElement)
        .value,
    )
    await waitFor(() =>
      expect(
        (screen.getByRole('option', { name: 'Show 30' }) as HTMLOptionElement)
          .selected,
      ).toBe(true),
    )

    await waitForLoading()

    expect(screen.getAllByLabelText(/repository/i).length).toBe(30)
  })

  it('Navigates the repositories using the next and previous buttons', async () => {
    render(<App />)

    expect(getNextPageButton()).toBeEnabled()
    expect(getFirstPageButton()).toBeDisabled()
    expect(getPreviousPageButton()).toBeDisabled()

    userEvent.click(getNextPageButton())
    await waitForLoading()

    let firstRepository = getFirstRepository()
    expect(within(firstRepository).getByText('react')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🍴 129')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🌟 235')).toBeInTheDocument()
    expect(getFirstPageButton()).toBeEnabled()
    expect(getPreviousPageButton()).toBeEnabled()

    userEvent.click(getPreviousPageButton())
    await waitForLoading()

    firstRepository = getFirstRepository()
    expect(
      within(firstRepository).getByText('The Original React'),
    ).toBeInTheDocument()
    expect(within(firstRepository).getByText('🍴 50,000')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🌟 100,000')).toBeInTheDocument()
  })

  it('Navigates to first page when clicking on first page button ', async () => {
    render(<App />)

    expect(getFirstPageButton()).toBeDisabled()

    userEvent.click(getNextPageButton())

    await waitFor(() => expect(getFirstPageButton()).toBeEnabled())

    let firstRepository = getFirstRepository()
    expect(within(firstRepository).getByText('react')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🍴 129')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🌟 235')).toBeInTheDocument()

    userEvent.click(getFirstPageButton())

    await waitFor(() => expect(getFirstPageButton()).toBeDisabled())

    firstRepository = getFirstRepository()
    expect(
      within(firstRepository).getByText('The Original React'),
    ).toBeInTheDocument()
    expect(within(firstRepository).getByText('🍴 50,000')).toBeInTheDocument()
    expect(within(firstRepository).getByText('🌟 100,000')).toBeInTheDocument()
  })
})
