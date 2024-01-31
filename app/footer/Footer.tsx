import {Box} from "@mui/system";
import {AppBar, SxProps, Typography} from "@mui/material";

export function Footer(
  {}: {},
) {
  const labelStyle: SxProps = {
    width: "100px",
    display: "inline-block"
  };
  return <Box
    component={"footer"}
    position={"absolute"}
    bgcolor={"secondary.main"}
    bottom={0}
    width={"100%"}
    sx={{
      div: {
        margin: "0 auto"
      }
    }}
    padding={"20px"}
    boxShadow={3}
  >
    <Box
      width={"400px"}
      padding={"10px"}
    >
      <Typography variant={"h2"} >Icha</Typography>
      <Typography marginTop={"5px"}>
        <Typography sx={labelStyle} component={"span"}>contact</Typography>
        :
        <Typography marginLeft={"5px"} component={"span"}>contact@kigawa.net</Typography>
      </Typography>
    </Box>

    <Box
      borderTop={"2px solid"}
      borderColor={"grey.600"}
      width={"500px"}
      textAlign={"center"}
      padding={"10px"}
    >
      copyright &copy; 2024 kigawa. All right reserved.
    </Box>

  </Box>;
}