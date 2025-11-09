import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";

const PageContainer = styled(Box)({
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f9fafb",
  padding: "40px 20px",
});

const StatusCard = styled(Box)({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "48px 40px",
  textAlign: "center",
  maxWidth: "600px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
});

const IconWrapper = styled(Box)<{ success?: boolean }>(({ success }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: success
    ? "rgba(0, 167, 127, 0.1)"
    : "rgba(239, 68, 68, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
}));

const HomeButton = styled(Button)({
  backgroundColor: "#00a77f",
  color: "white",
  padding: "12px 32px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  marginTop: "24px",
  "&:hover": {
    backgroundColor: "#008f6c",
  },
});

interface PaymentStatus {
  success: boolean;
  message: string;
  transactionId?: string;
  amount?: number;
  donorName?: string;
  status?: string;
}

const PaymentVerify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = searchParams.get("pidx");
      const txnId =
        searchParams.get("txnId") || searchParams.get("transaction_id");
      const status = searchParams.get("status");

      // Check if payment was cancelled
      if (status === "Cancelled" || status === "cancelled") {
        setPaymentStatus({
          success: false,
          message: "Payment was cancelled",
        });
        setLoading(false);
        return;
      }

      if (!pidx || !txnId) {
        setError("Invalid payment verification parameters");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/payment/verify?pidx=${pidx}&txnId=${txnId}`
        );
        const data = await response.json();

        setPaymentStatus(data);
      } catch (err) {
        console.error("Payment verification error:", err);
        setError("Failed to verify payment. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <PageContainer>
        <StatusCard>
          <CircularProgress size={60} sx={{ color: "#00a77f" }} />
          <Typography variant='h6' mt={3} color='#374151'>
            Verifying your payment...
          </Typography>
          <Typography variant='body2' color='#6b7280' mt={1}>
            Please wait while we confirm your transaction
          </Typography>
        </StatusCard>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth='sm'>
          <StatusCard>
            <IconWrapper success={false}>
              <ErrorIcon sx={{ fontSize: 48, color: "#ef4444" }} />
            </IconWrapper>
            <Typography variant='h5' fontWeight={600} color='#374151' mb={2}>
              Verification Error
            </Typography>
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
            <Typography variant='body2' color='#6b7280' mb={3}>
              If this issue persists, please contact our support team with your
              transaction details.
            </Typography>
            <HomeButton startIcon={<HomeIcon />} onClick={handleGoHome}>
              Return to Home
            </HomeButton>
          </StatusCard>
        </Container>
      </PageContainer>
    );
  }

  if (!paymentStatus) {
    return null;
  }

  return (
    <PageContainer>
      <Container maxWidth='sm'>
        <StatusCard>
          <IconWrapper success={paymentStatus.success}>
            {paymentStatus.success ? (
              <CheckCircleIcon sx={{ fontSize: 48, color: "#00a77f" }} />
            ) : (
              <ErrorIcon sx={{ fontSize: 48, color: "#ef4444" }} />
            )}
          </IconWrapper>

          <Typography variant='h5' fontWeight={600} color='#374151' mb={2}>
            {paymentStatus.success ? "Payment Successful!" : "Payment Failed"}
          </Typography>

          <Typography variant='body1' color='#6b7280' mb={3}>
            {paymentStatus.message}
          </Typography>

          {paymentStatus.success && paymentStatus.transactionId && (
            <Box
              sx={{
                backgroundColor: "#f0f9ff",
                padding: "16px",
                borderRadius: "12px",
                mb: 3,
              }}
            >
              <Typography variant='body2' color='#374151' fontWeight={500}>
                Transaction ID
              </Typography>
              <Typography
                variant='body2'
                color='#004c91'
                fontWeight={600}
                mt={0.5}
              >
                {paymentStatus.transactionId}
              </Typography>
              {paymentStatus.amount && (
                <>
                  <Typography
                    variant='body2'
                    color='#374151'
                    fontWeight={500}
                    mt={2}
                  >
                    Amount
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#004c91'
                    fontWeight={600}
                    mt={0.5}
                  >
                    ₨ {paymentStatus.amount.toLocaleString()}
                  </Typography>
                </>
              )}
            </Box>
          )}

          {paymentStatus.success && (
            <Typography variant='body2' color='#6b7280' mb={2}>
              Thank you for your generous donation! A confirmation email has
              been sent to your email address.
            </Typography>
          )}

          <HomeButton startIcon={<HomeIcon />} onClick={handleGoHome}>
            Return to Home
          </HomeButton>
        </StatusCard>
      </Container>
    </PageContainer>
  );
};

export default PaymentVerify;
