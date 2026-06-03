import {Navigate, useNavigate, useParams} from "react-router";
import {Main} from "../../_unit/Main";
import {Button, Typography} from "@mui/material";
import {redirectLogin, RequireLogin} from "../../_unit/RedirectLogin";
import {useClientState} from "../../_manager/AuthApiProvider";
import {useState} from "react";
import {PullGachaRes} from "../../../../api_clients";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {useFetch} from "../../_hook/useFetch";
import {Box} from "@mui/system";
import {LoadableImg} from "../../_unit/_loading/LoadableImg";
import {BigButton} from "../../_unit/BigButton";

export default function GachaRunPage() {
  const {gacha_id} = useParams<{gacha_id: string}>();
  const uid = parseInt(gacha_id || "NaN");
  if (isNaN(uid)) return <Navigate to="/notfound" replace/>;
  const navigate = useNavigate();
  const clientState = useClientState();
  const [result, setResult] = useState<PullGachaRes>();
  const [err, setErr] = useState<string>();

  const client = clientState?.client;
  if (clientState != undefined && client == undefined) return redirectLogin();
  const gacha = useFetch(
    client && (() => client.getGacha(uid)),
    [client, uid],
  );

  return (
    <Main>
      <RequireLogin/>
      <Typography variant={"h2"}>{gacha?.result?.name || "ロード中..."}</Typography>
      <ErrorMessage error={err}/>
      <LoadableImg
        loading={gacha == undefined} src={gacha?.result?.thumbnail.base64} alt={gacha?.result?.thumbnail.name}
        borderRadius={"5px"} boxShadow={1} padding={"3px"} width={"100%"} height={"500px"} fontSize={50}
        margin={"30px 0"}
      />
      <BigButton
        loading={client == undefined} margin={"50px 0"}
        onClick={_ => {
          client?.pullGacha(uid).then(value => {
            if (value.value) {
              setResult(value.value);
              const contentId = value.value.contentId;
              navigate(`/gacha/${uid}/content/${contentId}`);
              return;
            }
            if (value.error) {
              setErr(value.error.message);
              return;
            }
            setErr("undefined result");
          }).catch(reason => {
            if (reason instanceof Error && reason.message) {
              setErr(reason.message);
              return;
            }
            setErr(reason.toString());
          });
        }}
      >
        {client == undefined ? "ロード中" : "ガチャを引く"}
      </BigButton>
      <Box display={"flex"} justifyContent={"right"}>
        <Button
          sx={{color: "black", margin: "0 10px"}} variant={"outlined"}
          onClick={_ => navigate(`/gacha/${uid}`)}
        >
          ガチャトップへ戻る
        </Button>
      </Box>
    </Main>
  );
}
