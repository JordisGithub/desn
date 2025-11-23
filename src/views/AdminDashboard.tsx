import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { usePageTitle } from "../hooks/usePageTitle";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EventService from "../services/EventService";
import ResourceUploadPanel from "../components/admin/ResourceUploadPanel";
import EventManagementPanel from "../components/admin/EventManagementPanel";
import ApiService from "../services/ApiService";

const PageContainer = styled("main")({
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "40px 0",
});

const Title = styled("h1")({
  fontSize: "36px",
  fontWeight: 600,
  color: "#004c91",
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  margin: 0,
  marginBottom: "32px",
});

const StyledPaper = styled(Paper)({
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
  backgroundColor: "#e8f4f8",
  color: "#002855",
  fontSize: "0.9375rem",
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const isActive = value === index;

  return (
    <div
      role='tabpanel'
      hidden={!isActive}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      aria-hidden={!isActive}
      {...other}
    >
      {isActive && <Box sx={{ pt: 3 }}>{children}</Box>}
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

interface EventRegistrationData {
  eventId: number;
  eventTitle: string;
  maxCapacity: number;
  currentRegistrations: number;
  availableSpots: number;
  registrations: Array<{
    username: string;
    email: string;
    fullName: string;
    registeredAt: string;
    status: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  usePageTitle("page_titles.admin_dashboard");
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
  const [eventsData, setEventsData] = useState<EventRegistrationData[]>([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [resourcesCount, setResourcesCount] = useState(0);
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
      };

      // Note: These endpoints are not yet implemented in the backend
      // They will return 404 until the backend API is created
      const [membershipRes, volunteerRes, donationsRes] = await Promise.all([
        ApiService.get("/api/forms/membership", { headers }).catch((err) => {
          if (err?.status !== 429)
            console.error("Error fetching membership:", err);
          return null;
        }),
        ApiService.get("/api/forms/volunteer", { headers }).catch((err) => {
          if (err?.status !== 429)
            console.error("Error fetching volunteer:", err);
          return null;
        }),
        ApiService.get("/api/payment/transactions", { headers }).catch(
          (err) => {
            if (err?.status !== 429)
              console.error("Error fetching transactions:", err);
            return null;
          }
        ),
      ]);

      if (membershipRes) {
        try {
          setMembershipApplications(
            Array.isArray(membershipRes) ? membershipRes : []
          );
        } catch (e) {
          console.error("Error parsing membership data:", e);
        }
      }

      if (volunteerRes) {
        try {
          setVolunteerApplications(
            Array.isArray(volunteerRes) ? volunteerRes : []
          );
        } catch (e) {
          console.error("Error parsing volunteer data:", e);
        }
      }

      if (donationsRes) {
        try {
          setPaymentTransactions(
            Array.isArray(donationsRes) ? donationsRes : []
          );
        } catch (e) {
          console.error("Error parsing donations data:", e);
        }
      }

      // Fetch events data
      if (token) {
        try {
          const eventsResponse = await EventService.getAllEventsRegistrations(
            token
          );
          // EventService now returns data directly, not wrapped in {success, events}
          setEventsData(Array.isArray(eventsResponse) ? eventsResponse : []);
        } catch (err) {
          console.error("Error fetching events data:", err);
        }

        // Fetch events count for Event Management tab
        try {
          const eventsListResponse = await ApiService.get("/api/events", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEventsCount(
            Array.isArray(eventsListResponse) ? eventsListResponse.length : 0
          );
        } catch (err: any) {
          if (err?.status !== 429) {
            console.error("Error fetching events count:", err);
          }
        }

        // Fetch resources count for Resources tab
        try {
          const resourcesResponse = await ApiService.get("/api/resources");
          const resourcesArray = resourcesResponse?.resources || [];
          setResourcesCount(
            Array.isArray(resourcesArray) ? resourcesArray.length : 0
          );
        } catch (err: any) {
          if (err?.status !== 429) {
            console.error("Error fetching resources count:", err);
          }
        }
      }

      // Don't show error if endpoints aren't implemented yet
      // if (!membershipRes?.ok && !volunteerRes?.ok && !paymentsRes?.ok) {
      //   setError("Failed to fetch data");
      // }
    } catch (err) {
      console.error("Error fetching applications:", err);
      // Don't show error to user if endpoints don't exist yet
      // setError("An error occurred while fetching applications");
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

        <StyledPaper role='region' aria-label='Admin Dashboard Content'>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label='Admin dashboard sections'
              variant='scrollable'
              scrollButtons='auto'
              sx={{
                "& .MuiTab-root": {
                  color: "#002855",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  minHeight: "48px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(0, 40, 85, 0.08)",
                    color: "#001a3d",
                  },
                  "&:focus": {
                    outline: "3px solid #4a90e2",
                    outlineOffset: "-3px",
                    backgroundColor: "rgba(0, 40, 85, 0.08)",
                  },
                  "&.Mui-selected": {
                    color: "#002855",
                    fontWeight: 600,
                  },
                  "& .MuiTouchRipple-root": {
                    display: "none",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#002855",
                  height: "3px",
                },
                "& .MuiTabs-scrollButtons": {
                  color: "#002855",
                  "&:focus": {
                    outline: "3px solid #4a90e2",
                    outlineOffset: "2px",
                  },
                  "& .MuiTouchRipple-root": {
                    display: "none",
                  },
                },
              }}
            >
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
                label={`Event Registrations (${eventsData.length})`}
                id='tab-2'
                aria-controls='tabpanel-2'
              />
              <Tab
                label={`Event Management (${eventsCount})`}
                id='tab-3'
                aria-controls='tabpanel-3'
              />
              <Tab
                label={`Resources (${resourcesCount})`}
                id='tab-4'
                aria-controls='tabpanel-4'
              />
            </Tabs>
          </Box>

          {loading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", py: 8 }}
              role='status'
              aria-live='polite'
              aria-label='Loading dashboard data'
            >
              <CircularProgress aria-label='Loading applications' />
              <Typography sx={{ position: "absolute", left: "-10000px" }}>
                Loading dashboard data, please wait...
              </Typography>
            </Box>
          ) : (
            <>
              <TabPanel value={tabValue} index={0}>
                <TableContainer>
                  <Table aria-label='Membership applications table'>
                    <caption
                      style={{
                        position: "absolute",
                        left: "-10000px",
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                      }}
                    >
                      Membership applications with{" "}
                      {membershipApplications.length} total entries
                    </caption>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell scope='col'>
                          Submitted At
                        </StyledTableCell>
                        <StyledTableCell scope='col'>Full Name</StyledTableCell>
                        <StyledTableCell scope='col'>Email</StyledTableCell>
                        <StyledTableCell scope='col'>Phone</StyledTableCell>
                        <StyledTableCell scope='col'>Address</StyledTableCell>
                        <StyledTableCell scope='col'>Message</StyledTableCell>
                        <StyledTableCell scope='col'>Language</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {membershipApplications.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            align='center'
                            sx={{ py: 4, color: "#595959", fontSize: "1rem" }}
                            role='status'
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
                  <Table aria-label='Volunteer applications table'>
                    <caption
                      style={{
                        position: "absolute",
                        left: "-10000px",
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                      }}
                    >
                      Volunteer applications with {volunteerApplications.length}{" "}
                      total entries
                    </caption>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell scope='col'>
                          Submitted At
                        </StyledTableCell>
                        <StyledTableCell scope='col'>Full Name</StyledTableCell>
                        <StyledTableCell scope='col'>Email</StyledTableCell>
                        <StyledTableCell scope='col'>Phone</StyledTableCell>
                        <StyledTableCell scope='col'>Message</StyledTableCell>
                        <StyledTableCell scope='col'>Language</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {volunteerApplications.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            align='center'
                            sx={{ py: 4, color: "#595959", fontSize: "1rem" }}
                            role='status'
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
                {eventsData.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 4,
                      color: "#595959",
                      fontSize: "1rem",
                    }}
                    role='status'
                  >
                    No event registrations yet
                  </Box>
                ) : (
                  eventsData.map((event) => (
                    <Accordion
                      key={event.eventId}
                      sx={{
                        mb: 2,
                        "& .MuiTouchRipple-root": {
                          display: "none",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label={`Event details for ${
                          event.eventTitle || event.eventId
                        }`}
                        sx={{
                          "&:focus": {
                            outline: "3px solid #4a90e2",
                            outlineOffset: "2px",
                          },
                          "&:hover": {
                            backgroundColor: "rgba(0, 40, 85, 0.04)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: 2,
                          }}
                        >
                          <Typography
                            variant='h6'
                            sx={{ color: "#002855", fontWeight: 600 }}
                          >
                            {event.eventTitle || event.eventId}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <Chip
                              label={`${event.registrations.length}/${event.maxCapacity}`}
                              size='small'
                              sx={{
                                backgroundColor: "#e8f4f8",
                                color: "#002855",
                                fontWeight: 600,
                                border: "1px solid #002855",
                              }}
                            />
                            <Chip
                              label={`${
                                event.maxCapacity - event.registrations.length
                              } spots left`}
                              size='small'
                              sx={{
                                backgroundColor:
                                  event.maxCapacity -
                                    event.registrations.length ===
                                  0
                                    ? "#ffebee"
                                    : event.maxCapacity -
                                        event.registrations.length <
                                      10
                                    ? "#fff3e0"
                                    : "#e8f5e9",
                                color:
                                  event.maxCapacity -
                                    event.registrations.length ===
                                  0
                                    ? "#b71c1c"
                                    : event.maxCapacity -
                                        event.registrations.length <
                                      10
                                    ? "#e65100"
                                    : "#1b5e20",
                                fontWeight: 600,
                                border: `1px solid ${
                                  event.maxCapacity -
                                    event.registrations.length ===
                                  0
                                    ? "#b71c1c"
                                    : event.maxCapacity -
                                        event.registrations.length <
                                      10
                                    ? "#e65100"
                                    : "#1b5e20"
                                }`,
                              }}
                            />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer>
                          <Table
                            size='small'
                            aria-label={`Registrations for ${
                              event.eventTitle || event.eventId
                            }`}
                          >
                            <caption
                              style={{
                                position: "absolute",
                                left: "-10000px",
                                width: "1px",
                                height: "1px",
                                overflow: "hidden",
                              }}
                            >
                              Registrations for{" "}
                              {event.eventTitle || event.eventId} with{" "}
                              {event.registrations.length} total registrations
                            </caption>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell scope='col'>
                                  Registered At
                                </StyledTableCell>
                                <StyledTableCell scope='col'>
                                  Full Name
                                </StyledTableCell>
                                <StyledTableCell scope='col'>
                                  Username
                                </StyledTableCell>
                                <StyledTableCell scope='col'>
                                  Email
                                </StyledTableCell>
                                <StyledTableCell scope='col'>
                                  Status
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {event.registrations.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={5}
                                    align='center'
                                    sx={{
                                      py: 2,
                                      color: "#595959",
                                      fontSize: "0.9375rem",
                                    }}
                                    role='status'
                                  >
                                    No registrations for this event
                                  </TableCell>
                                </TableRow>
                              ) : (
                                event.registrations.map(
                                  (registration, index) => (
                                    <TableRow key={index} hover>
                                      <TableCell>
                                        {formatDate(registration.registeredAt)}
                                      </TableCell>
                                      <TableCell>
                                        {registration.fullName}
                                      </TableCell>
                                      <TableCell>
                                        {registration.username}
                                      </TableCell>
                                      <TableCell>
                                        {registration.email}
                                      </TableCell>
                                      <TableCell>
                                        <Chip
                                          label={registration.status}
                                          size='small'
                                          color={
                                            registration.status === "confirmed"
                                              ? "success"
                                              : "default"
                                          }
                                        />
                                      </TableCell>
                                    </TableRow>
                                  )
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  ))
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <EventManagementPanel onCountChange={setEventsCount} />
              </TabPanel>

              <TabPanel value={tabValue} index={4}>
                <ResourceUploadPanel onCountChange={setResourcesCount} />
              </TabPanel>
            </>
          )}
        </StyledPaper>
      </Container>
    </PageContainer>
  );
};

export default AdminDashboard;
