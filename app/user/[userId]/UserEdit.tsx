import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {UserProfileForm} from "../UserProfileForm";
import {UserPutBody, UserRes} from "../../../api_clients";
import {useState} from "react";
import {useClientState} from "../../_manager/AuthApiProvider";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {redirectLogin} from "../../_unit/RedirectLogin";
import {Typography} from "@mui/material";

export function UserEdit(
  {
    user,
    ...props
  }: UserEditProps,
) {
  const [err, setErr] = useState<string>();
  const [res, setRes] = useState<string>();
  const clientState = useClientState();
  const client = clientState?.client;
  if (clientState != undefined && client == undefined) redirectLogin();


  return (
    <>
      <ErrorMessage error={err}/>
      <UserProfileForm
        loading={false} postButtonLabel={"保存"} user={user} {...props} onFocus={() => setRes(undefined)}
        action={async (email, username, password, selfProduce) => {
          const body: UserPutBody = {
            email, name: username, password: password ? null : password, selfProduce,
          };
          await client?.editUser(body)
            .then(value => {
              if (value.error) {
                setErr(value.error.message);
                return;
              } else setErr(undefined);
              setRes("保存しました！");
            });
        }}
      />
      <Typography>{res}</Typography>
    </>
  );
}

export interface UserEditProps extends OverrideProps<BoxTypeMap, any> {
  user: UserRes | undefined;
}
