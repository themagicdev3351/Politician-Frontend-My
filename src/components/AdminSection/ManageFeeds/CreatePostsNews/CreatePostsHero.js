
import { Box, Stack, Tab, Tabs } from '@mui/material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useState } from 'react'
import PostCard from './PostCard'
import NewsCard from './NewsCard'
import { useTranslation } from 'react-i18next'

const CreatePostsHero = () => {
    const { t } = useTranslation()
    const [value, setValue] = useState('CreatePost');
    const [tabState, setTabState] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setTabState(!tabState)
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4}>
                <Box width={"50%"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        sx={{ bgcolor: 'transparent' }}

                    >
                        <Tab value="CreatePost" label="Create Post" sx={{
                            bgcolor: 'transparent',
                            color: 'text.primary',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white !important',
                            },

                        }} />
                        <Tab value="CreateNews"
                            label="Create News"
                            // label={t('welcome')}
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

                </Box>
                <Stack mt={2}>
                    {tabState ? <NewsCard /> : <PostCard />}
                </Stack>
            </MDBox>
        </DashboardLayout>
    )
}

export default CreatePostsHero
