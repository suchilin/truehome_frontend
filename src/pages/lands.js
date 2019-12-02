import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLandsFromAPI, deleteLandOnAPI} from '../actions/lands';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  title: {
    flex: '1 1 100%',
  },
});

const ListOfLands = props => {
  const [open, setOpen] = useState(false);
  const [landId, setLandId] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const landsStore = useSelector(state => state.lands);
  useEffect(() => {
    dispatch(getLandsFromAPI());
  }, []);
  console.log('LANDSTORE', landsStore);
  if (landsStore.lands.length === 0) {
    return <div />;
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Esta seguro de borrar este terreno?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Asegurese de que sea lo que realmente quiera ya que se borrara
            permanentemente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteLandOnAPI(landId)).then(() => {
                setOpen(false);
              });
            }}
            color="secondary"
            autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={6}>
          <Paper className={classes.root}>
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle">
                Terrenos
              </Typography>

              <Tooltip title="Delete">
                <Fab
                  color="secondary"
                  size="small"
                  aria-label="add"
                  onClick={() => {
                    props.history.push('/nuevoterreno');
                  }}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Toolbar>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Metros cuadrados</TableCell>
                <TableCell>Email del propietario</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {landsStore.lands.map((land, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {land.name}
                  </TableCell>
                  <TableCell>{land.address}</TableCell>
                  <TableCell>{land.squaremeters}</TableCell>
                  <TableCell>{land.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => {
                        props.history.push('/editarterreno/' + land.id);
                      }}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => {
                        setLandId(land.id);
                        setOpen(true);
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Paper>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
};

export default ListOfLands;
