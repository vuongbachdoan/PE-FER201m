import { Alert, Avatar, Box, Button, Collapse, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getOneStaff, updateOneStaff } from "../../../core/services/staffApis";
import CloseIcon from '@mui/icons-material/Close';
import { validateData } from "../../../helper/validateData";
import { scrollToTop } from "../../../helper/scrollToTop";

export const StaffUpdate = () => {
    const { staffId } = useParams();
    const [openWarning, setOpenWarning] = React.useState(false);
    const [failValidateMessages, setFailValidateMessages] = React.useState([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [staffData, setStaffData] = React.useState({
        name: '',
        address: '',
        age: '',
        avatar: '',
        id: staffId,
        createdAt: null
    });
    React.useEffect(() => {
        if (staffId) {
            getOneStaff(staffId)
                .then((res) => {
                    setStaffData({
                        name: res?.name,
                        address: res?.address,
                        age: res?.age,
                        avatar: res?.avatar,
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [staffId]);

    const handleName = (val) => {
        setStaffData({
            ...staffData,
            name: val
        })
    }

    const handleAddress = (val) => {
        setStaffData({
            ...staffData,
            address: val
        })
    }

    const handleAge = (val) => {
        setStaffData({
            ...staffData,
            age: val
        })
    }

    const handleAvatar = (val) => {
        setStaffData({
            ...staffData,
            avatar: val
        })
    }

    const handleUpdate = () => {
        const errorMessages = validateData(staffData);
        
        if (errorMessages.length === 0) {
            updateOneStaff(staffId, staffData)
                .then(() => {
                    scrollToTop();
                    setOpenAlert(true);
                    setTimeout(() => {
                        setOpenAlert(false);
                    }, 3000);
                    setOpenWarning(false);
                    setFailValidateMessages([]);
                })
                .catch((err) => console.error(err))
        } else {
            setFailValidateMessages(errorMessages);
            setOpenWarning(true);
        }
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
                    You have update successfully!
                </Alert>
            </Collapse>

            <Stack flexDirection='column' alignItems='center' width='100%'>
                <Box
                    minWidth={320}
                >
                    <Typography textAlign='center' marginBottom='30px' textTransform='uppercase' fontSize='30' fontWeight='bold'>Update staff information</Typography>

                    <Avatar style={{
                        marginBottom: 30,
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }} alt={staffData?.name} src={staffData?.avatar} />

                    <Stack spacing={2}>
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Name"
                            id="outlined-size-small"
                            value={staffData?.name}
                            onChange={(e) => handleName(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Address"
                            id="outlined-size-small"
                            value={staffData?.address}
                            onChange={(e) => handleAddress(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Age"
                            id="outlined-size-small"
                            type="number"
                            value={staffData?.age}
                            onChange={(e) => handleAge(e.target.value)}
                            size="small"
                        />
                        <TextField
                            style={{ borderRadius: '20px' }}
                            label="Avatar"
                            id="outlined-size-small"
                            value={staffData?.avatar}
                            onChange={(e) => handleAvatar(e.target.value)}
                            size="small"
                        />
                        <Collapse in={openWarning}>
                            <Alert
                                style={{
                                    maxWidth: 320
                                }}
                                severity="warning"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpenWarning(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {
                                    failValidateMessages.map((message) => (
                                        <Typography fontSize='12px'>{message}</Typography>
                                    ))
                                }
                            </Alert>
                        </Collapse>
                        <Button
                            variant='contained' style={{
                                padding: 10,
                                borderRadius: 10,
                                minWidth: 100,
                                backgroundColor: '#0A0A0A'
                            }}
                            onClick={handleUpdate}>Update</Button>
                        <Link style={{ textAlign: 'center' }} to='/dashboard'>
                            <Typography marginTop='5px' marginBottom='15px'>Back to dashboard</Typography>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </>
    );
}