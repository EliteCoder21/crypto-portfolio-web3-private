import React from "react";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import Stack from "@mui/material/Stack";
import { GoSettings } from "react-icons/go";
import { Paper, ButtonGroup, Button } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const checkedBtn = {
    backgroundColor: "#0DAACE",
    textTransform: "none",
    color:"white"
}

const uncheckedBtn = {
    backgroundColor: "#4D4A67",
    color:"white",
    border: "none",
    textTransform: "none",

}

const iconBtn = {
    color:"white",
}

const input = {
    backgroundColor: "#4D4A67",
    borderRadius: "10px",
}

const inputIcon = {
    color: "white",
    textTransform: "none"
}

const connectPaper = {
    backgroundColor: "#332E59", 
    color:"#fefefe",
    borderRadius: "10px"
}

function ConnectWallet() {
  return (
    <Paper
      elevation={3}
      style={connectPaper}
      sx={{ p: 2 }}
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <ButtonGroup size="small">
            <Button variant="contained" style={checkedBtn}>
              Swap
            </Button>
            <Button
              variant="outlined"
              style={uncheckedBtn}
              className="group-btn"
            >
              Limit
            </Button>
            <Button
              variant="outlined"
              style={uncheckedBtn}
              className="group-btn"
            >
              Liquidity
            </Button>
          </ButtonGroup>
          <Button style={{ backgroundColor: "#4D4A67" }}>
            <GoSettings fontSize="medium" style={iconBtn} />
          </Button>
        </Stack>

        <FormControl variant="standard">
          <InputLabel style={inputIcon}>From</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <ArrowDropDownIcon fontSize="small" style={iconBtn} />
              </InputAdornment>
            }
            disableUnderline={true}
            style={input}
            sx={{ px: 1, py: 0.5 }}
            placeholder="0.0"
          />
        </FormControl>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImportExportOutlinedIcon sx={{ color: "white" }} fontSize="large" />
        </Box>

        <FormControl variant="standard">
          <InputLabel style={inputIcon}>To</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <ArrowDropDownIcon fontSize="small" style={iconBtn} />
              </InputAdornment>
            }
            disableUnderline={true}
            style={input}
            sx={{ px: 1, py: 0.5 }}
            placeholder="0.0"
          />
        </FormControl>

        <Button style={checkedBtn} fullWidth>
          Connect to Wallet
        </Button>
      </Stack>
    </Paper>
  );
}

export default ConnectWallet;