import React from 'react'
import Button from '@mui/material/Button';

const ButtonItem = ({label}) => {
  return (
    <>
        <Button color="secondary">{label}</Button>
    </>
  )
}

export default ButtonItem