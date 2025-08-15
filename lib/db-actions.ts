export async function sqlExecute(query: string) {
  const res = await fetch("/api/sql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "SQL execution failed");
  }

  return res.json();
}
