import React from 'react'


import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import API from '../api/API';
import '../App.css';
import ButtonSubmit from '../components/ButtonSubmit';
import InputItem from '../components/InputItem';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const history = useNavigate()

    
    const [data,setData] = useState({

        email     : '',
        password  : '',
        name      : ''
    
    })
    
    
    const handleChange = (e) => {
        setData({
        ...data, [e.target.name] : e.target.value
        })
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await API.post('/user/register',{
                email     : data.email,
                password  : data.password,
                name      : data.name
            })
            
            history('/login')

            return response
        
        } catch (error) {
        console.log(error);
        }
    }

    const style = {
        marginTop : '10%'
    }

return (
    <div>
        <Stack direction = "row" justifyContent = "center">
            <section className = 'container-form'>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <InputItem
                            label     = 'Email'
                            name      = 'email'
                            onChange  = {handleChange}
                            style     = {style}
                            
                        />
                        </Box>

                        <Box>
                        <InputItem
                            label     = 'Password'
                            name      = 'password'
                            onChange  = {handleChange}
                            style     = {style}
                        />
                        </Box>


                        <Box>
                        <InputItem
                            label     = 'Name'
                            name      = 'name'
                            onChange  = {handleChange}
                            style     = {style}
                        />
                        </Box>


                    <Box marginTop = '20%'>
                        <ButtonSubmit
                            label = 'Register'
                        />
                    </Box>
                </form>
                
            </section>
        </Stack>
    </div>
  )
}

export default Register