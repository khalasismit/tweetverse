import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { setUsers } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Navigation from "../Navigation";
import SidebarMini from "../Sidebar";
// handling validation 

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Enter Your First Name"),
    lastName: yup.string().required("Enter Your Last Name"),
    email: yup.string().email("invalid email").required("Enter Your Email"),
    password: yup.string().min(5).required("Enter Password"),
    location: yup.string().required("required"),
    bio: yup.string().max(60).required("Tell us about yourself."),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Confirm Password is Incorrect").required("Confirm Password is Required")
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    bio: "",
    confirmPassword: ""
};

const Form = ({ plateformName }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isRegister ="register";
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [snackbar, setSnackbar] = useState(false);
    const register = async (values, onSubmitProps) => {
        let savedUserRes = await fetch("http://localhost:3001/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        )
        let savedUser = await savedUserRes.json();
        onSubmitProps.resetForm();
        if (savedUser !== "Error") {
            setSnackbar(true)
            setTimeout(() => {
                setSnackbar(false)
            }, 1500);
            dispatch(
                setUsers({
                    users: savedUser
                })
            )
        }
        else {
            setError("User already exist with this email.");
            // Clear the error after 3 sec
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isRegister) { await register(values, onSubmitProps) };
    };

    return <>
        <Navigation plateformName={plateformName}></Navigation>
        <Box sx={{ display: "flex",alignItems:"start" }}>
            <SidebarMini></SidebarMini>
            <Box sx={{width:isNonMobile?"90%":"80%"}}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesRegister}
                    validationSchema={registerSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <form autoComplete="on" onSubmit={handleSubmit} onChange={handleChange}>
                            <Snackbar
                                open={snackbar}
                                varient="filled"
                                autoHideDuration={3000}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            ><Alert variant="filled" severity="success">{"REGISTRATION COMPLETE"}</Alert></Snackbar>
                            <center>
                                <Box
                                    width="80%"
                                    p="1rem"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    borderRadius="1rem"
                                >
                                    <Typography textAlign="center" marginBottom="1rem" fontFamily="monospace" fontSize="1.7rem" fontWeight="bold">
                                        {"Add User"}
                                    </Typography>
                                    <Divider sx={{ margin: "0rem 0rem 1.2rem 0rem" }} />
                                    <Box
                                        display="grid"
                                        gap="15px"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                        }}
                                    >
                                        {isRegister && (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    label="First Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.firstName}
                                                    name="firstName"
                                                    error={
                                                        Boolean(touched.firstName) && Boolean(errors.firstName)
                                                    }
                                                    helperText={touched.firstName && errors.firstName}
                                                    sx={{ gridColumn: "span 2" }}
                                                />
                                                <TextField
                                                    label="Last Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.lastName}
                                                    name="lastName"
                                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                    helperText={touched.lastName && errors.lastName}
                                                    sx={{ gridColumn: "span 2" }}
                                                />
                                                <TextField
                                                    label="Location"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.location}
                                                    name="location"
                                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                                    helperText={touched.location && errors.location}
                                                    sx={{ gridColumn: "span 4" }}
                                                />
                                                <TextField
                                                    label="Bio"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bio}
                                                    name="bio"
                                                    multiline
                                                    error={
                                                        Boolean(touched.bio) && Boolean(errors.bio)
                                                    }
                                                    helperText={touched.bio && errors.bio}
                                                    sx={{ gridColumn: "span 4" }}
                                                />
                                            </>
                                        )}

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            name="email"
                                            error={Boolean(touched.email) && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={Boolean(touched.password) && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        {isRegister && (
                                            <TextField
                                                fullWidth
                                                label="Confirm Password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.confirmPassword}
                                                name="confirmPassword"
                                                error={
                                                    Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)
                                                }
                                                helperText={touched.confirmPassword && errors.confirmPassword}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        )}
                                    </Box>
                                    <Typography color="red" p="1rem 0 0 0">{error}</Typography>
                                    {/* BUTTONS */}
                                    <Box display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center">
                                        <Button
                                            type="submit"
                                            sx={{
                                                // border: "1px solid black",
                                                borderRadius: "1rem",
                                                m: "1.5rem 0rem",
                                                p: "1rem 20%",
                                                backgroundColor: "lightgray",
                                                color: "black",
                                                "&:hover": { color: "black" },
                                            }}
                                        >
                                            <Typography fontFamily="monospace">
                                                REGISTER
                                            </Typography>
                                        </Button>
                                    </Box>
                                </Box>
                            </center>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    </>
};

export default Form;