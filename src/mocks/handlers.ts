// import { HttpResponse, http } from "msw";
// import { groupList } from "./data/group";

// export const handlers = [
//   http.get("/system/group/list/all", () => {
//     return HttpResponse.json(groupList);
//   }),
// ];

import { rest } from "msw";
import { groupList } from "./data/group";

export const handlers = [
  rest.get("https://reqres.in/api/users", (req, res, ctx) => {
    return res(ctx.json(groupList));
  }),
];
