import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import MapIcon from '@mui/icons-material/Map';
import { Paper, Button, Menu, MenuItem, Chip } from '@mui/material';
import {
  DataTypeProvider,
  TreeDataState, SortingState, SelectionState, FilteringState, PagingState,
  CustomTreeData, IntegratedFiltering, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, TableTreeColumn,
  PagingPanel, TableColumnResizing, Toolbar, TableColumnVisibility, ColumnChooser,
} from '@devexpress/dx-react-grid-material-ui';
import { tasks, employees, priorities } from './demo-data/tree-data';

const EmployeeFormatter = ({ row }) => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <div
      style={{
        display: 'inline-block',
        background: 'white',
        borderRadius: '3px',
        width: '30px',
        height: '30px',
        margin: '-8px 8px -8px 0',
        textAlign: 'center',
      }}
    >
      <img
        src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${employees.find(e => e.ID === row.Assigned_Employee_ID).Picture}`}
        style={{
          height: '28px',
          margin: '0 auto',
        }}
        alt="Avatar"
      />
    </div>
    {employees.find(e => e.ID === row.Assigned_Employee_ID).Name}
  </div>
);

const StatusFormatter = ({ value }) => {
  if (value === 'Approval') {
    return (
      <b style={{
        color: '#0C121CDE',
        backgroundColor: '#FFEFCD',
        padding: '6px 25px',
        borderRadius: '5px',
      }}>
        {value}
      </b>
    );
  }
  else if (value === 'Completed') {
    return (
      <b style={{
        color: '#00848F',
        backgroundColor: '#00838F1F',
        padding: '6px 20px',
        borderRadius: '5px'
      }}>
        {value}
      </b>
    );
  }
  else if (value === 'Triage') {
    return (
      <b style={{
        color: 'black',
        backgroundColor: '#b8dbff',
        padding: '6px 35px',
        borderRadius: '5px',
        width: '50px',
      }}>
        {value}
      </b>
    );
  }
  else if (value === 'Schedule') {
    return (
      <b style={{
        color: 'black',
        backgroundColor: '#ffcc66',
        padding: '6px 25px',
        borderRadius: '5px'
      }}>
        {value}
      </b>
    );
  }
  else if (value === 'Planning') {
    return (
      <b style={{
        color: 'black',
        backgroundColor: '#cc99ff',
        padding: '6px 25px',
        borderRadius: '5px'
      }}>
        {value}
      </b>
    );
  }
  else {
    return (
      <b style={{ 
        color: 'black' ,
        backgroundColor: '#d1d1e0',
        padding: '6px 28px',
        borderRadius: '5px'
      }}>
        {value}
      </b>
    );
  }

}

const PriorityFormatter = ({ value }) => {
  if (value === 1) {
    return (
      <b>
        <Chip label={ value } style={{
          backgroundColor: '#ff9999',
          color: 'white',
        }}/>
  
      </b>
    );
  }
  else if (value === 2) {
    return (
      <b>
        <Chip label={ value } style={{
          backgroundColor: '#ffcc00',
          color: 'white',
        }}/>
  
      </b>
    );
  }
  else if (value === 3) {
    return (
      <b>
        <Chip label={ value } style={{
          backgroundColor: '#ff9900',
          color: 'white',
        }}/>
  
      </b>
    );
  }
  else if (value === 4) {
    return (
      <b>
        <Chip label={ value } style={{
          backgroundColor: '#ff0000',
          color: 'white',
        }}/>
  
      </b>
    );
  }
}

const NameFormatter = ({ row, value }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    {row.ID === 1 ?
      <div
      style={{
        float: "left",
        fontWeight: 700
      }}
      >
        {row.Parent_ID === 0 ?  
          <MapIcon style={{
            marginBottom: '-5px',
          }} /> : undefined
        }
          {value}
      </div> :
      <div
        style={{
          float: "left"
        }}
      >
        {row.Parent_ID === 1 ?  
          <LocationOnIcon style={{
            marginBottom: '-5px',
            color: ' #9c9cff',
          }} />
          :
          <GroupWorkIcon style={{
            marginBottom: '-5px',
            color: '#ffcc00',
          }} />
        }
          {value}
      </div>}
    {row.ID === 1 ? 
      undefined : 
      <div style={{ float: 'right' }}>
        <MoreVertMenu />
      </div>}
  </div>
)

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
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon style={{ color: '#333' }} />
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

const getChildRows = (row, rows) => {
  const childRows = rows.filter(r => r.Parent_ID === (row ? row.ID : 0));
  return childRows.length ? childRows : null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [columns] = useState([
    { name: 'Name', title: 'Name' },
    { name: 'Description', title: 'Description' },
    { name: 'Status', title: 'Status' },
    { name: 'Priority', title: 'Priority', getCellValue: row => priorities.find(p => p.ID === row.Priority).ID },
    { name: 'Assigned_Employee_ID', title: 'Assigned to', getCellValue: row => employees.find(e => e.ID === row.Assigned_Employee_ID).Name },
    { name: 'User_status', title: 'User status' },
    { name: 'Required_by', title: 'Required by', getCellValue: row => row.Required_by },
    { name: 'Planned_to', title: 'Planned to', getCellValue: row => row.Planned_to },
  ]);
  const [rows] = useState(tasks);
  const [pageSizes] = useState([5, 10, 20]);
  const [defaultColumnWidths] = useState([
    { columnName: 'Name', width: 500 },
    { columnName: 'Description', width: 500 },
    { columnName: 'Priority', width: 120 },
    { columnName: 'Status', width: 140 },
    { columnName: 'Assigned_Employee_ID', width: 180 },
    { columnName: 'User_status', width: 120 },
    { columnName: 'Required_by', width: 120 },
    { columnName: 'Planned_to', width: 120 },
  ]);
  // const [defaultHiddenColumnNames] = useState(['Completion']);
  // const [tableColumnExtensions] = useState([
  //   { columnName: 'Completion', align: 'right' },
  // ]);
  const [employeeColumns] = useState(['Assigned_Employee_ID']);
  const [statusColumns] = useState(['Status']);
  const [priorityColumns] = useState(['Priority']);
  const [nameColumns] = useState(['Name']);
  const [expandedRowIds, setExpandedRowIds] = useState([0, 1]);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <DataTypeProvider
          for={nameColumns}
          formatterComponent={NameFormatter}
        />
        {/* <DataTypeProvider
          for={employeeColumns}
          formatterComponent={EmployeeFormatter}
        /> */}
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
        {/* <FilteringState /> */}
        <SortingState />
        <SelectionState />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={pageSizes[1]}
        />

        <CustomTreeData
          getChildRows={getChildRows}
        />
        {/* <IntegratedFiltering /> */}
        <IntegratedSelection />
        <IntegratedSorting />
        <IntegratedPaging />

        <Table
          // columnExtensions={tableColumnExtensions}
        />
        <TableColumnVisibility
          // defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <TableColumnResizing
          defaultColumnWidths={defaultColumnWidths}
        />
        <TableHeaderRow
          showSortingControls
        />
        {/* <TableFilterRow /> */}
          <TableTreeColumn
            for="Name"
            // showSelectionControls
            // showSelectAll
          />

        <Toolbar />
        <ColumnChooser />

        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
    </Paper>
  );
};
