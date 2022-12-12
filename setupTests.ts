// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import server from './test/server'
import fetch from 'node-fetch'

globalThis.fetch = fetch as unknown as typeof globalThis['fetch']

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn',
  }),
)

afterEach(() => server.resetHandlers())
afterAll(() => server.close())
