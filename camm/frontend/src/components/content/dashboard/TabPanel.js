import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dashboard from "./Dashboard";
import UserPanel from "./UserPanel";
import EquipementPanel from "./EquipementPanel";
import ToolsPanel from "./ToolsPanel";
import SupplierPanel from "./SupplierPanel";
import StockPanel from "./StockPanel";
import LocalisationPanel from "./LocalisationPanel";
import WorkOrderPanel from "./WorkOrderPanel";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ minWidth: "70%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "70vh",
        minWidth: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
        <Tab label="Equipements" {...a11yProps(2)} />
        <Tab label="Tools" {...a11yProps(3)} />
        <Tab label="Suppliers" {...a11yProps(4)} />
        <Tab label="Localisations" {...a11yProps(5)} />
        <Tab label="Stocks" {...a11yProps(6)} />
        <Tab label="Work Orders" {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserPanel />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EquipementPanel />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ToolsPanel />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SupplierPanel />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <LocalisationPanel />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <StockPanel />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <WorkOrderPanel />
      </TabPanel>
    </Box>
  );
}
