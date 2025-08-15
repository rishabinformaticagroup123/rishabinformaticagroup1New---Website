"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Paper,
  List,
  ListItem,
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

const SortingInSQLPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header */}
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        📘 Prepared by <strong>Rishab Informatica Group</strong>
      </Typography>

      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        🔃 ORDER BY – Sorting in SQL (with Informatica Notes)
      </Typography>

      <Typography variant="body1" mb={3}>
        The <strong>ORDER BY</strong> clause in SQL helps us display data in a sorted order —
        ascending or descending — based on one or more columns.
        In Informatica PowerCenter & IICS, sorting happens via <strong>Sorter Transformation</strong>.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Basic Example */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🧪 Basic Sorting Example
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY STIPEND;`} />
      <Typography variant="body2" mb={2}>
        This sorts students by stipend in ascending order.
      </Typography>

      <Typography variant="h6">📉 Descending Order:</Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY STIPEND DESC;`} />

      <Typography variant="h6">🧑‍🤝‍🧑 Tiebreaker with Multiple Columns:</Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY STIPEND DESC, JOINING_DATE;`} />

      <Typography variant="h6">🔢 Sorting by Column Numbers:</Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY 8 DESC, 6;`} />
      <Typography variant="body2" mb={2}>
        This sorts based on 8th and 6th columns respectively.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Character Columns */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        🔠 Sorting by Character Columns
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY FIRST_NAME;`} />
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY FIRST_NAME DESC;`} />
      <Typography variant="body2" mb={2}>
        Note: ASCII values affect character sorting. <strong>Eleni</strong> would appear first in DESC order.
      </Typography>

      <Typography variant="body2" mb={2}>
        In <strong>Informatica</strong>, you can also make sorting <strong>case-insensitive</strong> so names like Eleni/eleni/ELENI appear together.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* NULL Handling */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        ❓ NULLs in ORDER BY
      </Typography>
      <Typography variant="body2" mb={1}>
        By default:
        <ul>
          <li>In SQL, NULLs appear last in ASC and first in DESC</li>
          <li>In Informatica, you can configure <strong>“Null Treated as Low”</strong> option</li>
        </ul>
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY BONUS DESC;`} />

      <Divider sx={{ my: 4 }} />

      {/* Informatica Sorter Notes */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        ⚙️ Informatica Sorter Transformation Insights
      </Typography>
      <List>
        <ListItem>✔️ Active & connected transformation</ListItem>
        <ListItem>✔️ Used to sort incoming fields (ASC/DESC)</ListItem>
        <ListItem>✔️ Allows <strong>multiple key ports</strong> for sorting</ListItem>
        <ListItem>✔️ Has <strong>DISTINCT</strong> option to remove full row duplicates</ListItem>
        <ListItem>✔️ Works well with <strong>Lookup</strong> and <strong>Aggregator</strong> for performance (when sorted input is used)</ListItem>
        <ListItem>✔️ Uses <strong>Work Directory</strong> and <strong>Auto Cache Size</strong> in Cloud mode</ListItem>
      </List>

      <Paper sx={{ p: 2, mt: 3, bgcolor: "#fffde7" }}>
        <Typography fontWeight={600} color="primary">
          💡 Example: Sort by STIPEND (Descending) and JOINING_DATE (Ascending)
        </Typography>
        <Typography fontSize={14}>
          In PowerCenter or IICS:
        </Typography>
        <Box mt={1}>
          <ul>
            <li>STIPEND → Descending</li>
            <li>JOINING_DATE → Ascending</li>
            <li>Enable “Distinct” if you want to remove duplicates</li>
            <li>Use “Null Treated as Low” to control how NULLs behave</li>
          </ul>
        </Box>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Final Thoughts */}
      <Typography variant="body1" fontWeight={600} color="text.secondary" textAlign="center" mt={4}>
        Sorting is essential in reporting, dashboards, analytics, and performance tuning.
      </Typography>

      {/* Footer CTA */}
      <Typography variant="h6" textAlign="center" color="text.secondary" mt={5} gutterBottom>
        🚀 Join <strong>INFORMATICA IICS COMBO TRAINING</strong>
      </Typography>
      <Typography variant="h6" color="primary" textAlign="center">
        📞 Call / WhatsApp: <strong>8970853557 / 9448005273</strong>
      </Typography>
    </Container>
  );
};

export default SortingInSQLPage;
