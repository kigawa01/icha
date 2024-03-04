"use client";
import {Box} from "@mui/system";
import {Link, Typography} from "@mui/material";
import {LabeledText} from "../_unit/_labeled/LabeledText";
import {LabeledItem} from "../_unit/_labeled/LabeledItem";
import {useResponsive} from "../_hook/useMedia";

export function Footer(
  {}: {},
) {
  const responsive = useResponsive({
    def: {multiline: false},
    smartphone: {multiline: true},
  });

  return <Box
    component={"footer"}
    position={"absolute"}
    bgcolor={"primary.dark"}
    bottom={0}
    width={"100%"}
    sx={{
      "&>div": {
        margin: "0 auto",
      },
    }}
    padding={"20px"}
    boxShadow={3}
    boxSizing={"border-box"}
  >
    <Box
      maxWidth={"450px"}
      padding={"10px"}
    >
      <Typography variant={"h2"}>Icha</Typography>
      <LabeledText multiline={responsive.multiline} flexDirection={"row"} label={"contact"} text={"contact@kigawa.net"}
                   marginTop={"5px"}/>
      <LabeledItem multiline={responsive.multiline} flexDirection={"row"} label={"source"} marginTop={"5px"}>
        <Link color={"text.primary"} href={"https://github.com/kigawa01/icha"} target={"_blank"}>
          https://github.com/kigawa01/icha
        </Link>
      </LabeledItem>
    </Box>

    <Box
      borderTop={"2px solid"}
      borderColor={"grey"}
      maxWidth={"520px"}
      textAlign={"center"}
      padding={"10px"}
    >
      copyright &copy; 2024 kigawa. All right reserved.
    </Box>

  </Box>;
}