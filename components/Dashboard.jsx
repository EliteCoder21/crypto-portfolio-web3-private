import React from "react";
import { dashboard } from "./styles2";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ConnectWallet from "./ConnectWallet";

function Dashboard() {
  return (
    <Stack style={dashboard} py={1}>
      <Grid container gap={1} py={3}>
        <Grid item xs={12} sm={12} md={3} px="auto">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            direction="column"
            alignContent="center"
          >
            <Grid item xs={12} sm={6.5} md={12}>
              <ConnectWallet />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Dashboard;