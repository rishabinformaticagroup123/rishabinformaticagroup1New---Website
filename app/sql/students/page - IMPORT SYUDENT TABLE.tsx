"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/codeblock";

const CsvImportGuidePage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        How to Create & Import STUDENTS Table (Step-by-Step Guide)
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          📥 Step 1: Download the CSV File
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/csv/SRC_FF_STUDENTS.csv"
          download
        >
          Click to Download CSV
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          🧱 Step 2: Run the CREATE TABLE Statement in SQL Developer
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
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          🧭 Step 3: Import the CSV File into the Table
        </Typography>
        <Typography variant="body1" gutterBottom>
          Open Oracle SQL Developer and follow these steps:
        </Typography>

        <ol style={{ paddingLeft: 20 }}>
          <li>Right-click on the STUDENTS table → Select <strong>Import Data</strong></li>
          <li>Select the downloaded <code>SRC_FF_STUDENTS.csv</code> file</li>
          <li>Match columns if required → Click <strong>Next</strong> → <strong>Next</strong></li>
          <li>Click <strong>Finish</strong> to complete the import</li>
        </ol>

        <Box mt={3}>
          <Image
            src="/images/import-step1.png"
            alt="Step 1: Right-click Import"
            width={700}
            height={400}
            style={{ marginBottom: 16 }}
          />
          <Image
            src="/images/import-step2.png"
            alt="Step 2: Select CSV File"
            width={700}
            height={400}
            style={{ marginBottom: 16 }}
          />
          <Image
            src="/images/import-step3.png"
            alt="Step 3: Next and Finish"
            width={700}
            height={400}
            style={{ marginBottom: 16 }}
          />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          ✅ Step 4: Verify the Table Content
        </Typography>
        <Typography>
          Run the below query to preview the imported records:
        </Typography>
        <CodeBlock code={`SELECT * FROM STUDENTS;`} />

        <Box mt={2}>
          <Image
            src="/images/select-students-preview.png"
            alt="Preview of SELECT * FROM STUDENTS"
            width={700}
            height={400}
          />
        </Box>
      </Paper>

      <Box textAlign="center" mt={6}>
        <Typography variant="h6" gutterBottom>
          Ready? Now head to the <Link href="/study-materials/sql/joins">SQL Joins Page</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default CsvImportGuidePage;
