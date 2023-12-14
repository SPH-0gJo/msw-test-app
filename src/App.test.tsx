import React from "react";
import { apiBaseUrl } from "@/shared/env";

test("API Mocking test", () => {
  fetch(`${apiBaseUrl}/system/group/list/all`)
    .then((response) => {
      console.log(response.headers.get("Content-Type"));
      return response.text();
    })
    .then((resText) => {
      console.log(resText); //<-- ''
    });
});
