import { Grid, Paper, Stack, Tab, Tabs } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useEffect, useState } from 'react'
import PendingAction from './PendingAction';
import ResolvedQuery from './ResolvedQuery';
import AllReports from './AllReports';
import apiService from 'components/ApiSevices/ApiServices';
import FeedBack from './FeedBack';
import QueryFilterComponent from './QueryFilterComponent';
import NodataFound from 'examples/NotFoundPage/NodataFound';
import { useDispatch } from 'react-redux';
import { isLoading } from '../../../redux/action/defaultActions';

const tabs = [
    { id: 1, Tablabel: "Pending Action", TabValue: "PendingAction", status: "open" },
    { id: 2, Tablabel: "Resolved Query", TabValue: "ResolvedQuery", status: "resolved" },
    { id: 3, Tablabel: "Feedback", TabValue: "Feedback", status: "" },
    { id: 4, Tablabel: "All Reports", TabValue: "AllReports", status: "" },
]
const QueryManagement = () => {
    const actionDispatcher = useDispatch();

    const [filter, setFilter] = useState('');
    const [queryfilter, setQueryFilter] = useState('');
    const [value, setValue] = useState({ TabValue: "PendingAction", Tablabel: "Pending Action", status: "open" });
    const [query, setQuery] = useState([]);
    const [resolvedQuery, setResolvedQuery] = useState([]);
    const handleChange = (newValue) => {
        console.log("newValue", newValue)
        setValue(newValue);

    };
    const Allquery = async () => {
        actionDispatcher(isLoading(true));

        try {
            const res = await apiService.getAllQuery(queryfilter, value.status);
            // console.log("response", res?.data)
            if (res?.data.success) {
                actionDispatcher(isLoading(false));
                setQuery(res?.data.allQueries)
            }
        } catch (error) {
            actionDispatcher(isLoading(false));

            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request error:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error', error.message);
            }
        }
    }
    const AllResolvedquery = async () => {
        actionDispatcher(isLoading(true));

        try {
            const res = await apiService.getAllQuery(queryfilter, "resolved");
            // console.log("response", res?.data)
            if (res?.data.success) {
                actionDispatcher(isLoading(false));
                setResolvedQuery(res?.data.allQueries)
            }
        } catch (error) {
            actionDispatcher(isLoading(false));

            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request error:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error', error.message);
            }
        }
    }
    useEffect(() => {
        Allquery();
    }, [filter, value.status, value.TabValue])
    useEffect(() => {
        AllResolvedquery();
    }, [filter, value.status, value.TabValue])
    const changeFilter = (newFilter) => {
        // console.log("newFilter", newFilter)
        setFilter(newFilter)
    }
    const changeQueryFilter = (newFilter) => {
        // console.log("newFilter", newFilter)
        setQueryFilter(newFilter)
    }
    const renderComponent = (value) => {
        if (value === "PendingAction") {
            return <Grid container px={1} rowGap={1} sx={{ height: 500, overflowY: 'auto' }}>
                {query.length === 0 ? <NodataFound /> :
                    query?.map((data, index) => {
                        return <Grid key={data._id} component={Paper} item md={12} sm={6} p={1.5} sx={{ border: "1px solid rgba(200, 200, 200, 1)", borderRadius: "5px" }}>
                            <PendingAction data={data} Allquery={Allquery} />
                        </Grid>
                    })

                }
            </Grid >
        } else if (value === "ResolvedQuery") {
            return <Grid container px={1} rowGap={1} sx={{ height: 500, overflowY: 'auto' }} >
                {resolvedQuery.length === 0 ? <NodataFound /> :
                    resolvedQuery?.map((data, index) => {
                        return <Grid key={data._id} component={Paper} item md={12} sm={6} p={1.5} sx={{ border: "1px solid rgba(200, 200, 200, 1)", borderRadius: "5px" }}>
                            <ResolvedQuery data={data} />
                        </Grid>
                    })

                }
            </Grid >

        } else if (value === "Feedback") {
            return <FeedBack filter={filter} />

        } else if (value === "AllReports") {
            return <AllReports filter={filter} />

        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container columnGap={1.5} alignItems={'center'} position={'relative'}>
                <Grid item md={9} sm={6}>
                    <MDBox mt={4}>
                        <MDBox>
                            <Tabs
                                value={value.TabValue}
                                // onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="primary"
                                aria-label="secondary tabs example"
                                sx={{ bgcolor: 'transparent' }}

                            >{tabs?.map((tab, index) => {
                                // console.log("tab", tab)
                                return <Tab onClick={() => handleChange(tab)} value={tab?.TabValue} label={tab?.Tablabel} key={index} sx={{
                                    bgcolor: 'transparent',
                                    color: 'text.primary',
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'white !important',
                                    },
                                }} />
                            })

                                }
                            </Tabs>

                        </MDBox>
                        <Stack mt={2}>
                            {renderComponent(value?.TabValue)}
                        </Stack>

                    </MDBox>
                </Grid>
                <Grid item md={.5} position={'absolute'} sx={{
                    top: 35, right: {
                        md: 140,
                        lg: 200,
                    }
                }}>
                    <MDBox >
                        <QueryFilterComponent changeFilter={changeFilter} changeQueryFilter={changeQueryFilter} value={value} />
                    </MDBox>
                </Grid>
            </Grid>


        </DashboardLayout>
    )
}

export default QueryManagement