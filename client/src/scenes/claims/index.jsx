import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const checkoutSchema = yup.object().shape({
  stakeholder: yup.string().required("required"),
  typeOfClaim: yup.string().required("required"),
  fidicClauses: yup.string().required("required"),
  details: yup.string().required("required"),
  claimTitle: yup.string().required("required"),
});

const initialValues = {
  stakeholder: "",
  typeOfClaim: "",
  fidicClauses: "",
  details: "",
  claimTitle: "",
};

const Claims = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      console.log("values to submit:", values)
      const response = await axios.post("http://localhost:4000/api/submitClaim", values);
      console.log("submitted form data:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CLAIMS MANAGER" subtitle="File a claim against other stakeholders!" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-label">Claim Against Stakeholder</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  value={values.stakeholder}
                  label="Stakeholder"
                  name="stakeholder"
                  onChange={handleChange}
                >
                  <MenuItem value={"Client"}>Client</MenuItem>
                  <MenuItem value={"Consultant"}>Consultant</MenuItem>
                  <MenuItem value={"Contractor"}>Contractor</MenuItem>
                  <MenuItem value={"Sub-Contractor"}>Sub-Contractor</MenuItem>
                  <MenuItem value={"Supplier"}>Supplier</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel id="claim-type-select">Type of Claim</InputLabel>
                <Select
                  labelId="claim-type-select"
                  id="claim-type"
                  value={values.typeOfClaim}
                  label="Type of Claim"
                  defaultValue=""
                  name="typeOfClaim"
                  onChange={handleChange}
                >
                  <MenuItem value={"Extension of Time"}>Extension of Time</MenuItem>
                  <MenuItem value={"Constructive Change"}>Constructive Change</MenuItem>
                  <MenuItem value={"Liquidated Damages"}>Liquidated Damages</MenuItem>
                  <MenuItem value={"Improper Notice"}>Improper Notice</MenuItem>
                  <MenuItem value={"Disruption"}>Disruption</MenuItem>
                  <MenuItem value={"Escalation Cost"}>Escalation Cost</MenuItem>
                  <MenuItem value={"Termination"}>Termination</MenuItem>
                  <MenuItem value={"Unforeseen Site Conditions"}>Unforeseen Site Conditions</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="FIDIC Clauses Violated"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fidicClauses}
                name="fidicClauses"
                error={!!touched.fidicClauses && !!errors.fidicClauses}
                helperText={touched.fidicClauses && errors.fidicClauses}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title of Claim Message"
                name="claimTitle"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.claimTitle}
                error={!!touched.claimTitle && !!errors.claimTitle}
                helperText={touched.claimTitle && errors.claimTitle}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details of Claim"
                name="details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.details}
                error={!!touched.details && !!errors.details}
                helperText={touched.details && errors.details}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                File Claim
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Claims;
