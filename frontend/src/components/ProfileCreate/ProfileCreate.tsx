import { useState } from "react";
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUser, IUser } from '../../api/slice';
import { useAppDispatch } from '../../hooks';
import Form from '../Form/Form';
import Snackbar from '@mui/material/Snackbar';
import { CardIconStyle, CardStyle } from "./Style";

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .max(32)
    .required('Email is required'),
  name: yup
    .string()
    .max(32)
    .required('Name is required'),
  role: yup
    .string()
    .max(32),
  department: yup
    .string()
    .max(32),
  salary: yup
    .string()
    .max(12)
});

export default function ProfileCreate() {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  const onHandle = (e: any) => {
    formik.handleChange(e);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      role: "",
      department: "",
      salary: "1"
    },
    validationSchema: validationSchema,
    onSubmit: (value: any) => {
      value.salary = +value.salary.replace(/[\D]/g, '');
      dispatch(createUser(value));
      handleClose();
      setOpenNotification("Saved successfully.");
      setTimeout(() => setOpenNotification(""), 3000);
    },
  });

  return (
    <>
      <Snackbar
        open={Boolean(openNotification)}
        onClose={handleClose}
        message={openNotification}
      />
        <Form
          open={open}
          close={handleClose}
          onHandle={onHandle}
          formik={formik}
          title={"New Employee"}
          buttonText={"Create"}
          currentUser={{...formik.initialValues}}
        />
      <Card 
        onClick={handleOpen}
        sx={CardStyle}>
          <AddIcon sx={CardIconStyle} />
      </Card>
    </>
  );
}
