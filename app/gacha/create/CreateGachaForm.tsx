"use client";
import {Box} from "@mui/system";
import {BoxTypeMap} from "@mui/system/Box/Box";
import {OverrideProps} from "@mui/types";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {Section} from "../../_unit/_section/Section";
import {ImageEdit} from "../../_unit/ImageEdit";
import {TextInput} from "../../_unit/TextInput";
import {Button} from "@mui/material";
import {useState} from "react";
import {LicenceFormSection} from "./LicenceFormSection";
import {ContentListFormSection} from "./ContentListFormSection";
import {useClientState} from "../../_manager/AuthApiProvider";
import {redirect} from "next/navigation";
import {GachaContentBody, ImageFileData, LicenceData} from "../../../api_clients";
import {fileToBase64} from "../../util";
import {ErrorDataException, ErrorIds} from "../../_client/_error";
import {redirectLogin} from "../../_unit/RedirectLogin";

export function CreateGachaForm(
  {
    ...props
  }: CreateGachaFormProps,
) {
  const [err, setErr] = useState<string>();
  const [contentsSize, setContentsSize] = useState(0);
  const clientState = useClientState();
  const [redirectPath, setRedirectPath] = useState<string>();
  if (clientState == undefined) return undefined;
  const client = clientState.client;
  if (client == undefined) return  redirectLogin();
  if (redirectPath) redirect(redirectPath);

  return (
    <Box
      {...props}
      component={"form"}
      action={async (data: FormData) => {
        const licence_text = data.get("licence_text");
        const business = data.get("business");
        const post = data.get("post");
        const credit = data.get("credit");
        const distribution = data.get("distribution");
        const material = data.get("material");
        const thumbnailFile = data.get("thumbnail") as File;

        const licence: LicenceData = {
          business: business as string,
          credit: credit as string,
          distribution: distribution as string,
          material: material as string,
          post: post as string,
          text: licence_text as string,
        };
        const contents: Promise<GachaContentBody>[] = [];
        for (let i = 0; i < contentsSize; i++) {
          const contentThumbnail = data.get(`content-thumbnail-${i}`) as File;
          const contentTitle = data.get(`content-title-${i}`) as string;
          const contentDescription = data.get(`content-description-${i}`) as string;
          const contentRate = data.get(`content-rate-${i}`) as string;
          contents.push(fileToBase64(contentThumbnail).then(value => {
            const image: ImageFileData = {base64: value, name: contentThumbnail.name};
            const rate = parseInt(contentRate);
            if (isNaN(rate)) {
              throw new ErrorDataException({error_id: ErrorIds.InvalidNumber.name, message: "rate is NaN"});
            }
            return {
              description: contentDescription,
              image: image,
              rate: rate,
              title: contentTitle,
            };
          }));
        }
        const description = data.get("description") as string;
        const name = data.get("name") as string;
        Promise.all([
          fileToBase64(thumbnailFile),
          Promise.all(contents),
        ]).then(value => {
          const thumbnail: ImageFileData = {base64: value[0], name: thumbnailFile.name};
          return client.createGacha({
            contents: value[1],
            description: description,
            licence: licence,
            name: name,
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
        <ImageEdit
          textLabel={"サムネイル"}
          name={"thumbnail"}
        />
        <TextInput
          label={"ガチャ名"}
          name={"name"}
        />
        <TextInput
          label={"説明"}
          name={"description"}
        />
      </Section>


      <LicenceFormSection/>

      <ContentListFormSection onChangeSize={setContentsSize}/>


      <Button
        sx={{
          margin: "10px",
        }}
        variant={"contained"}
        type={"submit"}
      >投稿</Button>
    </Box>
  );
}

export interface CreateGachaFormProps extends OverrideProps<BoxTypeMap, any> {
}
