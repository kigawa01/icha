"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {Section} from "../../_unit/_section/Section";
import {ImageEdit} from "../../_unit/_form/ImageEdit";
import {TextInput} from "../../_unit/_form/TextInput";
import {Button} from "@mui/material";
import {useState} from "react";
import {LicenceFormSection} from "./LicenceFormSection";
import {ContentListFormSection} from "./ContentListFormSection";
import {useClientState} from "../../_manager/AuthApiProvider";
import {redirect} from "next/navigation";
import {GachaContentBody, ImageFileData, LicenceData} from "../../../api_clients";
import {fileToBase64, useStateObjectDef} from "../../util";
import {ErrorDataException, ErrorIds} from "../../_client/_error";
import {redirectLogin} from "../../_unit/RedirectLogin";
import {Textarea} from "../../_unit/_form/Textarea";

export function CreateGachaForm(
  {
    ...props
  }: CreateGachaFormProps,
) {
  const [err, setErr] = useState<string>();
  const clientState = useClientState();
  const [redirectPath, setRedirectPath] = useState<string>();
  const client = clientState?.client;
  const contentsState = useStateObjectDef<number[]>([0]);
  if (clientState != undefined && client == undefined) return redirectLogin();
  if (redirectPath) redirect(redirectPath);

  return (
    <Box
      {...props}
      component={"form"}
      action={async (data: FormData) => {
        if (client == undefined) return;
        const thumbnailFile = data.get("thumbnail") as File;
        const licence: LicenceData = createLicence(data);
        const contents: Promise<GachaContentBody>[] = createContents(data, contentsState.value);
        Promise.all([
          fileToBase64(thumbnailFile),
          Promise.all(contents),
        ]).then(value => {
          const thumbnail: ImageFileData = {base64: value[0], name: thumbnailFile.name};
          return client.createGacha({
            contents: value[1],
            description: data.get("description") as string,
            licence: licence,
            name: data.get("name") as string,
            thumbnail: thumbnail,
          });
        }).then(value => {
          if (value.value != undefined) return setRedirectPath(`${value.value.uid}`);
          else if (value.error) setErr(value.error.message);
          else setErr(`invalid result ${value}`);
        }).catch(reason => {
          setErr(reason.toString());
          console.error(reason);
        });
      }}
    >
      <ErrorMessage error={err}/>

      <Section sectionTitle={"画像投稿"}>
        <ImageEdit required
                   textLabel={"サムネイル"} name={"thumbnail"} height={"450px"}
        />
        <TextInput required
                   label={"ガチャ名"}
                   name={"name"}
        />
        <Textarea required
                  label={"説明"} name={"description"}
        />
      </Section>


      <LicenceFormSection/>

      <ContentListFormSection contentsState={contentsState}/>

      <ErrorMessage error={err}/>

      <Button
        sx={{margin: "10px"}} variant={"contained"} type={"submit"} disabled={clientState == undefined}
      >投稿</Button>
    </Box>
  );
}

function createLicence(data: FormData): LicenceData {
  return {
    business: data.get("licence_business") as string,
    credit: data.get("licence_credit") as string,
    distribution: data.get("licence_distribution") as string,
    material: data.get("licence_material") as string,
    post: data.get("licence_post") as string,
    text: data.get("licence_text") as string,
  };
}

function createContents(data: FormData, contentsValue: number[]): Promise<GachaContentBody>[] {
  const contents: Promise<GachaContentBody>[] = [];
  contentsValue.forEach(num => {
    const contentThumbnail = data.get(`content-thumbnail-${num}`) as File;
    contents.push(fileToBase64(contentThumbnail).then(value => {
      const image: ImageFileData = {base64: value, name: contentThumbnail.name};
      const rate = parseInt(data.get(`content-rate-${num}`) as string);
      if (isNaN(rate)) {
        throw new ErrorDataException({error_id: ErrorIds.InvalidNumber.name, message: `rate is NaN. num: ${num}`});
      }
      return {
        description: data.get(`content-description-${num}`) as string,
        image: image,
        rate: rate,
        title: data.get(`content-title-${num}`) as string,
      };
    }));
  });

  return contents;
}

export interface CreateGachaFormProps extends OverrideProps<BoxTypeMap, any> {
}
