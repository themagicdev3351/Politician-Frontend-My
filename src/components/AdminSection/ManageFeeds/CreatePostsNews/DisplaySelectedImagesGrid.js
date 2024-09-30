import React from "react";
import Iconify from "examples/Iconify/Iconify";
import {
    Avatar,
    Box,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const DisplaySelectedImagesGrid = ({
    images,
    handleRemoveImage,
    handleOpenModal,
}) => {
    return (
        <>
            {Array.from(images)
                .reverse()
                ?.map((url, index) => {
                    console.log("url", url)
                    // {
                    //     url.startsWith('blob:') && url.includes('video') ? (
                    //         <video
                    //             src={url}
                    //             controls
                    //             width="300"
                    //             style={{ display: 'block', margin: '10px 0' }}
                    //         />
                    //     ) : (
                    //     <img
                    //         src={url}
                    //         alt={`preview-${index}`}
                    //         width="300"
                    //         style={{ display: 'block', margin: '10px 0' }}
                    //     />
                    // )
                    // }
                    if (index < 4) {
                        return (
                            <Grid
                                key={index}
                                item
                                xs={5.75}
                                minHeight={95}
                                maxHeight={100}
                                // minHeight={120}
                                // minWidth={100}
                                // bgcolor={"green"}
                                sx={{
                                    //   backgroundImage: `url(${images[index]})`,
                                    backgroundImage: `url(${url})`,

                                    //   backgroundImage: `url(${imgUrl})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: "5px",
                                    position: "relative",
                                    p: 0,
                                }}
                            >
                                {index === 3 ? (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            //   height: "100%",
                                            minHeight: 80,
                                            maxHeight: 100,
                                            width: "100%",
                                            color: "white",
                                            borderRadius: "5px",
                                            backgroundColor: "rgba(0,0,0,0.82)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                    // onClick={handleOpenModal}
                                    >
                                        <IconButton
                                            onClick={handleOpenModal}
                                            sx={{ color: "white" }}
                                            size="large"
                                        >
                                            {/* <iconify-icon icon="uim:master-card"></iconify-icon> */}
                                            <Iconify icon="uim:master-card" />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            //   height: "100%",
                                            minHeight: 80,
                                            maxHeight: 100,
                                            width: "100%",
                                            color: "white",
                                            borderRadius: "5px",
                                            backgroundColor: "rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}
                                            fontSize={"10px"}
                                            px={0.5}
                                        //   bgcolor={"red"}
                                        >
                                            <IconButton
                                                size="small"
                                                sx={{ color: "whitesmoke" }}
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <Iconify icon="ic:round-delete" />
                                            </IconButton>
                                            <Typography
                                                bgcolor={"whitesmoke"}
                                                color={"black"}
                                                p={0.25}
                                                borderRadius={"50%"}
                                                fontSize={"14px"}
                                                width={"25px"}
                                                textAlign={"center"}
                                            >
                                                {index + 1}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                )}
                            </Grid>
                        );
                    }
                })}
        </>
    );
};
DisplaySelectedImagesGrid.propTypes = {
    images: PropTypes.array,
    handleRemoveImage: PropTypes.func,
    handleOpenModal: PropTypes.func,
};
export default DisplaySelectedImagesGrid;
