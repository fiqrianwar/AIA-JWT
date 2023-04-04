    import * as React           from 'react';
    
    import  {       
                    Box,
                    Modal,
                    FormControl

            }                   from '@mui/material';
        
            
    import InputItem            from './InputItem';
    import ButtonSubmit         from './ButtonSubmit';
    
    import API                  from '../api/API';
    import { useNavigate }      from 'react-router-dom';




    const style = {
        position    : 'absolute',
        top         : '50%',
        left        : '50%',
        transform   : 'translate(-50%, -50%)',
        width       : 400,
        bgcolor     : 'background.paper',
        border      : '2px solid #000',
        boxShadow   : 24,
        p           : 4,
    };

    
    
    export default function ModalAdd({open,onClose}) {

        const [name,setName] = React.useState('')

        
        const token         = localStorage.getItem('token')
        const history       = useNavigate()


        


        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                const response = await API.post('/category/create', {
                    name : name
                },{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
    
                console.log(response);
                history(0)
                
            } catch (error) {
                console.log(error);
            }
        }

            

    
    return (
        <div>
            <Modal
                open                = {open}
                onClose             = {onClose}
                aria-labelledby     = "modal-modal-title"
                aria-describedby    = "modal-modal-description"
            >
                <Box sx={style}>


                    <form onSubmit = {handleSubmit} >
                        <FormControl fullWidth>
                            <h3>Add Category</h3>
                                <InputItem
                                    label       = 'Category'
                                    onChange    =  {(e) => setName(e.target.value)}
                                />
                                <Box marginTop = '5%'>
                                    <ButtonSubmit 
                                        label = 'Submit'
                                        
                                    />
                                        
                                </Box>
                        </FormControl>
                        
                    </form>
                </Box>
                
            </Modal>
        </div>
    );
    }