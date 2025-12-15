"use client";

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
} from "@mui/material";
import Image from "next/image";
import { Download } from "lucide-react";

const DownloadCard = ({ title, fileUrl }: { title: string; fileUrl: string }) => (
  <Card sx={{ bgcolor: "#0D47A1", color: "white", mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
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
      {/* Step 0: YouTube Video and Oracle 11g Installation */}
      <Typography variant="h4" fontWeight={700} color="#0D47A1" gutterBottom>
        📹 Watch the Tutorial: Oracle 11g Setup and Data Import
      </Typography>
      <Box sx={{ mb: 4 }}>
        <iframe
          width="100%"
          height="400"
          src= https://www.youtube.com/embed/YOUR_VIDEO_ID  // Replace with your actual YouTube video ID
          title="Oracle 11g Setup and Data Import"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>

      <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
        📥 Step 1: Install Oracle 11g
      </Typography>
      <Typography variant="body1" color="#1565C0" gutterBottom>
        Before you begin with SQL practice, you need to install Oracle 11g. Please follow the link below to get detailed instructions:
      </Typography>
      <Typography variant="body1" color="#1976D2" gutterBottom>
        👉 Install Oracle 11g: <a href="https://www.oracle.com/database/technologies/appdev/xe.html" target="_blank">Oracle 11g Installation Guide</a>
      </Typography>

      <Typography variant="body2" color="#1E88E5" gutterBottom>
        🔹 After installation, you can start the Oracle Database and connect to it using Oracle SQL Developer.
      </Typography>

      {/* Continue with the Import Data Steps */}
      <Typography variant="h4" fontWeight={700} color="#0D47A1" gutterBottom>
        📥 Import Essential Tables to Start SQL Practice
      </Typography>

      <Typography variant="h6" color="#1565C0" gutterBottom>
        Before starting SQL practice, create and import the following tables:
      </Typography>
      <Typography variant="body1" color="#1976D2" gutterBottom>
        ✅ STUDENTS<br />✅ COORDINATORS<br />✅ ADDRESS
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Step 1: STUDENTS Table */}
      <Box>
        <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
          Step 1: Create STUDENTS Table
        </Typography>
        <Box
          component="pre"
          sx={{ bgcolor: "#263238", color: "#fff", p: 2, borderRadius: 2 }}
        >
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
        <DownloadCard
          title="Download Students CSV"
          fileUrl="/csv/students.csv"
        />

        <Typography variant="h6" mt={3} mb={2} color="#1565C0">
          📸 Step-by-Step: Import CSV using Oracle SQL Developer
        </Typography>

        <Typography variant="body1" color="#1565C0">
          👉 Run this SQL first to check data preview:
        </Typography>
        <Box
          component="pre"
          sx={{ bgcolor: "#263238", color: "#fff", p: 2, borderRadius: 2 }}
        >
          SELECT * FROM STUDENTS;
        </Box>
        <Image
          src="/images/select1.csv"
          alt="Before Import Preview"
          width={800}
          height={250}
          style={{ borderRadius: 8, marginBottom: 32 }}
        />

        <Typography variant="body1" color="#1E88E5" mb={2}>
          🔹 Right-click on <strong>STUDENTS</strong> table → Click <strong>Import Data</strong>
        </Typography>
        <Image
          src="/images/importcsv1.png"
          alt="Step 1: Import Data"
          width={800}
          height={500}
          style={{ borderRadius: 8, marginBottom: 24 }}
        />

        <Typography variant="body1" color="#1E88E5" mb={2}>
          🔹 Browse & choose downloaded CSV file (e.g., <code>STUDENTS.csv</code>) and click <strong>Next</strong>
        </Typography>
        <Image
          src="/images/importcsv2.png"
          alt="Step 2: Choose CSV"
          width={800}
          height={500}
          style={{ borderRadius: 8, marginBottom: 24 }}
        />
        
        {/* Repeat the steps as in your original code */}
        {/* ... Rest of the import steps (including images, Next, Finish, etc.) */}

        <Typography variant="body1" color="#1565C0">
          ✅ Run SELECT query again to see imported records:
        </Typography>
        <Box
          component="pre"
          sx={{ bgcolor: "#263238", color: "#fff", p: 2, borderRadius: 2 }}
        >
          SELECT * FROM STUDENTS;
        </Box>
        <Image
          src="/images/select2.png"
          alt="After Import Preview"
          width={800}
          height={300}
          style={{ borderRadius: 8, marginBottom: 32 }}
        />
      </Box>

      {/* Step 2: Coordinators */}
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
          Step 2: Create COORDINATORS Table
        </Typography>
        <Box
          component="pre"
          sx={{ bgcolor: "#263238", color: "#fff", p: 2, borderRadius: 2 }}
        >
          {`CREATE TABLE COORDINATORS (
  COORDINATOR_ID NUMBER(20),
  COORDINATOR_NAME VARCHAR2(30),
  MANAGER_ID NUMBER(20),
  LOCATION_ID NUMBER(20)
);`}
        </Box>
        <DownloadCard
          title="Download Coordinators CSV"
          fileUrl="/csv/COORDINATORS.csv"
        />
        <Typography variant="body2" mt={2} color="#1E88E5">
          📌 Follow the same steps shown above to import this file.
        </Typography>
      </Box>

      {/* Step 3: Address */}
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h5" fontWeight={600} color="#0D47A1" gutterBottom>
          Step 3: Create ADDRESS Table
        </Typography>
        <Box
          component="pre"
          sx={{ bgcolor: "#263238", color: "#fff", p: 2, borderRadius: 2 }}
        >
          {`CREATE TABLE ADDRESS (
  LOCATION_ID NUMBER(20),
  STREET_ADDRESS VARCHAR2(30),
  POSTAL_CODE NUMBER(20),
  CITY VARCHAR2(30),
  STATE_PROVINCE VARCHAR2(30),
  COUNTRY_ID NUMBER(20)
);`}
        </Box>
        <DownloadCard
          title="Download Address CSV"
          fileUrl="/csv/ADDRESS.csv"
        />
        <Typography variant="body2" mt={2} color="#1E88E5">
          📌 Follow the same steps shown above to import this file.
        </Typography>
      </Box>
    </Container>
  );
};

export default ImportCSVPage;
