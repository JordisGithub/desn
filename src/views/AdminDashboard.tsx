import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const PageContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "40px 0",
});

const Title = styled(Typography)({
  fontSize: "36px",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: "32px",
});

const StyledPaper = styled(Paper)({
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 500,
  backgroundColor: "#f8f9fa",
  color: "#004c91",
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

interface MembershipApplication {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  message?: string;
  submittedAt: string;
  language?: string;
}

interface VolunteerApplication {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  submittedAt: string;
  language?: string;
}

interface PaymentTransaction {
  transactionId: string;
  paymentGateway: string;
  amount: number;
  currency: string;
  status: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  createdAt: string;
  completedAt?: string;
}

const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [membershipApplications, setMembershipApplications] = useState<
    MembershipApplication[]
  >([]);
  const [volunteerApplications, setVolunteerApplications] = useState<
    VolunteerApplication[]
  >([]);
  const [paymentTransactions, setPaymentTransactions] = useState<
    PaymentTransaction[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = user?.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [membershipRes, volunteerRes, paymentsRes] = await Promise.all([
        fetch("/api/forms/membership", { headers }),
        fetch("/api/forms/volunteer", { headers }),
        fetch("/api/payment/transactions", { headers }),
      ]);

      if (membershipRes.ok) {
        const membershipData = await membershipRes.json();
        setMembershipApplications(membershipData);
      }

      if (volunteerRes.ok) {
        const volunteerData = await volunteerRes.json();
        setVolunteerApplications(volunteerData);
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPaymentTransactions(paymentsData);
      }

      if (!membershipRes.ok && !volunteerRes.ok && !paymentsRes.ok) {
        setError("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("An error occurred while fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <PageContainer>
      <Container maxWidth='xl'>
        <Title>Admin Dashboard</Title>

        {error && (
          <Alert severity='error' sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <StyledPaper>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab
                label={`Membership Applications (${membershipApplications.length})`}
                id='tab-0'
                aria-controls='tabpanel-0'
              />
              <Tab
                label={`Volunteer Applications (${volunteerApplications.length})`}
                id='tab-1'
                aria-controls='tabpanel-1'
              />
              <Tab
                label={`Payment Transactions (${paymentTransactions.length})`}
                id='tab-2'
                aria-controls='tabpanel-2'
              />
            </Tabs>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TabPanel value={tabValue} index={0}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Submitted At</StyledTableCell>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Phone</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Language</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {membershipApplications.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            align='center'
                            sx={{ py: 4, color: "#666" }}
                          >
                            No membership applications yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        membershipApplications.map((app, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{formatDate(app.submittedAt)}</TableCell>
                            <TableCell>{app.fullName}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>{app.phone}</TableCell>
                            <TableCell>{app.address || "-"}</TableCell>
                            <TableCell sx={{ maxWidth: 300 }}>
                              {app.message
                                ? app.message.length > 100
                                  ? `${app.message.substring(0, 100)}...`
                                  : app.message
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={app.language?.toUpperCase() || "EN"}
                                size='small'
                                color='primary'
                                variant='outlined'
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Submitted At</StyledTableCell>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Phone</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Language</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {volunteerApplications.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            align='center'
                            sx={{ py: 4, color: "#666" }}
                          >
                            No volunteer applications yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        volunteerApplications.map((app, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{formatDate(app.submittedAt)}</TableCell>
                            <TableCell>{app.fullName}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>{app.phone}</TableCell>
                            <TableCell sx={{ maxWidth: 400 }}>
                              {app.message
                                ? app.message.length > 150
                                  ? `${app.message.substring(0, 150)}...`
                                  : app.message
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={app.language?.toUpperCase() || "EN"}
                                size='small'
                                color='primary'
                                variant='outlined'
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Transaction ID</StyledTableCell>
                        <StyledTableCell>Donor</StyledTableCell>
                        <StyledTableCell>Amount</StyledTableCell>
                        <StyledTableCell>Gateway</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentTransactions.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            align='center'
                            sx={{ py: 4, color: "#666" }}
                          >
                            No payment transactions yet
                          </TableCell>
                        </TableRow>
                      ) : (
                        paymentTransactions.map((txn, index) => (
                          <TableRow key={index} hover>
                            <TableCell>{formatDate(txn.createdAt)}</TableCell>
                            <TableCell
                              sx={{ fontFamily: "monospace", fontSize: "13px" }}
                            >
                              {txn.transactionId}
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant='body2' fontWeight={500}>
                                  {txn.donorName}
                                </Typography>
                                <Typography
                                  variant='caption'
                                  color='text.secondary'
                                >
                                  {txn.donorEmail}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight={600} color='#004c91'>
                                {txn.currency} {txn.amount.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={txn.paymentGateway}
                                size='small'
                                variant='outlined'
                                sx={{
                                  borderColor:
                                    txn.paymentGateway === "KHALTI"
                                      ? "#00a77f"
                                      : "#004c91",
                                  color:
                                    txn.paymentGateway === "KHALTI"
                                      ? "#00a77f"
                                      : "#004c91",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={txn.status}
                                size='small'
                                color={
                                  txn.status === "COMPLETED"
                                    ? "success"
                                    : txn.status === "FAILED"
                                    ? "error"
                                    : txn.status === "PENDING" ||
                                      txn.status === "INITIATED"
                                    ? "warning"
                                    : "default"
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </>
          )}
        </StyledPaper>
      </Container>
    </PageContainer>
  );
};

export default AdminDashboard;
