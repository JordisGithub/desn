import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DialogContainer = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: "8px",
    maxWidth: "600px",
  },
});

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const AmountGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginTop: "8px",
});

const AmountButton = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  padding: "16px",
  borderRadius: "12px",
  border: selected ? "2px solid #00a77f" : "2px solid #e5e7eb",
  backgroundColor: selected ? "rgba(0, 167, 127, 0.1)" : "white",
  color: selected ? "#00a77f" : "#374151",
  fontWeight: 600,
  fontSize: "18px",
  "&:hover": {
    backgroundColor: selected ? "rgba(0, 167, 127, 0.15)" : "#f9fafb",
    borderColor: "#00a77f",
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "white",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#00a77f",
  color: "white",
  padding: "14px 32px",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#008f6c",
  },
  "&:disabled": {
    backgroundColor: "#d1d5db",
  },
});

interface DonationPaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const DonationPaymentModal: React.FC<DonationPaymentModalProps> = ({
  open,
  onClose,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [donorMessage, setDonorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedAmounts = [
    "1000",
    "5000",
    "10000",
    "25000",
    "50000",
    "100000",
  ];

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount("");
    setError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    setAmount(value);
    setError(null);
  };

  const getSelectedAmount = (): number => {
    const amt = parseFloat(amount || "0");
    return amt;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const selectedAmount = getSelectedAmount();

    // Validation
    if (!selectedAmount || selectedAmount < 1) {
      setError("Please enter a valid donation amount");
      return;
    }

    if (!donorName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!donorEmail.trim() || !/\S+@\S+\.\S+/.test(donorEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedAmount,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim(),
          donorMessage: donorMessage.trim(),
          returnUrl: `${window.location.origin}/payment/verify`,
          websiteUrl: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Redirect to Khalti payment page
        window.location.href = data.paymentUrl;
      } else {
        setError(data.message || "Failed to initiate payment");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      // Reset form
      setAmount("");
      setCustomAmount("");
      setDonorName("");
      setDonorEmail("");
      setDonorPhone("");
      setDonorMessage("");
      setError(null);
    }
  };

  return (
    <DialogContainer open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' alignItems='center' gap={1}>
          <PaymentIcon sx={{ color: "#00a77f" }} />
          <Typography variant='h6' fontWeight={600} color='#004c91'>
            Make a Donation
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormContainer>
          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box>
            <Typography variant='subtitle1' fontWeight={600} mb={1}>
              Select Amount (NPR)
            </Typography>
            <AmountGrid>
              {predefinedAmounts.map((amt) => (
                <AmountButton
                  key={amt}
                  selected={amount === amt && !customAmount}
                  onClick={() => handleAmountSelect(amt)}
                  type='button'
                >
                  ₨ {parseInt(amt).toLocaleString()}
                </AmountButton>
              ))}
            </AmountGrid>
          </Box>

          <StyledTextField
            label='Custom Amount (NPR)'
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder='Enter custom amount'
            fullWidth
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>₨</Typography>,
            }}
          />

          <StyledTextField
            label='Full Name *'
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />

          <StyledTextField
            label='Email Address *'
            type='email'
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />

          <StyledTextField
            label='Phone Number'
            value={donorPhone}
            onChange={(e) => setDonorPhone(e.target.value)}
            fullWidth
            disabled={loading}
          />

          <StyledTextField
            label='Message (Optional)'
            value={donorMessage}
            onChange={(e) => setDonorMessage(e.target.value)}
            multiline
            rows={3}
            fullWidth
            disabled={loading}
          />

          <Box
            sx={{
              backgroundColor: "#f0f9ff",
              padding: "12px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 20 }} />
            <Typography fontSize='13px' color='#374151'>
              Secure payment powered by Khalti. Your transaction data is
              encrypted and protected.
            </Typography>
          </Box>
        </FormContainer>
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{ color: "#6b7280" }}
        >
          Cancel
        </Button>
        <SubmitButton
          onClick={handleSubmit}
          disabled={loading || !getSelectedAmount()}
          startIcon={loading ? <CircularProgress size={20} /> : <PaymentIcon />}
        >
          {loading
            ? "Processing..."
            : `Donate ₨${getSelectedAmount().toLocaleString()}`}
        </SubmitButton>
      </DialogActions>
    </DialogContainer>
  );
};

export default DonationPaymentModal;
