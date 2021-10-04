import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import Background from "../Assets/scenery.jpg";
import { Typography } from "@mui/material";
import firebase from "../Firebase";
// import { makeStyles } from "@mui/styles";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const useStyles = makeStyles(() => ({
  button: {},
}));

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  // password: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  // confirmPassword: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  phoneNo: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10, "MUST BE 10 DIGIT")
    .required("Required"),
});

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNo: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10, "MUST BE 10 DIGIT")
    .required("Required"),
});

function Login(props) {
  const { login } = props;
  // const login = true;
  const classes = useStyles();
  let history = useHistory();

  const [loginData, setLoginData] = useState({});
  const [userPhoneNo, setUserPhoneNo] = useState("initial");
  const [userExists, setUserExists] = useState(false);
  const [userDoesNotExists, setUserDoesNotExists] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);

  useEffect(() => {
    (async () => {
      await firebase.child("data").on("value", (snapshot) => {
        if (snapshot.val() != null) {
          setLoginData({ ...snapshot.val() });
        }
      });
    })();
  }, []);

  const handleSubmitLogin = (values) => {
    Object.keys(loginData).map((id) => {
      if (
        loginData[id].phoneNo === values.phoneNo &&
        loginData[id].password === values.password
      ) {
        setUserExists(true);
        setUserPhoneNo(loginData[id].phoneNo);
      } else {
        setUserDoesNotExists(true);
      }
    });
  };

  function handleSubmitSignup(values) {
    const existingUser = Object.keys(loginData).find(
      (id) => loginData[id].phoneNo === values.phoneNo
    );

    if (!existingUser) {
      firebase.child("data").push(values);
      history.push("/log-in");
    }
    setUserAlreadyExists(Boolean(existingUser));
  }

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Paper
        style={{
          width: "25%",
          borderRadius: 20,
          height: "90%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!login && userExists ? history.push("/home") : null}
        {login && userExists ? history.push("/log-in") : null}
        <Formik
          initialValues={{
            name: "",
            phoneNo: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={login ? SignupSchema : LoginSchema}
          onSubmit={(values) => {
            login ? handleSubmitSignup(values) : handleSubmitLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}
              style={{ width: "100%" }}
            >
              <Grid item>
                {login ? (
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "Green",
                      fontSize: "30px",
                    }}
                  >
                    Create account
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "Green",
                      fontSize: "30px",
                    }}
                  >
                    Login
                  </Typography>
                )}
              </Grid>
              {login ? (
                <Grid item>
                  <TextField
                    hiddenLabel
                    placeholder="Name"
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{ disableUnderline: true }}
                  />
                  {errors.name && touched.name && <div>{errors.name}</div>}
                </Grid>
              ) : null}
              <Grid item>
                {" "}
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  variant="outlined"
                  name="phoneNo"
                  type="number"
                  placeholder="Phone No"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{ disableUnderline: true }}
                />
                {errors.phoneNo && touched.phoneNo && (
                  <div>{errors.phoneNo}</div>
                )}
              </Grid>
              <Grid item>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  variant="outlined"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{ disableUnderline: true }}
                />
                {errors.password && touched.password && (
                  <div>{errors.password}</div>
                )}
              </Grid>
              {userDoesNotExists ? (
                <Typography style={{ color: "red", marginTop: 10 }}>
                  Incorrect Details
                </Typography>
              ) : null}
              {login ? (
                <Grid item>
                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{ disableUnderline: true }}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div>{errors.confirmPassword}</div>
                  )}
                </Grid>
              ) : null}
              {userAlreadyExists ? (
                <Typography style={{ color: "red", marginTop: 10 }}>
                  User already exists
                </Typography>
              ) : null}
              <Grid item style={{ width: "100%" }}>
                <Button
                  onClick={handleSubmit}
                  style={{
                    borderRadius: 20,
                    backgroundColor: "green",
                    color: "#fff",
                    width: "50%",
                    display: "flex",
                    margin: "auto",
                  }}
                >
                  {login ? "Sign In" : "Login"}
                </Button>
              </Grid>
              {login ? (
                <div style={{ margin: "20px 0" }}>
                  <Typography>Already have an account</Typography>
                  <Link href="log-in">Login</Link>{" "}
                </div>
              ) : (
                <div style={{ margin: "20px 0" }}>
                  <Typography>Don't have an account</Typography>
                  <Link href="/">Create One</Link>{" "}
                </div>
              )}
            </Grid>
          )}
        </Formik>
      </Paper>
    </div>
  );
}

export default Login;
