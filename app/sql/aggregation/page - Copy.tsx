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
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        📊 Aggregation Functions in SQL – Complete Guide for Beginners
      </Typography>

      <Typography variant="body1" mb={3}>
        In real-world data analysis, we often need to **summarize data** – for example, to find the total salary, average performance, or the number of employees in each department.
        SQL provides powerful **aggregation functions** that allow you to do this easily. These are also used heavily in tools like **Informatica PowerCenter** and **IICS** via Aggregator Transformations.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        🔍 Common SQL Aggregate Functions
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">1. <code>MIN()</code></Typography>
        <Typography variant="body2" gutterBottom>Returns the minimum value.</Typography>
        <SqlCodeBlock code={`SELECT MIN(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">2. <code>MAX()</code></Typography>
        <Typography variant="body2" gutterBottom>Returns the maximum value.</Typography>
        <SqlCodeBlock code={`SELECT MAX(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">3. <code>SUM()</code></Typography>
        <Typography variant="body2" gutterBottom>Returns the total sum.</Typography>
        <SqlCodeBlock code={`SELECT SUM(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">4. <code>AVG()</code></Typography>
        <Typography variant="body2" gutterBottom>Returns the average value.</Typography>
        <SqlCodeBlock code={`SELECT AVG(STIPEND) FROM STUDENTS;`} />

        <Typography variant="h6">5. <code>COUNT()</code></Typography>
        <Typography variant="body2" gutterBottom>Returns the number of non-null values.</Typography>
        <SqlCodeBlock code={`SELECT COUNT(STIPEND) FROM STUDENTS;`} />
      </Paper>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        📌 Using GROUP BY
      </Typography>
      <Typography variant="body2" mb={2}>
        <strong>GROUP BY</strong> helps you group data and apply aggregate functions to each group.
      </Typography>
      <SqlCodeBlock code={`SELECT COORDINATOR_ID, SUM(STIPEND) FROM STUDENTS GROUP BY COORDINATOR_ID;`} />
      <SqlCodeBlock code={`SELECT SPECIALIZATION, COORDINATOR_ID, SUM(STIPEND), COUNT(*) 
FROM STUDENTS 
GROUP BY SPECIALIZATION, COORDINATOR_ID;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🔽 Sorting with ORDER BY
      </Typography>
      <SqlCodeBlock code={`SELECT SPECIALIZATION, COORDINATOR_ID, SUM(STIPEND), COUNT(*) 
FROM STUDENTS 
GROUP BY SPECIALIZATION, COORDINATOR_ID 
ORDER BY COORDINATOR_ID;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🧠 HAVING Clause – Filter Groups
      </Typography>
      <Typography variant="body2" mb={2}>
        Use <strong>HAVING</strong> to filter after grouping.
      </Typography>
      <SqlCodeBlock code={`SELECT SPECIALIZATION, COORDINATOR_ID, SUM(STIPEND), COUNT(*) 
FROM STUDENTS 
GROUP BY SPECIALIZATION, COORDINATOR_ID 
HAVING SUM(STIPEND) > 50000 
ORDER BY COORDINATOR_ID;`} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🤔 Find Highest & Top N Stipends
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS 
WHERE STIPEND = (SELECT MAX(STIPEND) FROM STUDENTS);`} />
      <Typography variant="body2" mt={1}>
        For 2nd or 3rd highest stipend, use <strong>RANK</strong> or <strong>DENSE_RANK</strong> (covered in advanced topics).
      </Typography>

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        🔁 GROUP BY vs DISTINCT
      </Typography>
      <SqlCodeBlock code={`SELECT DISTINCT COORDINATOR_ID FROM STUDENTS;`} />
      <SqlCodeBlock code={`SELECT COORDINATOR_ID FROM STUDENTS GROUP BY COORDINATOR_ID;`} />
      <Typography variant="body2">
        Both give similar results, but <code>GROUP BY</code> is often used when you want to perform aggregations as well.
      </Typography>

      <Divider sx={{ my: 5 }} />

      <Typography variant="h6" color="text.secondary" textAlign="center">
        Learn and Practice! Aggregations are the foundation of all reporting and analytics.
      </Typography>
    </Container>
  );
};

export default AggregationFunctionsPage;
