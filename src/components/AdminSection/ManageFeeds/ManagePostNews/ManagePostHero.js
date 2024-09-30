import { Stack, Tab, Tabs } from '@mui/material'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ManagePostTable from './ManagePostTable'
import ManageNewsTable from './ManageNewsTable'
import SocialMediaPostTable from '../CreateSocialMedia/SocialMediaPostTable'
import { useLocation, useNavigate } from 'react-router-dom'
import ManagePartyWorkerPostTable from './ManagePartyWorkerPostTable'

const ManagePostHero = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query?.get('tab') || '0';


    const [value, setValue] = useState(location.search === "" ? "AdminPost" : (new URLSearchParams(location.search).get('tab') || "AdminPost"));
    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`?tab=${newValue}`);
    };
    useEffect(() => {
        if (!query.get('tab')) {
            navigate(`?tab=AdminPost`);
        }
    }, [query, navigate]);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4}>
                <MDBox width={"70%"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        sx={{ bgcolor: 'transparent' }}

                    >
                        <Tab value="AdminPost" label="Admin Post" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="PartyWorkerPost" label="Party Worker Post" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="ManageNews" label="Manage News"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'white !important',
                                },
                            }}
                        />
                        <Tab value="ManageYoutubePost" label="Manage Youtube Post" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                    </Tabs>
                </MDBox>
                <Stack mt={2}>
                    {value === "AdminPost" && <ManagePostTable />}
                    {value === "ManageNews" && <ManageNewsTable />}
                    {value === "ManageYoutubePost" && <SocialMediaPostTable />}
                    {value === "PartyWorkerPost" && <ManagePartyWorkerPostTable />}
                </Stack>
            </MDBox>
        </DashboardLayout>
    )
}

export default ManagePostHero;