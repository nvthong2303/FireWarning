import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';

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
        margin: '20px'
    },
    table: {
        height: 'calc(100% - 100px)',
        width: '100%',
        padding: 10,
        boxShadow: '-1px -2px 5px grey'
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
}));

export default function Config() {
    const classes = useStyles();
    const [buildingSelected, setBuildingSelected] = useState();
    const [openDialogAction, setOpenDialogAction] = useState(false);

    const listSensors = [
        {
            id: '01',
            name: 'MQ5-cảm biến khí gas, khí thân-2303',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '10',
            name: 'MQ5-cảm biến khí gas, khí thân-2704',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '11',
            name: 'MQ5-cảm biến khí gas, khí thân-1110',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '12',
            name: 'MQ5-cảm biến khí gas, khí thân-2000',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '02',
            name: 'MQ2-cảm biến khí gas',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '03',
            name: 'DHT11-cảm biến độ ẩm, nhiệt độ',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '04',
            name: 'MQ7-cảm biến khí CO',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '05',
            name: 'DS18B20-dây cảm biến nhiệt độ',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '06',
            name: 'LM393-cảm biến ánh sáng',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '07',
            name: 'MPU9255-cảm biến gia tốc góc',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '08',
            name: 'IR Infrared-cảm biến hồng ngoại',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
        {
            id: '09',
            name: 'MQ8-cảm biến khói',
            createdAt: '2022-05-30T14:52:25.101+00:00',
            updatedAt: '2022-05-30T14:52:56.811+00:00'
        },
    ]

    const rows = [
        {
            name: 'B1',
            description: 'Trụ sở chính của đại học Công Nghệ Thông Tin, trường đại học Bách Khoa Hà Nội',
            thresholdGas: 900,
            thresholdCO: 900,
            thresholdHumidity: 900,
            sensors: ['01', '02', '03', '04']
        },
        {
            name: 'B2',
            description: 'Trụ sở chính của đại học Cơ Khí, trường đại học Bách Khoa Hà Nội',
            thresholdGas: 780,
            thresholdCO: 780,
            thresholdHumidity: 780,
            sensors: ['01', '02']
        },
        {
            name: 'B3',
            description: 'Trụ sở chính của đại học Điện Tử Viễn Thông, trường đại học Bách Khoa Hà Nội',
            thresholdGas: 789,
            thresholdCO: 789,
            thresholdHumidity: 789,
            sensors: ['01', '04']
        },
        {
            name: 'B4',
            description: 'Trụ sở chính của đại học Kinh Tế Quản Lý , trường đại học Bách Khoa Hà Nội',
            thresholdGas: 900,
            thresholdCO: 900,
            thresholdHumidity: 900,
            sensors: ['01', '03']
        },
        {
            name: 'B5',
            description: 'Trụ sở chính của đại học Điện - Tự Động Hóa, trường đại học Bách Khoa Hà Nội',
            thresholdGas: 900,
            thresholdCO: 900,
            thresholdHumidity: 900,
            sensors: ['01', '02', '04']
        }
    ];

    const handleOpenDialogAction = () => {
        console.log('open')
        setOpenDialogAction(true);
    }

    const handleCloseDialogAction = () => {
        setOpenDialogAction(false);
    }

    return (
        <div className={classes.container}>
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
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell width='5%' align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell width="15%" align="left">{row.name}</TableCell>
                                    <TableCell width="24%" align="left">{row.description}</TableCell>
                                    <TableCell width="17%" align="center">{row.thresholdGas}</TableCell>
                                    <TableCell width="17%" align="center">{row.thresholdCO}</TableCell>
                                    <TableCell width="17%" align="center">{row.thresholdHumidity}</TableCell>
                                    <TableCell
                                        align="center"
                                        width="10%"
                                        className={classes.cellStickyRight}
                                    >
                                        <IconButton
                                            aria-label="config"
                                            onClick={() => {
                                                console.log('aaaaa')
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

                <Dialog
                    open={openDialogAction}
                    onClose={handleCloseDialogAction}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Cấu hình cho tòa nhà ${buildingSelected?.name}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Cấu hình ngưỡng cảnh báo cho tòa nhà. Khi các chỉ số đo được từ các cảm biến
                            chạm ngưỡng đã được cấu hình thì sẽ có cảnh báo.
                            <br />
                            Hãy chắc chắn chỉ số của bạn là chính xác và hợp lý.
                        </DialogContentText>
                        <div className={classes.root} >
                            <Typography
                                variant='caption text'
                                style={{ marginTop: '25px' }}
                            >
                                Ngưỡng cảnh báo khí Gas :
                            </Typography>
                            <TextField
                                id="standard-basic"
                                label="ThresHold Gas"
                                type='number'
                                defaultValue={buildingSelected?.thresholdGas}
                            />
                        </div>
                        <div className={classes.root} >
                            <Typography
                                variant='caption text'
                                style={{ marginTop: '25px' }}
                            >
                                Ngưỡng cảnh báo khí CO :
                            </Typography>
                            <TextField
                                id="standard-basic"
                                label="ThresHold CO"
                                type='number'
                                defaultValue={buildingSelected?.thresholdCO}
                            />
                        </div>
                        <div className={classes.root} >
                            <Typography
                                variant='caption text'
                                style={{ marginTop: '25px' }}
                            >
                                Ngưỡng cảnh báo khí độ ẩm :
                            </Typography>
                            <TextField
                                id="standard-basic"
                                label="ThresHold Humidity"
                                type='number'
                                defaultValue={buildingSelected?.thresholdHumidity}
                            />
                        </div>
                        <Divider />
                        <DialogContentText>
                            Danh sách cảm biến của tòa nhà:
                        </DialogContentText>
                        <List>
                            {listSensors.map(sensor => {
                                if (buildingSelected?.sensors?.includes(sensor.id)) {
                                    return (
                                        <ListItem>
                                            <ListItemText>
                                                {sensor?.name}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton>
                                                    <i className="fas fa-trash"></i>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }
                            })}
                        </List>
                        <Divider />
                        <DialogContentText>
                            Thêm cảm biến cho tòa nhà:
                        </DialogContentText>
                        <List>
                            {listSensors.map(sensor => {
                                if (!buildingSelected?.sensors?.includes(sensor.id)) {
                                    return (
                                        <ListItem>
                                            <ListItemText>
                                                {sensor?.name}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconButton>
                                                <i className="fas fa-plus"></i>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                }
                            })}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseDialogAction}
                            variant="contained"
                            color="secondary"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleCloseDialogAction}
                            color="primary"
                            variant="contained"
                            autoFocus
                        >
                            Lưu
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
