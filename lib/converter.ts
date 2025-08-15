// lib/converter.ts

export function formatResult(result: any) {
  if (!result || !result.rows) {
    return {
      columns: [],
      rows: [],
    };
  }

  const columns = result.metaData
    ? result.metaData.map((col: any) => col.name) // Oracle
    : result.fields?.map((field: any) => field.name); // PostgreSQL

  const rows = result.rows || result;

  return {
    columns,
    rows,
  };
}
