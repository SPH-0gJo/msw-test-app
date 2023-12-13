import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

const server = setupServer(...handlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url); // <-- this line never runs
});

server.events.on("response:mocked", ({ request, requestId, response }) => {
  console.log(
    "%s %s received %s %s %s",
    request.method,
    request.url,
    response.status,
    response.statusText,
    response.body
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
