import React from "react";
import "./App.css";
import Router from "./Routes";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { CloseSnackBar } from "./redux/slices/app";

const vertical = "top";
const horizontal = "right";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.app.snackbar
  );

  return (
    <>
      <Router />
      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            dispatch(CloseSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              dispatch(CloseSnackBar());
            }}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
