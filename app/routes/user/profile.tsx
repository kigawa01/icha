import {Navigate, useParams} from "react-router";
import {Main} from "../../_unit/Main";
import {useFetch} from "../../_hook/useFetch";
import {apiClient} from "../../_client/api";
import {useUserState} from "../../_manager/UserProvider";
import {Section} from "../../_unit/_section/Section";
import {UserProfile} from "../../user/[userId]/UserProfile";
import {Loadable} from "../../_unit/_loading/Loadable";
import {ErrorMessage} from "../../_unit/ErrorMessage";
import {UserEdit} from "../../user/[userId]/UserEdit";

export default function UserProfilePage() {
  const {userId} = useParams<{userId: string}>();
  const userIdNum = parseInt(userId || "NaN");
  if (isNaN(userIdNum)) return <Navigate to="/notfound" replace/>;
  const user = useFetch(() => apiClient.getUser(userIdNum));
  const selfUserState = useUserState();

  return <Main>
    <Section sectionTitle={user?.result?.name || "ロード中..."} marginTop={"20px"}>
      <ErrorMessage error={user?.error}/>
      <Loadable loading={user == undefined || selfUserState == undefined} fontSize={50}>
        {
          selfUserState?.userRes?.uid == user?.result?.uid
            ? <UserEdit user={user?.result}/>
            : <UserProfile user={user?.result}/>
        }
      </Loadable>
    </Section>
  </Main>;
}
