export const rootPath = process.env.BUILD_ENV === "dev" ? "voc" : "";
export const tableauHostURL =
  process.env.BUILD_ENV === "dev"
    ? "https://localhost/"
    : "https%3A%2F%2Fnyjdev.sphinfo.com%2F";
