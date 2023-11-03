import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const StaffCard = ({data}) => {
  const navigate = useNavigate();

  const handleViewDetail = (staffId) => {
    navigate(`/detail/${staffId}`);
  }

  return (
    <Card
      style={{
        borderRadius: 20
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={data?.avatar}
          alt={data?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.name} 
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {data?.age} years old
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Button variant='outlined' style={{
          padding: 10,
          borderRadius: 10,
          minWidth: 100
        }} onClick={() => handleViewDetail(data?.id)} size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}
