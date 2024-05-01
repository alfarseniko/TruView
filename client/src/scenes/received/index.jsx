import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import { useEffect, useState } from "react";

const Received = () => {

  const [ledger, setLedger] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/receivedDocsByConsultant')
      .then((response) => {
        setLedger(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [{ field: "id", headerName: "ID" }, {
    field: "documentType",
    headerName: "Type of Document",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "ipfs",
    headerName: "IPFS Link",
    flex: 1,
  },
  {
    field: "timestamp",
    headerName: "Timestamp",
    flex: 1,
  },
  {
    field: "receivedBy",
    headerName: "Sent By",
    flex: 1,
    renderCell: ({ row: { sentBy } }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            sentBy === "Client"
              ? colors.greenAccent[600]
              : sentBy === "Consultant"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {sentBy === "Client" && <AdminPanelSettingsOutlinedIcon />}
          {sentBy === "Consultant" && <SecurityOutlinedIcon />}
          {sentBy === "Contractor" && <LockOpenOutlinedIcon />}
          {sentBy === "Sub-Contractor" && <SecurityOutlinedIcon />}
          {sentBy === "Supplier" && <AdminPanelSettingsOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {sentBy}
          </Typography>
        </Box>
      );
    },
  },
  ];

  return (
    <Box m="20px">
      <Header title="DOCUMENTS RECEIVED" subtitle="See all documents received by you" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={ledger} columns={columns} />
      </Box>
    </Box>
  );
};

export default Received;

/* line 103 is library 
    mockDataTeam is an object/array
    columns defined the keys used to display data */