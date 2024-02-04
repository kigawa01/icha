"use client";

import {IconButton, InputAdornment, TextField, TextFieldProps} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export interface PasswordTextFieldProps {
}

export function PasswordTextField(
  {
    ...props
  }: PasswordTextFieldProps & TextFieldProps<any>,
) {
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShow(!show)}
              onMouseDown={event => event.preventDefault()}
              edge="end"
            >
              {show ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>,
      }}
    />
  );
}