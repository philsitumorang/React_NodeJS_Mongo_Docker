import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUser, selectCurrentUser, setCurrent } from '../../api/slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Form from '../Form/Form';
import Snackbar from '@mui/material/Snackbar';
import { CardIconStyle, CardStyle } from "./Style";
import { initialValues, validation } from "../../api/api";
import dayjs, { Dayjs } from 'dayjs';

export default function ProfileCreate() {
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState("");
  const [pickerData, setPickerData] = useState<Dayjs | null>(dayjs('2022-04-07'));
  const currentUser = useAppSelector(selectCurrentUser);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  const onHandle = (e: any) => {
    formik.handleChange(e);
  }

  useEffect(() => {
    dispatch(setCurrent({}));
  }, [dispatch])

  const formik = useFormik({
    initialValues,
    validationSchema: validation({
      email: yup
        .string()
        .email('Enter a valid email')
        .max(32)
        .required('Email is required'),
      name: yup
        .string()
        .max(32)
        .required('Name is required'),
    }),
    onSubmit: (value: any) => {
      value.salary = +value.salary.replace(/[\D]/g, '');
      value.dob = pickerData;
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
          onChangeDate={setPickerData}
          currentUser={currentUser}
          pickerData={pickerData}
        />
      <Card 
        onClick={handleOpen}
        sx={CardStyle}>
          <AddIcon sx={CardIconStyle} />
      </Card>
    </>
  );
}
