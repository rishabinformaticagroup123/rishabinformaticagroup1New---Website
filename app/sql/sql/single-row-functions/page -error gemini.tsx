"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Reusing the SqlCodeBlock component from your previous pages
const SqlCodeBlock = ({ code, title }: { code: string; title?: string }) => (
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
      border: '1px solid #455a64',
    }}
  >
    {title && <Typography variant="caption" sx={{ color: '#bdbdbd', display: 'block', mb: 1 }}>{title}</Typography>}
    {code}
  </Box>
);

const SingleRowFunctionsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header */}
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        📘 Prepared by <strong>Rishab Informatica Group</strong>
      </Typography>

      {/* Title */}
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        ✨ SQL Single Row Functions: Master Data Manipulation
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" mb={3}>
        Single Row Functions (SRFs) are powerful tools in SQL that operate on individual rows and return one result for each row.
        They are crucial for transforming, formatting, and performing calculations on data directly within your `SELECT`, `WHERE`, and `ORDER BY` clauses.
        Let's explore the essential SRFs categorized by their purpose.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Table Setup Section */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        1. Setting Up the `STUDENTS` Table
      </Typography>
      <Typography variant="body2" mb={2}>
        We'll use a `STUDENTS` table for all our examples. Here's the `CREATE TABLE` statement and some sample data:
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              CREATE TABLE Statement
            </Typography>
            <SqlCodeBlock code={`CREATE TABLE STUDENTS
(
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
);`} />
            <Typography variant="body2" color="text.secondary">
              This table structure will be used for all function demonstrations.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Sample Data (INSERT Statements)
            </Typography>
            <SqlCodeBlock code={`INSERT INTO STUDENTS
VALUES (100, 'NARESH', 'KUMAR', 'naresh@email.com', '9876543210', TO_DATE('15-JAN-2005', 'DD-MON-YYYY'), 'Computer Science', 12000, 500, 10, 30);
INSERT INTO STUDENTS
VALUES (101, 'HEMANTH', 'MANYU', 'hemanth@email.com', '9876543211', TO_DATE('20-FEB-2005', 'DD-MON-YYYY'), 'Electronics', 8000, NULL, 10, 60);
INSERT INTO STUDENTS
VALUES (102, 'ABHI', 'KUMAR', 'abhi@email.com', '9876543212', TO_DATE('01-MAR-2006', 'DD-MON-YYYY'), 'Mechanical', 4500, 200, 20, 30);
INSERT INTO STUDENTS
VALUES (103, 'PAVAN', 'ERNST', 'pavan@email.com', '9876543213', TO_DATE('10-APR-2006', 'DD-MON-YYYY'), 'Civil', 18000, 1000, 20, 90);
INSERT INTO STUDENTS
VALUES (104, 'BRUCE', 'AUSTIN', 'bruce@email.com', '9876543214', TO_DATE('05-MAY-2007', 'DD-MON-YYYY'), 'Computer Science', 6000, NULL, 10, 60);
INSERT INTO STUDENTS
VALUES (105, 'DAVID', 'PATABALLA', 'david@email.com', '9876543215', TO_DATE('25-JUN-2007', 'DD-MON-YYYY'), 'Electronics', 9500, 300, 20, 90);
INSERT INTO STUDENTS
VALUES (106, 'VALLI', 'LORENTZ', 'valli@email.com', '9876543216', TO_DATE('08-JUL-2008', 'DD-MON-YYYY'), 'Mechanical', 3000, NULL, 10, 30);
INSERT INTO STUDENTS
VALUES (107, 'DIANA', 'GRAHAM', 'diana@email.com', '9876543217', TO_DATE('12-AUG-2008', 'DD-MON-YYYY'), 'Civil', 14000, 700, 20, 60);
INSERT INTO STUDENTS
VALUES (108, 'DANIEL', 'FAVIET', 'daniel@email.com', '9876543218', TO_DATE('03-SEP-2009', 'DD-MON-YYYY'), 'Computer Science', 7000, NULL, 10, 90);
INSERT INTO STUDENTS
VALUES (109, 'JOHN', 'SCIARRA', 'john@email.com', '9876543219', TO_DATE('18-OCT-2009', 'DD-MON-YYYY'), 'Electronics', 11000, 400, 20, 30);
`} />
            <Typography variant="body2" color="text.secondary">
              You can import this data into your Oracle/Snowflake database to practice the queries.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Basic SQL Concepts (for context) */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        2. Fundamental SQL Concepts (for context)
      </Typography>
      <Typography variant="body2" mb={2}>
        Before diving into single-row functions, let's quickly review some basic SQL commands often used with them.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `SELECT *` and Specific Columns
            </Typography>
            <Typography variant="body2" mb={1}>
              `SELECT *` retrieves all columns. You can also select specific columns.
            </Typography>
            <SqlCodeBlock code={`SELECT * FROM STUDENTS;`} title="Select all columns" />
            <SqlCodeBlock code={`SELECT STUDENT_ID, FIRST_NAME, EMAIL, JOINING_DATE FROM STUDENTS;`} title="Select specific columns" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `WHERE` Clause – Filtering Data
            </Typography>
            <Typography variant="body2" mb={1}>
              The `WHERE` clause filters rows based on specified conditions.
            </Typography>
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE STIPEND > 10000;`} title="Stipend greater than 10000" />
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE STIPEND BETWEEN 5000 AND 7000;`} title="Stipend between 5000 and 7000" />
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE COORDINATOR_ID IN (30, 60, 90);`} title="Coordinator ID in a list" />
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE BONUS IS NULL;`} title="Rows where BONUS is NULL" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `ROWNUM` and `ROWID` (Oracle Specific)
            </Typography>
            <Typography variant="body2" mb={1}>
              `ROWNUM` assigns a sequential number to rows returned by a query. `ROWID` is a unique address for each row.
            </Typography>
            <SqlCodeBlock code={`SELECT ROWNUM, ROWID, STUDENT_ID, FIRST_NAME FROM STUDENTS;`} title="Display ROWNUM and ROWID" />
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE ROWNUM <= 5;`} title="Get Top 5 rows" />
            <Typography variant="body2" color="error.dark" mt={1}>
              <strong>Note:</strong> `ROWNUM = N` (for N > 1) and `ROWNUM > N` are often tricky and might not return expected results without an `ORDER BY` in a subquery.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `COUNT(*)` vs `COUNT(Column)`
            </Typography>
            <Typography variant="body2" mb={1}>
              `COUNT(*)` counts all rows. `COUNT(column)` counts non-NULL values in a column.
            </Typography>
            <SqlCodeBlock code={`SELECT COUNT(*) FROM STUDENTS;`} title="Total number of rows" />
            <SqlCodeBlock code={`SELECT COUNT(BONUS) FROM STUDENTS;`} title="Count of non-NULL bonus values" />
            <SqlCodeBlock code={`SELECT COUNT(*) FROM STUDENTS WHERE BONUS IS NULL;`} title="Count of rows with NULL bonus" />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Column Manipulation Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        3. Column Manipulation Functions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Column Alias (`AS` keyword)
            </Typography>
            <Typography variant="body2" mb={1}>
              Assigns a temporary, more readable name to a column or expression in the result set.
            </Typography>
            <SqlCodeBlock code={`SELECT STUDENT_ID AS EMP_ID, FIRST_NAME, EMAIL FROM STUDENTS;`} title="Using AS keyword" />
            <SqlCodeBlock code={`SELECT STUDENT_ID EMP_ID, FIRST_NAME, EMAIL FROM STUDENTS;`} title="Without AS keyword" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Column Concatenation (`CONCAT` & `||`)
            </Typography>
            <Typography variant="body2" mb={1}>
              Combines two or more strings into a single string. `||` is generally preferred for multiple concatenations.
            </Typography>
            <SqlCodeBlock code={`SELECT CONCAT(FIRST_NAME, LAST_NAME) AS FULL_NAME FROM STUDENTS;`} title="CONCAT (two arguments only)" />
            <SqlCodeBlock code={`SELECT CONCAT(CONCAT(FIRST_NAME, ' '), LAST_NAME) AS FULL_NAME FROM STUDENTS;`} title="Nested CONCAT for three parts" />
            <SqlCodeBlock code={`SELECT FIRST_NAME || ' ' || LAST_NAME AS FULL_NAME FROM STUDENTS;`} title="Using pipe (||) operator (recommended)" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Column Calculation
            </Typography>
            <Typography variant="body2" mb={1}>
              Perform arithmetic operations directly on numeric columns.
            </Typography>
            <SqlCodeBlock code={`SELECT STUDENT_ID, STIPEND, STIPEND + 1000 AS NEW_STIPEND FROM STUDENTS;`} title="Add to stipend" />
            <SqlCodeBlock code={`SELECT STUDENT_ID, STIPEND, STIPEND * 12 AS ANNUAL_STIPEND FROM STUDENTS;`} title="Calculate annual stipend" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `DISTINCT` Keyword
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns only unique (non-duplicate) values from a specified column or set of columns.
            </Typography>
            <SqlCodeBlock code={`SELECT DISTINCT COORDINATOR_ID FROM STUDENTS;`} title="Unique Coordinator IDs" />
            <SqlCodeBlock code={`SELECT COUNT(DISTINCT COORDINATOR_ID) FROM STUDENTS;`} title="Count of unique Coordinator IDs" />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* String Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        4. String Functions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Case Conversion (`LOWER`, `UPPER`, `INITCAP`)
            </Typography>
            <Typography variant="body2" mb={1}>
              Functions to change the casing of string values.
            </Typography>
            <SqlCodeBlock code={`SELECT
  FIRST_NAME,
  LOWER(FIRST_NAME) AS lowercase,
  UPPER(FIRST_NAME) AS uppercase,
  INITCAP(FIRST_NAME) AS propercase
