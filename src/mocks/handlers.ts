import { HttpResponse, http } from "msw";
import { groupList } from "./data/group";
import { apiBaseUrl } from "@/shared/env";

export const handlers = [
  http.get(`${apiBaseUrl}/system/group/list/all`, () => {
    console.log("group list handler");
    return HttpResponse.json(
      {
        message: "Mocked response",
      },
      {
        status: 200,
        statusText: "Mocked status",
      }
    );
  }),
];

// import { rest } from "msw";
// import { groupList } from "./data/group";

// export const handlers = [
//   rest.get("https://reqres.in/api/users", (req, res, ctx) => {
//     return res(ctx.json(groupList));
//   }),
// ];
