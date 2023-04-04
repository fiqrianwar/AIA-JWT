    import { useState, useEffect }   from 'react';
    import { Box, Stack }           from '@mui/material';
    
    
    import ButtonSubmit             from '../components/ButtonSubmit';
    import InputItem                from '../components/InputItem';
    import ButtonItem               from '../components/ButtonItem';
    
    import API                      from '../api/API';
    
    import '../App.css';


    import { Link, useNavigate }    from 'react-router-dom';


    const Login = () => {

        const history           = useNavigate()

        const [data,setData]    = useState({

            email     : '',
            password  : '',
            name      : ''
        
        })
        
        
        useEffect(() => {

            if(localStorage.getItem('token')){
                history('/')
            }

        })


        const handleChange = (e) => {
            setData({
            ...data, [e.target.name] : e.target.value
            })
        }
        
        
        const handleSubmit = async (e) => {
            e.preventDefault()
            
            try {
                const response = await API.post('/user/login',{
                    email     : data.email,
                    password  : data.password,
                    name      : data.name
                })

                const responseData = await localStorage.setItem('token', response.data.data.token) 
                
                history('/');

                return responseData
            
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
                            label = 'Submit'
                        
                        />
                    </Box>
                </form>
                
                
                <Link to = '/register'>
                    <Box display = 'flex' justifyContent = 'center' marginTop = '5%'>
                        <ButtonItem
                            label = 'Register'
                        />
                    </Box>
                </Link>

            </section>
        </Stack>

        
        </div>
    )
    }

    export default Login