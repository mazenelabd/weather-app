import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { server, rest } from './testServer'

describe('when the user submits a correct city value', () => {
  beforeEach(() => {
    render(<App />)
    const searchField = screen.getByRole('textbox', {
      name: /search for a city/i,
    })
    userEvent.type(searchField, 'Paris{enter}')
  })

  test('will see the city name', async () => {
    expect(
      await screen.findByRole('heading', { name: /paris, fr/i })
    ).toBeInTheDocument()
  })

  test('will see the temperature for the current day and the next 5 days', async () => {
    expect(await screen.findAllByRole('heading', { name: /°c/i })).toHaveLength(
      6
    )
  })

  test('will see the weather icon for the current day and the next 5 days', async () => {
    expect(
      await screen.findAllByRole('img', { name: /weather icon/i })
    ).toHaveLength(6)
  })
})

describe('when the user submits a wrong city value', () => {
  test('shows incorrect city as a helper text', async () => {
    render(<App />)
    server.use(
      rest.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        (req, res, ctx) => {
          return res(ctx.status(404))
        }
      )
    )
    const searchField = screen.getByRole('textbox', {
      name: /search for a city/i,
    })
    userEvent.type(searchField, 'WRONG{enter}')
    expect(await screen.findByText(/incorrect city\./i)).toBeInTheDocument
  })
})
