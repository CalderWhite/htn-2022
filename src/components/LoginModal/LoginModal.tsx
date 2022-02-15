import React, { useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const LoginModal = (props) => {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="xs">
      <form
        onSubmit={(e) => {
          setEmailError("");
          setPasswordError("");
          e.preventDefault()

          if (email != "calderwhite1@gmail.com") {
            setEmailError("No user with this email exists!");
          } else if (password != "badpassword") {
            setPasswordError("Incorrect Password");
          } else {
            // successful login
            props.login();
            props.onClose();
          }
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
            error={emailError != ""}
            helperText={emailError}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
            error={passwordError != ""}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
