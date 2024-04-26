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
import * as React from 'react';

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
  claimtype: yup.string().required("required"),
  fidic: yup.string().required("required"),
  detail: yup.string().required("required"),
});
const initialValues = {
  stakeholder: "",
  claimtype: "",
  fidic: "",
  detail: "",
};

const Claims = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3001/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
        });

      if (response.ok) {
        // Handle successful response
        console.log('Data sent successfully');
        console.log("data: " + values);
      } else {
        // Handle error response
        console.error('Failed to send data');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CLAIMS MANAGEMENT" subtitle="File a claim against other stakeholders" />

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
                  <MenuItem value={"client"}>Client</MenuItem>
                  <MenuItem value={"engineer"}>Engineer</MenuItem>
                  <MenuItem value={"contractor"}>Contractor</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel id="document-type-select">Type Of Claim</InputLabel>
                <Select
                  labelId="document-type-select"
                  id="claimtype"
                  value={values.claimtype}
                  label="claimtype"
                  name="stakeholder"
                  onChange={handleChange}
                >
                  <MenuItem value={"rfi"}>Extension of Time</MenuItem>
                  <MenuItem value={"ipc"}>Constructive Change</MenuItem>
                  <MenuItem value={"drawing"}>Liquidated Damages</MenuItem>
                  <MenuItem value={"drawing"}>Improper Notice</MenuItem>
                  <MenuItem value={"drawing"}>Disruption</MenuItem>
                  <MenuItem value={"drawing"}>Escalation Cost</MenuItem>
                  <MenuItem value={"drawing"}>Termination</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="FIDIC Clauses in Effect"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fidic}
                name="fidic"
                error={!!touched.fidic && !!errors.fidic}
                helperText={touched.fidic && errors.fidic}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Details"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.detail}
                name="detail"
                error={!!touched.detail && !!errors.detail}
                helperText={touched.detail && errors.detail}
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
