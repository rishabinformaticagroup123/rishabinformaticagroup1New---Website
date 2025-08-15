"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { CodeBlock } from "@/components/ui/codeblock";
import Image from "next/image";
import Link from "next/link";

const SQLJoinsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="#0D47A1">
        Step-by-Step Guide to SQL Joins with Examples
      </Typography>

      <Typography variant="body1" color="#1565C0" mb={4}>
        Joins are crucial in SQL to fetch data from multiple related tables. Below we explore
        <strong> Implicit </strong> (Oracle legacy) and <strong> ANSI </strong> (American National Standards Institute) join syntaxes.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h6" gutterBottom color="#0D47A1">
          📎 Practice Dataset Setup
        </Typography>
        <Typography>
          👉 To practice all the joins below, first <Link href="/study-materials/sql/csv-import">click here</Link> to learn how to <strong>create & import CSV files</strong> for tables: STUDENTS, COORDINATORS, and ADDRESS.
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        🧠 Understanding Join Types
      </Typography>
      <ul style={{ paddingLeft: 20, color: '#1976D2' }}>
        <li><strong>INNER JOIN:</strong> Returns only matching rows from both tables.</li>
        <li><strong>LEFT OUTER JOIN:</strong> All rows from the left table + matched rows from the right table.</li>
        <li><strong>RIGHT OUTER JOIN:</strong> All rows from the right table + matched rows from the left table.</li>
        <li><strong>FULL OUTER JOIN:</strong> All rows from both tables. Nulls where no match.</li>
        <li><strong>SELF JOIN:</strong> A table joins to itself.</li>
      </ul>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        🔍 Why Use Joins in Real Time?
      </Typography>
      <Typography color="#1565C0">
        Joins help normalize data (reduce repetition) across related tables:
      </Typography>
      <ul style={{ paddingLeft: 20, color: '#1976D2' }}>
        <li>Students → Coordinators, Address</li>
        <li>Employees → Departments, Locations</li>
        <li>Customers → Products, Regions</li>
      </ul>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        ⚖️ SQL Joins vs Informatica Joins
      </Typography>
      <Table sx={{ mb: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>SQL Join</strong></TableCell>
            <TableCell><strong>Informatica Join</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow><TableCell>INNER JOIN</TableCell><TableCell>NORMAL JOIN</TableCell></TableRow>
          <TableRow><TableCell>LEFT OUTER JOIN</TableCell><TableCell>MASTER OUTER JOIN</TableCell></TableRow>
          <TableRow><TableCell>RIGHT OUTER JOIN</TableCell><TableCell>DETAIL OUTER JOIN</TableCell></TableRow>
          <TableRow><TableCell>FULL OUTER JOIN</TableCell><TableCell>FULL OUTER JOIN</TableCell></TableRow>
        </TableBody>
      </Table>

      <Image src="/images/sql-joins-diagram.png" alt="SQL Joins Diagram" width={800} height={400} style={{ marginBottom: 32 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        🔄 Implicit Join Examples
      </Typography>

      <Typography color="#1565C0">🔹 INNER JOIN using Implicit method</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.EMAIL,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <Typography color="#1565C0">🔹 INNER JOIN with filter on Specialization</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
S.SPECIALIZATION,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND SPECIALIZATION = 'IICSCOMBO';`}
      />

      <Typography color="#1565C0">🔹 INNER JOIN with Specialization & Stipend Filter</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
S.SPECIALIZATION,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND SPECIALIZATION = 'POWERCENTER' AND STIPEND > 5000;`}
      />

      <Typography color="#1565C0" mt={4}>🔹 LEFT OUTER JOIN (Implicit)</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.EMAIL,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+);`}
      />

      <Typography color="#1565C0">🔹 RIGHT OUTER JOIN (Implicit)</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.EMAIL,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`}
      />

      <Typography color="#1565C0">🔹 FULL OUTER JOIN (Workaround using UNION)</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.EMAIL,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+)
UNION
SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.EMAIL,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`}
      />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        ✅ ANSI Join Examples (Recommended)
      </Typography>

      <Typography color="#1565C0">🔹 INNER JOIN (ANSI)</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <Typography color="#1565C0">🔹 Filtered ANSI INNER JOIN</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
S.SPECIALIZATION,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID
WHERE S.SPECIALIZATION = 'IICSCOMBO' AND S.STIPEND > 5000;`}
      />

      <Typography color="#1565C0">🔹 ANSI LEFT OUTER JOIN</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S LEFT JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <Typography color="#1565C0">🔹 ANSI RIGHT OUTER JOIN</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S RIGHT JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <Typography color="#1565C0">🔹 ANSI FULL OUTER JOIN</Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID
FROM STUDENTS S FULL JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        🔗 Joining 3 Tables Example
      </Typography>
      <Typography color="#1565C0" gutterBottom>
        📘 Example: Show UK students with coordinator & location
      </Typography>
      <CodeBlock
        code={`SELECT
S.STUDENT_ID,
S.FIRST_NAME,
S.EMAIL,
S.STIPEND,
C.COORDINATOR_NAME,
C.LOCATION_ID,
A.COUNTRY_ID
FROM STUDENTS S, COORDINATORS C, ADDRESS A
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID
AND C.LOCATION_ID = A.LOCATION_ID
AND A.COUNTRY_ID = 'UK';`}
      />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        🔁 SELF JOIN Example
      </Typography>
      <Typography color="#1565C0" gutterBottom>
        Self join allows comparing rows within the same table (e.g., employees reporting to managers).
      </Typography>
      <CodeBlock
        code={`SELECT
E1.STUDENT_ID,
E1.FIRST_NAME AS EMPLOYEE,
E2.FIRST_NAME AS MANAGER
FROM STUDENTS E1 JOIN STUDENTS E2
ON E1.MANAGER_ID = E2.STUDENT_ID;`}
      />

      <Box textAlign="center" mt={8}>
        <Typography variant="h6" gutterBottom color="#0D47A1">
          📞 Call / WhatsApp: 8970853557 / 9448005273
        </Typography>
        <Button variant="contained" color="primary">
          Join IICS Combo Training
        </Button>
      </Box>
    </Container>
  );
};

export default SQLJoinsPage;
