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
  blockchainAddress: yup.string().required("required"),
  documentType: yup.string().required("required"),
  message: yup.string().required("required"),
});

const initialValues = {
  stakeholder: "",
  blockchainAddress: "",
  documentType: "",
  message: "",
};

const Form = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      console.log("values to submit:", values)
      const response = await axios.post("http://localhost:4000/api/submitForm", values);
      console.log("submitted form data:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="DOCUMENTS MANAGER" subtitle="Send documents to other stakeholders!" />

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
                <InputLabel id="demo-simple-select-label">Stakeholder</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue=""
                  value={values.stakeholder}
                  label="Stakeholder"
                  name="stakeholder"
                  onChange={handleChange}
                >
                  <MenuItem value={"client"}>Client</MenuItem>
                  <MenuItem value={"engineer"}>Engineer</MenuItem>
                  <MenuItem value={"contractor"}>Contractor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Blockchain Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.blockchainAddress}
                name="blockchainAddress"
                error={!!touched.blockchainAddress && !!errors.blockchainAddress}
                helperText={touched.blockchainAddress && errors.blockchainAddress}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel id="document-type-select">Document Type</InputLabel>
                <Select
                  labelId="document-type-select"
                  id="document-type"
                  value={values.document}
                  label="Document"
                  defaultValue=""
                  name="documentType"
                  onChange={handleChange}
                >
                  <MenuItem value={"rfi"}>RFI</MenuItem>
                  <MenuItem value={"ipc"}>IPC</MenuItem>
                  <MenuItem value={"drawing"}>Drawing</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Message"
                name="message"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                error={!!touched.message && !!errors.message}
                helperText={touched.message && errors.message}
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
                Send Document
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
