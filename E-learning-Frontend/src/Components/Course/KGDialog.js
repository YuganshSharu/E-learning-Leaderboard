import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Graph from '../../Pages/Graph';


export default function KGDialog({ open, setOpen, nodes }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle align='center'>Knowledge Graph</DialogTitle>
      <Graph
        width="30vw"
        nodes={nodes}
        />
    </Dialog>
  );
}