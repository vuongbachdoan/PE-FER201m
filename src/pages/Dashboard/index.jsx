import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteOneStaff, getAllStaffs } from '../../core/services/staffApis';
import { sortByAge } from '../../helper/sortByAge';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../../helper/convertDate';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [selectedStaff, setSelectedStaff] = React.useState(null);
    const handleClickOpen = (staffId) => {
        setSelectedStaff(staffId);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [staffs, setStaffs] = React.useState([]);
    React.useEffect(() => {
        loadStaffsData();
    }, []);

    const loadStaffsData = () => {
        getAllStaffs()
            .then((res) => {
                setStaffs(sortByAge(res));
            })
            .catch((err) => console.error(err));
    }

    const handleDelete = () => {
        deleteOneStaff(selectedStaff)
            .then(() => {
                loadStaffsData();
                setOpen(false);
                setOpenAlert(true);
                setTimeout(() => {
                    setOpenAlert(false);
                }, 3000);
                setSelectedStaff(null);
            })
            .catch(() => {
                setSelectedStaff(null);
            })
    }

    return (
        <>
            <Collapse in={openAlert}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    You have delete successfully!
                </Alert>
            </Collapse>

            <Button
                startIcon={<AddIcon />}
                variant='contained' style={{
                    padding: 10,
                    borderRadius: 15,
                    minWidth: 100,
                    marginBottom: 30,
                    backgroundColor: '#0A0A0A'
                }} onClick={() => navigate('/add')}>Add</Button>

            <TableContainer
                style={{
                    borderRadius: 20
                }}
                component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Address</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Age</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Created At</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Edit</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((staff) => (
                            <TableRow
                                key={staff.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {staff.name}
                                </TableCell>
                                <TableCell align="right">{staff.address}</TableCell>
                                <TableCell align="right">{staff.age}</TableCell>
                                <TableCell align="right">{convertDate(staff.createdAt)}</TableCell>
                                <TableCell align="right" style={{ cursor: 'pointer' }} onClick={() => navigate(`/update/${staff.id}`)}>
                                    <EditIcon />
                                </TableCell>
                                <TableCell align="right" onClick={() => handleClickOpen(staff.id)} style={{ cursor: 'pointer' }}>
                                    <DeleteForeverIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{ style: { borderRadius: '20px', minWidth: '320px' } }}
            >
                <DialogTitle id="alert-dialog-title">
                    Continue to Delete?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText fontSize='12px' id="alert-dialog-description">
                        By click delete, this staff will be remove!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained' style={{
                            padding: 10,
                            borderRadius: 15,
                            minWidth: 100,
                            backgroundColor: '#0A0A0A',
                            boxShadow: 'none'
                        }}
                        onClick={handleClose}>Cancel</Button>
                    <Button
                        variant='contained' style={{
                            padding: 10,
                            borderRadius: 15,
                            minWidth: 100,
                            backgroundColor: "#FD3D39",
                            color: '#FFF',
                            border: '0px',
                            boxShadow: 'none'
                        }}
                        onClick={() => handleDelete()}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}