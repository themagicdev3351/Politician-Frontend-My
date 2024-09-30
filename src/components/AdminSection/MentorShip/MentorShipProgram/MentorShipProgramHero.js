import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Stack } from '@mui/material';
import MDBox from 'components/MDBox';
import AllStudyMaterial from './AllStudyMaterial/AllStudyMaterial';
import YourUploaded from './YourUploaded/YourUploaded';
import UploadStudyMaterial from './UploadStudyMaterial/UploadStudyMaterial';
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

export default function MentorShipProgramHero() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query?.get('tab') || '0';
    const [value, setValue] = useState(location.search === "" ? "AllStudyMaterial" : (new URLSearchParams(location.search).get('tab') || "AllStudyMaterial"));

    useEffect(() => {
        if (!query.get('tab')) {
            navigate(`?tab=AllStudyMaterial`);
        }
        else {
            setValue(query?.get('tab'))
        }
    }, [query, navigate]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`?tab=${newValue}`);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4}>
                <MDBox width={"60%"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="primay"
                        aria-label="secondary tabs example"
                        sx={{ bgcolor: 'transparent', padding: "1rem" }}


                    >
                        <Tab value="AllStudyMaterial" label="All Study Material" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="UploadStudyMaterial" label="Upload Study Material"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white !important',
                                },
                            }}
                        />
                        <Tab value="YourUploaded" label="Your Uploaded"
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
                    {value === "AllStudyMaterial" && <AllStudyMaterial />}
                    {value === "UploadStudyMaterial" && <UploadStudyMaterial />}
                    {value === "YourUploaded" && <YourUploaded />}

                </Stack>
            </MDBox>
        </DashboardLayout>
    );
}

