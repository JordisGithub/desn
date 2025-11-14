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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import AdminDashboard from "./AdminDashboard";

const PageContainer = styled(Box)({
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
  fontWeight: 500,
  backgroundColor: "#f8f9fa",
  color: "#004c91",
});

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  enabled: boolean;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: User;
  enabled?: boolean;
}

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
      id={`owner-tabpanel-${index}`}
      aria-labelledby={`owner-tab-${index}`}
      aria-hidden={!isActive}
      {...other}
    >
      {isActive && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const OwnerDashboard: React.FC = () => {
  usePageTitle("page_titles.owner_dashboard");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Dialog states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "MEMBER",
  });

  useEffect(() => {
    if (user?.role !== "OWNER") {
      navigate("/");
      return;
    }

    if (tabValue === 0) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, tabValue]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.get("/api/users", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.postWithAuth<ApiResponse>(
        "/api/users",
        formData
      );

      if (response.success) {
        setSuccessMessage("User created successfully");
        setOpenCreateDialog(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          fullName: "",
          role: "MEMBER",
        });
        fetchUsers();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.error || "Failed to create user");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: number, newRole: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.putWithAuth<ApiResponse>(
        `/api/users/${userId}/role`,
        { role: newRole }
      );

      if (response.success) {
        setSuccessMessage("User role updated successfully");
        setOpenEditDialog(false);
        setSelectedUser(null);
        fetchUsers();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.error || "Failed to update user role");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update user role"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.deleteWithAuth<ApiResponse>(
        `/api/users/${selectedUser.id}`
      );
      if (response.success) {
        setSuccessMessage("User deleted successfully");
        setOpenDeleteDialog(false);
        setSelectedUser(null);
        fetchUsers();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.error || "Failed to delete user");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiService.putWithAuth<ApiResponse>(
        `/api/users/${userId}/toggle-status`,
        {}
      );

      if (response.success) {
        setSuccessMessage("User status updated successfully");
        fetchUsers();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.error || "Failed to update user status");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update user status"
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "OWNER":
        return "error";
      case "ADMIN":
        return "warning";
      case "MEMBER":
        return "success";
      default:
        return "default";
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <PageContainer>
      <Container maxWidth='lg'>
        <Title>Owner Dashboard</Title>

        {error && (
          <Alert severity='error' sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity='success'
            sx={{ mb: 3 }}
            onClose={() => setSuccessMessage(null)}
          >
            {successMessage}
          </Alert>
        )}

        <StyledPaper>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label='Owner dashboard tabs'
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              label='User Management'
              id='owner-tab-0'
              aria-controls='owner-tabpanel-0'
            />
            <Tab
              label='Admin Features'
              id='owner-tab-1'
              aria-controls='owner-tabpanel-1'
            />
          </Tabs>

          {/* User Management Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant='h6' component='h2'>
                All Users
              </Typography>
              <Button
                variant='contained'
                color='primary'
                startIcon={<PersonAddIcon />}
                onClick={() => setOpenCreateDialog(true)}
                aria-label='Add new user'
              >
                Add User
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table aria-label='Users table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Username</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Full Name</StyledTableCell>
                      <StyledTableCell>Role</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Created</StyledTableCell>
                      <StyledTableCell align='right'>Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.username}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.fullName}</TableCell>
                        <TableCell>
                          <Chip
                            label={u.role}
                            color={getRoleColor(u.role)}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={u.enabled ? "Active" : "Disabled"}
                            color={u.enabled ? "success" : "default"}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(u.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align='right'>
                          <Tooltip title='Edit Role'>
                            <IconButton
                              size='small'
                              onClick={() => {
                                setSelectedUser(u);
                                setOpenEditDialog(true);
                              }}
                              aria-label={`Edit ${u.username} role`}
                            >
                              <EditIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={u.enabled ? "Disable" : "Enable"}>
                            <IconButton
                              size='small'
                              onClick={() => handleToggleStatus(u.id)}
                              aria-label={`${
                                u.enabled ? "Disable" : "Enable"
                              } ${u.username}`}
                            >
                              {u.enabled ? (
                                <BlockIcon fontSize='small' />
                              ) : (
                                <CheckCircleIcon fontSize='small' />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Delete User'>
                            <IconButton
                              size='small'
                              color='error'
                              onClick={() => {
                                setSelectedUser(u);
                                setOpenDeleteDialog(true);
                              }}
                              aria-label={`Delete ${u.username}`}
                            >
                              <DeleteIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Admin Features Tab - Reuse AdminDashboard */}
          <TabPanel value={tabValue} index={1}>
            <AdminDashboard />
          </TabPanel>
        </StyledPaper>

        {/* Create User Dialog */}
        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle>Create New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Username'
              type='text'
              fullWidth
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <TextField
              margin='dense'
              label='Email'
              type='email'
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              margin='dense'
              label='Password'
              type='password'
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <TextField
              margin='dense'
              label='Full Name'
              type='text'
              fullWidth
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <FormControl fullWidth margin='dense'>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label='Role'
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <MenuItem value='MEMBER'>Member</MenuItem>
                <MenuItem value='ADMIN'>Admin</MenuItem>
                <MenuItem value='OWNER'>Owner</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
            <Button
              onClick={handleCreateUser}
              variant='contained'
              color='primary'
              disabled={loading}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Role Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle>Edit User Role</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <>
                <Typography variant='body1' sx={{ mb: 2 }}>
                  User: <strong>{selectedUser.username}</strong> (
                  {selectedUser.email})
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={selectedUser.role}
                    label='Role'
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                  >
                    <MenuItem value='MEMBER'>Member</MenuItem>
                    <MenuItem value='ADMIN'>Admin</MenuItem>
                    <MenuItem value='OWNER'>Owner</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button
              onClick={() =>
                selectedUser &&
                handleUpdateRole(selectedUser.id, selectedUser.role)
              }
              variant='contained'
              color='primary'
              disabled={loading}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete User Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Typography>
                Are you sure you want to delete user{" "}
                <strong>{selectedUser.username}</strong> ({selectedUser.email})?
                This action cannot be undone.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteUser}
              variant='contained'
              color='error'
              disabled={loading}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageContainer>
  );
};

export default OwnerDashboard;
