import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Button} from "@mui/material";
import {StateObject} from "../util";
import {setTokensState} from "../_manager/TokenProvider";

export function UserMenu(
  {
    openState,
    ...props
  }: UserMenuProps,
) {
  if (!openState.value) return undefined;

  return (
    <Box
      {...props}
      position={"absolute"}
      top={"105%"}
      right={"10px"}
      bgcolor={"grey.100"}
      width={"100px"}
    >
      <Button
        sx={{
          color: "text.primary",
          textAlign: "center",
          width: "100%",
          "&:hover": {
            textDecoration: "underline"
          }
        }}
        onClick={_ => {
          setTokensState(undefined);
        }}
      >ログアウト</Button>
    </Box>
  );
}

export interface UserMenuProps extends OverrideProps<BoxTypeMap, any> {
  openState: StateObject<boolean>;
}
