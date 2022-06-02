import React from 'react';
import {
    makeStyles,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { addNewBuilding } from '../apis/building/building';

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

export default function DialogAddBuilding(props) {
    const {
        openDialog,
        handleCloseDialog,
        setReload
    } = props;
    const classes = useStyles();
    const token = localStorage.getItem('x_access_token');
    const isAdmin = localStorage.getItem('x_iot_isAdmin');
    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            buildingName: '',
            description: '',
            warningThresholdGas: null,
            warningThresholdCO: null,
            warningThresholdHumidity: null
        },
        onSubmit: data => {
            handleAddBuilding(data);
        }
    });

    const handleAddBuilding = async (data) => {
        if (isAdmin !== 'true') {
            enqueueSnackbar('bạn không có quyền', { variant: 'error' });
            return;
        }
        const response = await addNewBuilding(data, token);
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
            <DialogTitle id="alert-dialog-title-add-building">
                Thêm mới tòa nhà
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Các tòa nhà phân biệt với nhau qua tên.
                    <br />
                    Hãy thêm mô tả để dễ dàng phân biệt các tòa nhà với nhau
                </DialogContentText>
                <div className={classes.root} >
                    <Typography
                        variant='caption text'
                        style={{ marginTop: '25px' }}
                    >
                        Tên tòa nhà :
                    </Typography>
                    <TextField
                        id="standard-basic"
                        label="Building Name"
                        defaultValue={formik.values['buildingName']}
                        onChange={(event) => formik.setFieldValue('buildingName', event.target.value)}
                    />
                </div>
                <div className={classes.root} >
                    <Typography
                        variant='caption text'
                        style={{ marginTop: '25px' }}
                    >
                        Mô tả tòa nhà :
                    </Typography>
                    <TextField
                        id="standard-basic"
                        label="Description"
                        defaultValue={formik.values['description']}
                        onChange={(event) => formik.setFieldValue('description', event.target.value)}
                    />
                </div>
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
                        onChange={(event) => formik.setFieldValue('warningThresholdGas', event.target.value)}
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
                        onChange={(event) => formik.setFieldValue('warningThresholdCO', event.target.value)}
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
                        onChange={(event) => formik.setFieldValue('warningThresholdHumidity', event.target.value)}
                    />
                </div>
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
