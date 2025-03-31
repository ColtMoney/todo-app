export default async function fetchData<T>(
  url: string,
  method: string,
  body?: BodyInit,
): Promise<T> {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return response.json();
    });
}
