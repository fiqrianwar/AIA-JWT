import { useEffect, useState }         from 'react';

import InputItem            from '../components/InputItem'
import ButtonSubmit         from '../components/ButtonSubmit';
import API                  from '../api/API';

import { 

          Box, 
          Stack, 
          FormControl 
        
        }                   from '@mui/material'

import { useNavigate, useParams }      from 'react-router-dom';


const Update = () => {

  
  let {id} = useParams()
  
  
  const [ data, setData ] = useState({})
  const [ name, setName ] = useState('')


  useEffect (() => {
    getUpdateCategory()
  },[])


  const token         = localStorage.getItem('token')
  const history       = useNavigate()


  const getUpdateCategory = async () => {

    try {
      
      const response = await API.get(`/category/${id}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      // console.log(response.data.data);
  
      const responseData = response.data.data
      
      setData({...responseData})
  

    } catch (error) {
      console.log(error);
    }

  }
    


  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await API.put('/category/update', {
            id    : id,
            name  : name,
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })

        console.log(response);
        history('/home')
        
    } catch (error) {
        console.log(error);
    }
}



  return (
    <>
      <Stack direction = 'row' justifyContent = 'center'>
        <Box width = '30%'>
          
            <form onSubmit = {handleSubmit} >
              <FormControl fullWidth>
                <h3>Update Category</h3>
                    <InputItem
                      label         = 'Category'
                      onChange      =  {(e) => setName(e.target.value)}
                      defaultValue  =  {data.name}
                    />
                <Box marginTop = '5%'>
                  <ButtonSubmit 
                    label = 'Submit'
                  />
                </Box>
              </FormControl>
              </form>
        </Box>
      </Stack>

    </>
  )
}

export default Update