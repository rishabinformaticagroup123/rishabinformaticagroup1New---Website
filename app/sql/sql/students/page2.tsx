""
'use client';

import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { Download } from "lucide-react";

const DownloadCard = ({ title, fileUrl }: { title: string; fileUrl: string }) => (
  <Card sx={{ bgcolor: '#0D47A1', color: 'white', mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
    </CardContent>
    <CardActions>
      <Button
        variant="contained"
        color="secondary"
        href={fileUrl}
        startIcon={<Download />}
        sx={{ ml: 2, mb: 1 }}
      >
        Download CSV
      </Button>
    </CardActions>
  </Card>
);

const ImportCSVPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="#0D47A1">
          📥 Import Essential Tables to Start SQL Practice
        </Typography>
        <Typography variant="h6" color="#1565C0" mt={2}>
          In order to begin your SQL practice, it is essential to first create and import the
          following 3 tables using CSV files:
        </Typography>
        <Typography variant="body1" color="#1976D2" mt={2}>
          ✅ STUDENTS<br />
          ✅ COORDINATORS<br />
          ✅ ADDRESS
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* STUDENTS Table */}
      <Box>
        <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
          Step 1: Create STUDENTS Table
        </Typography>
        <Box component="pre" sx={{ bgcolor: '#263238', color: '#fff', p: 2, borderRadius: 2, overflow: 'auto' }}>
{`CREATE TABLE STUDENTS (
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
        </Box>
        <DownloadCard title="Download Students CSV" fileUrl="/csv/STUDENTS.csv" />

        <Typography variant="h6" mt={4} mb={2} color="#1565C0">
          Follow these steps to import the CSV into SQL Developer:
        </Typography>
        <ol style={{ paddingLeft: 20, color: '#1E88E5' }}>
          <li>Right-click on the STUDENTS table → <strong>Import Data</strong></li>
          <li>Choose the downloaded CSV file</li>
          <li>Match the column mappings</li>
          <li>Click <strong>Next → Next → Finish</strong></li>
        </ol>

        <Box mt={4}>
          <Typography variant="body1" color="#1565C0">
            ✅ Preview using the following SQL query:
          </Typography>
          <Box component="pre" sx={{ bgcolor: '#263238', color: '#fff', p: 2, borderRadius: 2, overflow: 'auto' }}>
            SELECT * FROM STUDENTS;
          </Box>
          <Box mt={2}>
            <Image
              src="/images/students-preview.png"
              alt="Preview Students Table"
              width={800}
              height={300}
              style={{ border: '1px solid #ccc', borderRadius: 8 }}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* COORDINATORS Table */}
      <Box>
        <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
          Step 2: Create COORDINATORS Table
        </Typography>
        <Box component="pre" sx={{ bgcolor: '#263238', color: '#fff', p: 2, borderRadius: 2, overflow: 'auto' }}>
{`CREATE TABLE COORDINATORS (
  COORDINATOR_ID NUMBER(20),
  COORDINATOR_NAME VARCHAR2(30),
  MANAGER_ID NUMBER(20),
  LOCATION_ID NUMBER(20)
);`}
        </Box>
        <DownloadCard title="Download Coordinators CSV" fileUrl="/csv/COORDINATORS.csv" />

        <Typography variant="body2" mt={2} color="#1E88E5">
          📌 Follow the same steps used for STUDENTS to import this table.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ADDRESS Table */}
      <Box>
        <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
          Step 3: Create ADDRESS Table
        </Typography>
        <Box component="pre" sx={{ bgcolor: '#263238', color: '#fff', p: 2, borderRadius: 2, overflow: 'auto' }}>
{`CREATE TABLE ADDRESS (
  LOCATION_ID NUMBER(20),
  STREET_ADDRESS VARCHAR2(30),
  POSTAL_CODE NUMBER(20),
  CITY VARCHAR2(30),
  STATE_PROVINCE VARCHAR2(30),
  COUNTRY_ID NUMBER(20)
);`}
        </Box>
        <DownloadCard title="Download Address CSV" fileUrl="/csv/ADDRESS.csv" />

        <Typography variant="body2" mt={2} color="#1E88E5">
          📌 Follow the same steps used for STUDENTS to import this table.
        </Typography>
      </Box>
    </Container>
  );
};

export default ImportCSVPage;
