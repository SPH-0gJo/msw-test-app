const { TextDecoder: td, TextEncoder: te } = require("node:util");

Object.defineProperties(globalThis, {
  TextDecoder: { value: td },
  TextEncoder: { value: te },
});

// const { Blob: blob, File: file } = require("node:buffer");
// const {
//   fetch: _fetch,
//   Headers: headers,
//   FormData: formData,
//   Request: request,
//   Response: response,
// } = require("undici");

// Object.defineProperties(globalThis, {
//   fetch: { value: _fetch, writable: true },
//   Blob: { value: blob },
//   File: { value: file },
//   Headers: { value: headers },
//   FormData: { value: formData },
//   Request: { value: request },
//   Response: { value: response },
// });
