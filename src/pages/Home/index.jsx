import React from "react";
import { getAllStaffs } from "../../core/services/staffApis";
import { StaffCard } from "./components/StaffCard";
import { Grid } from "@mui/material";
import { sortByAge } from "../../helper/sortByAge";

export const Home = () => {

    const [staffs, setStaffs] = React.useState([]);
    React.useEffect(() => {
        getAllStaffs()
            .then((res) => {
                setStaffs(sortByAge(res));
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    staffs.map((staff) => (
                        <Grid item xs={2} sm={4} md={4}>
                            <StaffCard data={staff}/>
                        </Grid>
                    ))
                }
            </Grid>

        </>
    );
}