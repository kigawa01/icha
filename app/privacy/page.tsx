import {Main} from "../_unit/Main";
import {PageTitle} from "../_unit/PageTitle";
import {Section} from "../_unit/_section/Section";
import {Typography} from "@mui/material";
import {Link} from "@mui/material";

export default function PrivacyPage() {
  return (
    <Main>
      <PageTitle pageTitle={"プライバシーポリシー"}/>

      <Section sectionTitle={"1. 収集する情報"}>
        <Typography>
          本サービス（Icha）では、以下の情報を収集することがあります。
        </Typography>
        <Typography component={"ul"} paddingLeft={"20px"}>
          <li>アカウント登録時に入力されたメールアドレス、ユーザー名などの情報</li>
          <li>ユーザーが投稿した画像その他のコンテンツ</li>
          <li>本サービスのご利用状況（アクセスログ、操作履歴など）</li>
          <li>お問い合わせ時にご提供いただいた情報</li>
        </Typography>
      </Section>

      <Section sectionTitle={"2. 情報の利用目的"}>
        <Typography>
          収集した情報は以下の目的で利用します。
        </Typography>
        <Typography component={"ul"} paddingLeft={"20px"}>
          <li>本サービスの提供・運営・改善</li>
          <li>ユーザーの認証・本人確認</li>
          <li>お問い合わせへの対応</li>
          <li>利用規約に違反する行為への対応</li>
          <li>サービスに関する重要なお知らせの送信</li>
        </Typography>
      </Section>

      <Section sectionTitle={"3. 情報の第三者提供"}>
        <Typography>
          運営者は、以下の場合を除き、収集した個人情報を第三者に提供しません。
        </Typography>
        <Typography component={"ul"} paddingLeft={"20px"}>
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>人の生命、身体または財産の保護のために必要な場合</li>
          <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
        </Typography>
      </Section>

      <Section sectionTitle={"4. Googleアナリティクスの利用"}>
        <Typography>
          本サービスでは、サービス改善のためにGoogleアナリティクスを使用しています。
          Googleアナリティクスはcookieを使用してデータを収集します。
          収集されたデータはGoogleのプライバシーポリシーに基づいて管理されます。
          Googleアナリティクスによるデータ収集を無効にするには、
          <Link href={"https://tools.google.com/dlpage/gaoptout"} target={"_blank"} color={"inherit"}>
            Googleアナリティクスオプトアウトアドオン
          </Link>
          をご利用ください。
        </Typography>
      </Section>

      <Section sectionTitle={"5. Cookieの使用"}>
        <Typography>
          本サービスでは、ユーザーの利便性向上のためにCookieを使用しています。
          ブラウザの設定によりCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
        </Typography>
      </Section>

      <Section sectionTitle={"6. 情報の管理"}>
        <Typography>
          運営者は、収集した情報の漏洩、滅失、毀損を防止するために、適切なセキュリティ対策を実施します。
          ただし、インターネット上でのデータ送信の完全な安全性を保証することはできません。
        </Typography>
      </Section>

      <Section sectionTitle={"7. 個人情報の開示・訂正・削除"}>
        <Typography>
          ユーザーは、自身の個人情報の開示、訂正、削除を希望する場合、
          下記のお問い合わせ先までご連絡ください。
          本人確認の上、合理的な期間内に対応いたします。
        </Typography>
      </Section>

      <Section sectionTitle={"8. お問い合わせ"}>
        <Typography>
          プライバシーポリシーに関するお問い合わせは以下までご連絡ください。
        </Typography>
        <Typography marginTop={"10px"}>
          メールアドレス：contact@kigawa.net
        </Typography>
      </Section>

      <Section sectionTitle={"9. プライバシーポリシーの変更"}>
        <Typography>
          運営者は、必要に応じて本プライバシーポリシーを変更することがあります。
          変更後のポリシーは、本サービス上に掲示した時点から効力を生じます。
        </Typography>
      </Section>

      <Typography color={"text.secondary"} marginTop={"20px"}>
        制定日：2024年1月1日
      </Typography>
    </Main>
  );
}