FROM STUDENTS;`} />
            <List dense sx={{ mt: 1 }}>
              <ListItem disablePadding><ListItemText primary="• LOWER(): Converts string to lowercase." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• UPPER(): Converts string to uppercase." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• INITCAP(): Capitalizes the first letter of each word." /></ListItemText>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `LENGTH` and `REVERSE`
            </Typography>
            <Typography variant="body2" mb={1}>
              `LENGTH` returns the number of characters. `REVERSE` reverses the order of characters.
            </Typography>
            <SqlCodeBlock code={`SELECT
  FIRST_NAME,
  LENGTH(FIRST_NAME) AS name_length,
  REVERSE(FIRST_NAME) AS reversed_name
FROM STUDENTS;`} />
            <List dense sx={{ mt: 1 }}>
              <ListItem disablePadding><ListItemText primary="• LENGTH(string): Returns the length of the string." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• REVERSE(string): Returns the string with characters in reverse order." /></ListItemText>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `SUBSTR` (Substring)
            </Typography>
            <Typography variant="body2" mb={1}>
              Extracts a portion of a string.
            </Typography>
            <SqlCodeBlock code={`SELECT SUBSTR('WELCOME TO HYDERABAD!!!', 12, 5) FROM DUAL; -- Result: HYDER`} title="From left, with length" />
            <SqlCodeBlock code={`SELECT SUBSTR('WELCOME TO CHENNAI!!!', 12) FROM DUAL; -- Result: CHENNAI!!!`} title="From left, to end" />
            <SqlCodeBlock code={`SELECT SUBSTR('WELCOME TO INDIA!!!', -8) FROM DUAL; -- Result: INDIA!!!`} title="From right, to end" />
            <SqlCodeBlock code={`SELECT SUBSTR('WELCOME TO INDIA!!!', -8, 5) FROM DUAL; -- Result: INDIA`} title="From right, with length" />
            <SqlCodeBlock code={`SELECT SPECIALIZATION, SUBSTR(SPECIALIZATION, 1, 4) AS short_spec FROM STUDENTS;`} title="Practical example" />
            <SqlCodeBlock code={`SELECT SUBSTR('RISHAB@GMAIL.COM', 1, INSTR('RISHAB@GMAIL.COM', '@')-1) FROM DUAL; -- Result: RISHAB`} title="Extract username from email" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `INSTR` (Instring)
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns the starting position of the *n*th occurrence of a substring within a string.
            </Typography>
            <SqlCodeBlock code={`SELECT INSTR('CORPORATE STRUCTURE', 'R') FROM DUAL; -- Result: 2`} title="First occurrence" />
            <SqlCodeBlock code={`SELECT INSTR('CORPORATE STRUCTURE', 'OR', 3, 2) FROM DUAL; -- Result: 14`} title="2nd 'OR' from 3rd position" />
            <List dense sx={{ mt: 1 }}>
              <ListItem disablePadding><ListItemText primary="• INSTR(string, substring, [start_position], [occurrence])" /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• `start_position`: Where to begin search (default 1)." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• `occurrence`: Which occurrence to find (default 1)." /></ListItemText>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `LPAD` and `RPAD`
            </Typography>
            <Typography variant="body2" mb={1}>
              Pads a string on the left (`LPAD`) or right (`RPAD`) with a specified character(s) to a certain length.
            </Typography>
            <SqlCodeBlock code={`SELECT LPAD('WELCOME', 15, '*') FROM DUAL; -- Result: ********WELCOME`} />
            <SqlCodeBlock code={`SELECT RPAD('WELCOME', 15, '*') FROM DUAL; -- Result: WELCOME********`} />
            <SqlCodeBlock code={`SELECT STIPEND, LPAD(STIPEND, 10, '0') AS padded_stipend FROM STUDENTS;`} title="Pad numbers with leading zeros" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `LTRIM`, `RTRIM`, `TRIM`
            </Typography>
            <Typography variant="body2" mb={1}>
              Remove leading, trailing, or both leading/trailing characters (default: spaces) from a string.
            </Typography>
            <SqlCodeBlock code={`SELECT LTRIM('         WELCOME') FROM DUAL; -- Result: WELCOME`} title="Remove leading spaces" />
            <SqlCodeBlock code={`SELECT RTRIM('         WELCOME      ') FROM DUAL; -- Result:          WELCOME`} title="Remove trailing spaces" />
            <SqlCodeBlock code={`SELECT TRIM('      WEL COME      ') FROM DUAL; -- Result: WEL COME`} title="Remove leading/trailing spaces" />
            <SqlCodeBlock code={`SELECT LTRIM('00000000000100123', '0') FROM DUAL; -- Result: 100123`} title="Remove specific leading characters" />
            <SqlCodeBlock code={`SELECT LTRIM(RTRIM('00101233234345354650121211', '021'), '021') FROM DUAL;`} title="Remove multiple leading/trailing characters" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `REPLACE`
            </Typography>
            <Typography variant="body2" mb={1}>
              Replaces all occurrences of a specified substring with another string.
            </Typography>
            <SqlCodeBlock code={`SELECT REPLACE('JACK AND JUE', 'J', 'BL') FROM DUAL; -- Result: BLACK AND BLUE`} />
            <SqlCodeBlock code={`SELECT PHONE_NUMBER, REPLACE(PHONE_NUMBER, '.', NULL) AS clean_phone FROM STUDENTS;`} title="Remove dots from phone numbers" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `TRANSLATE`
            </Typography>
            <Typography variant="body2" mb={1}>
              Replaces a sequence of characters in a string with another sequence of characters, position by position.
            </Typography>
            <SqlCodeBlock code={`SELECT TRANSLATE('WELCOME TO BANGALORE', 'ABCDEF', 'WXYZ') FROM DUAL; -- Result: WLYOM TO YHNNWI`} />
            <List dense sx={{ mt: 1 }}>
              <ListItem disablePadding><ListItemText primary="• Characters in `from_string` are mapped to `to_string`." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• If a character in `from_string` has no corresponding character in `to_string`, it is removed." /></ListItemText>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Number Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        5. Number Functions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `ROUND` and `TRUNC` (Numbers)
            </Typography>
            <Typography variant="body2" mb={1}>
              `ROUND` rounds a number to a specified precision. `TRUNC` truncates (cuts off) a number without rounding.
            </Typography>
            <SqlCodeBlock code={`SELECT ROUND(5435.7878, 2) FROM DUAL; -- Result: 5435.79`} />
            <SqlCodeBlock code={`SELECT TRUNC(5435.7878, 2) FROM DUAL; -- Result: 5435.78`} />
            <SqlCodeBlock code={`SELECT ROUND(5435.5) FROM DUAL; -- Result: 5436 (default 0 decimal places)`} />
            <SqlCodeBlock code={`SELECT ROUND(5435.7878, -2) FROM DUAL; -- Result: 5400 (rounds to nearest hundred)`} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `CEIL` and `FLOOR`
            </Typography>
            <Typography variant="body2" mb={1}>
              `CEIL` returns the smallest integer greater than or equal to the number. `FLOOR` returns the largest integer less than or equal to the number.
            </Typography>
            <SqlCodeBlock code={`SELECT CEIL(5.000000001) FROM DUAL; -- Result: 6`} />
            <SqlCodeBlock code={`SELECT FLOOR(5.99999999) FROM DUAL; -- Result: 5`} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `MOD` (Modulo)
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns the remainder of a division operation.
            </Typography>
            <SqlCodeBlock code={`SELECT MOD(55, 4) FROM DUAL; -- Result: 3 (55 divided by 4 is 13 with remainder 3)`} />
            <SqlCodeBlock code={`SELECT STUDENT_ID, MOD(STUDENT_ID, 2) AS is_even FROM STUDENTS;`} title="Check for even/odd STUDENT_ID" />
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE MOD(TO_CHAR(JOINING_DATE, 'YYYY'), 4) = 0;`} title="Find students joined in a leap year" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `ABS` (Absolute Value)
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns the absolute (non-negative) value of a number.
            </Typography>
            <SqlCodeBlock code={`SELECT ABS(-354) FROM DUAL; -- Result: 354`} />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Date Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        6. Date Functions
      </Typography>
      <Typography variant="body2" mb={2}>
        SQL provides rich functions to handle date and time data.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Current Date/Time (`SYSDATE`, `CURRENT_DATE`, `SYSTIMESTAMP`)
            </Typography>
            <Typography variant="body2" mb={1}>
              Retrieve the current date and time from the database.
            </Typography>
            <SqlCodeBlock code={`SELECT SYSDATE FROM DUAL;`} title="Current date and time (server timezone)" />
            <SqlCodeBlock code={`SELECT CURRENT_DATE FROM DUAL;`} title="Current date (session timezone)" />
            <SqlCodeBlock code={`SELECT SYSTIMESTAMP FROM DUAL;`} title="Current timestamp with timezone" />
            <Typography variant="body2" color="text.secondary" mt={1}>
              <strong>DUAL Table:</strong> A dummy table in Oracle used for selecting values that are not directly from a table.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Date Arithmetic
            </Typography>
            <Typography variant="body2" mb={1}>
              Perform calculations with dates (add/subtract days, months, etc.).
            </Typography>
            <SqlCodeBlock code={`SELECT SYSDATE AS today, SYSDATE + 7 AS next_week FROM DUAL;`} title="Add 7 days to current date" />
            <SqlCodeBlock code={`SELECT TO_DATE('2017/01/01', 'YYYY/MM/DD') - TO_DATE('2014/01/01', 'YYYY/MM/DD') AS total_days FROM DUAL;`} title="Days between two dates" />
            <SqlCodeBlock code={`SELECT MONTHS_BETWEEN(SYSDATE, JOINING_DATE) AS months_enrolled FROM STUDENTS;`} title="Months between two dates" />
            <SqlCodeBlock code={`SELECT ADD_MONTHS(SYSDATE, 6) FROM DUAL;`} title="Add 6 months to current date" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Date Formatting (`TO_CHAR` for Dates)
            </Typography>
            <Typography variant="body2" mb={1}>
              Converts a date to a string with a specified format.
            </Typography>
            <SqlCodeBlock code={`SELECT TO_CHAR(SYSDATE, 'DD-MON-YYYY') FROM DUAL;`} title="e.g., 11-JUL-2025" />
            <SqlCodeBlock code={`SELECT TO_CHAR(SYSDATE, 'Day, Month DD, YYYY') FROM DUAL;`} title="e.g., Friday, July 11, 2025" />
            <SqlCodeBlock code={`SELECT TO_CHAR(SYSDATE, 'MM/DD/YYYY HH24:MI:SS') FROM DUAL;`} title="e.g., 07/11/2025 10:30:45" />
            <SqlCodeBlock code={`SELECT TO_CHAR(SYSDATE, 'HH12:MI:SS AM') FROM DUAL;`} title="e.g., 10:30:45 AM" />
            <SqlCodeBlock code={`SELECT TO_CHAR(JOINING_DATE, 'YYYY') AS join_year FROM STUDENTS;`} title="Extract year from JOINING_DATE" />
            <SqlCodeBlock code={`SELECT * FROM STUDENTS WHERE TO_CHAR(JOINING_DATE, 'YYYY') = '2005';`} title="Filter by year" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `NEXT_DAY` and `LAST_DAY`
            </Typography>
            <Typography variant="body2" mb={1}>
              `NEXT_DAY` finds the next specified weekday. `LAST_DAY` finds the last day of the month.
            </Typography>
            <SqlCodeBlock code={`SELECT NEXT_DAY(SYSDATE, 'FRIDAY') FROM DUAL;`} title="Next Friday from today" />
            <SqlCodeBlock code={`SELECT LAST_DAY(SYSDATE) FROM DUAL;`} title="Last day of current month" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `ROUND` and `TRUNC` (Dates)
            </Typography>
            <Typography variant="body2" mb={1}>
              `ROUND` rounds a date to the nearest specified unit. `TRUNC` truncates a date to the beginning of a specified unit.
            </Typography>
            <SqlCodeBlock code={`SELECT ROUND(TO_DATE('22-AUG-2021'), 'YEAR') FROM DUAL; -- Result: 01-JAN-2022`} title="Rounds to next year if after July 1st" />
            <SqlCodeBlock code={`SELECT TRUNC(TO_DATE('22-AUG-2021'), 'YEAR') FROM DUAL; -- Result: 01-JAN-2021`} title="Truncates to beginning of year" />
            <SqlCodeBlock code={`SELECT ROUND(SYSDATE, 'MONTH') FROM DUAL;`} title="Rounds to nearest month" />
            <SqlCodeBlock code={`SELECT TRUNC(SYSDATE, 'Q') FROM DUAL;`} title="Truncates to beginning of quarter" />
            <SqlCodeBlock code={`SELECT TRUNC(SYSTIMESTAMP) FROM DUAL;`} title="Removes timestamp from date-time" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Finding First/Last Day of Month/Quarter
            </Typography>
            <Typography variant="body2" mb={1}>
              Common patterns to derive specific dates.
            </Typography>
            <SqlCodeBlock code={`SELECT TRUNC(SYSDATE, 'MONTH') AS first_day_of_month FROM DUAL;`} />
            <SqlCodeBlock code={`SELECT LAST_DAY(SYSDATE) AS last_day_of_month FROM DUAL;`} />
            <SqlCodeBlock code={`SELECT TRUNC(SYSDATE, 'Q') AS first_day_of_quarter FROM DUAL;`} />
            <SqlCodeBlock code={`SELECT LAST_DAY(TRUNC(SYSDATE, 'Q') + 75) AS last_day_of_quarter FROM DUAL;`} title="Approximate last day of quarter" />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Conversion Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        7. Conversion Functions
      </Typography>
      <Typography variant="body2" mb={2}>
        These functions convert data from one data type to another (e.g., number to character, date to number).
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `TO_CHAR` (for Numbers)
            </Typography>
            <Typography variant="body2" mb={1}>
              Converts a number to a formatted string.
            </Typography>
            <SqlCodeBlock code={`SELECT TO_CHAR(1210.73, '9999.9') FROM DUAL; -- Result: 1210.7`} />
            <SqlCodeBlock code={`SELECT TO_CHAR(1210.78, '$9999.9') FROM DUAL; -- Result: $1210.8`} />
            <SqlCodeBlock code={`SELECT TO_CHAR(1210.73, '$9,999.999') FROM DUAL; -- Result: $1,210.730`} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `TO_NUMBER`
            </Typography>
            <Typography variant="body2" mb={1}>
              Converts a string to a number. Useful for extracting numeric parts from dates.
            </Typography>
            <SqlCodeBlock code={`SELECT TO_NUMBER(TO_CHAR(JOINING_DATE, 'YYYY')) AS join_year_num FROM STUDENTS;`} title="Extract year as a number" />
            <SqlCodeBlock code={`SELECT TO_NUMBER(TO_CHAR(SYSDATE, 'MMDDYYYY')) + 1 FROM DUAL;`} title="Convert date to number, then add 1" />
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* NULL Handling Functions */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        8. NULL Handling Functions
      </Typography>
      <Typography variant="body2" mb={2}>
        `NULL` represents missing or unknown data. Arithmetic operations involving `NULL` always result in `NULL`.
        These functions help manage `NULL` values.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `NVL(expression1, expression2)`
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns `expression2` if `expression1` is `NULL`; otherwise, returns `expression1`.
            </Typography>
            <SqlCodeBlock code={`SELECT NVL(5, 6) FROM DUAL; -- Result: 5`} />
            <SqlCodeBlock code={`SELECT NVL(NULL, 6) FROM DUAL; -- Result: 6`} />
            <SqlCodeBlock code={`SELECT STUDENT_ID, STIPEND, BONUS,
  STIPEND + (STIPEND * NVL(BONUS, 0)) AS TOTAL_STIPEND
FROM STUDENTS;`} title="Replace NULL bonus with 0 for calculation" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `NVL2(expression1, expression2, expression3)`
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns `expression2` if `expression1` is NOT `NULL`; otherwise, returns `expression3`.
            </Typography>
            <SqlCodeBlock code={`SELECT NVL2(4, 8, 12) FROM DUAL; -- Result: 8`} />
            <SqlCodeBlock code={`SELECT NVL2(NULL, 8, 12) FROM DUAL; -- Result: 12`} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `NULLIF(expression1, expression2)`
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns `NULL` if `expression1` equals `expression2`; otherwise, returns `expression1`.
            </Typography>
            <SqlCodeBlock code={`SELECT NULLIF(5, 8) FROM DUAL; -- Result: 5`} />
            <SqlCodeBlock code={`SELECT NULLIF(8, 8) FROM DUAL; -- Result: NULL`} />
            <SqlCodeBlock code={`SELECT FIRST_NAME, LAST_NAME FROM STUDENTS
WHERE NULLIF(FIRST_NAME, LAST_NAME) IS NULL;`} title="Find students where first name equals last name" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `COALESCE(exp1, exp2, ..., expN)`
            </Typography>
            <Typography variant="body2" mb={1}>
              Returns the first non-`NULL` expression in the list.
            </Typography>
            <SqlCodeBlock code={`SELECT COALESCE(NULL, NULL, 10, 20) FROM DUAL; -- Result: 10`} />
            <SqlCodeBlock code={`SELECT STUDENT_ID, STIPEND, BONUS,
  STIPEND + (STIPEND * COALESCE(BONUS, 0)) AS TOTAL_STIPEND
FROM STUDENTS;`} title="Use COALESCE for bonus, similar to NVL" />
            <Typography variant="body2" color="text.secondary" mt={1}>
              Useful for selecting the first available non-NULL value from multiple columns (e.g., `MOBILE_NO`, `OFFICE_NO`, `RESI_NO`).
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Conditional Logic */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        9. Conditional Logic Functions
      </Typography>
      <Typography variant="body2" mb={2}>
        These functions allow you to implement if-then-else logic directly within your SQL queries.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `DECODE` Function (Oracle Specific)
            </Typography>
            <Typography variant="body2" mb={1}>
              Provides if-then-else logic for equality comparisons.
            </Typography>
            <SqlCodeBlock code={`SELECT
  SUBJECT_ID,
  DECODE(SUBJECT_ID,
         1, 'Mathematics',
         2, 'Physics',
         3, 'Chemistry',
         'Other') AS subject_name
FROM STUDENTS;`} />
            <List dense sx={{ mt: 1 }}>
              <ListItem disablePadding><ListItemText primary="• `DECODE(expression, search1, result1, ..., default)`" /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• Compares `expression` to each `search` value." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• Returns corresponding `result` for the first match." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• Returns `default` if no matches (NULL if `default` omitted)." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• Limitation: Only supports equality comparisons." /></ListItemText>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              `CASE` Expression (ANSI Standard)
            </Typography>
            <Typography variant="body2" mb={1}>
              A more flexible and ANSI-standard way to implement conditional logic, supporting various conditions.
            </Typography>
            <SqlCodeBlock code={`SELECT
  STUDENT_ID,
  FIRST_NAME,
  STIPEND,
  CASE
    WHEN STIPEND < 5000 THEN 'LOW STIPEND'
    WHEN STIPEND >= 5000 AND STIPEND < 15000 THEN 'AVG STIPEND'
    ELSE 'HIGH STIPEND'
  END AS STIPEND_STATUS
FROM STUDENTS;`} title="Categorize stipend levels" />
            <SqlCodeBlock code={`SELECT
  COUNT(CASE WHEN STIPEND < 5000 THEN 1 END) AS LOW_STIPEND_COUNT,
  COUNT(CASE WHEN STIPEND >= 5000 AND STIPEND < 15000 THEN 1 END) AS AVG_STIPEND_COUNT,
  COUNT(CASE WHEN STIPEND >= 15000 THEN 1 END) AS HIGH_STIPEND_COUNT
FROM STUDENTS;`} title="Count students by stipend category" />
            <List dense sx={{ mt: 1 }}>
              <ListItem disablePadding><ListItemText primary="• Evaluates `WHEN` conditions in order." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• Returns the result of the first true condition." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• `ELSE` clause is optional (returns NULL if omitted and no matches)." /></ListItemText>
              <ListItem disablePadding><ListItemText primary="• Supports range comparisons and complex logic." /></ListItemText>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 5 }} />

      {/* ORDER BY Clause */}
      <Typography variant="h5" fontWeight={600} gutterBottom color="secondary">
        10. `ORDER BY` Clause
      </Typography>
      <Typography variant="body2" mb={2}>
        Sorts the result set of a query in ascending (`ASC`, default) or descending (`DESC`) order.
      </Typography>
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY FIRST_NAME ASC;`} title="Order by First Name (Ascending)" />
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY STIPEND DESC;`} title="Order by Stipend (Descending)" />
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY STIPEND DESC, JOINING_DATE ASC;`} title="Order by multiple columns" />
      <SqlCodeBlock code={`SELECT * FROM STUDENTS ORDER BY 8;`} title="Order by column position (8th column)" />

      <Divider sx={{ my: 5 }} />

      {/* Footer */}
      <Box sx={{ bgcolor: 'primary.light', p: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h6" color="primary.contrastText" gutterBottom>
          🚀 Join Our Informatica IICS COMBO Training!
        </Typography>
        <Typography variant="body1" color="primary.contrastText" mb={2}>
          Master SQL and ETL tools for a successful career in data!
        </Typography>
        <Typography variant="h5" color="primary.contrastText" fontWeight={700}>
          📞 Call / WhatsApp: 8970853557 / 9448005273
        </Typography>
        {/* If you have a specific webpage link, you can add it here: */}
        {/* <Typography variant="body2" color="primary.contrastText" mt={2}>
          <Link href="YOUR_WEBPAGE_LINK_HERE" target="_blank" rel="noopener" sx={{ color: 'primary.contrastText', textDecoration: 'underline' }}>
            Visit our website for more details!
          </Link>
        </Typography> */}
      </Box>
    </Container>
  );
};

export default SingleRowFunctionsPage;
