import { Stack, Tab, Tabs } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import PartyWorkerAccept from './PartyWorkerAccept';
import ApprovePost from './ApprovePost';
import PropTypes from "prop-types";
import { useLocation, useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <MDBox sx={{ p: 3 }}>{children}</MDBox>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    value: PropTypes.number,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export const PartyWorkerHome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get('tab') || '0';
    const [value, setValue] = useState(location.search === "" ? "VerifyPartyWorker" : (new URLSearchParams(location.search).get('tab') === '1' ? "ApprovePost" : "VerifyPartyWorker"));
    // console.log("tab", tab)
    useEffect(() => {

        if (!query.get('tab')) {
            navigate(`?tab=0`, { replace: true });
        }
    }, [query, navigate]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`?tab=${newValue === "VerifyPartyWorker" ? 0 : 1}`, { replace: true });
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4}>
                <MDBox width={"35%"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        sx={{ bgcolor: '#f9f9f9 ', padding: "1rem" }}

                    >
                        <Tab value="VerifyPartyWorker" label="Verify Party Worker" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="ApprovePost" label="Approve Post"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white !important',
                                },
                            }}
                        />

                    </Tabs>

                </MDBox>
                <Stack mt={2}>
                    {value === "VerifyPartyWorker" && <PartyWorkerAccept />}
                    {value === "ApprovePost" && <ApprovePost />}

                </Stack>
            </MDBox>
        </DashboardLayout>
    );
}
