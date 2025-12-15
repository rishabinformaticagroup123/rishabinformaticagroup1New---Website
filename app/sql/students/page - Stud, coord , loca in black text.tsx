"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/codeblock";

const CSVImportPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        📥 Import Essential Tables to Start SQL Practice
      </Typography>

      <Typography variant="body1" mt={2}>
        In order to begin your SQL practice, it is essential to first create and
        import the following 3 tables using CSV files:
      </Typography>

      <ul style={{ marginTop: 12 }}>
        <li>✅ STUDENTS</li>
        <li>✅ COORDINATORS</li>
        <li>✅ ADDRESS</li>
      </ul>

      <Typography mt={3}>
        We will show step-by-step screenshots for importing the <b>STUDENTS</b>
        table. You can follow the same steps for the other two tables.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* STUDENTS TABLE */}
      <Paper elevation={3} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          🧾 1. Create STUDENTS Table
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

        <Box mt={2}>
          <Link href="/files/STUDENTS.csv" download>
            <Button startIcon={<Download />} variant="contained">
              Download STUDENTS.csv
            </Button>
          </Link>
        </Box>

        <Typography mt={3}>
          Now follow the below screenshots to import the file:
        </Typography>

        {[1, 2, 3, 4, 5].map((n) => (
          <Box mt={3} key={n}>
            <Image
              src={`/images/import-students-step${n}.png`}
              alt={`Import step ${n}`}
              width={800}
              height={400}
              style={{ border: "1px solid #ccc", borderRadius: 8 }}
            />
          </Box>
        ))}

        <Typography mt={3}>
          ✅ Once done, you can run the following query to preview the data:
        </Typography>

        <CodeBlock code={`SELECT * FROM STUDENTS;`} />
      </Paper>

      {/* COORDINATORS TABLE */}
      <Paper elevation={2} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          🧾 2. Create COORDINATORS Table
        </Typography>
        <CodeBlock
          code={`CREATE TABLE COORDINATORS (
  COORDINATOR_ID NUMBER(20),
  COORDINATOR_NAME VARCHAR2(30),
  MANAGER_ID NUMBER(20),
  LOCATION_ID NUMBER(20)
);`}
        />

        <Box mt={2}>
          <Link href="/files/COORDINATORS.csv" download>
            <Button startIcon={<Download />} variant="contained" color="success">
              Download COORDINATORS.csv
            </Button>
          </Link>
        </Box>

        <Typography mt={3}>
          Follow the same import steps as shown for STUDENTS.
        </Typography>
      </Paper>

      {/* ADDRESS TABLE */}
      <Paper elevation={2} sx={{ p: 4, mb: 5 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          🧾 3. Create ADDRESS Table
        </Typography>
        <CodeBlock
          code={`CREATE TABLE ADDRESS (
  LOCATION_ID NUMBER(20),
  STREET_ADDRESS VARCHAR2(30),
  POSTAL_CODE NUMBER(20),
  CITY VARCHAR2(30),
  STATE_PROVINCE VARCHAR2(30),
  COUNTRY_ID NUMBER(20)
);`}
        />

        <Box mt={2}>
          <Link href="/files/ADDRESS.csv" download>
            <Button startIcon={<Download />} variant="contained" color="warning">
              Download ADDRESS.csv
            </Button>
          </Link>
        </Box>

        <Typography mt={3}>
          Again, use the same steps as shown in the STUDENTS import section.
        </Typography>
      </Paper>

      <Typography textAlign="center" mt={6}>
        🟢 You’re now ready to begin your SQL Journey with Joins and Queries!
      </Typography>
    </Container>
  );
};

export default CSVImportPage;
