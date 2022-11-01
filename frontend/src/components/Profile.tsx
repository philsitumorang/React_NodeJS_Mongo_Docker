import {
  Card,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { IUser } from '../api/slice';

type THandleOpen = (user: IUser) => void;

function currencyFormat(num: number) {
  return '£' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default function Profile(props: {
  key: string,
  user: IUser, 
  handleOpen: THandleOpen}) {

  const open = () => props.handleOpen(props.user)

  const cardStyle = {
      color: "#333",
      fontSize: 17,
      marginRight: 1
  }
  return (
    <Card sx={
      {
        maxWidth: 345, 
        flexBasis: 260,
        margin: {
          xs: "0 auto"
        }
      }
    }>
      <Box onClick={open} sx={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ececec",
        cursor: "pointer"
      }}>
        <PersonIcon sx={{
          width: 150,
          height: 150,
          opacity: 0.2
        }} />
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
        <Button size="small" onClick={open}><PersonIcon sx={cardStyle} /> Learn More</Button>
      </CardActions>
    </Card>
  );
}
