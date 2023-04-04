        import React, { useState }     from 'react'
        import API                     from '../api/API';


        import { useEffect }            from 'react';
        import { Link,useNavigate }          from 'react-router-dom';


        import Table                    from '@mui/material/Table';
        import TableBody                from '@mui/material/TableBody';
        import TableCell                from '@mui/material/TableCell';
        import TableContainer           from '@mui/material/TableContainer';
        import TableHead                from '@mui/material/TableHead';
        import TableRow                 from '@mui/material/TableRow';
        import Paper                    from '@mui/material/Paper';


        import  { 
                    Stack,
                    Button, 
                    Box
                }                       from '@mui/material';


        import DeleteIcon               from '@mui/icons-material/Delete';
        import NoteAltIcon              from '@mui/icons-material/NoteAlt';
        import AddIcon                  from '@mui/icons-material/Add';
        import ModalAdd                 from '../components/ModalAdd';
        

        const Home = () => {

            // =========== Data State =========
            const [ data, setData ]     = useState([])

            // ======= Modal State =========
            const [ open, setOpen ]     = useState(false);
            
            useEffect( () => {

                getAllCategory()

            }, [] )

            const history   = useNavigate()
            
            // ======== Token ========
            const token     = localStorage.getItem('token');
            
        
            // ========= Get All Category ===========

            const getAllCategory = async () => {
                
                try {

                    if ( token ) {

                        const response = await API.get('/category', {
                            headers : {
                                Authorization : `Bearer ${token}`
                            }
                        })

                        const responseData = response.data.data
                        setData([...responseData]);
                        

                    } else {
                        history('/login')
                    }
                    
                    } catch (error) {
                        console.log(error);
                    }
                }    
                


                const handleOpen  = () => setOpen(true)
                const handleClose = () => setOpen(false);
                
    
                
                // ============= Function Delete ===========
                const handleDelete = async (id,name) => {
                    

                    const confirmDelete = window.confirm(`Delete ${name}`)

                    if (confirmDelete) {
                    
                        try {
                            const response = await API.delete(`/category/${id}`,{
                                headers : {
                                    Authorization : `Bearer ${token}`
                                }
                            })
                            
                            alert(`Delete Success ${name}`);
                            history(0)
                            return response

                        } catch (error) {
                            console.log(error);
                        }
                    
                    } else { 
                        alert('Cancel Delete')
                    }

                }

            return (

                <>
                
                <ModalAdd
                    open    = {open}
                    onClose = {handleClose}
                
                />

                        
                <Stack direction = 'row' justifyContent = 'end'>
                    <Box>
                        <Button 
                            onClick     = {handleOpen} 
                            variant     = "outlined" 
                            color       = 'success' 
                            startIcon   = {<AddIcon/>}
                        >
                            Add
                        </Button>
                    </Box>
                </Stack>
                
                

                <Stack direction = 'row' justifyContent = 'center' marginTop = '5%'>
                    <TableContainer component={Paper} sx = {{ 
                        width : '50%'
                    }}>
                        <Table sx={{ minWidth: 50 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  sx = {{ textAlign : 'center' }}>Category</TableCell>
                                    <TableCell  sx = {{ textAlign : 'center' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                

                                {
                                    data.map((item) => 
                                    
                                            <TableRow
                                                sx = {{ 
                                                    '&:last-child td, &:last-child th': { border: 0 } 
                                                }}
                                                key = {item.id}
                                            >

                                                <TableCell>
                                                    {item.name}
                                                </TableCell>

                                                <TableCell sx = {{
                                                    display         : 'flex',
                                                    justifyContent  : 'space-around'
                                                }}> 

                                                
                                                
                                                <Link to = {`/update/${item.id}`}>
                                                    <Button 
                                                        variant = 'contained' 
                                                        endIcon = {<NoteAltIcon/>} 
                                                    >
                                                        Update
                                                    </Button>
                                                </Link>


                                                    <Button 
                                                        variant = 'contained' 
                                                        endIcon = {<DeleteIcon/>} 
                                                        color   = 'error' 
                                                        onClick = { () => handleDelete(item.id,item.name) }
                                                    > 
                                                        
                                                            Delete
                                                        </Button> 
                                            
                                                </TableCell>
                                            </TableRow>
                                    
                                    
                                    )
                                }
                                


                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                </>
                
                
            )
        }

        export default Home