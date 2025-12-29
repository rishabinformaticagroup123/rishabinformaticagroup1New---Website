import { connection } from "@/lib/snowflake";
import { NextResponse } from "next/server";

export async function GET() {
  return new Promise((resolve) => {
    connection.execute({
      sqlText: `SELECT CURRENT_ACCOUNT(), CURRENT_REGION(), CURRENT_VERSION()`,
      complete: (err, stmt, rows) => {
        if (err) {
          resolve(
            NextResponse.json(
              { error: err.message },
              { status: 500 }
            )
          );
        } else {
          resolve(NextResponse.json(rows));
        }
      },
    });
  });
}
