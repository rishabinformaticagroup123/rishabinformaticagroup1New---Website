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

const AggregationFunctionsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Prepared by */}
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        📘 Prepared by <strong>Rishab Informatica Group</strong>
      </Typography>

      {/* Title */}
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        📊 Aggregation Functions in SQL – Complete Guide for Beginners
      </Typography>

      {/* Intro */}
      <Typography variant="body1" mb={3}>
        In real-world data analysis, we often need to{" "}
        <strong>summarize data</strong> – for example, to find the total salary,
        average performance, or number of students in a specialization.
        SQL provides powerful <strong>aggregation functions</strong> to perform these summaries, which are widely used in tools like{" "}
        <strong>Informatica PowerCenter</strong> and <strong>Informatica IICS (IDMC)</strong> through the{" "}
        <strong>Aggregator Transformation</strong>.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Common Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🔍 Common SQL Aggregate Functions
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">1. MIN()</Typography>
        <Typography variant="body2">Returns the minimum value.</Typography>
        <SqlCodeBlock code={`SELECT MIN(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">2. MAX()</Typography>
        <Typography variant="body2">Returns the maximum value.</Typography>
        <SqlCodeBlock code={`SELECT MAX(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">3. SUM()</Typography>
        <Typography variant="body2">Returns the total sum.</Typography>
        <SqlCodeBlock code={`SELECT SUM(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">4. AVG()</Typography>
        <Typography variant="body2">Returns the average value.</Typography>
        <SqlCodeBlock code={`SELECT AVG(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">5. COUNT()</Typography>
        <Typography variant="body2">Returns the number of non-null values.</Typography>
        <SqlCodeBlock code={`SELECT COUNT(STIPEND) FROM STUDENTS;`} />
      </Paper>

      {/* GROUP BY */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        📌 Using GROUP BY to Aggregate by Category
      </Typography>
      <Typography variant="body2" mb={2}>
        Use <strong>GROUP BY</strong> when you want results grouped by a column.
      </Typography>
      <SqlCodeBlock code={`SELECT COORDINATOR_ID, SUM(STIPEND) FROM STUDENTS GROUP BY COORDINATOR_ID;`} />
      <SqlCodeBlock code={`SELECT SPECIALIZATION, COORDINATOR_ID, SUM(STIPEND), COUNT(*) 
FROM STUDENTS 
GROUP BY SPECIALIZATION, COORDINATOR_ID;`} />

      {/* ORDER BY */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🔽 Sorting Groups using ORDER BY
      </Typography>
      <SqlCodeBlock code={`SELECT SPECIALIZATION, COORDINATOR_ID, SUM(STIPEND), COUNT(*) 
FROM STUDENTS 
GROUP BY SPECIALIZATION, COORDINATOR_ID 
ORDER BY COORDINATOR_ID;`} />

      {/* HAVING */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🧠 HAVING Clause – Filtering Grouped Results
      </Typography>
      <Typography variant="body2" mb={2}>
        <strong>HAVING</strong> is used to apply conditions on aggregated results.
      </Typography>
      <SqlCodeBlock code={`SELECT SPECIALIZATION, COORDINATOR_ID, SUM(STIPEND), COUNT(*) 
FROM STUDENTS 
GROUP BY SPECIALIZATION, COORDINATOR_ID 
HAVING SUM(STIPEND) > 50000 
ORDER BY COORDINATOR_ID;`} />

      {/* Highest */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🏆 Finding Highest & Top N Salaries
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS 
WHERE STIPEND = (SELECT MAX(STIPEND) FROM STUDENTS);`} />
      <Typography variant="body2">
        For 2nd or 3rd highest stipend, you can use <strong>RANK()</strong> or <strong>DENSE_RANK()</strong> functions (explained in advanced topics).
      </Typography>

      {/* GROUP BY vs DISTINCT */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🔁 GROUP BY vs DISTINCT
      </Typography>
      <SqlCodeBlock code={`SELECT DISTINCT COORDINATOR_ID FROM STUDENTS;`} />
      <SqlCodeBlock code={`SELECT COORDINATOR_ID FROM STUDENTS GROUP BY COORDINATOR_ID;`} />
      <Typography variant="body2">
        Both return unique values, but <strong>GROUP BY</strong> is essential when using aggregate functions.
      </Typography>

      <Divider sx={{ my: 5 }} />

      {/* Call to Action */}
      <Typography variant="h6" color="text.secondary" textAlign="center" gutterBottom>
        🚀 Join <strong>INFORMATICA IICS COMBO TRAINING</strong>
      </Typography>
      <Typography variant="h6" color="primary" textAlign="center">
        📞 Call / WhatsApp: <strong>8970853557 / 9448005273</strong>
      </Typography>
    </Container>
  );
};

export default AggregationFunctionsPage;
