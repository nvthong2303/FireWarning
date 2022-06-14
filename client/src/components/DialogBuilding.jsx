import React from 'react';
import {
    makeStyles,
    TextField,
    Typography,
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
import { useFormik } from 'formik';
import {
    addSensorBuilding,
    deleteSensorBuilding, 
    updateThresholdBuilding
} from '../apis/building/building';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { requestGetListBuilding } from '../store/action/building.action';
import { requestGetListSensor } from '../store/action/sensor.action';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '20px'
    }
}));

export default function DialogBuilding(props) {
    const {
        buildingSelected,
        handleCloseDialog,
        openDialog,
        setReload
    } = props;
    const token = localStorage.getItem('x_access_token');
    const isAdmin = localStorage.getItem('x_iot_isAdmin');

    const classes = useStyles();
    const listSensors = useSelector(state => state.sensorReducer.sensors)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            warningThresholdGas: buildingSelected?.warningThresholdGas,
            warningThresholdCO: buildingSelected?.warningThresholdCO,
            warningThresholdHumidity: buildingSelected?.warningThresholdHumidity,
        },
        onSubmit: data => {
          handleUpdataThreshold(data);
        }
    });

    const handleAddSensor = async (sensor) => {
        if (isAdmin !== 'true') {
            enqueueSnackbar('bạn không có quyền', 
                { variant: 'error' }
            );
            return;
        }
        const response = await addSensorBuilding(
            buildingSelected, 
            sensor, 
            token
        );
        if (response.status === 200) {
            setReload();
            dispatch(requestGetListBuilding(token));
            dispatch(requestGetListSensor(token));
        } else {
            enqueueSnackbar('failed', 
                { variant: 'error' }
            );
        }
    }

    const handleDeleteSensor = async (sensor) => {
        if (isAdmin !== 'true') {
            enqueueSnackbar('bạn không có quyền', 
                { variant: 'error' }
            );
            return;
        }
        const response = await deleteSensorBuilding(
            buildingSelected, 
            sensor, 
            token
        );
        if (response.status === 200) {
            setReload();
            dispatch(requestGetListBuilding(token));
            dispatch(requestGetListSensor(token));
        } else {
            enqueueSnackbar('failed', { variant: 'error' });
        }
    }

    const handleUpdataThreshold = async (data) => {
        if (isAdmin !== 'true') {
            enqueueSnackbar('bạn không có quyền', 
                { variant: 'error' }
            );
            return;
        }
        const response = await updateThresholdBuilding(
            buildingSelected, 
            data, 
            token
        );
        if (response.status === 200) {
            setReload();
            handleCloseDialog();
        } else {
            enqueueSnackbar('failed', { variant: 'error' });
        }
    }

    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Cấu hình cho tòa nhà ${buildingSelected?.buildingName}`}
            </DialogTitle>
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
                        defaultValue={formik.values['warningThresholdGas']}
                        onChange={(event) => 
                            formik.setFieldValue(
                                'warningThresholdGas', 
                                event.target.value
                            )
                        }
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
                        defaultValue={formik.values['warningThresholdCO']}
                        onChange={(event) => 
                            formik.setFieldValue(
                                'warningThresholdCO', 
                                event.target.value
                            )
                        }
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
                        defaultValue={formik.values['warningThresholdHumidity']}
                        onChange={(event) => 
                            formik.setFieldValue(
                                'warningThresholdHumidity', 
                                event.target.value
                            )
                        }
                    />
                </div>
                <Divider />
                <DialogContentText>
                    Danh sách cảm biến của tòa nhà:
                </DialogContentText>
                <List>
                    {listSensors.map(sensor => {
                        if (
                            buildingSelected?.sensor?.includes(sensor._id)
                        ) {
                            return (
                                <ListItem>
                                    <ListItemText>
                                        {sensor?.name}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => {
                                            handleDeleteSensor(sensor);
                                        }}>
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
                        if (
                            !buildingSelected?.sensor?.includes(sensor._id) &&
                            sensor.used === false 
                        ) {
                            return (
                                <ListItem>
                                    <ListItemText>
                                        {sensor?.name}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => {
                                            handleAddSensor(sensor)
                                        }}>
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
                    onClick={handleCloseDialog}
                    variant="contained"
                    color="secondary"
                >
                    Hủy
                </Button>
                <Button
                    onClick={formik.submitForm}
                    color="primary"
                    variant="contained"
                    autoFocus
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    )
}
