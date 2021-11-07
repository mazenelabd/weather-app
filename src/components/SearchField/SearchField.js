import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
})

export default function SearchField({ error, setError, onSearch }) {
  const [query, setQuery] = React.useState('')

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!query) {
      setError(true)
      return
    } else {
      onSearch({ query })
      setQuery('')
    }
  }

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': {
          mt: 5,
          boxShadow: 5,
        },
      }}
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}
    >
      <ThemeProvider theme={theme}>
        <TextField
          id='filled-basic'
          label='Search for a city'
          variant='outlined'
          fullWidth
          value={query}
          onChange={handleChange}
          error={error}
          helperText={error ? 'Incorrect city.' : ''}
          autoFocus
        />
      </ThemeProvider>
    </Box>
  )
}
