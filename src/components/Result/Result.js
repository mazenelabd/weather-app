import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const dateBuilder = (d) => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  let day = days[d.getDay()]
  let date = d.getDate()
  let month = months[d.getMonth()]
  let year = d.getFullYear()

  return `${day} ${date} ${month} ${year}`
}

export default function Result({ weather }) {
  return (
    <>
      {typeof weather.list != 'undefined' ? (
        <>
          <Box
            sx={{
              textAlign: 'center',
              mt: 3,
              color: 'white',
              textShadow: '0px 0px 10px black',
            }}
          >
            <Typography variant='h4' gutterBottom>
              {weather.city.name}, {weather.city.country}
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              m: 3,
              mt: 0,
              fontStyle: 'italic',
              textShadow: '0px 0px 10px white',
            }}
          >
            <Typography variant='body1' gutterBottom>
              {dateBuilder(new Date())}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: 10,
              borderRadius: '5px',
              padding: 1.8,
              textAlign: 'center',
              width: '7rem',
              margin: 'auto',
            }}
          >
            <Typography
              variant='h3'
              sx={{ color: 'white', textShadow: '0 0 10px black' }}
            >
              {Math.round(weather.list[0].main.temp)}°C
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '5px',
              boxShadow: 10,
              textAlign: 'center',
              mt: 3,
              mb: 6,
              color: 'white',
              textShadow: '0px 0px 10px black',
            }}
          >
            <Typography variant='h3' gutterBottom>
              {weather.list[0].weather[0].main}
              <img
                src={`http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`}
                alt='Weather icon'
              />
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            my: 5,
            color: 'white',
            textShadow: '0px 0px 10px black',
          }}
        >
          <Typography variant='h5' gutterBottom>
            Please Enter a City Name
          </Typography>
        </Box>
      )}
    </>
  )
}
