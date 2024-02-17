import {OverrideProps} from "@mui/types";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormControlTypeMap} from "@mui/material/FormControl/FormControl";


export function YesNoElse(
  {
    name,
    label,
    ...props
  }: YesNoElseProps,
) {


  return (
    <FormControl
      {...props} sx={{display: "block"}} color={"secondary"}
    >
      <FormLabel color={"secondary"}>{label}</FormLabel>
      <RadioGroup
        row name={name} color={"secondary"} defaultValue={"No"}
      >
        <FormControlLabel
          color={"secondary"} value="Yes" control={<Radio color={"secondary"}/>} label="Yes"
        />
        <FormControlLabel
          color={"secondary"} value="No"
          control={<Radio color={"secondary"}/>} label="No"
        />
        <FormControlLabel
          color={"secondary"} value="else" control={<Radio color={"secondary"}/>} label="その他"
        />
      </RadioGroup>
    </FormControl>
  );
}

export interface YesNoElseProps extends OverrideProps<FormControlTypeMap<any, any>, any> {
  name: string;
  label: string;
}
