export default function errorHandler(e: unknown): string {
  if (e instanceof Error) {
    return `Error:, ${e.message}`;
  }
  return `An unknown error occurred:', ${e}`;
}
