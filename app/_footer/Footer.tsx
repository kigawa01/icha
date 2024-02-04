import {Box} from "@mui/system";
import {SxProps, Typography} from "@mui/material";
import {LabeledText} from "../_unit/_labeled/LabeledText";

export function Footer(
  {}: {},
) {
  return <Box
    component={"footer"}
    position={"absolute"}
    bgcolor={"primary.dark"}
    bottom={0}
    width={"100%"}
    sx={{
      div: {
        margin: "0 auto",
      },
    }}
    padding={"20px"}
    boxShadow={3}
    boxSizing={"border-box"}
  >
    <Box
      width={"400px"}
      padding={"10px"}
    >
      <Typography variant={"h2"}>Icha</Typography>
      <LabeledText label={"contact"} text={"contact@kigawa.net"} marginTop={"5px"}/>
    </Box>

    <Box
      borderTop={"2px solid"}
      borderColor={"grey"}
      width={"500px"}
      textAlign={"center"}
      padding={"10px"}
    >
      copyright &copy; 2024 kigawa. All right reserved.
    </Box>

  </Box>;
}