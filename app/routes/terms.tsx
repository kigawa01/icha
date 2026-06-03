import {Main} from "../_unit/Main";
import {PageTitle} from "../_unit/PageTitle";
import {Section} from "../_unit/_section/Section";
import {Typography} from "@mui/material";

export default function TermsPage() {
  return (
    <Main>
      <PageTitle pageTitle={"利用規約"}/>

      <Section sectionTitle={"第1条（適用）"}>
        <Typography>
          本利用規約（以下「本規約」）は、kigawa（以下「運営者」）が提供するサービス「Icha」（以下「本サービス」）の利用条件を定めるものです。
          ユーザーの皆さまには、本規約に従って本サービスをご利用いただきます。
        </Typography>
      </Section>

      <Section sectionTitle={"第2条（利用登録）"}>
        <Typography>
          本サービスへの登録を希望する方は、本規約に同意の上、所定の方法により利用登録を申請するものとします。
          運営者は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
        </Typography>
        <Typography component={"ul"} paddingLeft={"20px"}>
          <li>本規約に違反したことがある者からの申請である場合</li>
          <li>その他、運営者が利用登録を相当でないと判断した場合</li>
        </Typography>
      </Section>

      <Section sectionTitle={"第3条（禁止事項）"}>
        <Typography>
          ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
        </Typography>
        <Typography component={"ul"} paddingLeft={"20px"}>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>第三者の著作権、商標権その他の知的財産権を侵害する行為</li>
          <li>他のユーザーまたは第三者を誹謗中傷する行為</li>
          <li>わいせつな表現を含むコンテンツを投稿する行為</li>
          <li>未成年者に有害な情報を投稿する行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>他のユーザーのアカウントを不正に使用する行為</li>
          <li>その他、運営者が不適切と判断する行為</li>
        </Typography>
      </Section>

      <Section sectionTitle={"第4条（コンテンツの取り扱い）"}>
        <Typography>
          ユーザーが本サービスに投稿した画像その他のコンテンツ（以下「投稿コンテンツ」）の著作権はユーザーに帰属します。
          ユーザーは、投稿コンテンツについて、本サービスの提供・改善・宣伝を目的として、運営者が無償で利用できるライセンスを付与するものとします。
          ユーザーは、投稿コンテンツが第三者の権利を侵害しないことを保証するものとします。
        </Typography>
      </Section>

      <Section sectionTitle={"第5条（免責事項）"}>
        <Typography>
          運営者は、本サービスに事実上または法律上の瑕疵がないことを保証しておりません。
          運営者は、本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。
        </Typography>
      </Section>

      <Section sectionTitle={"第6条（サービス内容の変更等）"}>
        <Typography>
          運営者は、ユーザーへの事前の告知なく、本サービスの内容を変更または廃止することができるものとします。
          これによってユーザーに生じた損害について、運営者は責任を負いません。
        </Typography>
      </Section>

      <Section sectionTitle={"第7条（利用規約の変更）"}>
        <Typography>
          運営者は、必要と判断した場合には、ユーザーへの事前の告知なく本規約を変更することができるものとします。
          変更後の利用規約は、本サービス上に掲示した時点から効力を生じるものとします。
        </Typography>
      </Section>

      <Section sectionTitle={"第8条（準拠法・裁判管轄）"}>
        <Typography>
          本規約の解釈にあたっては、日本法を準拠法とします。
          本サービスに関して紛争が生じた場合には、運営者の所在地を管轄する裁判所を専属的合意管轄とします。
        </Typography>
      </Section>

      <Typography color={"text.secondary"} marginTop={"20px"}>
        制定日：2024年1月1日
      </Typography>
    </Main>
  );
}
