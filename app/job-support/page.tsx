"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Link as MuiLink,
} from "@mui/material";

import Link from "next/link";

import {
  CheckCircle,
  Users,
  Briefcase,
  Handshake,
  MessageSquare,
  BookOpen,
  ArrowRight
} from "lucide-react";

// Internal join form page
const JOIN_FORM_URL = "/job-support/join";
const WHATSAPP_NUMBER = "9448005273";

const JobSupportPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, bgcolor: "background.paper" }}>
      
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          color="primary"
          gutterBottom
        >
          🤝 Job Support Collaboration: Empowering IT Professionals
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto", fontSize: "1.1rem" }}
        >
          At Rishab Informatica Group, we help IT professionals connect with
          experienced mentors for real-time job support and guidance.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Vision */}
      <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight={700} color="secondary" gutterBottom>
          Our Vision: Mutual Success
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
          Many professionals need specialized support for real-time IT
          challenges. Others have strong skills and want to help part-time.
          We're building a bridge between both groups.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          Whether you're seeking help or offering it — this platform is for you.
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Two Cards – Seeker & Provider */}
      <Grid container spacing={4} mb={5}>
        
        {/* Job Support Seeker */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 4, height: "100%", borderRadius: 2, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
              Are You a Job Support Seeker?
            </Typography>

            <Typography variant="body1" paragraph>
              Get help from experienced professionals for your real-time IT work.
            </Typography>

            <List dense>
              {[
                "Get expert guidance on complex tasks.",
                "Improve your real-time project performance.",
                "Gain confidence in your role.",
                "Receive practical, hands-on solutions."
              ].map((text, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography fontWeight="bold">{text}</Typography>} />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: "auto", pt: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">
                Fill the form to describe your support needs.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Job Support Provider */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 4, height: "100%", borderRadius: 2, display: "flex", flexDirection: "column" }}
          >
            <Typography variant="h4" fontWeight={700} color="secondary" gutterBottom>
              Are You a Job Support Provider?
            </Typography>

            <Typography variant="body1" paragraph>
              Help others, grow your network, and earn part-time income.
            </Typography>

            <List dense>
              {[
                "Use your expertise to help others.",
                "Earn supplementary income flexibly.",
                "Expand your professional network.",
                "Contribute to the IT community."
              ].map((text, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={<Typography fontWeight="bold">{text}</Typography>} />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: "auto", pt: 2 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">
                Register your skills and availability in the form.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* CTA */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Ready to Collaborate?
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
          Click below and fill our secure internal form.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowRight />}
          component={Link}
          href={JOIN_FORM_URL}
          sx={{
            mt: 2,
            px: 5,
            py: 2,
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: "1.1rem",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            "&:hover": {
              background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              boxShadow: "0 5px 8px 3px rgba(255, 105, 135, .5)",
            },
          }}
        >
          Click Here & Fill the Form
        </Button>

        <Typography variant="body1" sx={{ mt: 3, fontSize: "1.1rem" }}>
          Or WhatsApp us:{" "}
          <MuiLink
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: "bold", color: "green", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            {WHATSAPP_NUMBER}
          </MuiLink>
        </Typography>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Training Promotion */}
      <Paper
        elevation={3}
        sx={{ bgcolor: "info.main", color: "white", p: 4, textAlign: "center", borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight={800} gutterBottom>
          🚀 Accelerate Your Career with Rishab Informatica Group!
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
          Build your long-term IT career with our structured programs.
        </Typography>

        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Featured Courses:
        </Typography>

        <List sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", gap: 2 }}>
          <ListItem disablePadding sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "white", color: "info.main", "&:hover": { bgcolor: "grey.200" }, borderRadius: 4 }}
              href="/courses/iics-combo-live"
              startIcon={<BookOpen />}
            >
              Informatica IICS COMBO Training
            </Button>
          </ListItem>

          <ListItem disablePadding sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "white", color: "info.main", "&:hover": { bgcolor: "grey.200" }, borderRadius: 4 }}
              href="/courses"
              startIcon={<BookOpen />}
            >
              Explore All Courses
            </Button>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default JobSupportPage;
