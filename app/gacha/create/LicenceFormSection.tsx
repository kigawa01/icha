import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {YesNoElse} from "../../_unit/YesNoElseInput";
import {Section} from "../../_unit/_section/Section";
import {useState} from "react";
import {useUserState} from "../../_manager/UserProvider";
import {redirectLogin} from "../../_unit/RedirectLogin";
import {LoadableButton} from "../../_unit/_loading/LoadableButton";
import {Textarea} from "../../_unit/Textarea";

export function LicenceFormSection(
  {
    ...props
  }: LicenceFormSectionProps,
) {
  const [text, setText] = useState("");
  const [business, setBusiness] = useState("No");
  const [post, setPost] = useState("No");
  const [credit, setCredit] = useState("No");
  const [distribution, setDistribution] = useState("No");
  const [material, setMaterial] = useState("No");
  const userState = useUserState();
  const user = userState?.userRes;
  if (userState != undefined && user == undefined) redirectLogin();

  return (
    <Section {...props} sectionTitle={"ライセンス"}>
      <LoadableButton
        loading={userState == undefined} variant={"contained"} sx={{margin: "10px"}} onClick={_ => {
        if (user == undefined) return;
        setText(`MIT License

Copyright (c) ${new Date().getFullYear()} ${user.name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`);
        setBusiness("Yes");
        setPost("Yes");
        setCredit("No");
        setDistribution("Yes");
        setMaterial("Yes");
      }}
      >MIT Lisense</LoadableButton>
      <Textarea
        margin={"5px 0 10px 0"} borderRadius={"5px"} overflow={"hidden"} boxSizing={"border-box"} padding={"5px"} sx={{
        "textarea": {
          resize: "none",
          width: "100%",
          display: "block",
          padding: "3px",
          boxShadow: "1",
          boxSizing: "border-box",
        },
      }}
        name={"licence_text"} value={text} placeholder={"本文"} maxRows={"20"}
        onChange={event => setText(event.currentTarget.value)}
      />
      <YesNoElse
        name={"licence_business"} label={"商用利用"} value={business}
        onChange={event => setBusiness(event.currentTarget.value)}
      />
      <YesNoElse
        label={"投稿"} name={"licence_post"} value={post}
        onChange={event => setPost(event.currentTarget.value)}
      />
      <YesNoElse
        label={"クレジットなし"} name={"licence_credit"} value={credit}
        onChange={event => setCredit(event.currentTarget.value)}
      />
      <YesNoElse
        label={"二次配布"} name={"licence_distribution"} value={distribution}
        onChange={event => setDistribution(event.currentTarget.value)}
      />
      <YesNoElse
        label={"素材"} name={"licence_material"} value={material}
        onChange={event => setMaterial(event.currentTarget.value)}
      />
    </Section>
  );
}

export interface LicenceFormSectionProps extends OverrideProps<BoxTypeMap, any> {
}
