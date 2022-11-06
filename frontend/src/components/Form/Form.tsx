import { Typography, Box, Drawer, TextField, Button } from "@mui/material";
import { NumericFormat } from 'react-number-format';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LightFontWeight } from "../../Style";
import { Delete } from "./Style";

export default function Form(props: any) {
  return (
    <Drawer
      open={props.open}
      anchor="right"
      onClose={props.close}
    >
      <Box minWidth={"320px"} p={"10px"}>
        <form onSubmit={props.formik.handleSubmit}>
          <Box m={"20px"}>
            <Box mb={4} minWidth={300}>
              <Typography variant="h5" sx={LightFontWeight}>{props.title}</Typography>
            </Box>
            <Box mb={2} minWidth={300}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={props.formik.values.email || props.currentUser.email}
                onChange={props.onHandle}
                error={props.formik.touched.email && Boolean(props.formik.errors.email)}
                helperText={props.formik.touched.email && props.formik.errors.email}
              />
            </Box>
            <Box mb={2} minWidth={300}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={props.formik.values.name || props.currentUser.name}
                onChange={props.onHandle}
                error={props.formik.touched.name && Boolean(props.formik.errors.name)}
                helperText={props.formik.touched.name && props.formik.errors.name}
              />
            </Box>
            <Box mb={2} minWidth={300}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of birth"
                  value={props.formik.values.dob || props.currentUser.dob}
                  onChange={props.onChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box mb={2} minWidth={300}>
              <TextField
                fullWidth
                id="role"
                name="role"
                label="Role"
                value={props.formik.values.role || props.currentUser.role}
                onChange={props.onHandle}
                error={props.formik.touched.role && Boolean(props.formik.errors.role)}
                helperText={props.formik.touched.role && props.formik.errors.role}
              />
            </Box>
            <Box mb={2} minWidth={300}>
              <TextField
                fullWidth
                id="department"
                name="department"
                label="Department"
                value={props.formik.values.department || props.currentUser.department}
                onChange={props.onHandle}
                error={props.formik.touched.department && Boolean(props.formik.errors.department)}
                helperText={props.formik.touched.department && props.formik.errors.department}
              />
            </Box>
            <Box mb={2} minWidth={300}>
              <NumericFormat 
                thousandSeparator=","
                prefix="£"
                customInput={TextField}
                value={props.formik.values.salary > 1 ? props.formik.values.salary : props.currentUser.salary}
                onChange={props.onHandle}
                error={props.formik.touched.salary && Boolean(props.formik.errors.salary)}
                helperText={props.formik.touched.salary && props.formik.errors.salary}
                fullWidth
                id="salary"
                name="salary"
                label="Salary"
              />
            </Box>
            <Button color="primary" variant="contained" fullWidth type="submit">
              {props.buttonText}
            </Button>
            {props.currentUser ? (
              <Box mt={2}>
                <Typography onClick={props.onDelete} variant="subtitle2" sx={Delete}>Delete account?</Typography>
              </Box>
            ) : null}
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}