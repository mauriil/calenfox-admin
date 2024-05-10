import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import DateTimePicker from './DateTimePicker';

const EventDetailModal = ({ open, event, onClose, onCancel, onReschedule }) => {
    if (!event) return null;

    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [newDateTime, setNewDateTime] = useState(null);

    const handleCancel = () => {
        setConfirmCancelOpen(true);
    };

    const handleConfirmCancel = () => {
        // onCancel(event);
        setConfirmCancelOpen(false);
    };

    const handleCloseConfirmCancel = () => {
        setConfirmCancelOpen(false);
    };

    const handleReschedule = () => {
        setRescheduleOpen(true);
    };

    const handleConfirmReschedule = () => {
        if (newDateTime) {
            // onReschedule(event, newDateTime);
            setNewDateTime(null);
            setRescheduleOpen(false);
        }
    };

    const handleCloseReschedule = () => {
        setRescheduleOpen(false);
    };

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Detalles del evento
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>Titulo:</strong> {event.title} <br />
                        <strong>Inicio:</strong> {event.start.toString()} <br />
                        <strong>Fin:</strong> {event.end.toString()} <br />
                        <strong>Estado:</strong> {event.status} <br />
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleCancel} variant="outlined" color="error">Cancelar</Button>
                        <Button onClick={handleReschedule} variant="outlined" color="primary">Reprogramar</Button>
                        <Button onClick={onClose} variant="contained" color="primary">Cerrar</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={confirmCancelOpen}
                onClose={handleCloseConfirmCancel}
                aria-labelledby="confirm-cancel-title"
                aria-describedby="confirm-cancel-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="confirm-cancel-title" variant="h6" component="h2">
                        Confirmar cancelación
                    </Typography>
                    <Typography id="confirm-cancel-description" sx={{ mt: 2 }}>
                        ¿Estás seguro de que quieres cancelar este evento?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleCloseConfirmCancel} variant="outlined" color="primary">Cancelar</Button>
                        <Button onClick={handleConfirmCancel} variant="contained" color="error">Confirmar</Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={rescheduleOpen}
                onClose={handleCloseReschedule}
                aria-labelledby="reschedule-title"
                aria-describedby="reschedule-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="reschedule-title" variant="h6" component="h2">
                        Reprogramar evento
                    </Typography>
                    <Typography id="reschedule-description" sx={{ m: 2 }}>
                        Selecciona la nueva fecha y hora para el evento:
                    </Typography>
                    <DateTimePicker value={newDateTime} onChange={setNewDateTime} />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleCloseReschedule} variant="outlined" color="primary">Cancelar</Button>
                        <Button onClick={handleConfirmReschedule} variant="contained" color="primary">Confirmar</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default EventDetailModal;
