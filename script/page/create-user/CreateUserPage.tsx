import {HTMLAttributes} from "react";

export interface CreateUserPageProps extends HTMLAttributes<any> {
}

export function CreateUserPage(props: CreateUserPageProps) {
  const {...parentProps} = props;
  return <div
    {...parentProps}
  >
  </div>;
}