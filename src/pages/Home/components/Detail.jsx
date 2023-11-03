import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { getOneStaff } from "../../../core/services/staffApis";
import { convertDate } from "../../../helper/convertDate";

export const Detail = () => {
    const { staffId } = useParams();
    const [staffData, setStaffData] = React.useState(null);
    React.useEffect(() => {
        if (staffId) {
            getOneStaff(staffId)
                .then((res) => {
                    setStaffData(res);
                })
                .catch((err) => console.error(err));
        }
    }, [staffId])
    return (
        <Card
            style={{
                borderRadius: '20px'
            }}
        >
            <CardActionArea>
                <Avatar style={{
                    marginBottom: 30,
                    width: '240px',
                    height: '240px',
                    objectFit: 'cover',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }} alt={staffData?.name} src={staffData?.avatar} />
                <CardContent>
                    <Typography textAlign='center' gutterBottom variant="h4" component="div">
                        {staffData?.name}
                    </Typography>
                    <Typography textAlign='center' gutterBottom variant="h6" component="div">
                        {staffData?.age} years old
                    </Typography>
                    <Typography textAlign='center' variant="body2" color="text.secondary">
                        {staffData?.address}
                    </Typography>
                    <Typography textAlign='center' variant="body2" color="text.secondary">
                        {convertDate(staffData?.createdAt)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}