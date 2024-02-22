import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import { LoginSignup } from './LoginSignup.jsx'


export function LoginSighnupModal({onSetUser}) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="white" onClick={() => setOpen(true)}>
      <i style={{color:'whitesmoke'}} className="fa-regular fa-user"></i>
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            backgroundColor:'inherit',
            border:'none',
            margin:'-107px',
            color:'whitesmoke',
            zIndex:11,
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            left="100px"
          >
        <LoginSignup onSetUser={onSetUser} />

          </Typography>
          
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}