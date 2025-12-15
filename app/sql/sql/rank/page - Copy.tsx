"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

const SqlCodeBlock = ({ code }: { code: string }) => (
  <Box
    component="pre"
    sx={{
      bgcolor: "#263238",
      color: "#fff",
      p: 2,
      borderRadius: 2,
      fontSize: "0.95rem",
      overflowX: "auto",
      mb: 2,
    }}
  >
    {code}
  </Box>
);

const RankFunctionsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        📘 Prepared by Rishab Informatica Group
      </Typography>

      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        🏆 Ranking Functions in SQL – RANK, DENSE_RANK, ROW_NUMBER
      </Typography>

      <Typography variant="body1" mb={3}>
        Ranking functions are extremely useful when you need to assign a **rank or position** to each row in a result set based on a particular order. In SQL and ETL tools like **Informatica PowerCenter** and **IICS**, these are commonly used to fetch top or bottom records.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        🔹 What is RANK Transformation?
      </Typography>
      <Typography variant="body2" mb={2}>
        In Informatica and SQL, the **RANK transformation** is an active, connected transformation that filters data to return **top or bottom** N records based on sort conditions.
      </Typography>

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        1️⃣ RANK()
      </Typography>
      <Typography variant="body2" gutterBottom>
        Gives **same rank** to identical values. Skips ranks.
      </Typography>
      <SqlCodeBlock code={`SELECT STUDENT_ID, FIRST_NAME, STIPEND, COORDINATOR_ID, 
RANK() OVER (ORDER BY STIPEND) AS RANK 
FROM STUDENTS;`} />
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
RANK() OVER (ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        2️⃣ DENSE_RANK()
      </Typography>
      <Typography variant="body2" gutterBottom>
        Similar to RANK, but doesn’t skip numbers after a tie.
      </Typography>
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
DENSE_RANK() OVER (ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        3️⃣ ROW_NUMBER()
      </Typography>
      <Typography variant="body2" gutterBottom>
        Assigns a unique sequence number regardless of ties.
      </Typography>
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
ROW_NUMBER() OVER (ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        📌 Ranking Within Groups – PARTITION BY
      </Typography>
      <Typography variant="body2" gutterBottom>
        Use `PARTITION BY` to rank **within each department or group**.
      </Typography>
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
RANK() OVER (PARTITION BY COORDINATOR_ID ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🔝 Top N Results – Subquery Trick
      </Typography>
      <Typography variant="body2" gutterBottom>
        Use a subquery to filter top N rows using `RANK()` or `ROW_NUMBER()`.
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM (
  SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID,
  RANK() OVER (ORDER BY SALES_VALUE DESC) AS RNK
  FROM SALES_EXECUTIVES
) WHERE RNK <= 5;`} />

      <Typography variant="body2" gutterBottom>
        👆 This returns top 5 sales executives.
      </Typography>

      <Typography variant="body2" gutterBottom>
        🏢 To get **top per coordinator/department**:
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM (
  SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID,
  RANK() OVER (PARTITION BY COORDINATOR_ID ORDER BY SALES_VALUE DESC) AS RNK
  FROM SALES_EXECUTIVES
) WHERE RNK = 1;`} />

      <Divider sx={{ my: 5 }} />

      <Typography variant="h6" color="text.secondary" textAlign="center" gutterBottom>
        🚀 Join INFORMATICA IICS COMBO TRAINING
      </Typography>
      <Typography variant="h6" color="primary" textAlign="center">
        📞 Call / WhatsApp: 8970853557 / 9448005273
      </Typography>
    </Container>
  );
};

export default RankFunctionsPage;
