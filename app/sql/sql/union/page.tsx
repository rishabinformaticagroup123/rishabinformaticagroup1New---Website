"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Alert,
  AlertTitle,
  Chip,
} from "@mui/material";

// Code block component with syntax highlighting styling
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
      fontFamily: "Monaco, Consolas, 'Courier New', monospace",
      "& .keyword": { color: "#82b1ff" },
      "& .string": { color: "#c3e88d" },
      "& .comment": { color: "#546e7a" },
    }}
  >
    {code}
  </Box>
);

// Output display component
const OutputDisplay = ({ 
  title, 
  output, 
  bgColor = "#e8f5e9", 
  titleColor = "success.dark" 
}: { 
  title: string; 
  output: string; 
  bgColor?: string; 
  titleColor?: string; 
}) => (
  <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: bgColor }}>
    <Typography variant="body2" fontWeight="bold" color={titleColor}>
      {title}
    </Typography>
    <Box 
      component="pre" 
      sx={{ 
        bgcolor: bgColor, 
        p: 1, 
        borderRadius: 1, 
        fontSize: '0.9rem', 
        overflowX: 'auto',
        fontFamily: "Monaco, Consolas, 'Courier New', monospace"
      }}
    >
      {output}
    </Box>
  </Paper>
);

const SqlSetOperatorsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header */}
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        📘 Prepared by <strong>Rishab Informatica Group</strong>
      </Typography>

      {/* Title */}
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        🤝 SQL Set Operators: UNION, UNION ALL, INTERSECT, MINUS (EXCEPT)
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" mb={3}>
        SQL Set Operators are powerful tools used to combine the results of two or more SELECT statements into a single result set.
        These operators work on the principle of vertical merging of data, meaning they combine rows from different queries.
        For these operators to work, the SELECT statements must have:
        <ul>
          <li>The same number of columns.</li>
          <li>The columns must have similar data types.</li>
          <li>The columns must be in the same order.</li>
        </ul>
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Sample Table Structures */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        📊 Sample Table Structures
      </Typography>
      <Typography variant="body2" mb={2}>
        Let's consider the following table structures for our examples:
      </Typography>
      <SqlCodeBlock code={`CREATE TABLE Stud_union_A
(
  Stud_id NUMBER(20),
  Stud_name VARCHAR2(30),
  Mobile_no NUMBER(20),
  Country VARCHAR2(20)
);`} />
      <SqlCodeBlock code={`CREATE TABLE Stud_union_B
(
  Stud_id NUMBER(20),
  Stud_name VARCHAR2(30),
  Mobile_no NUMBER(20),
  Country VARCHAR2(20)
);`} />
      <SqlCodeBlock code={`CREATE TABLE T_Stud_union
(
  Stud_id NUMBER(20),
  Stud_name VARCHAR2(30),
  Mobile_no NUMBER(20),
  Country VARCHAR2(20)
);`} />

      {/* Sample Data */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        ➕ Sample Data for Stud_union_A and Stud_union_B
      </Typography>
      <Typography variant="body2" mb={2}>
        To demonstrate the set operators, let's populate our tables with some sample data:
      </Typography>
      <SqlCodeBlock code={`INSERT INTO Stud_union_A
VALUES (100, 'Rishab', 1212121212, 'Brazil');
INSERT INTO Stud_union_A
VALUES (101, 'Naresh', 1414141414, 'Canada');
INSERT INTO Stud_union_A
VALUES (102, 'Hari', 9448005273, 'India');
INSERT INTO Stud_union_A
VALUES (103, 'Deva', 7878707878, 'Germany');
INSERT INTO Stud_union_A
VALUES (104, 'Hemanth', 1313131313, 'Denmark');
INSERT INTO Stud_union_A
VALUES (100, 'Rishab', 1212121212, 'Brazil');`} />
      <SqlCodeBlock code={`INSERT INTO Stud_union_B
VALUES (100, 'Rishab', 1212121212, 'Brazil');
INSERT INTO Stud_union_B
VALUES (101, 'Naresh', 1414141414, 'Canada');
INSERT INTO Stud_union_B
VALUES (105, 'Sonakshi', 9112324567, 'India');
INSERT INTO Stud_union_B
VALUES (106, 'Mahesh', 2323232323, 'India');
INSERT INTO Stud_union_B
VALUES (104, 'Hemanth', 1313131313, 'Denmark');`} />

      <Divider sx={{ my: 3 }} />

      {/* UNION */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        1️⃣ UNION Operator
      </Typography>
      <Typography variant="body2" mb={2}>
        The UNION operator combines the result sets of two or more SELECT statements and returns only the <strong>distinct rows</strong>.
        If there are duplicate rows across the combined result sets, UNION will only include one instance of that row.
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM Stud_union_A
UNION
SELECT * FROM Stud_union_B;`} />
      <OutputDisplay
        title="Expected SQL Output (Distinct Rows):"
        output={`STUD_ID | STUD_NAME | MOBILE_NO  | COUNTRY
------------------------------------------------
100     | Rishab    | 1212121212 | Brazil
101     | Naresh    | 1414141414 | Canada
102     | Hari      | 9448005273 | India
103     | Deva      | 7878707878 | Germany
104     | Hemanth   | 1313131313 | Denmark
105     | Sonakshi  | 9112324567 | India
106     | Mahesh    | 2323232323 | India`}
        bgColor="#e8f5e9"
        titleColor="success.dark"
      />

      {/* UNION ALL */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        2️⃣ UNION ALL Operator
      </Typography>
      <Typography variant="body2" mb={2}>
        The UNION ALL operator combines the result sets of two or more SELECT statements and returns <strong>all rows</strong>, including duplicates.
        It does not perform any duplicate checking, making it generally faster than UNION.
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM Stud_union_A
UNION ALL
SELECT * FROM Stud_union_B;`} />
      <OutputDisplay
        title="Expected SQL Output (All Rows, including Duplicates):"
        output={`STUD_ID | STUD_NAME | MOBILE_NO  | COUNTRY
------------------------------------------------
100     | Rishab    | 1212121212 | Brazil
101     | Naresh    | 1414141414 | Canada
102     | Hari      | 9448005273 | India
103     | Deva      | 7878707878 | Germany
104     | Hemanth   | 1313131313 | Denmark
100     | Rishab    | 1212121212 | Brazil
100     | Rishab    | 1212121212 | Brazil
101     | Naresh    | 1414141414 | Canada
105     | Sonakshi  | 9112324567 | India
106     | Mahesh    | 2323232323 | India
104     | Hemanth   | 1313131313 | Denmark`}
        bgColor="#e3f2fd"
        titleColor="info.dark"
      />

      {/* INTERSECT */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        3️⃣ INTERSECT Operator
      </Typography>
      <Typography variant="body2" mb={2}>
        The INTERSECT operator returns only the rows that are <strong>common to both</strong> SELECT statements.
        It implicitly removes duplicate rows from the final result set.
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM Stud_union_A
INTERSECT
SELECT * FROM Stud_union_B;`} />
      <OutputDisplay
        title="Expected SQL Output (Common Rows):"
        output={`STUD_ID | STUD_NAME | MOBILE_NO  | COUNTRY
------------------------------------------------
100     | Rishab    | 1212121212 | Brazil
101     | Naresh    | 1414141414 | Canada
104     | Hemanth   | 1313131313 | Denmark`}
        bgColor="#fff3e0"
        titleColor="warning.dark"
      />

      {/* MINUS / EXCEPT */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
        4️⃣ MINUS / EXCEPT Operator
      </Typography>
      <Typography variant="body2" mb={2}>
        The MINUS operator (called EXCEPT in some SQL dialects like SQL Server and PostgreSQL) returns all unique rows
        from the first SELECT statement that are <strong>not present</strong> in the second SELECT statement.
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Example 1: Stud_union_A MINUS Stud_union_B</strong>
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM Stud_union_A
MINUS
SELECT * FROM Stud_union_B;`} />
      <OutputDisplay
        title="Expected SQL Output (Rows in A but not in B):"
        output={`STUD_ID | STUD_NAME | MOBILE_NO  | COUNTRY
------------------------------------------------
102     | Hari      | 9448005273 | India
103     | Deva      | 7878707878 | Germany`}
        bgColor="#ffebee"
        titleColor="error.dark"
      />
      <Typography variant="body2" gutterBottom>
        <strong>Example 2: Stud_union_B MINUS Stud_union_A</strong>
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM Stud_union_B
MINUS
SELECT * FROM Stud_union_A;`} />
      <OutputDisplay
        title="Expected SQL Output (Rows in B but not in A):"
        output={`STUD_ID | STUD_NAME | MOBILE_NO  | COUNTRY
------------------------------------------------
105     | Sonakshi  | 9112324567 | India
106     | Mahesh    | 2323232323 | India`}
        bgColor="#ffebee"
        titleColor="error.dark"
      />

      <Divider sx={{ my: 5 }} />

      {/* SQL vs. Informatica Comparison */}
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        🔄 SQL Set Operators vs. Informatica Union Transformation: An Opposite View
      </Typography>
      <Typography variant="body1" mb={3}>
        It's crucial to understand that the behavior of UNION and UNION ALL in SQL is often perceived as "opposite" to
        the UNION Transformation in Informatica PowerCenter or IICS, especially concerning duplicate handling.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f0f4c3' }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          SQL Behavior:
        </Typography>
        <ul>
          <li>
            <strong>UNION in SQL:</strong> <Typography component="span" fontWeight="bold" color="success.dark">Removes duplicate rows</Typography> by default.
          </li>
          <li>
            <strong>UNION ALL in SQL:</strong> <Typography component="span" fontWeight="bold" color="info.dark">Does NOT remove duplicate rows</Typography>; it returns all rows, including duplicates.
          </li>
        </ul>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
          Informatica Union Transformation Behavior:
        </Typography>
        <ul>
          <li>
            <strong>UNION Transformation in Informatica:</strong> <Typography component="span" fontWeight="bold" color="error.dark">Does NOT remove duplicate rows</Typography> by default. It acts similar to SQL's UNION ALL.
            To remove duplicates, you typically need to add a Sorter transformation followed by a Distinct option or an Aggregator transformation downstream.
          </li>
          <li>
            <strong>To achieve SQL UNION behavior (remove duplicates) in Informatica:</strong> You would use the UNION Transformation and then explicitly add a Sorter transformation with the Distinct option checked.
          </li>
        </ul>
        <Typography variant="body2" mt={2}>
          This "opposite" nature is a common point of confusion for beginners transitioning between SQL and Informatica ETL tools.
        </Typography>
      </Paper>

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

export default SqlSetOperatorsPage;