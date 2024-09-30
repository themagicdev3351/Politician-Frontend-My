import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Modal } from '@mui/material';
import { useState } from 'react';

function renderRow(props) {
    const { index, style } = props;
    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default function ViewNewsLikes() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
            >
                <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={46}
                    itemCount={200}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>
        </Modal>
    );
}

