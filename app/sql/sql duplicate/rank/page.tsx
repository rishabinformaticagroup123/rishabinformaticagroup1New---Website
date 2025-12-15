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
      {/* Header */}
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        📘 Prepared by <strong>Rishab Informatica Group</strong>
      </Typography>

      {/* Title */}
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        🏆 Ranking Functions in SQL – RANK, DENSE_RANK, ROW_NUMBER
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" mb={3}>
        Ranking functions are useful when you want to assign a <strong>position or rank</strong> to each row based on a specific order.
        These functions are commonly used in SQL and ETL tools like <strong>Informatica PowerCenter</strong> and <strong>IICS</strong> to filter top or bottom records.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Theory */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🔹 What is RANK Transformation?
      </Typography>
      <Typography variant="body2" mb={2}>
        In Informatica and SQL, the <strong>RANK transformation</strong> is an active, connected transformation used to return a
        specific number of top or bottom records based on a sorting condition.
      </Typography>

      <Typography variant="body2" mb={2}>
        For example, to get the <strong>top 5 students</strong> with the highest stipend, we can use <strong>RANK()</strong> inside a subquery.
      </Typography>

      {/* RANK() */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        1️⃣ RANK()
      </Typography>
      <Typography variant="body2" gutterBottom>
        Assigns the <strong>same rank</strong> to duplicate values but <strong>skips ranks</strong> afterward.
      </Typography>
      <SqlCodeBlock code={`SELECT STUDENT_ID, FIRST_NAME, STIPEND, COORDINATOR_ID, 
RANK() OVER (ORDER BY STIPEND DESC) AS RANK 
FROM STUDENTS;`} />

      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
RANK() OVER (ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      {/* DENSE_RANK() */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        2️⃣ DENSE_RANK()
      </Typography>
      <Typography variant="body2" gutterBottom>
        Also assigns the <strong>same rank</strong> to duplicate values, but <strong>does not skip</strong> the next rank.
      </Typography>
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
DENSE_RANK() OVER (ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      {/* ROW_NUMBER() */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        3️⃣ ROW_NUMBER()
      </Typography>
      <Typography variant="body2" gutterBottom>
        Assigns a <strong>unique sequence number</strong> to each row — even if values are the same.
      </Typography>
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
ROW_NUMBER() OVER (ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      {/* PARTITION BY */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        📌 Ranking Within Groups – Using PARTITION BY
      </Typography>
      <Typography variant="body2" gutterBottom>
        Use <strong>PARTITION BY</strong> to generate rankings <strong>within each group</strong> (e.g., department or coordinator).
      </Typography>
      <SqlCodeBlock code={`SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID, 
RANK() OVER (PARTITION BY COORDINATOR_ID ORDER BY SALES_VALUE DESC) AS RNK 
FROM SALES_EXECUTIVES;`} />

      {/* Top N with subquery */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🔝 Getting Top N Records – Subquery Pattern
      </Typography>
      <Typography variant="body2" gutterBottom>
        Use a subquery to get <strong>Top 5</strong> or <strong>Top 1</strong> results using <strong>RANK()</strong> or <strong>ROW_NUMBER()</strong>.
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM (
  SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID,
  RANK() OVER (ORDER BY SALES_VALUE DESC) AS RNK
  FROM SALES_EXECUTIVES
) WHERE RNK <= 5;`} />

      <Typography variant="body2" gutterBottom>
        🎯 To get <strong>Top 1 in each Coordinator_ID group</strong>:
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM (
  SELECT SALES_EX_ID, FIRST_NAME, SALES_VALUE, COORDINATOR_ID,
  RANK() OVER (PARTITION BY COORDINATOR_ID ORDER BY SALES_VALUE DESC) AS RNK
  FROM SALES_EXECUTIVES
) WHERE RNK = 1;`} />

      <Divider sx={{ my: 5 }} />

      {/* CTA */}
      <Typography variant="h6" color="text.secondary" textAlign="center" gutterBottom>
        🚀 Join <strong>INFORMATICA IICS COMBO TRAINING</strong>
      </Typography>
      <Typography variant="h6" color="primary" textAlign="center">
        📞 Call / WhatsApp: <strong>8970853557 / 9448005273</strong>
      </Typography>
    </Container>
  );
};

export default RankFunctionsPage;
