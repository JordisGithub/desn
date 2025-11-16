import { Avatar, Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SuccessSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(12, 4),
  background: "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
  color: "#ffffff",
}));

const Quote = styled(Typography)(({ theme }) => ({
  fontSize: "1.375rem",
  lineHeight: 1.7,
  textAlign: "center",
  maxWidth: 920,
  margin: "0 auto",
}));

const Author = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  opacity: 0.95,
  marginTop: theme.spacing(2),
  fontWeight: 600,
}));

export default function ProgramSuccessStories() {
  return (
    <SuccessSection aria-labelledby='success-stories-title'>
      <Container maxWidth='md'>
        <Typography
          id='success-stories-title'
          variant='h2'
          sx={{ textAlign: "center", fontWeight: 800, mb: 3 }}
        >
          Success Stories
        </Typography>
        <Quote>
          “Because of DESN’s training and support, I secured my first job and
          now support my family. The program gave me skills and confidence I
          never thought possible.”
        </Quote>
        <Box
          mt={3}
          display='flex'
          alignItems='center'
          justifyContent='center'
          gap={2}
        >
          <Avatar
            alt='Program Graduate'
            sx={{ bgcolor: "#f6d469", color: "#003d73" }}
          >
            A
          </Avatar>
          <Author>Program Graduate, Kathmandu</Author>
        </Box>
      </Container>
    </SuccessSection>
  );
}
