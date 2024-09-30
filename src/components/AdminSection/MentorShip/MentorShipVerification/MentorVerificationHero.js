import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Stack } from '@mui/material';
import MDBox from 'components/MDBox';
import VerifyMentor from './VerifyMentor';
import AllMentor from './AllMentor';
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
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get('tab') || '0';
    const [value, setValue] = useState(location.search === "" ? "VerifyMentor" : (new URLSearchParams(location.search).get('tab') === '1' ? "AllMentor" : "VerifyMentor"));
    // console.log("tab", tab)
    useEffect(() => {
        if (!query.get('tab')) {
            navigate(`?tab=0`, { replace: true });
        }
    }, [query, navigate]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`?tab=${newValue === "VerifyMentor" ? 0 : 1}`, { replace: true });

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
                        <Tab value="VerifyMentor" label="Verify Mentor" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="AllMentor" label="All Mentor"
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
                    {value === "VerifyMentor" && <VerifyMentor />}
                    {value === "AllMentor" && <AllMentor />}

                </Stack>
            </MDBox>
        </DashboardLayout>
    );
}

