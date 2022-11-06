import {
  Card,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { IUser } from '../../api/slice';
import { BoxCenterStyle, ButtonStyle, CardStyle, PersonIconStyle } from "./Style";

type THandleOpen = (user: IUser) => void;

function currencyFormat(num: number) {
  return '£' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default function Profile(props: {
  key: string,
  user: IUser, 
  handleOpen: THandleOpen}) {

  const open = () => props.handleOpen(props.user)

  return (
    <Card sx={CardStyle}>
      <Box onClick={open} sx={BoxCenterStyle}>
        <PersonIcon sx={PersonIconStyle} />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {props.user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <Box><Box component="span" sx={{ "fontWeight": "bold" }}>Role:</Box> {props.user.role}</Box>
            <Box><Box component="span" sx={{ "fontWeight": "bold" }}>Department:</Box> {props.user.department}</Box>
            <Box><Box component="span" sx={{ "fontWeight": "bold" }}>Salary:</Box> {currencyFormat(props.user.salary || 0)}</Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={open}><PersonIcon sx={ButtonStyle} /> Learn More</Button>
      </CardActions>
    </Card>
  );
}
