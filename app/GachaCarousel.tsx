"use client";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Carousel} from "./_unit/_carousel/Carousel";
import {useFetch} from "./_hook/useFetch";
import {apiClient} from "./_client/api";
import {ErrorMessage} from "./_unit/ErrorMessage";
import {Img} from "./_unit/Img";
import {Link, Typography} from "@mui/material";
import {Loading} from "./_unit/_loading/Loading";

export interface GachaCarouselProps extends OverrideProps<BoxTypeMap, any> {
}

export function GachaCarousel(
  {
    ...props
  }: GachaCarouselProps,
) {
  const gachaList = useFetch(() => apiClient.getGachaList());

  return (
    <>
      <ErrorMessage error={gachaList?.error}/>
      <Carousel
        disabled={gachaList == undefined} period={8} {...props}
        nodes={gachaList?.result?.map(value => {
          return <Link
            href={`/gacha/${value.uid}`} position={"relative"} width={"100%"} height={"100%"} display={"block"}
            borderRadius={"5px"} overflow={"hidden"}
          >
            <Img
              margin={0} key={value.uid} width={"100%"} height={"100%"} src={value.thumbnail.base64}
              alt={value.thumbnail.name} position={"absolute"} left={0} top={0}
            />
            <Typography
              variant={"h3"} position={"absolute"} left={"16px"} top={"7px"} bgcolor={"#666a"}
              textOverflow={"ellipsis"}
              maxWidth={"50%"} overflow={"hidden"} padding={"0 10px 2px 10px"} borderRadius={"5px"}
            >
              {value.name}
            </Typography>
          </Link>;
        }) || [<Loading fontSize={50} width={"100%"} height={"100%"}/>]}
      />
    </>
  );
}