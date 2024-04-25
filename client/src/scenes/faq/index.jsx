import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="DISPUTE MANAGEMENT" subtitle="Manage all disputes related to you" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Delay Claim due to Adverse Weather Conditions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            XYZ Construction filed this claim against the project owner, citing significant delays caused by adverse weather conditions beyond their control. The claimant argues that the continuous rainfall during the monsoon season resulted in prolonged work stoppages, hindering progress on the construction site. XYZ Construction asserts that these weather conditions violated Clause 8.4 of the FIDIC Red Book (1999 Edition), which addresses exceptional adverse climatic conditions as a basis for an extension of time.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Disruption Claim due to Design Changes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            ABC Builders submitted this claim against the project consultant, alleging disruptions to their construction activities due to frequent design changes. The claimant contends that the modifications in the project's design, initiated by the consultant, led to inefficiencies, increased costs, and delays in the construction schedule. ABC Builders asserts that these design changes breached Clause 13.3 of the FIDIC Yellow Book (2017 Edition), which addresses variations and adjustments to the contract.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Productivity Loss Claim due to Labor Shortage
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            DEF Contractors lodged this claim against the project owner, highlighting productivity losses resulting from a shortage of skilled labor on the construction site. The claimant argues that the inability to procure sufficient skilled workers within the specified timeframe significantly impacted their ability to meet project milestones and deliverables. DEF Contractors asserts that this labor shortage violated Clause 4.4 of the FIDIC Silver Book (2017 Edition), which addresses the contractor's obligations regarding labor, equipment, and materials.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Acceleration Claim due to Default by Subcontractor
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            LMN Builders initiated this claim against a subcontractor, alleging default in performance and seeking acceleration costs incurred as a result. The claimant contends that the subcontractor's failure to adhere to the agreed-upon schedule and quality standards necessitated additional resources and efforts to mitigate delays and complete the work on time. LMN Builders asserts that this subcontractor default violated Clause 16.2 of the FIDIC Gold Book (2008 Edition), which addresses the consequences of default by the subcontractor.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Cost Overrun Claim due to Material Price Escalation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            PQR Constructors filed this claim against the project owner, citing significant cost overruns attributable to material price escalation beyond their control. The claimant argues that unforeseen increases in the prices of essential construction materials, such as steel and concrete, substantially inflated project costs, exceeding the initial budget projections. PQR Constructors asserts that this material price escalation violated Clause 13.7 of the FIDIC Green Book (1999 Edition), which addresses fluctuations in the prices of materials, labor, and equipment.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
