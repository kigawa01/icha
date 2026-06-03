import type {RouteConfig} from "@react-router/dev/routes";
import {index, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("gacha", "routes/gacha/index.tsx"),
  route("gacha/create", "routes/gacha/create.tsx"),
  route("gacha/:gacha_id", "routes/gacha/detail.tsx"),
  route("gacha/:gacha_id/run", "routes/gacha/run.tsx"),
  route("gacha/:gacha_id/content/:content_id", "routes/gacha/content.tsx"),
  route("user/create", "routes/user/create.tsx"),
  route("user/:userId", "routes/user/profile.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
] satisfies RouteConfig;
