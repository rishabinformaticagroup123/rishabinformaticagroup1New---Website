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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CodeBlock } from "@/components/ui/codeblock";
import Image from "next/image";

const SQLJoinsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        SQL Joins – Complete Beginner’s Guide
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Step 1: Create STUDENTS Table
        </Typography>
        <CodeBlock
          code={`CREATE TABLE STUDENTS (
  STUDENT_ID NUMBER(6),
  FIRST_NAME VARCHAR2(20),
  LAST_NAME VARCHAR2(25),
  EMAIL VARCHAR2(25),
  PHONE_NUMBER VARCHAR2(20),
  JOINING_DATE DATE,
  SPECIALIZATION VARCHAR2(20),
  STIPEND NUMBER(10,2),
  BONUS NUMBER(10,2),
  MANAGER_ID NUMBER(6),
  COORDINATOR_ID NUMBER(10)
);`}
        />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Then use Oracle SQL Developer to import a CSV file. Follow these steps:
        </Typography>
        <ol style={{ paddingLeft: 20 }}>
          <li>Right-click table → Import Data</li>
          <li>Choose your CSV file (e.g., SRC_FF_STUDENTS.csv)</li>
          <li>Match column mapping, click Next → Next → Finish</li>
        </ol>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Once done, you’re ready to practice join queries.
        </Typography>
      </Paper>

      <Box mb={4}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          What is a Join? Why Joins in Real Time?
        </Typography>
        <Typography>
          Joins allow combining data from multiple tables using common columns. In real-world databases, data is split across normalized tables to eliminate redundancy.
        </Typography>
        <Typography mt={2}>
          Examples:
          <ul>
            <li>Students → Coordinators, Address, Countries</li>
            <li>Employees → Departments, Locations, Countries</li>
            <li>Customers → Verticals, Products, Models</li>
          </ul>
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Types of Joins – SQL vs Informatica
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>SQL Join</strong></TableCell>
              <TableCell><strong>Informatica Join</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>INNER JOIN</TableCell>
              <TableCell>NORMAL JOIN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LEFT OUTER JOIN</TableCell>
              <TableCell>MASTER OUTER JOIN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RIGHT OUTER JOIN</TableCell>
              <TableCell>DETAIL OUTER JOIN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FULL OUTER JOIN</TableCell>
              <TableCell>FULL OUTER JOIN</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box mb={4}>
        <Image
          src="/images/sql-joins-diagram.png"
          alt="SQL Joins Diagram"
          width={800}
          height={400}
        />
      </Box>

      <Box>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Join Methods: Implicit vs ANSI
        </Typography>

        {[
          {
            title: "🔹 Implicit Method – INNER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 ANSI Method – INNER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S JOIN COORDINATORS C
ON S.COORDINATOR_ID = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 Implicit Method – LEFT OUTER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+);`,
          },
          {
            title: "🔹 ANSI Method – LEFT OUTER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S LEFT JOIN COORDINATORS C
ON S.COORDINATOR_ID = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 Implicit Method – RIGHT OUTER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S, COORDINATORS C
WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 ANSI Method – RIGHT OUTER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S RIGHT JOIN COORDINATORS C
ON S.COORDINATOR_ID = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 Implicit Workaround – FULL OUTER JOIN",
            code: `SELECT ... FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+)
UNION
SELECT ... FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 ANSI Method – FULL OUTER JOIN",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID
FROM STUDENTS S FULL JOIN COORDINATORS C
ON S.COORDINATOR_ID = C.COORDINATOR_ID;`,
          },
          {
            title: "🔹 Join with 3 Tables",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID, A.COUNTRY_ID
FROM STUDENTS S, COORDINATORS C, ADDRESS A
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND C.LOCATION_ID = A.LOCATION_ID;`,
          },
          {
            title: "🔹 3 Tables + Filter Country = 'UK'",
            code: `SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID, A.COUNTRY_ID
FROM STUDENTS S, COORDINATORS C, ADDRESS A
WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND C.LOCATION_ID = A.LOCATION_ID AND A.COUNTRY_ID = 'UK';`,
          },
        ].map((item, idx) => (
          <Accordion key={idx} defaultExpanded={idx === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CodeBlock code={item.code} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box textAlign="center" mt={6}>
        <Typography variant="h6" gutterBottom>
          Call / WhatsApp: 8970853557 / 9448005273
        </Typography>
        <Button variant="contained" color="primary">
          Join IICS Combo Training
        </Button>
      </Box>
    </Container>
  );
};

export default SQLJoinsPage;
