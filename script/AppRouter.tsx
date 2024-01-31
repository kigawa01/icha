import {HTMLAttributes} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "../app/unit/header/Header.tsx";
import {CreateUserPage} from "./page/create-user/CreateUserPage.tsx";
import {Footer} from "../app/unit/footer/Footer.tsx";

export interface MainRouterProps extends HTMLAttributes<any> {
}

export function AppRouter(props: MainRouterProps) {
  const {...parentProps} = props;
  return <BrowserRouter
    {...parentProps}
  >
    <Routes>

      <Route element={<Header/>}>
        <Route element={<Footer/>}>
          <Route path={""} element={<CreateUserPage/>}/>
        </Route>
      </Route>

    </Routes>
  </BrowserRouter>;
}