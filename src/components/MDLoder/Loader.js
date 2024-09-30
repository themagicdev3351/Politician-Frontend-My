import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";
import loaderGif from "./Loader.json";
import { CircularProgress, LinearProgress } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

export default function Loader() {
  const { loading } = useSelector((state) => state);

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => { });
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });
  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#510400",
          // bgcolor:"rgba(0,0,0,0.5)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading.open}
      >
        <CircularProgress  sx={{color:"#FF7518 !important"}} />
        {/* <img src={loaderGif} height={"120px"} width={"120px"} alt="loader" /> */}
        {/* <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} /> */}
      </Backdrop>
    </div>
  );
}
