import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Typography,
  Stack,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ApiService from "../../services/ApiService";
import { useAuth } from "../../contexts/AuthContext";

interface Event {
  id: number;
  title: string;
  description?: string;
  altText?: string;
  titleTranslations?: string;
  descriptionTranslations?: string;
  altTextTranslations?: string;
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees: number;
  currentAttendees?: number;
  featured?: boolean;
  imageUrl?: string;
  status?: string;
}

interface EventFormData {
  title: string;
  description: string;
  altText: string;
  titleTranslations: Record<string, string>;
  descriptionTranslations: Record<string, string>;
  altTextTranslations: Record<string, string>;
  startDate: string;
  endDate: string;
  location: string;
  maxAttendees: number | "";
  featured: boolean;
}

const StyledTableCell = styled(TableCell)({
  fontWeight: 500,
  backgroundColor: "#f8f9fa",
  color: "#004c91",
});

const ActionButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: "rgba(0, 76, 145, 0.1)",
  },
});

const EmptyState = styled(Box)({
  textAlign: "center",
  py: 6,
  color: "#666",
});

export default function EventManagementPanel() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    altText: "",
    titleTranslations: { en: "", ne: "", new: "", mai: "" },
    descriptionTranslations: { en: "", ne: "", new: "", mai: "" },
    altTextTranslations: { en: "", ne: "", new: "", mai: "" },
    startDate: "",
    endDate: "",
    location: "",
    maxAttendees: "",
    featured: false,
  });

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = user?.token;

      // Try admin endpoint first if user has token, fall back to public endpoint
      let response;
      if (token) {
        try {
          response = await ApiService.get("/api/admin/events", {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch {
          // Fall back to public endpoint if admin endpoint fails
          response = await ApiService.get("/api/events", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } else {
        response = await ApiService.get("/api/events");
      }

      setEvents(Array.isArray(response) ? response : []);
    } catch {
      setError("Failed to load events. Please try again.");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setSelectedEvent(event);

      // Parse translations from JSON strings if they exist
      let titleTranslations = { en: "", ne: "", new: "", mai: "" };
      let descriptionTranslations = { en: "", ne: "", new: "", mai: "" };
      let altTextTranslations = { en: "", ne: "", new: "", mai: "" };

      if (typeof event.titleTranslations === "string") {
        try {
          titleTranslations = JSON.parse(event.titleTranslations);
        } catch {
          // Use default if parsing fails
        }
      } else if (event.titleTranslations) {
        titleTranslations = event.titleTranslations;
      }

      if (typeof event.descriptionTranslations === "string") {
        try {
          descriptionTranslations = JSON.parse(event.descriptionTranslations);
        } catch {
          // Use default if parsing fails
        }
      } else if (event.descriptionTranslations) {
        descriptionTranslations = event.descriptionTranslations;
      }

      if (typeof event.altTextTranslations === "string") {
        try {
          altTextTranslations = JSON.parse(event.altTextTranslations);
        } catch {
          // Use default if parsing fails
        }
      } else if (event.altTextTranslations) {
        altTextTranslations = event.altTextTranslations;
      }

      setFormData({
        title: event.title,
        description: event.description || "",
        altText: event.altText || "",
        titleTranslations,
        descriptionTranslations,
        altTextTranslations,
        startDate: event.startDate.split("T")[0],
        endDate: event.endDate.split("T")[0],
        location: event.location,
        maxAttendees: event.maxAttendees,
        featured: event.featured || false,
      });
      if (event.imageUrl) {
        setImagePreview(event.imageUrl);
      }
    } else {
      setSelectedEvent(null);
      setFormData({
        title: "",
        description: "",
        altText: "",
        titleTranslations: { en: "", ne: "", new: "", mai: "" },
        descriptionTranslations: { en: "", ne: "", new: "", mai: "" },
        altTextTranslations: { en: "", ne: "", new: "", mai: "" },
        startDate: "",
        endDate: "",
        location: "",
        maxAttendees: "",
        featured: false,
      });
      setImagePreview(null);
    }
    setCurrentLanguage("en");
    setOpenDialog(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maxAttendees" ? (value ? parseInt(value) : "") : value,
    }));
  };

  const handleSaveEvent = async () => {
    // Validate that at least English title and description are provided
    if (
      !formData.titleTranslations.en ||
      !formData.descriptionTranslations.en ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.location ||
      formData.maxAttendees === ""
    ) {
      setError(
        "Please fill in all required fields, including English title and description"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert date strings to ISO 8601 format with time
      const startDateTime = new Date(formData.startDate);
      startDateTime.setHours(9, 0, 0, 0); // Default 9 AM

      const endDateTime = new Date(formData.endDate);
      endDateTime.setHours(17, 0, 0, 0); // Default 5 PM

      const eventData = {
        title: formData.titleTranslations.en,
        description: formData.descriptionTranslations.en,
        altText: formData.altTextTranslations.en || "",
        titleTranslations: JSON.stringify(formData.titleTranslations),
        descriptionTranslations: JSON.stringify(
          formData.descriptionTranslations
        ),
        altTextTranslations: JSON.stringify(formData.altTextTranslations),
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        location: formData.location,
        maxAttendees: formData.maxAttendees,
        featured: formData.featured,
      };

      if (selectedEvent) {
        // Edit existing event
        await ApiService.putWithAuth(
          `/api/admin/events/${selectedEvent.id}`,
          eventData
        );
        setSuccess(
          `Event "${formData.titleTranslations.en}" updated successfully`
        );
      } else {
        // Create new event
        await ApiService.postWithAuth("/api/admin/events", eventData);
        setSuccess(
          `Event "${formData.titleTranslations.en}" created successfully`
        );
      }

      handleCloseDialog();
      fetchEvents();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError("Failed to save event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;

    setLoading(true);
    setError(null);

    try {
      await ApiService.deleteWithAuth(`/api/admin/events/${selectedEvent.id}`);

      setSuccess(`Event "${selectedEvent.title}" deleted successfully`);
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
      fetchEvents();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError("Failed to delete event. Please try again.");
    } finally {
      setLoading(false);
    }
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

  return (
    <Box>
      {error && (
        <Alert severity='error' sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity='success'
          sx={{ mb: 3 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: "#004c91",
            "&:hover": {
              backgroundColor: "#003a6b",
            },
          }}
        >
          Add New Event
        </Button>
      </Box>

      {loading && events.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label='Loading events' />
        </Box>
      ) : events.length === 0 ? (
        <EmptyState>
          <Typography variant='h6' sx={{ mb: 1 }}>
            No events yet
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Create your first event to get started
          </Typography>
        </EmptyState>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Capacity</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align='center'>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} hover>
                  <TableCell>
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 600,
                        color: "#004c91",
                        maxWidth: 250,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={event.title}
                    >
                      {event.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.875rem" }}>
                    {formatDate(event.startDate)}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.875rem" }}>
                    {formatDate(event.endDate)}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${event.currentAttendees}/${event.maxAttendees}`}
                      size='small'
                      color={
                        event.currentAttendees === event.maxAttendees
                          ? "error"
                          : "primary"
                      }
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={event.status || "active"}
                      size='small'
                      color={
                        (event.status || "active").toLowerCase() === "active"
                          ? "success"
                          : (event.status || "active").toLowerCase() ===
                            "completed"
                          ? "default"
                          : (event.status || "active").toLowerCase() ===
                            "cancelled"
                          ? "error"
                          : ("default" as const)
                      }
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Stack
                      direction='row'
                      spacing={0.5}
                      justifyContent='center'
                    >
                      <ActionButton
                        size='small'
                        onClick={() => handleOpenDialog(event)}
                        title='Edit event'
                        aria-label={`Edit event ${event.title}`}
                      >
                        <EditIcon
                          sx={{ color: "#004c91", fontSize: "1.25rem" }}
                        />
                      </ActionButton>
                      <ActionButton
                        size='small'
                        onClick={() => handleDeleteClick(event)}
                        title='Delete event'
                        aria-label={`Delete event ${event.title}`}
                      >
                        <DeleteIcon
                          sx={{ color: "#d32f2f", fontSize: "1.25rem" }}
                        />
                      </ActionButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Event Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle sx={{ color: "#004c91", fontWeight: 600 }}>
          {selectedEvent ? "Edit Event" : "Add New Event"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            {/* Image Upload Section */}
            <Box
              sx={{
                border: "2px dashed #004c91",
                borderRadius: 1,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(0, 76, 145, 0.05)",
                },
              }}
              component='label'
            >
              <input
                type='file'
                accept='image/*'
                hidden
                onChange={handleImageUpload}
              />
              <Stack spacing={1} alignItems='center'>
                <CloudUploadIcon sx={{ fontSize: 32, color: "#004c91" }} />
                <Typography variant='body2' sx={{ color: "#004c91" }}>
                  Click to upload event image or drag and drop
                </Typography>
              </Stack>
            </Box>

            {/* Image Preview */}
            {imagePreview && (
              <Box
                component='img'
                src={imagePreview}
                alt='Event preview'
                sx={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 1,
                  objectFit: "cover",
                }}
              />
            )}

            {/* Featured Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
              }
              label='Mark as Featured Event'
            />

            {/* Language Tabs for Translations */}
            <Tabs
              value={currentLanguage}
              onChange={(_e, newValue) => setCurrentLanguage(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 2,
              }}
            >
              <Tab label='English' value='en' />
              <Tab label='नेपाली' value='ne' />
              <Tab label='नेवारी' value='new' />
              <Tab label='मैथिली' value='mai' />
            </Tabs>

            {/* Language-Specific Fields */}
            <TextField
              fullWidth
              label={`Event Title (${currentLanguage.toUpperCase()})`}
              value={formData.titleTranslations[currentLanguage] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  titleTranslations: {
                    ...formData.titleTranslations,
                    [currentLanguage]: e.target.value,
                  },
                })
              }
              required
              inputProps={{ maxLength: 200 }}
            />
            <TextField
              fullWidth
              label={`Description (${currentLanguage.toUpperCase()})`}
              value={formData.descriptionTranslations[currentLanguage] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descriptionTranslations: {
                    ...formData.descriptionTranslations,
                    [currentLanguage]: e.target.value,
                  },
                })
              }
              multiline
              rows={3}
              inputProps={{ maxLength: 1000 }}
            />
            <TextField
              fullWidth
              label={`Alt Text (${currentLanguage.toUpperCase()})`}
              value={formData.altTextTranslations[currentLanguage] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  altTextTranslations: {
                    ...formData.altTextTranslations,
                    [currentLanguage]: e.target.value,
                  },
                })
              }
              multiline
              rows={2}
              inputProps={{ maxLength: 500 }}
              helperText='Description of the event image for accessibility'
            />

            {/* Common Fields (not language-specific) */}
            <TextField
              fullWidth
              label='Location'
              name='location'
              value={formData.location}
              onChange={handleFormChange}
              required
              inputProps={{ maxLength: 200 }}
            />
            <TextField
              fullWidth
              label='Start Date'
              name='startDate'
              type='date'
              value={formData.startDate}
              onChange={handleFormChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label='End Date'
              name='endDate'
              type='date'
              value={formData.endDate}
              onChange={handleFormChange}
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label='Max Attendees'
              name='maxAttendees'
              type='number'
              value={formData.maxAttendees}
              onChange={handleFormChange}
              required
              inputProps={{ min: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveEvent}
            variant='contained'
            sx={{
              backgroundColor: "#004c91",
              "&:hover": {
                backgroundColor: "#003a6b",
              },
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : selectedEvent ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ color: "#d32f2f", fontWeight: 600 }}>
          Delete Event?
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedEvent?.title}</strong>? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant='contained'
            color='error'
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
