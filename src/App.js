import "./App.css";
import QRCode from "react-qr-code";
import qrcodelink from "qrcode";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Grid, TextField } from "@material-ui/core";

function App() {
  const [link, setLink] = useState("");
  const [codelink, setcodelink] = useState("");
  const [namePhoto, setNamephoto] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGerarlink = (link_url) => {
    qrcodelink.toDataURL(
      link_url,
      {
        width: 600,
        margin: 3,
      },
      function (err, url) {
        setcodelink(url);
      }
    );
  };

  const handleQRcode = (e) => {
    setLink(e.target.value);
    handleGerarlink(e.target.value);
  };

  const handleTextNamePhoto = (e) => {
    setNamephoto(e.target.value);
  };

  return (
    <div className="container">
      <QRCode value={link} />
      <Grid style={{ margin: "10px", width: "200px" }}>
        <TextField
          id="filled-helperText"
          label="Digite seu link"
          defaultValue="Default Value"
          value={link}
          onChange={(e) => handleQRcode(e)}
          variant="filled"
        />
      </Grid>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Baixar
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Coloque um nome para seu QRCode"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              style={{ width: "100%" }}
              id="filled-helperText"
              label="Nome da imagem"
              defaultValue="QRcode"
              value={namePhoto}
              onChange={(e) => handleTextNamePhoto(e)}
              variant="filled"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button isLoading={true} variant="contained" href={codelink} download={namePhoto} onClick={handleClose} color="primary" autoFocus>
            Baixar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
