import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {SxProps, TextField} from "@mui/material";
import {PasswordTextField} from "../unit/PasswordTextField";

export interface LoginFormProps extends OverrideProps<BoxTypeMap, any> {
}

export function LoginForm(
  {
    ...props
  }: LoginFormProps,
) {
  const child: SxProps = {
    width: "100%",
    margin: "10px 0"
  };

  return (
    <Box
      {...props}
      component={"form"}
      padding={"5px"}
    >
      <TextField
        sx={child}
        color={"secondary"}
        label={"ユーザー名"}
      />
      <PasswordTextField
        sx={child}
        color={"secondary"}
        label={"パスワード"}
      />
      <TextField
        sx={child}
        color={"secondary"}
        label={"Eメール"}
      />
    </Box>
  );
}