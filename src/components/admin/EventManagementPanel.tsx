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
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
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
  fontWeight: 600,
  backgroundColor: "#e8f4f8",
  color: "#002855",
  fontSize: "0.9375rem",
});

const ActionButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: "rgba(0, 76, 145, 0.1)",
  },
});

const EmptyState = styled(Box)({
  textAlign: "center",
  py: 6,
  color: "#595959",
});

interface EventManagementPanelProps {
  onCountChange?: (count: number) => void;
}

export default function EventManagementPanel({
  onCountChange,
}: EventManagementPanelProps) {
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
  const [primaryLanguage, setPrimaryLanguage] = useState<string>("en");
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

  useEffect(() => {
    onCountChange?.(events.length);
  }, [events, onCountChange]);

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

      const eventsArray = Array.isArray(response) ? response : [];
      setEvents(eventsArray);
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
    // Get language name for display
    const languageNames: Record<string, string> = {
      en: "English",
      ne: "Nepali",
      new: "Newari",
      mai: "Maithili",
    };

    // Validate that primary language title and description are provided
    if (
      !formData.titleTranslations[primaryLanguage] ||
      !formData.descriptionTranslations[primaryLanguage] ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.location ||
      formData.maxAttendees === ""
    ) {
      setError(
        `Please fill in all required fields, including ${languageNames[primaryLanguage]} title and description`
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Auto-populate empty translations with primary language content
      const primaryTitle = formData.titleTranslations[primaryLanguage];
      const primaryDescription =
        formData.descriptionTranslations[primaryLanguage];
      const primaryAltText =
        formData.altTextTranslations[primaryLanguage] || "";

      const titleTranslations = {
        en: formData.titleTranslations.en || primaryTitle,
        ne: formData.titleTranslations.ne || primaryTitle,
        new: formData.titleTranslations.new || primaryTitle,
        mai: formData.titleTranslations.mai || primaryTitle,
      };

      const descriptionTranslations = {
        en: formData.descriptionTranslations.en || primaryDescription,
        ne: formData.descriptionTranslations.ne || primaryDescription,
        new: formData.descriptionTranslations.new || primaryDescription,
        mai: formData.descriptionTranslations.mai || primaryDescription,
      };

      const altTextTranslations = {
        en: formData.altTextTranslations.en || primaryAltText,
        ne: formData.altTextTranslations.ne || primaryAltText,
        new: formData.altTextTranslations.new || primaryAltText,
        mai: formData.altTextTranslations.mai || primaryAltText,
      };

      // Convert date strings to ISO 8601 format with time
      const startDateTime = new Date(formData.startDate);
      startDateTime.setHours(9, 0, 0, 0); // Default 9 AM

      const endDateTime = new Date(formData.endDate);
      endDateTime.setHours(17, 0, 0, 0); // Default 5 PM

      const eventData = {
        title: titleTranslations.en,
        description: descriptionTranslations.en,
        altText: altTextTranslations.en,
        titleTranslations: JSON.stringify(titleTranslations),
        descriptionTranslations: JSON.stringify(descriptionTranslations),
        altTextTranslations: JSON.stringify(altTextTranslations),
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
          `Event "${formData.titleTranslations[primaryLanguage]}" updated successfully`
        );
      } else {
        // Create new event
        await ApiService.postWithAuth("/api/admin/events", eventData);
        setSuccess(
          `Event "${formData.titleTranslations[primaryLanguage]}" created successfully`
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
        <Alert
          severity='error'
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
          role='alert'
          aria-live='assertive'
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity='success'
          sx={{ mb: 3 }}
          onClose={() => setSuccess(null)}
          role='status'
          aria-live='polite'
        >
          {success}
        </Alert>
      )}

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          aria-label='Add new event'
          sx={{
            backgroundColor: "#002855",
            "&:hover": {
              backgroundColor: "#001a3d",
            },
            "&:focus": {
              outline: "3px solid #4a90e2",
              outlineOffset: "2px",
            },
          }}
        >
          Add New Event
        </Button>
      </Box>

      {loading && events.length === 0 ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", py: 8 }}
          role='status'
          aria-live='polite'
        >
          <CircularProgress aria-label='Loading events' />
          <Typography sx={{ position: "absolute", left: "-10000px" }}>
            Loading events, please wait...
          </Typography>
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
          <Table aria-label='Events management table'>
            <caption
              style={{
                position: "absolute",
                left: "-10000px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              Events management with {events.length} total events
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell scope='col'>Title</StyledTableCell>
                <StyledTableCell scope='col'>Start Date</StyledTableCell>
                <StyledTableCell scope='col'>End Date</StyledTableCell>
                <StyledTableCell scope='col'>Location</StyledTableCell>
                <StyledTableCell scope='col'>Capacity</StyledTableCell>
                <StyledTableCell scope='col'>Status</StyledTableCell>
                <StyledTableCell scope='col' align='center'>
                  Actions
                </StyledTableCell>
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
        aria-labelledby='event-dialog-title'
        aria-describedby='event-dialog-description'
      >
        <DialogTitle
          id='event-dialog-title'
          sx={{ color: "#002855", fontWeight: 600 }}
        >
          {selectedEvent ? "Edit Event" : "Add New Event"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography
            id='event-dialog-description'
            sx={{ mb: 2, color: "#595959" }}
          >
            {selectedEvent
              ? "Edit event details. Select your primary language and fill in the required fields. Other languages will be auto-filled."
              : "Create a new event. Select your primary language and fill in the required fields. Other languages will be auto-filled with the same content."}
          </Typography>
          <Stack spacing={2.5}>
            {/* Primary Language Selector */}
            <FormControl fullWidth>
              <InputLabel id='primary-language-label'>
                Primary Language *
              </InputLabel>
              <Select
                labelId='primary-language-label'
                id='primary-language-select'
                value={primaryLanguage}
                label='Primary Language *'
                onChange={(e) => setPrimaryLanguage(e.target.value)}
                sx={{
                  "&:focus": {
                    outline: "3px solid #4a90e2",
                    outlineOffset: "2px",
                  },
                }}
              >
                <MenuItem value='en'>English</MenuItem>
                <MenuItem value='ne'>नेपाली (Nepali)</MenuItem>
                <MenuItem value='new'>नेवारी (Newari)</MenuItem>
                <MenuItem value='mai'>मैथिली (Maithili)</MenuItem>
              </Select>
            </FormControl>
            {/* Image Upload Section */}
            <Box
              sx={{
                border: "2px dashed #002855",
                borderRadius: 1,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(0, 40, 85, 0.05)",
                },
                "&:focus-within": {
                  outline: "3px solid #4a90e2",
                  outlineOffset: "2px",
                },
              }}
              component='label'
              role='button'
              tabIndex={0}
              aria-label='Upload event image'
            >
              <input
                type='file'
                accept='image/*'
                hidden
                onChange={handleImageUpload}
                aria-label='Select event image file'
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
              aria-label='Select language for event details'
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 2,
              }}
            >
              <Tab
                label='English'
                value='en'
                aria-label='English language tab'
              />
              <Tab label='नेपाली' value='ne' aria-label='Nepali language tab' />
              <Tab
                label='नेवारी'
                value='new'
                aria-label='Newari language tab'
              />
              <Tab
                label='मैथिली'
                value='mai'
                aria-label='Maithili language tab'
              />
            </Tabs>

            {/* Language-Specific Fields */}
            <TextField
              fullWidth
              label={`Event Title (${currentLanguage.toUpperCase()})${
                currentLanguage === primaryLanguage ? " *" : ""
              }`}
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
              required={currentLanguage === primaryLanguage}
              inputProps={{
                maxLength: 200,
                "aria-required":
                  currentLanguage === primaryLanguage ? "true" : "false",
                "aria-label": `Event title in ${currentLanguage.toUpperCase()}`,
              }}
              helperText={
                currentLanguage === primaryLanguage
                  ? "Required - Maximum 200 characters"
                  : `Optional - If empty, will use ${primaryLanguage.toUpperCase()} content - Maximum 200 characters`
              }
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
            aria-label={selectedEvent ? "Update event" : "Create event"}
            sx={{
              backgroundColor: "#002855",
              "&:hover": {
                backgroundColor: "#001a3d",
              },
              "&:focus": {
                outline: "3px solid #4a90e2",
                outlineOffset: "2px",
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
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle
          id='delete-dialog-title'
          sx={{ color: "#b71c1c", fontWeight: 600 }}
        >
          Delete Event?
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography id='delete-dialog-description'>
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
