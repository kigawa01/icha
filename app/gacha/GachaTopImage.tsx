import {OverrideProps} from "@mui/types";
import {Image} from "@mui/icons-material";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";

export function GachaTopImage(
  {
    ...props
  }: GachaTopImageProps,
) {


  return (
    <Image
      {...props}
    >
    </Image>
  );
}

export interface GachaTopImageProps extends OverrideProps<SvgIconTypeMap, any> {

}
