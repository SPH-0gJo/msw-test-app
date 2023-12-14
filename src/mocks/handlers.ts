import { HttpResponse, http } from "msw";
import { apiBaseUrl } from "@/shared/env";

export const handlers = [
  http.get(`${apiBaseUrl}/system/group/list/all`, () => {
    console.log("group list handler");
    return HttpResponse.text("John");
  }),
];
