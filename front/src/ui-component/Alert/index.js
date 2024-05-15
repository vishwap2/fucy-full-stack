import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AlertMessage({open,message, setOpen}){

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return(
        <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
        </>
    )
}