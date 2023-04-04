import React from 'react'
import TextField from '@mui/material/TextField';


const InputItem = ({label,name,onChange,style,defaultValue}) => {
  return (
    <>
        <TextField 
            id          = "standard-basic" 
            label       = {label} 
            variant     = "standard" 
            name        = {name}
            onChange    = {onChange}
            style       = {style}
            defaultValue  = {defaultValue}
        />
    </>
  )
}


export default InputItem

