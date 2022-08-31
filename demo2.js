import React, { useState, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import MapIcon from '@mui/icons-material/Map';
import { Paper, Button, Menu, MenuItem, Chip } from '@mui/material';
import {
  TreeDataState,
  CustomTreeData,
  DataTypeProvider,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from "@devexpress/dx-react-grid-material-ui";
import { employees, priorities } from "./demo-data/tree-data";

import { Loading } from "./theme-sources/material-ui/components/loading";

const StatusFormatter = ({ value }) => {
  if (value === "Approval") {
    return (
      <b
        style={{
          color: "#0C121CDE",
          backgroundColor: "#FFEFCD",
          padding: "6px 25px",
          borderRadius: "5px",
        }}
      >
        {value}
      </b>
    );
  } else if (value === "Completed") {
    return (
      <b
        style={{
          color: "#00848F",
          backgroundColor: "#00838F1F",
          padding: "6px 20px",
          borderRadius: "5px",
        }}
      >
        {value}
      </b>
    );
  } else if (value === "Triage") {
    return (
      <b
        style={{
          color: "black",
          backgroundColor: "#b8dbff",
          padding: "6px 35px",
          borderRadius: "5px",
          width: "50px",
        }}
      >
        {value}
      </b>
    );
  } else if (value === "Schedule") {
    return (
      <b
        style={{
          color: "black",
          backgroundColor: "#ffcc66",
          padding: "6px 25px",
          borderRadius: "5px",
        }}
      >
        {value}
      </b>
    );
  } else if (value === "Planning") {
    return (
      <b
        style={{
          color: "black",
          backgroundColor: "#cc99ff",
          padding: "6px 25px",
          borderRadius: "5px",
        }}
      >
        {value}
      </b>
    );
  } else {
    return (
      <b
        style={{
          color: "black",
          backgroundColor: "#d1d1e0",
          padding: "6px 28px",
          borderRadius: "5px",
        }}
      >
        {value}
      </b>
    );
  }
};

const PriorityFormatter = ({ value }) => {
  if (value === 1) {
    return (
      <b>
        <Chip
          label={value}
          style={{
            backgroundColor: "#ff9999",
            color: "white",
          }}
        />
      </b>
    );
  } else if (value === 2) {
    return (
      <b>
        <Chip
          label={value}
          style={{
            backgroundColor: "#ffcc00",
            color: "white",
          }}
        />
      </b>
    );
  } else if (value === 3) {
    return (
      <b>
        <Chip
          label={value}
          style={{
            backgroundColor: "#ff9900",
            color: "white",
          }}
        />
      </b>
    );
  } else if (value === 4) {
    return (
      <b>
        <Chip
          label={value}
          style={{
            backgroundColor: "#ff0000",
            color: "white",
          }}
        />
      </b>
    );
  }
};

const NameFormatter = ({ row, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {row.ID === "ASP ID 003659 - Power Delivery Transmi..." ? (
      <div
        style={{
          float: "left",
          fontWeight: 700,
        }}
      >
        {row.Name === "ASP ID 003659 - Power Delivery Transmi..." ? (
          <MapIcon
            style={{
              marginBottom: "-5px",
            }}
          />
        ) : undefined}
        {value}
      </div>
    ) : (
      <div
        style={{
          float: "left",
        }}
      >
        {row.Name === "ASP ID 003659 Power Delivery-TLINE" ? (
          <LocationOnIcon
            style={{
              marginBottom: "-5px",
              color: " #9c9cff",
            }}
          />
        ) : (
          <GroupWorkIcon
            style={{
              marginBottom: "-5px",
              color: "#ffcc00",
            }}
          />
        )}
        {value}
      </div>
    )}
    {row.ID === 1 ? undefined : (
      <div style={{ float: "right" }}>
        <MoreVertMenu />
      </div>
    )}
  </div>
);

const MoreVertMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: "#333" }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Action 1</MenuItem>
        <MenuItem onClick={handleClose}>Action 2</MenuItem>
        <MenuItem onClick={handleClose}>Action 3</MenuItem>
      </Menu>
    </div>
  );
};

// const URL = 'https://apitest.free.beeceptor.com/mocktestapi';
const URL = 'http://localhost:3333/myapi';
const ROOT_ID = "";

const getRowId = (row) => row.ID;
const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(
    (r) => r.Parent_ID === (row ? row.ID : ROOT_ID)
  );
  if (childRows.length) {
    return childRows;
  }
  return row && row.hasItems ? [] : null;
};

export default () => {
  const [columns] = useState([
    { name: "Name", title: "Name" },
    { name: "Description", title: "Description" },
    { name: "Status", title: "Status" },
    {
      name: "Priority",
      title: "Priority",
      getCellValue: (row) => priorities.find((p) => p.ID === row.Priority).ID,
    },
    {
      name: "Assigned_Employee_ID",
      title: "Assigned to",
      getCellValue: (row) =>
        employees.find((e) => e.ID === row.Assigned_Employee_ID).Name,
    },
    { name: "User_status", title: "User status" },
    {
      name: "Required_by",
      title: "Required by",
      getCellValue: (row) => row.Required_by,
    },
    {
      name: "Planned_to",
      title: "Planned to",
      getCellValue: (row) => row.Planned_to,
    },
  ]);
  const [data, setData] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: "Name", width: 500 },
    { columnName: "Description", width: 500 },
    { columnName: "Priority", width: 120 },
    { columnName: "Status", width: 140 },
    { columnName: "Assigned_Employee_ID", width: 180 },
    { columnName: "User_status", width: 120 },
    { columnName: "Required_by", width: 120 },
    { columnName: "Planned_to", width: 120 },
  ]);
  const [expandedRowIds, setExpandedRowIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds].filter(
      (rowId) => data.findIndex((row) => row.Parent_ID === rowId) === -1
    );
    if (rowIdsWithNotLoadedChilds.length) {
      if (loading) return;
      setLoading(true);
      Promise.all(
        rowIdsWithNotLoadedChilds.map((rowId) =>
          fetch(`${URL}?parentIds=${rowId}`, { mode: "cors" }).then(
            (response) => response.json()
          )
        )
      )
        .then((loadedData) => {
          setData(data.concat(...loadedData));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!loading) {
      loadData();
    }
  });

  const [statusColumns] = useState(['Status']);
  const [priorityColumns] = useState(['Priority']);
  const [nameColumns] = useState(['Name']);

  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={data} columns={columns} getRowId={getRowId}>
        <DataTypeProvider
          for={nameColumns}
          formatterComponent={NameFormatter}
        />
        <DataTypeProvider
          for={statusColumns}
          formatterComponent={StatusFormatter}
        />
        <DataTypeProvider
          for={priorityColumns}
          formatterComponent={PriorityFormatter}
        />

        <TreeDataState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="Name" />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};
