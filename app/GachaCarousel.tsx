"use client";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {Carousel} from "./_unit/_carousel/Carousel";
import {useFetch} from "./_hook/useFetch";
import {apiClient} from "./_client/api";
import {ErrorMessage} from "./_unit/ErrorMessage";
import {Loading} from "./_unit/_loading/Loading";
import {GachaCarouselElement} from "./GachaCarouselElement";

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
          return <GachaCarouselElement gachaListRes={value}/>;
        }) || [<Loading fontSize={50} width={"100%"} height={"100%"}/>]}
      />
    </>
  );
}