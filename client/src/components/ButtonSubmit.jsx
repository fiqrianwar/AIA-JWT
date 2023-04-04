    import React from 'react'
    import Button from '@mui/material/Button';

    const ButtonSubmit = ({label}) => {
    return (
        <>
            <Button 
                fullWidth 
                variant = "contained" 
                color   = "success"
                type    = 'submit'
            >
                {label}
            </Button>
        </>
    )
    }

    export default ButtonSubmit