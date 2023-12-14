import "@testing-library/jest-dom";
import "whatwg-fetch";

import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});

server.events.on("response:mocked", ({ request, requestId, response }) => {
  console.log(
    "%s %s %s received %s %s %s",
    request.method,
    request.url,
    request.headers,
    response.status,
    response.statusText,
    response.body //<--undefined
  );
});

beforeAll(() => {
  // Start the interception.
  server.listen();
});

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers();
});

afterAll(() => {
  // Disable request interception and clean up.
  server.close();
});
