import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography
} from '@material-ui/core';
import DialogBuilding from './DialogBuilding';
import DialogAddBuilding from './DialogAddBuilding';
import { useSelector, useDispatch } from 'react-redux';
import { requestGetListBuilding } from '../store/action/building.action';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        marginTop: '80px',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '20px'
    },
    tableContainer: {
        margin: '20px',
        maxHeight: '550px'
    },
    table: {
        height: 'calc(100% - 100px)',
        width: '100%',
        padding: 10,
        boxShadow: '-1px -2px 5px grey',
        overflow: 'auto'
    },
    cellStickyRight: {
        position: 'sticky',
        right: 0,
        background: '#fff',
        boxShadow: '-1px 2px 5px grey',
        zIndex: 2,
        width: 120
    },
    cellStickyHeaderRight: {
        position: 'sticky',
        right: 0,
        background: '#fff',
        boxShadow: '-1px 0px 5px grey',
        width: 120
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '20px',
        marginLeft: '20px',
    }
}));

export default function Config() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [buildingSelected, setBuildingSelected] = useState();
    const [openDialogAction, setOpenDialogAction] = useState(false);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);

    const [reloadBuilding, setReloadBuilding] = useState(false);
    const listBuilding = useSelector(state => state.buildingReducer.buildings) ?? [];

    useEffect(() => {
        dispatch(requestGetListBuilding());
    }, [reloadBuilding])


    useEffect(() => {
        if (listBuilding?.length > 0) {
            setBuildingSelected(listBuilding?.find(a => a._id === buildingSelected?._id))
        }
    }, [JSON.stringify(listBuilding)]);

    const handleOpenDialogAction = () => {
        setOpenDialogAction(true);
    }

    const handleCloseDialogAction = () => {
        setOpenDialogAction(false);
    }

    const handleOpenDialogAdd = () => {
        setOpenDialogAdd(true);
    }

    const handleCloseDialogAdd = () => {
        console.log('aa')
        setOpenDialogAdd(false);
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography style={{ fontWeight: 700, fontSize: 20 }}>Quản lý Tòa nhà</Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<i className="fas fa-plus"></i>}
                    style={{ fontWeight: 500 }}
                    onClick={handleOpenDialogAdd}
                >
                    Thêm mới
                </Button>
            </div>
            <div className={classes.tableContainer}>
                <TableContainer className={classes.table} component={Paper}>
                    <Table
                        aria-label="simple table"
                        stickyHeader
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    width="5%"
                                    style={{ fontWeight: 700 }}
                                >
                                    STT
                                </TableCell>
                                <TableCell
                                    width="15%"
                                    style={{ fontWeight: 700 }}
                                    align="left"
                                >
                                    Tên tòa nhà
                                </TableCell>
                                <TableCell
                                    width="24%"
                                    style={{ fontWeight: 700 }}
                                    align="left"
                                >
                                    Mô tả
                                </TableCell>
                                <TableCell
                                    width="17%"
                                    style={{ fontWeight: 700 }}
                                    align="center"
                                >
                                    Ngưỡng khí Gas
                                </TableCell>
                                <TableCell
                                    width="17%"
                                    style={{ fontWeight: 700 }}
                                    align="center"
                                >
                                    Ngưỡng khí CO
                                </TableCell>
                                <TableCell
                                    width="17%"
                                    style={{ fontWeight: 700 }}
                                    align="center"
                                >
                                    Ngưỡng độ ẩm
                                </TableCell>
                                <TableCell
                                    width="10%"
                                    className={classes.cellStickyHeaderRight}
                                    style={{ fontWeight: 700 }}
                                    align="center"
                                >
                                    Quản lý
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listBuilding?.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell width='5%' align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell width="15%" align="left">{row.buildingName}</TableCell>
                                    <TableCell width="24%" align="left">{row.description}</TableCell>
                                    <TableCell width="17%" align="center">{row.warningThresholdGas}</TableCell>
                                    <TableCell width="17%" align="center">{row.warningThresholdCO}</TableCell>
                                    <TableCell width="17%" align="center">{row.warningThresholdHumidity}</TableCell>
                                    <TableCell
                                        align="center"
                                        width="10%"
                                        className={classes.cellStickyRight}
                                    >
                                        <IconButton
                                            aria-label="config"
                                            onClick={() => {
                                                setBuildingSelected(row);
                                                handleOpenDialogAction();
                                            }}
                                        >
                                            <i className="fas fa-cog"></i>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            {openDialogAction && (
                <DialogBuilding
                    buildingSelected={buildingSelected}
                    openDialog={openDialogAction}
                    handleCloseDialog={handleCloseDialogAction}
                    setReload={() => setReloadBuilding(!reloadBuilding)}
                />
            )}
            {openDialogAdd && (
                <DialogAddBuilding
                    openDialog={openDialogAdd}
                    handleCloseDialog={handleCloseDialogAdd}
                    setReload={() => setReloadBuilding(!reloadBuilding)}
                /> 
            )}
        </div>
    )
}
