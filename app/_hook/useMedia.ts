import {useEffect, useState} from "react";

export function useMedia(query: string) {
  const [isMatch, setIsMatch] =
    useState(false);
  useEffect(() => {
    const media = matchMedia(query);

    function onChange(ev: MediaQueryListEvent) {
      setIsMatch(ev.matches);
    }

    media.onchange = onChange;
    setIsMatch(media.matches)
    return () => {media.onchange = () => {};};
  }, [query]);
  return isMatch;
}

export function useMediaObj<T>(query: string, sx: T) {
  const match = useMedia(query);
  return match ? sx : undefined;
}

export function useWidthMediaObj<T>(sx: T, min?: number | undefined, max?: number | undefined) {
  const minQuery = min != undefined ? `(min-width: ${min}px)` : undefined;
  const maxQuery = max != undefined ? `(max-width: ${max}px)` : undefined;
  let query = minQuery || "";
  if (maxQuery) {
    if (query) query += " and ";
    query += maxQuery || "";
  }
  return useMediaObj(query || "", sx);
}

export function useResponsive<T>(obj: { pc?: T, tablet?: T, smartphone?: T, def: T }): T {
  const pcSx = obj.pc == undefined ? obj.def : obj.pc;
  const tabletSx = obj.tablet == undefined ? pcSx : obj.tablet;
  const smartphoneSx = obj.smartphone == undefined ? tabletSx : obj.smartphone;
  const def = useWidthMediaObj(obj.def, 1000);
  const pc = useWidthMediaObj(pcSx, 769, 1000);
  const tablet = useWidthMediaObj(tabletSx, 601, 768);
  const smartphone = useWidthMediaObj(smartphoneSx, undefined, 600);
  return def || pc || tablet || smartphone || obj.def;
}