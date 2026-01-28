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
  Link,
} from "@mui/material";
import { CheckCircle, Users, Briefcase, Handshake, MessageSquare, BookOpen, ArrowRight } from "lucide-react";

// The Google Form URL you provided in the header.tsx
const GOOGLE_FORM_URL = "https://forms.gle/PFat1nZEUnwWW8y89";
const WHATSAPP_NUMBER = "9448005273"; // Your WhatsApp number

const JobSupportPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5, bgcolor: 'background.paper' }}> {/* Added subtle background color */}
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" component="h1" fontWeight={800} color="primary" gutterBottom> {/* Larger, extra bold heading */}
          🤝 Job Support Collaboration: Empowering IT Professionals
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}> {/* Slightly larger text */}
          At Rishab Informatica Group, we understand that the journey in IT can be challenging. We're building a unique platform to connect experienced professionals willing to offer part-time support with individuals seeking guidance to excel in their real-time IT roles.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Introduction */}
      <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight={700} color="secondary" gutterBottom> {/* Larger, bold heading */}
          Our Vision: Mutual Success
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}> {/* Slightly larger text */}
          We've observed a common need in the IT landscape: some professionals require targeted assistance to navigate complex projects or improve their performance, while others possess valuable skills and experience they're willing to share on a part-time basis. Our goal is to bridge this gap, fostering a community of mutual support and growth.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem' }}> {/* Slightly larger text */}
          Whether you're looking for a helping hand or ready to extend one, this platform is designed for you.
        </Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* For Job Support Seekers */}
      <Grid container spacing={4} mb={5}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom> {/* Larger, bold heading */}
              Are You a Job Support Seeker?
            </Typography>
            <Typography variant="body1" paragraph>
              If you're an IT professional currently facing challenges in your real-time projects or looking to enhance your performance, our collaboration platform can connect you with experienced mentors.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Get expert guidance on complex IT tasks.</Typography>} /> {/* Bold list item */}
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Improve your real-time project performance.</Typography>} /> {/* Bold list item */}
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Gain confidence in your role.</Typography>} /> {/* Bold list item */}
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Receive practical, hands-on solutions.</Typography>} /> {/* Bold list item */}
              </ListItem>
            </List>
            <Box sx={{ mt: 'auto', pt: 2 }}>
                <Typography variant="body2" color="text.secondary" fontWeight="bold"> {/* Bold text */}
                    Fill out the form to describe your support needs.
                </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* For Job Support Providers */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" fontWeight={700} color="secondary" gutterBottom> {/* Larger, bold heading */}
              Are You a Job Support Provider?
            </Typography>
            <Typography variant="body1" paragraph>
              If you're an experienced IT professional with a passion for teaching and a desire to help others, you can offer part-time job support and earn extra income.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Utilize your expertise to help others succeed.</Typography>} /> {/* Bold list item */}
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Earn supplementary income on a flexible schedule.</Typography>} /> {/* Bold list item */}
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Expand your professional network.</Typography>} /> {/* Bold list item */}
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: '36px' }}><CheckCircle color="success" /></ListItemIcon>
                <ListItemText primary={<Typography fontWeight="bold">Contribute to the IT community.</Typography>} /> {/* Bold list item */}
              </ListItem>
            </List>
            <Box sx={{ mt: 'auto', pt: 2 }}>
                <Typography variant="body2" color="text.secondary" fontWeight="bold"> {/* Bold text */}
                    Register your skills and availability in the form.
                </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom> {/* Larger, bold heading */}
          Ready to Collaborate?
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}> {/* Slightly larger text */}
          Please fill out our secure form below to register your interest, whether you are seeking or offering job support.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowRight />}
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 2,
            px: 5,
            py: 2, // Increased vertical padding
            borderRadius: 8,
            fontWeight: 'bold',
            fontSize: '1.1rem', // Slightly larger font for button
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Pink/Orange gradient
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
              boxShadow: '0 5px 8px 3px rgba(255, 105, 135, .5)',
            },
          }}
        >
          Click Here & Fill the Form
        </Button>
        <Typography variant="body1" sx={{ mt: 3, fontSize: '1.1rem' }}> {/* Slightly larger text */}
          Alternatively, message us on WhatsApp for a quick response:{" "}
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 'bold', color: 'green', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, fontSize: '1.1rem' }} // Bold and slightly larger
          >
            {WHATSAPP_NUMBER}
          </Link>
        </Typography>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* Training Promotion Section */}
      <Paper elevation={3} sx={{ bgcolor: 'info.main', color: 'white', p: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom> {/* Extra bold heading */}
          🚀 Accelerate Your Career with Rishab Informatica Group!
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}> {/* Slightly larger text */}
          While our Job Support Collaboration helps with immediate needs, our comprehensive training programs are designed to build a strong foundation for your long-term success.
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}> {/* Bold heading */}
          Featured Courses:
        </Typography>
        <List sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 2, p: 0 }}>
          <ListItem disablePadding sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ bgcolor: 'white', color: 'info.main', '&:hover': { bgcolor: 'grey.200' }, borderRadius: 4, px: 3, py: 1.5, fontWeight: 'bold' }} // Bold button text
              href="/courses/iics-combo-live" // Link to your IICS Combo page
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<BookOpen />}
            >
              Informatica IICS COMBO Training
            </Button>
          </ListItem>
          <ListItem disablePadding sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ bgcolor: 'white', color: 'info.main', '&:hover': { bgcolor: 'grey.200' }, borderRadius: 4, px: 3, py: 1.5, fontWeight: 'bold' }} // Bold button text
              href="/courses" // Link to your main courses page
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<BookOpen />}
            >
              Explore All Our Courses
            </Button>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default JobSupportPage;
