import { Paper, Grid, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = (props) => {
  const location = useLocation();
  const userPhoneNo = "7016515465";

  const handleDelete = (p, q) => {
    console.log("----->delete function called");
  };

  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        style={{ padding: "0px 20px" }}
      >
        <Grid item>hello</Grid>
        <Grid item>
          <Button>View Profile</Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ padding: "0px 20px" }}>
        <Grid item xs={6}>
          <Paper>
            <Grid container direction="column">
              <Grid item>Books</Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>rinkupoonia162@gmail.com</Grid>
                  <Grid item>
                    {userPhoneNo === "7016515465" ? (
                      <Button
                        onClick={() => {
                          handleDelete();
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Grid container direction="column">
              <Grid item>Books</Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>rinkupoonia162@gmail.com</Grid>
                  <Grid item>
                    {userPhoneNo === "7016515465" ? (
                      <Button
                        onClick={() => {
                          handleDelete();
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
