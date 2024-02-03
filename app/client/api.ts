import {Configuration, DefaultApi} from "../../api_clients";

export const clientConfig = new Configuration({
  basePath: process.env.BASE_URL,
});

export const api = {

  defaultApi: new DefaultApi(clientConfig),
} as const;
