export async function postCartQuery(urls: string[]) {
  return fetch("http://localhost:8000/api/recipes", {
    method: "POST",
    body: JSON.stringify({ recipes: urls }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
