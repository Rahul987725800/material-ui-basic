import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import PageHeader from '../../components/PageHeader';
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as CloseIcon,
  EditOutlined as EditOutlinedIcon,
} from '@material-ui/icons';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import useTable from '../../hooks/useTable';
import * as employeeService from '../../services/employeeService';
import Controls from '../../components/controls/Controls';
import { Search } from '@material-ui/icons';
import Popup from '../../components/Popup';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';
const useStyles = makeStyles(theme => {
  return {
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    searchInput: {
      width: '75%',
    },
    addButton: {
      position: 'absolute',
      right: '10px',
    },
  };
});
const headCells = [
  {
    id: 'fullName',
    label: 'Employee Name',
  },
  {
    id: 'email',
    label: 'Email Address (Personal)',
  },
  {
    id: 'mobile',
    label: 'Mobile Number',
  },
  {
    id: 'department',
    label: 'Department',
  },
  { id: 'actions', label: 'Actions', disableSorting: true },
];
export default function Employees() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items;
    },
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);
  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
    }

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      type: 'success',
      message: 'Submitted Successfully',
    });
  };

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={e => {
              let target = e.target;
              setFilterFn({
                fn: items => {
                  if (target.value === '') {
                    return items;
                  } else {
                    return items.filter(x =>
                      x.fullName.toLowerCase().includes(target.value)
                    );
                  }
                },
              });
            }}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.addButton}
            onClick={() => {
              setRecordForEdit(null);
              setOpenPopup(true);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead></TblHead>
          <TableBody>
            {recordsAfterPagingAndSorting().map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      setRecordForEdit(item);
                      setOpenPopup(true);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          employeeService.deleteEmployee(item.id);
                          setRecords(employeeService.getAllEmployees());
                          setNotify({
                            isOpen: true,
                            message: 'Deleted Successfully',
                            type: 'error',
                          });
                          setConfirmDialog({
                            ...confirmDialog,
                            isOpen: false,
                          });
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Employee Form"
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
