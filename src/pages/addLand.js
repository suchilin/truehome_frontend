import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addLandOnAPI, updateLandOnAPI} from '../actions/lands';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AddLand = props => {
  const classes = useStyles();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [sm, setSM] = useState();
  const [email, setEmail] = useState();
  const [updating, setUpdating] = useState();
  const dispatch = useDispatch();
  const landsStore = useSelector(state => state.lands);
  const {id} = props.match.params;
  console.log('LANDS STORE', landsStore);
  useEffect(() => {
    if (id) {
      setUpdating(true);
      let landToUpdate = landsStore.lands.find(land => land.id == id);
      if (landToUpdate) {
        setName(landToUpdate.name);
        setAddress(landToUpdate.address);
        setSM(landToUpdate.squaremeters);
        setEmail(landToUpdate.email);
      }
    }
  }, []);
  return (
    <>
      <form
        onSubmit={async e => {
          e.preventDefault();
          let newLand = {
            name,
            address,
            squaremeters: sm,
            email,
          };
          if (updating) {
            dispatch(updateLandOnAPI({...newLand, id}))
              .then(() => {
                props.history.push('/terrenos');
              })
              .catch(error => {
                console.log('ERROR AL GUARDAR', error);
              });
          } else {
            dispatch(addLandOnAPI(newLand))
              .then(() => {
                props.history.push('/terrenos');
              })
              .catch(error => {
                console.log('ERROR AL GUARDAR', error);
              });
          }
        }}>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <center>
              <h1>Agregar un nuevo terreno: </h1>
            </center>
            <div>
              <TextField
                error={landsStore && landsStore.error && landsStore.error.name}
                label="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                margin="normal"
                variant="outlined"
                helperText={
                  landsStore &&
                  landsStore.error &&
                  landsStore.error.name &&
                  landsStore.error.name[0]
                }
                fullWidth
              />
            </div>
            <br />
            <TextField
              error={landsStore && landsStore.error && landsStore.error.address}
              label="Direccion"
              value={address}
              onChange={e => setAddress(e.target.value)}
              margin="normal"
              variant="outlined"
              helperText={
                landsStore &&
                landsStore.error &&
                landsStore.error.address &&
                landsStore.error.address[0]
              }
              fullWidth
            />
            <br />
            <TextField
              error={
                landsStore && landsStore.error && landsStore.error.squaremeters
              }
              type="number"
              label="Metros cuadrados"
              value={sm}
              onChange={e => setSM(e.target.value)}
              margin="normal"
              variant="outlined"
              helperText={
                landsStore &&
                landsStore.error &&
                landsStore.error.squaremeters &&
                landsStore.error.squaremeters[0]
              }
              fullWidth
            />
            <br />
            <TextField
              error={landsStore && landsStore.error && landsStore.error.email}
              type="email"
              label="Email del propietario"
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              helperText={
                landsStore &&
                landsStore.error &&
                landsStore.error.email &&
                landsStore.error.email[0]
              }
              fullWidth
            />
            <br />
            <Grid container>
              <Grid item xs={6}>
                <center>
                  <Button
                    type={'submit'}
                    onClick={() => {
                      props.history.push('/terrenos');
                    }}>
                    Cancelar
                  </Button>
                </center>
              </Grid>
              <Grid item xs={6}>
                <center>
                  <Button type={'submit'} variant="contained" color="primary">
                    Guardar
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddLand;
