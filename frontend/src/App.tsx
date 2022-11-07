import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { nanoid } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from 'dayjs';
import { Box, Container, Typography, Snackbar } from "@mui/material";
import Profile from './components/Profile/Profile';
import ProfileCreate from './components/ProfileCreate/ProfileCreate';
import Form from "./components/Form/Form";
import { deleteUser, fetchUsers, IUser, selectAllUsers, selectCurrentUser, setCurrent, updateUser } from './api/slice';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  LightFontWeight, ProfileWrapper
} from "./Style";
import { initialValues, validation } from "./api/api";

function App() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const [pickerData, setPickerData] = useState<Dayjs | null>(dayjs('2022-04-07'));
  const [openNotification, setOpenNotification] = useState("");
  const handleOpen = (user: IUser) => {
    dispatch(setCurrent(user));
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onHandle = (e: any) => {
    formik.handleChange(e);
    const _user: any = {...currentUser};
    _user[e.target.name] = e.target.value;
    dispatch(setCurrent(_user));
  }

  const onDelete = () => {
    const _user: any = {...currentUser};
    dispatch(deleteUser(_user))
    handleClose();
    setOpenNotification("Deleted successfully.");
    setTimeout(() => setOpenNotification(""), 3000);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validation(),
    onSubmit: (value: any) => {
      value._id = currentUser?._id;
      value.salary = +value.salary.replace(/\D/g, '');
      if (value.salary === 1) {
        value.salary = currentUser?.salary;
      }
      value.dob = pickerData;
      dispatch(updateUser(value));
      handleClose();
      setOpenNotification("Saved successfully.");
      setTimeout(() => setOpenNotification(""), 3000);
    },
  });

  return (
    <Container maxWidth="md">
      <Snackbar
        open={Boolean(openNotification)}
        onClose={handleClose}
        message={openNotification}
      />
      {currentUser ? (
        <Form
          open={open}
          close={handleClose}
          onHandle={onHandle}
          formik={formik}
          title={"Profile Editor"}
          buttonText={"Update"}
          onDelete={onDelete}
          onChangeDate={setPickerData}
          currentUser={currentUser}
          pickerData={pickerData}
        />
      ) : null}
      
      <Typography variant="h4" mt={4} mb={4} sx={LightFontWeight}>
        <Box 
          component="img"
          sx={{ height: 30, marginRight: 1 }}
          src={process.env.PUBLIC_URL + '/logo.png'}
        />
        / Employees
      </Typography>

      <Box sx={ProfileWrapper}>
        <>
          {users.value.map(user => <Profile key={user._id || nanoid()} user={user} handleOpen={handleOpen}/>)}
          <ProfileCreate  />
        </>
      </Box>

    </Container>
  );
}

export default App;
