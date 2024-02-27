import {OverrideProps} from "@mui/types";
import FormLabel from "@mui/material/FormLabel";
import {FormControlTypeMap} from "@mui/material/FormControl/FormControl";
import * as React from "react";
import {useRef, useState} from "react";
import {Box} from "@mui/system";
import {Input, InputBase} from "@mui/material";
import {LabeledRadio} from "./LabeldRadio";


export function YesNoElse(
  {
    name,
    label,
    value,
    onChange,
    required,
    ...props
  }: YesNoElseProps,
) {
  const [primaryState, setPrimaryState] = useState("No");
  const [inputValue, setInputValue] = useState("");
  const input = useRef<HTMLInputElement>();
  const [yesFocus, setYesFocus] = useState(false);
  const [noFocus, setNoFocus] = useState(false);
  const [elseFocus, setElseFocus] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const primary = value == undefined ? primaryState : value;

  function setPrimary(value: string) {
    setPrimaryState(value);
    onChange && onChange(value);
  }

  return (
    <Box margin={"15px 0"} {...props}>
      <InputBase value={primary} name={name} sx={{display: "none"}} required={required}/>
      <FormLabel color={"secondary"} focused={yesFocus || noFocus || elseFocus || inputFocus}>{label}</FormLabel>
      <Box display={"flex"} sx={{padding: "0 5px", flex: "none", alignItems: "center"}}>

        <LabeledRadio
          onFocus={_ => setYesFocus(true)}
          onBlur={_ => setYesFocus(false)}
          checked={primary == "Yes"} onClick={_ => setPrimary("Yes")}
        >Yes</LabeledRadio>

        <LabeledRadio
          onFocus={_ => setNoFocus(true)}
          onBlur={_ => setNoFocus(false)}
          checked={primary == "No"} onClick={event => setPrimary("No")}
        >No</LabeledRadio>

        <LabeledRadio
          onFocus={_ => setElseFocus(true)}
          onBlur={_ => setElseFocus(false)}
          checked={primary != "Yes" && primary != "No"}
          onClick={_ => {
            input.current?.focus();
          }}
        >その他</LabeledRadio>

        <Input
          onBlur={_ => setInputFocus(false)}
          value={inputValue} sx={{
          height: "fit-content", margin: "0 10px", flex: 1,
          color: primary == "Yes" || primary == "No" ? "grey" : "black",
        }} margin={"none"}
          color={"secondary"} onFocus={_ => {
          setPrimary(inputValue);
          setInputFocus(true);
        }} onChange={event => {
          setInputValue(event.currentTarget.value);
          setPrimary(event.currentTarget.value);
        }} inputRef={input} placeholder={"その他"}
        />

      </Box>
    </Box>
  );
}

export interface YesNoElseProps extends OverrideProps<FormControlTypeMap<any, any>, any> {
  name: string;
  label: string;
  required?: boolean;
  value?: any;
  onChange?: (value: string) => void;
}
