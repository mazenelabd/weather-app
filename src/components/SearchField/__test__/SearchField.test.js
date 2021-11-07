import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchField from '../SearchField'

const mockedSetError = jest.fn()
const mockedOnSearch = jest.fn()

describe('Input value', () => {
  let searchField
  beforeEach(() => {
    render(
      <SearchField
        error={false}
        setError={mockedSetError}
        onSearch={mockedOnSearch}
      />
    )
    searchField = screen.getByRole('textbox', { name: /search for a city/i })
  })

  test('updates on type', () => {
    userEvent.type(searchField, 'paris')
    expect(searchField.value).toBe('paris')
  })

  test('clears on submit', () => {
    userEvent.type(searchField, 'Text{enter}')
    expect(searchField.value).toBe('')
  })
})

describe('helperText', () => {
  test('incorrect city error when the error is true', () => {
    render(
      <SearchField
        error={true}
        setError={mockedSetError}
        onSearch={mockedOnSearch}
      />
    )
    expect(screen.getByText(/incorrect city\./i)).toBeInTheDocument()
  })
  test('displays nothing when the error is false', () => {
    render(
      <SearchField
        error={false}
        setError={mockedSetError}
        onSearch={mockedOnSearch}
      />
    )
    expect(screen.queryByText(/incorrect city\./i)).not.toBeInTheDocument()
  })
})
