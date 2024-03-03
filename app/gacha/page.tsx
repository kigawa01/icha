"use client";
import {Main} from "../_unit/Main";
import {Section} from "../_unit/_section/Section";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {TextInput} from "../_unit/_form/TextInput";
import {useEffect, useState} from "react";
import {useClientState} from "../_manager/AuthApiProvider";
import {apiClient} from "../_client/api";
import {GachaListRes} from "../../api_clients";
import {Box} from "@mui/system";
import {Button} from "@mui/material";
import {Loadable} from "../_unit/_loading/Loadable";
import {useResponsive} from "../_hook/useMedia";
import {GachaListItem} from "./gachaListItem";
import {ErrorMessage} from "../_unit/ErrorMessage";

export default function Page(
  {}: {},
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const clientState = useClientState();
  const client = clientState?.client;
  const [gachaList, setGachaList] = useState<GachaListRes[]>();
  const searchValue = searchParams.get("search") || undefined;
  const [err, setErr] = useState<string>();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setGachaList(undefined);
    setPage(0);
  }, [searchParams]);
  useEffect(
    () => {
      if (clientState == undefined) return;
      setLoading(true);
      (client || apiClient).getGachaList("new", 16, page, false, searchValue)
        .then(value => {
          if (value.value) setGachaList([...gachaList || [], ...value.value]);
          if (value.error) setErr(value.error.message);
          setLoading(false);
        });
    },
    [clientState, page],
  );
  const responsive = useResponsive({
    def: {width: 100 / 4},
    pc: {width: 100 / 3},
    tablet: {width: 100 / 2},
    smartphone: {width: 100},
  });
  
  return <Main>
    <Section sectionTitle={"検索"} marginTop={0}>
      <Box component={"form"} action={async (data: FormData) => {
        const search = data.get("search") as string;
        const newParams = new URLSearchParams(Array.from(searchParams.entries()));
        newParams.set("search", search);
        router.replace(`${pathname}?${newParams.toString()}`);
      }} display={"flex"} alignItems={"center"}>
        <TextInput
          label={"検索"} name={"search"} defaultValue={searchValue}
        />
        <Button
          type={"submit"} sx={{margin: "0 20px", flex: "none", height: "fit-content"}} variant={"contained"}
        >
          検索
        </Button>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} margin={"20px 0 0 0"}>
        <ErrorMessage error={err} width={"100%"} flex={"none"}/>
        {gachaList?.map(value => <GachaListItem
          key={value.uid} gachaListRes={value} width={`${Math.floor(responsive.width * 10) / 10}%`}
        />)}
      </Box>
      {((page + 1) * 16 == gachaList?.length || loading) &&
        <Loadable loading={gachaList == undefined || loading} fontSize={30} margin={"80px auto 0 auto"}>
          <Button
            variant={"contained"} sx={{margin: "80px auto 0 auto", display: "block", fontSize: "1.5rem"}}
            onClick={_ => setPage(page + 1)}
          >
            もっと見る
          </Button>
        </Loadable>
      }
    </Section>
  </Main>;
}