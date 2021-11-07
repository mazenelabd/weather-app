import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  padding: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  color: 'white',
  textShadow: '0 0 5px black',
  boxShadow: 10,
  maxWidth: '10rem',
  margin: 'auto',
}))

const variants = {
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 80,
    },
  }),
  hidden: { opacity: 0, x: -100 },
}

export default function Forecast({ weather }) {
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let temp = []
  let condition = []
  let icon = []
  let day = []
  if (typeof weather.list != 'undefined') {
    for (let i = 0; i < weather.list.length; i = i + 8) {
      temp.push(Math.round(weather.list[i].main.temp))
      condition.push(weather.list[i].weather[0].main)
      icon.push(weather.list[i].weather[0].icon)
      let returnedDate = new Date(weather.list[i].dt_txt)
      day.push(days[returnedDate.getDay()])
    }
  }
  return (
    <>
      {typeof weather.list != 'undefined' && (
        <>
          {day.map((item, index) => (
            <Grid
              item
              key={index}
              xs={5}
              sm={4}
              md={2}
              lg={2}
              component={motion.div}
              whileHover={{
                scale: 1.07,
                transition: { duration: 0.3 },
              }}
              initial='hidden'
              animate='visible'
              variants={variants}
              custom={index}
              layout
            >
              <Item>
                <Typography
                  variant='h6'
                  sx={{ color: 'black', textShadow: '0 0 10px white' }}
                  gutterBottom
                >
                  {item}
                </Typography>
                <hr />
                <Typography variant='h6' gutterBottom>
                  {temp[index]}°C
                </Typography>
                <Typography variant='span' sx={{ m: 0, p: 0 }}>
                  <img
                    src={`http://openweathermap.org/img/w/${icon[index]}.png`}
                    alt='Weather icon'
                  />
                </Typography>
                <Typography variant='body1' gutterBottom>
                  {condition[index]}
                </Typography>
              </Item>
            </Grid>
          ))}
        </>
      )}
    </>
  )
}
