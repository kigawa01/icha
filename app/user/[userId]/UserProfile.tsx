import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {LabeledItem} from "../../_unit/_labeled/LabeledItem";
import {UserRes} from "../../../api_clients";

export function UserProfile(
  {
    user,
    ...props
  }: UserProfileProps,
) {


  return (
    <Box
      {...props}
    >
      <LabeledItem margin={"10px 0"} label={"ユーザー名"}>{user?.name || "ロード中..."}</LabeledItem>
      <LabeledItem margin={"10px 0"} label={"自己紹介"}>
        {user?.selfProduce === undefined ? "ロード中..." : user.selfProduce as string || "なし"}
      </LabeledItem>
    </Box>
  );
}

export interface UserProfileProps extends OverrideProps<BoxTypeMap, any> {
  user: UserRes | undefined;
}
