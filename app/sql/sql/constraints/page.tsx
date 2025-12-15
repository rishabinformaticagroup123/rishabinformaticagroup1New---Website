"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
} from "@mui/material";

const SqlConstraintsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        📌 SQL Constraints – Practical Demo
      </Typography>

      <Typography variant="body1" mb={3}>
        Learn how <strong>constraints control data</strong> using parent-child relationships and validate entries in your database.
      </Typography>

      {/* Parent & Child Table Relationship */}
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        🔗 Parent-Child Table Relationship
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4} mb={4}>
        {/* Parent Table */}
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ bgcolor: "#C8E6C9", p: 1 }}>
            PARENT TABLE: COURSE
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#FFF9C4" }}>
                <TableRow>
                  <TableCell><strong>COURSE_ID (PK)</strong></TableCell>
                  <TableCell><strong>COURSE_NAME</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[["100", "IICS_CLOUD"], ["200", "IPS"], ["300", "IICS_COMBO"], ["400", "TALEND"]].map(
                  ([id, name]) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Child Table */}
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ bgcolor: "#FFE0B2", p: 1 }}>
            CHILD TABLE: STUDENTS (with constraints)
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#e0f7fa" }}>
                  <TableCell sx={{ bgcolor: "#FFF9C4" }}><strong>STUD_ID (PK)</strong></TableCell>
                  <TableCell sx={{ bgcolor: "#FFCDD2" }}><strong>STUD_NAME (NOT NULL)</strong></TableCell>
                  <TableCell sx={{ bgcolor: "#E1BEE7" }}><strong>MOBILE_NO (UNIQUE)</strong></TableCell>
                  <TableCell sx={{ bgcolor: "#BBDEFB" }}><strong>AGE (CHECK ≥ 19)</strong></TableCell>
                  <TableCell sx={{ bgcolor: "#C8E6C9" }}><strong>COURSE_ID (FK)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  ["100", "NARESH", "9191919191", "25", "100"],
                  ["101", "RISHAB", "8080808080", "27", "200"],
                  ["102", "HARI", "9060505750", "49", "300"],
                ].map(([id, name, mobile, age, course]) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{mobile}</TableCell>
                    <TableCell>{age}</TableCell>
                    <TableCell>{course}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Paper sx={{ p: 3, bgcolor: "#FFF8E1", mb: 4 }}>
        <Typography fontWeight={600}>
          🧠 Key Concept: <span style={{ color: "#1565C0" }}>Referential Integrity</span>
        </Typography>
        <Typography variant="body2">
          The child table (STUDENTS) cannot insert a <strong>COURSE_ID</strong> unless it exists in the parent table (COURSE).
        </Typography>
        <Typography mt={1} fontWeight={600} color="error">
          ❌ Example: COURSE_ID 700 will be rejected.
        </Typography>
      </Paper>

      {/* Successful INSERTs */}
      <Typography variant="h6" fontWeight={600} color="green" mb={2}>
        ✅ Successful INSERT Examples
      </Typography>
      {[
        `INSERT INTO IT_STUDENTS VALUES(1000, 'RISHAB', 9448005273, 20, 100);`,
        `INSERT INTO IT_STUDENTS VALUES(1001, 'HARI', 9448005278, 21, 100);`,
        `INSERT INTO IT_STUDENTS VALUES(1002, 'NARESH', 9448005279, 21, 100);`,
      ].map((query, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2, border: "1px solid #C8E6C9" }}>
          <Box component="pre" sx={{ bgcolor: "#f1f8e9", p: 1, borderRadius: 1 }}>{query}</Box>
          <Typography color="green">✓ Success - All constraints satisfied</Typography>
        </Paper>
      ))}

      {/* Failed INSERTs */}
      <Typography variant="h6" fontWeight={600} color="error" mt={5} mb={2}>
        ❌ Failed INSERT Examples (Constraint Violations)
      </Typography>

      {[
        {
          sql: `INSERT INTO IT_STUDENTS VALUES(1002, 'GOPI', 8989898989, 24, 100);`,
          error: "ORA-00001: unique constraint violated (PRIMARY KEY)",
          reason: "STUD_ID 1002 already exists",
        },
        {
          sql: `INSERT INTO IT_STUDENTS VALUES(1003, NULL, 8989898981, 24, 200);`,
          error: "ORA-01400: cannot insert NULL into STUD_NAME",
          reason: "STUD_NAME cannot be NULL",
        },
        {
          sql: `INSERT INTO IT_STUDENTS VALUES(1003, 'GOPI', 8989898989, 24, 200);`,
          error: "ORA-00001: unique constraint violated (MOBILE_NO)",
          reason: "Mobile number already exists",
        },
        {
          sql: `INSERT INTO IT_STUDENTS VALUES(1003, 'GOPI', 8989898981, 17, 200);`,
          error: "ORA-02290: check constraint violated (AGE ≥ 19)",
          reason: "Age must be ≥ 19",
        },
        {
          sql: `INSERT INTO IT_STUDENTS VALUES(1003, 'GOPI', 89898989, 24, 200);`,
          error: "ORA-02290: check constraint violated (MOBILE_NO must be 10 digits)",
          reason: "Mobile number too short",
        },
        {
          sql: `INSERT INTO IT_STUDENTS VALUES(1003, 'GOPI', 8989898981, 24, 700);`,
          error: "ORA-02291: foreign key constraint fails",
          reason: "COURSE_ID 700 not found in COURSE table",
        },
      ].map((row, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2, border: "1px solid #EF9A9A" }}>
          <Box component="pre" sx={{ bgcolor: "#ffebee", p: 1, borderRadius: 1 }}>{row.sql}</Box>
          <Typography color="error" fontWeight={600}>
            {row.error}
          </Typography>
          <Typography variant="body2">{row.reason}</Typography>
        </Paper>
      ))}

      {/* Summary */}
      <Box mt={5} p={3} bgcolor="#F5F5F5" borderRadius={2}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          📝 SQL Constraint Summary
        </Typography>
        <List>
          <ListItem><strong>PRIMARY KEY</strong> – Unique and NOT NULL</ListItem>
          <ListItem><strong>NOT NULL</strong> – Cannot be empty</ListItem>
          <ListItem><strong>UNIQUE</strong> – No duplicates allowed</ListItem>
          <ListItem><strong>CHECK</strong> – Ensures value meets a condition (e.g., age ≥ 19)</ListItem>
          <ListItem><strong>FOREIGN KEY</strong> – Must exist in parent table</ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default SqlConstraintsPage;
