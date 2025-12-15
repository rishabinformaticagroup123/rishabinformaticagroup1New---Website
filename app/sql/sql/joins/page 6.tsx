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

      <Typography variant="body1" mb={4} color="#1565C0">
        👉 Before practicing these queries, make sure you have created and imported the required CSV tables. You can follow this step-by-step guide:
        <br />
        🔗 <Link href="/study-materials/sql/import-csv">Click here: How to Create Table & Import CSV</Link>
      </Typography>

      <Typography variant="h5" fontWeight={600} gutterBottom color="#0D47A1">
        🔍 Why Use Joins in Real Time?
      </Typography>
      <Typography mb={2} color="#1565C0">
        Joins allow us to combine data from multiple related tables using keys. They help maintain normalization and retrieve meaningful results without duplicating data.
      </Typography>
      <ul style={{ paddingLeft: 20, color: '#1976D2', marginBottom: 24 }}>
        <li>Students → Coordinators, Address, Countries</li>
        <li>Employees → Departments, Locations, Countries</li>
        <li>Customers → Verticals, Products, Models</li>
      </ul>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom color="#0D47A1">
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

      <Typography variant="h5" fontWeight={600} gutterBottom color="#0D47A1">
        🧠 Understanding Each Join Type
      </Typography>
      <ul style={{ paddingLeft: 20, color: '#1976D2' }}>
        <li><strong>INNER JOIN</strong>: Returns only matching rows from both tables.</li>
        <li><strong>LEFT OUTER JOIN</strong>: Returns all records from the left table and matching rows from the right.</li>
        <li><strong>RIGHT OUTER JOIN</strong>: Returns all records from the right table and matching rows from the left.</li>
        <li><strong>FULL OUTER JOIN</strong>: Combines LEFT and RIGHT joins; returns all records with matches where available.</li>
        <li><strong>SELF JOIN</strong>: A table joins with itself to compare rows in the same table.</li>
      </ul>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom color="#0D47A1">
        🔄 Join Query Examples (Practice)
      </Typography>

      <Typography variant="subtitle1" fontWeight={600} color="#1565C0">🔹 INNER JOIN (Implicit)</Typography>
      <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, C.COORDINATOR_NAME\nFROM STUDENTS S, COORDINATORS C\nWHERE S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

      <Typography variant="subtitle1" fontWeight={600} color="#1565C0">🔹 INNER JOIN (ANSI)</Typography>
      <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, C.COORDINATOR_NAME\nFROM STUDENTS S JOIN COORDINATORS C\nON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

      <Typography variant="subtitle1" fontWeight={600} color="#1565C0">🔹 LEFT OUTER JOIN</Typography>
      <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, C.COORDINATOR_NAME\nFROM STUDENTS S LEFT JOIN COORDINATORS C\nON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

      <Typography variant="subtitle1" fontWeight={600} color="#1565C0">🔹 RIGHT OUTER JOIN</Typography>
      <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, C.COORDINATOR_NAME\nFROM STUDENTS S RIGHT JOIN COORDINATORS C\nON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

      <Typography variant="subtitle1" fontWeight={600} color="#1565C0">🔹 FULL OUTER JOIN</Typography>
      <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, C.COORDINATOR_NAME\nFROM STUDENTS S FULL OUTER JOIN COORDINATORS C\nON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

      <Typography variant="subtitle1" fontWeight={600} color="#1565C0">🔹 SELF JOIN</Typography>
      <CodeBlock code={`SELECT A.STUDENT_ID, A.FIRST_NAME, B.FIRST_NAME AS MENTOR_NAME\nFROM STUDENTS A JOIN STUDENTS B\nON A.MANAGER_ID = B.STUDENT_ID;`} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom color="#0D47A1">
        📝 Practice Quiz
      </Typography>
      <Typography variant="body1" color="#1565C0">
        ✅ Which join returns unmatched rows from both tables?<br />
        ✅ Write a query to get all students who don't have a coordinator assigned.<br />
        ✅ Identify incorrect join usage from a given query.
      </Typography>

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
