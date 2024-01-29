import {HTMLAttributes} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HeaderPage} from "./page/header/HeaderPage.tsx";
import {CreateUserPage} from "./page/create-user/CreateUserPage.tsx";

export interface MainRouterProps extends HTMLAttributes<any> {
}

export function MainRouter(props: MainRouterProps) {
  const {...parentProps} = props;
  return <BrowserRouter
    {...parentProps}
  >
    <Routes>

      <Route element={<HeaderPage/>}>
        <Route path={""} element={<CreateUserPage/>}/>
      </Route>

    </Routes>
  </BrowserRouter>;
}