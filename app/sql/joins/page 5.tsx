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

const SQLJoinsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Step-by-Step Guide to SQL Joins with Examples
      </Typography>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        🔍 Why Use Joins in Real Time?
      </Typography>
      <Typography mb={2}>
        Joins are used to split large, repetitive data into smaller related tables (normalization). It reduces redundancy and improves performance.
      </Typography>
      <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
        <li>Students → Coordinators, Address, Countries</li>
        <li>Employees → Departments, Locations, Countries</li>
        <li>Customers → Verticals, Products, Models</li>
      </ul>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        📘 SQL Joins vs Informatica Joins
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

      <Typography variant="h5" fontWeight={600} gutterBottom>
        🧪 Practice Examples – Implicit Method
      </Typography>
      <CodeBlock
        code={`-- INNER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <CodeBlock
        code={`-- INNER JOIN with Specialization filter
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, S.SPECIALIZATION, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND SPECIALIZATION = 'IICSCOMBO';`}
      />

      <CodeBlock
        code={`-- INNER JOIN with multiple conditions
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, S.SPECIALIZATION, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND SPECIALIZATION = 'POWERCENTER' AND STIPEND > 5000;`}
      />

      <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
        🔄 ANSI Method Examples
      </Typography>
      <CodeBlock
        code={`-- ANSI INNER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />
      <CodeBlock
        code={`-- ANSI JOIN with filters
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, S.SPECIALIZATION, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID
WHERE S.SPECIALIZATION = 'IICSCOMBO' AND S.STIPEND > 5000;`}
      />

      <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
        🧩 Left / Right / Full Outer Joins
      </Typography>
      <CodeBlock
        code={`-- Implicit LEFT OUTER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+);`}
      />
      <CodeBlock
        code={`-- ANSI LEFT OUTER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S LEFT JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />
      <CodeBlock
        code={`-- Implicit RIGHT OUTER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`}
      />
      <CodeBlock
        code={`-- ANSI RIGHT OUTER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S RIGHT JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />
      <CodeBlock
        code={`-- Implicit FULL OUTER JOIN workaround
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+)
UNION
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`}
      />
      <CodeBlock
        code={`-- ANSI FULL OUTER JOIN
SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S FULL JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`}
      />

      <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
        🔗 Joining 3 Tables with Filter
      </Typography>
      <CodeBlock
        code={`-- JOIN with 3 tables
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID, A.COUNTRY_ID
FROM STUDENTS S, COORDINATORS C, ADDRESS A
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND C.LOCATION_ID = A.LOCATION_ID;`}
      />
      <CodeBlock
        code={`-- JOIN with filter for UK
SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID, A.COUNTRY_ID
FROM STUDENTS S, COORDINATORS C, ADDRESS A
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND C.LOCATION_ID = A.LOCATION_ID AND A.COUNTRY_ID = 'UK';`}
      />

      <Box textAlign="center" mt={8}>
        <Typography variant="h6" gutterBottom>
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
