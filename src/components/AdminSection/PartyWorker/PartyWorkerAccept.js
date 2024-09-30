import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, Button, Checkbox, Collapse, Grid, ListItem, ListItemAvatar, ListItemText, Paper, Stack } from '@mui/material';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import { useDispatch } from 'react-redux';
import apiService from 'components/ApiSevices/ApiServices';
import { openSnackbar, isLoading } from '../../../redux/action/defaultActions';
import NodataFound from 'examples/NotFoundPage/NodataFound';
import MDBox from 'components/MDBox';
import { pink } from '@mui/material/colors';
import ConfirmationApproval from './ConfirmationApproval';
import DeleteModal from 'examples/DeleteModal/DeleteModal';
const PartyWorkerAccept = () => {
    const dispatch = useDispatch();
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        message: "",
        buttonText: "",
        data: {
            postId: null,
        },
    });
    const [expanded, setExpanded] = useState(false);
    const [partWorker, setPartWorker] = useState([])
    const [openItemId, setOpenItemId] = useState(null);
    const [open, setOpen] = useState(false)
    const [autoApprove, setAutoApprove] = useState({ id: "", status: null })
    const [accept, setAccept] = useState({ id: "", status: null })
    const partWorkerData = async () => {
        dispatch(isLoading(true))
        try {
            const res = await apiService.getPartyWorkerData();
            // console.log("response", res?.data?.allPartyWorkers)
            setPartWorker(res?.data?.allPartyWorkers)
            if (res?.data.success) {
                dispatch(isLoading(fallse))
            }
        } catch (error) {
            // dispatch(openSnackbar(error?.response?.data?.message, "error"));
            dispatch(isLoading(false));
        }
    }
    useEffect(() => {
        partWorkerData();
    }, [])
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleClickCollapse = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };
    const handleClose = () => {
        setOpen(false)
        setDialog({
            open: false,
            title: ``,
            message: "",
            buttonText: "",
            data: {
                postId: null,
            },
        });
    }
    const handleVerifyWorker = async () => {
        dispatch(isLoading(true));

        try {
            const response = await apiService.verifyPartyWorker(accept.status, accept.id)
            partWorkerData()
            setAccept({ id: "", status: "", });
            if (response?.data.success) {
                dispatch(isLoading(false));
                dispatch(openSnackbar(`Party worker is ${accept.status} successfully`, "success"));
            }
        } catch (error) {
            dispatch(isLoading(false));
            dispatch(openSnackbar(error?.response?.data?.message, "error"));

        }
    }
    return (
        // <Grid container p={2} sx={{ display: "flex", justifyContent: "center" }}>
        //     {partWorker?.length === 0 ? <NodataFound /> :
        //         partWorker?.map((worker, index) => {
        //             console.log("partWorker", worker)
        //             return <Grid key={index} item xs={12} md={8} >
        //                 <Accordion expanded={expanded === `${worker._id}`} onChange={handleChange(`${worker._id}`)}>
        //                     <AccordionSummary
        //                         aria-controls="panel1bh-content"
        //                         id="panel1bh-header"
        //                     >
        //                         <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        //                             <Stack direction={'row'} spacing={1} alignItems={'center'}>
        //                                 <Avatar
        //                                     sx={{ width: "50px", height: "50px" }}
        //                                     alt='worker profile'
        //                                     src={worker?.profileImg.url} />
        //                                 <Stack spacing={-0.5}>
        //                                     <MDTypography fontSize="18px" fontWeight={'regular'}>{worker?.userName}</MDTypography>
        //                                     <MDTypography fontSize="15px" fontWeight={'regular'}>{worker?.constituentAssembly}</MDTypography>
        //                                     <MDTypography fontSize="15px" fontWeight={'regular'}>{worker?.partyWorkerOccupation}</MDTypography>

        //                                 </Stack>
        //                             </Stack>

        //                             <Box sx={{ display: "flex", justifyContent: "space-between" }} width={200}>
        //                                 <MDButton variant="gradient" color="warning">Accept</MDButton>
        //                                 <MDButton variant="outlined" color="warning">Reject</MDButton>
        //                             </Box>
        //                         </Box>

        //                     </AccordionSummary>
        //                     <AccordionDetails>
        //                         <Typography>
        //                             Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
        //                             Aliquam eget maximus est, id dignissim quam.
        //                         </Typography>
        //                     </AccordionDetails>
        //                 </Accordion>
        //             </Grid>
        //         })
        //     }


        // </Grid>
        <Box sx={{
            marginRight: "1rem", width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
            // height: 500, overflowY:"auto", 
        }}>
            {partWorker.length === 0 ? "No party worker to verification" : (
                <Box sx={{ width: "60%", display: "flex", flexDirection: "column", justifyContent: "center", }} >
                    {partWorker.map((item, index) => (
                        <Box component={Paper} key={index} my={1} sx={{ borderBottom: '0.5px solid #d9d9d9', p: 1 }}>
                            <ListItem
                                secondaryAction={
                                    <Stack direction={"row"} gap={2}>
                                        {item.partyWorkerVerification === "approved" ? <MDButton
                                            color={"success"}
                                            variant={"contained"}
                                            size={"small"}

                                        >
                                            Accepted
                                        </MDButton> : <MDButton
                                            color={"primary"}
                                            variant={"contained"}
                                            size={"small"}
                                            onClick={() => {
                                                setAccept({ id: item?._id, status: "approved", });
                                                setDialog({
                                                    open: true,
                                                    title: `are you sure you want to accept this `,
                                                    message: "Party Worker ?",
                                                    buttonText: "Accept",
                                                    data: {
                                                        postId: item?._id,
                                                    },
                                                });
                                            }}
                                        >
                                            Accept
                                        </MDButton>}
                                        <MDButton
                                            variant={"contained"}
                                            size={"small"}
                                            onClick={() => {
                                                setAccept({ id: item?._id, status: "rejected", });
                                                setDialog({
                                                    open: true,
                                                    title: `are you sure you want to rejected this `,
                                                    message: "Party Worker ?",
                                                    buttonText: "Reject",
                                                    data: {
                                                        postId: item?._id,
                                                    },
                                                });
                                            }}
                                        >
                                            Reject
                                        </MDButton>
                                    </Stack>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={item?.profileImg?.url} alt={'Avatar'} />
                                </ListItemAvatar>
                                <ListItemText
                                    onClick={() => handleClickCollapse(item?._id)}
                                    primary={
                                        <Stack spacing={-.5}>
                                            <MDTypography variant="body1" sx={{ fontSize: "1rem", fontWeight: "medium" }} color="secondary">
                                                {item?.userName}
                                            </MDTypography>
                                            <MDTypography sx={{ fontSize: "0.8rem" }} variant="body2">{item?.constituentAssembly}</MDTypography>
                                            <MDTypography sx={{ fontSize: "0.8rem" }} variant="body2">{item?.partyWorkerOccupation}</MDTypography>
                                        </Stack>
                                    }
                                // secondary={openItemId === item?._id ? "hide Document" : `Uploaded Document`}

                                />
                            </ListItem>
                            <Box display={'flex'} alignItems={'center'}>
                                <Checkbox
                                    checked={item?.autoPostApproval}
                                    onChange={() => {
                                        setAutoApprove({ id: item._id, status: item.autoPostApproval });
                                        setOpen(true);
                                    }}
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28, border: "1px solid black" },
                                    }}
                                />
                                <MDTypography fontSize="15px">Approve Posts Automatically</MDTypography>
                            </Box>

                            <Collapse in={openItemId === item?._id} timeout="auto" unmountOnExit my={2} sx={{ marginTop: "1rem" }}>
                                <Stack>
                                    <MDTypography fontSize="18px" fontWeight="medium">Introduction</MDTypography>
                                    <MDTypography fontSize="15px" fontWeight="regular"> {
                                        item?.partyWorkerShortIntro
                                    }</MDTypography>
                                </Stack>

                            </Collapse>
                        </Box>
                    ))}
                </Box>
            )}
            {open && <ConfirmationApproval open={open} handleClose={handleClose} setAutoApprove={setAutoApprove} autoApprove={autoApprove} partWorkerData={partWorkerData} />}
            {dialog.open && (
                <>
                    <DeleteModal
                        open={dialog.open}
                        handleClose={handleClose}
                        dialog={dialog}
                        deleteFunc={() => handleVerifyWorker()}
                        buttonText={
                            dialog.buttonText === "activate"
                                ? "Activate"
                                : dialog.buttonText === "deactivate"
                                    ? "Deactivate"
                                    : "Delete"
                        }
                        Icon={
                            dialog.buttonText === "activate" ? (
                                <img src="/protection.png" alt="del" width={50} />
                            ) : dialog.buttonText === "deactivate" ? (
                                <img src="/shield2.png" alt="del" width={50} />
                            ) : (
                                ""
                            )
                        }
                    />
                </>
            )}
        </Box >
    );
}

export default PartyWorkerAccept