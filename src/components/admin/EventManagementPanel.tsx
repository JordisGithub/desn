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
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ApiService from "../../services/ApiService";
import EventService from "../../services/EventService";
import type { EventResponse } from "../../services/EventService";
import { getEventDisplayImageUrl } from "../../utils/eventImages";
import { useAuth } from "../../contexts/AuthContext";

interface Event {
  id: number;
  title: string;
  description?: string;
  altText?: string;
  titleTranslations?: string | Record<string, string>;
  descriptionTranslations?: string | Record<string, string>;
  altTextTranslations?: string | Record<string, string>;
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

const createEmptyTranslations = (initialValue = "") => ({
  en: initialValue,
  ne: initialValue,
  new: initialValue,
  mai: initialValue,
});

const createInitialFormData = (): EventFormData => ({
  title: "",
  description: "",
  altText: "",
  titleTranslations: createEmptyTranslations(),
  descriptionTranslations: createEmptyTranslations(),
  altTextTranslations: createEmptyTranslations(),
  startDate: "",
  endDate: "",
  location: "",
  maxAttendees: "",
  featured: false,
});

const parseTranslationMap = (
  value?: string | Record<string, string>,
  fallback = ""
): Record<string, string> => {
  const base = createEmptyTranslations(fallback || "");

  if (!value) {
    return base;
  }

  try {
    const parsedValue =
      typeof value === "string"
        ? (JSON.parse(value) as Record<string, string>)
        : value;
    return {
      ...base,
      ...parsedValue,
    };
  } catch (err) {
    console.error("Failed to parse translation data:", err);
    return base;
  }
};

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [primaryLanguage, setPrimaryLanguage] = useState<string>("en");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<EventFormData>(
    createInitialFormData()
  );
  const [dialogLoading, setDialogLoading] = useState(false);

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

      // Use public endpoint with optional auth header
      const response = token
        ? await ApiService.get("/api/events", {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await ApiService.get("/api/events");

      const eventsArray = Array.isArray(response) ? response : [];
      setEvents(eventsArray);
    } catch (err: unknown) {
      let errorMessage = "Failed to load events. Please try again.";

      if (err && typeof err === "object" && "status" in err) {
        const apiError = err as { status?: number };
        if (apiError.status === 0) {
          errorMessage =
            "Network error. Please check your connection and ensure the backend server is running.";
        }
      }

      setError(errorMessage);
      setEvents([]);
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFormState = () => {
    setFormData(createInitialFormData());
    setImagePreview(null);
    setImageFile(null);
  };

  const hydrateFormFromEvent = (eventData: Event | EventResponse) => {
    const titleTranslations = parseTranslationMap(
      eventData.titleTranslations,
      eventData.title
    );
    const descriptionTranslations = parseTranslationMap(
      eventData.descriptionTranslations,
      eventData.description || ""
    );
    const altTextTranslations = parseTranslationMap(
      eventData.altTextTranslations,
      eventData.altText || ""
    );

    setFormData({
      title: titleTranslations.en,
      description: descriptionTranslations.en,
      altText: altTextTranslations.en,
      titleTranslations,
      descriptionTranslations,
      altTextTranslations,
      startDate: eventData.startDate.split("T")[0],
      endDate: eventData.endDate.split("T")[0],
      location: eventData.location,
      maxAttendees: eventData.maxAttendees,
      featured: eventData.featured || false,
    });

    const adminImageUrl = getEventDisplayImageUrl(
      eventData.id,
      eventData.imageUrl
    );

    if (adminImageUrl) {
      const isAbsolute = /^(https?:)?\/\//.test(adminImageUrl);
      const isDataUrl = adminImageUrl.startsWith("data:");
      const fullImageUrl =
        isAbsolute || isDataUrl
          ? adminImageUrl
          : adminImageUrl.startsWith("/")
          ? adminImageUrl
          : `${import.meta.env.VITE_API_BASE_URL || ""}${adminImageUrl}`;
      setImagePreview(fullImageUrl);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
  };

  const handleOpenDialog = async (event?: Event) => {
    setCurrentLanguage("en");
    setFormErrors({});

    if (!event) {
      setSelectedEvent(null);
      resetFormState();
      setOpenDialog(true);
      return;
    }

    setSelectedEvent(event);
    hydrateFormFromEvent(event);
    setOpenDialog(true);
    setDialogLoading(true);

    try {
      const detailedEvent = await EventService.getEventById(event.id);
      hydrateFormFromEvent(detailedEvent);
    } catch (err) {
      console.error("Error loading event details:", err);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file (JPEG, PNG, GIF, or WebP)",
        }));
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      // Clear previous image error
      setFormErrors((prev) => {
        const { image: _image, ...rest } = prev;
        return rest;
      });

      setImageFile(file);
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
    setDialogLoading(false);
  };

  const handleSuccessClose = (_event?: unknown, reason?: string) => {
    if (reason === "clickaway") return;
    setSuccess(null);
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
    if (dialogLoading) {
      return;
    }
    // Clear previous errors
    setFormErrors({});
    setError(null);

    // Get language name for display
    const languageNames: Record<string, string> = {
      en: "English",
      ne: "Nepali",
      new: "Newari",
      mai: "Maithili",
    };

    const errors: Record<string, string> = {};

    // Validate primary language title
    const primaryTitle = formData.titleTranslations[primaryLanguage]?.trim();
    if (!primaryTitle) {
      errors.title = `${languageNames[primaryLanguage]} title is required`;
    } else if (primaryTitle.length < 3) {
      errors.title = "Title must be at least 3 characters long";
    } else if (primaryTitle.length > 200) {
      errors.title = "Title must not exceed 200 characters";
    }

    // Validate primary language description
    const primaryDescription =
      formData.descriptionTranslations[primaryLanguage]?.trim();
    if (!primaryDescription) {
      errors.description = `${languageNames[primaryLanguage]} description is required`;
    } else if (primaryDescription.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    } else if (primaryDescription.length > 1000) {
      errors.description = "Description must not exceed 1000 characters";
    }

    // Validate alt text if image is provided
    const primaryAltText =
      formData.altTextTranslations[primaryLanguage]?.trim();
    if ((imagePreview || imageFile) && !primaryAltText) {
      errors.altText =
        "Alt text is required when an image is provided (for accessibility)";
    }

    // Validate location
    if (!formData.location?.trim()) {
      errors.location = "Location is required";
    } else if (formData.location.length > 200) {
      errors.location = "Location must not exceed 200 characters";
    }

    // Validate start date
    if (!formData.startDate) {
      errors.startDate = "Start date is required";
    } else if (!selectedEvent) {
      // Only validate future dates for new events, not when editing existing events
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        errors.startDate = "Start date cannot be in the past";
      }
    }

    // Validate end date
    if (!formData.endDate) {
      errors.endDate = "End date is required";
    } else if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        errors.endDate = "End date must be on or after start date";
      }
    }

    // Validate max attendees
    if (formData.maxAttendees === "" || formData.maxAttendees === null) {
      errors.maxAttendees = "Maximum attendees is required";
    } else if (formData.maxAttendees < 1) {
      errors.maxAttendees = "Maximum attendees must be at least 1";
    } else if (formData.maxAttendees > 10000) {
      errors.maxAttendees = "Maximum attendees cannot exceed 10,000";
    }

    // Check authentication
    if (!user?.token) {
      setError("You must be logged in to create or edit events");
      return;
    }

    // If there are validation errors, display them and stop
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fix the validation errors before submitting");
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
          `/api/events/${selectedEvent.id}`,
          eventData
        );
        setSuccess(
          `Event "${formData.titleTranslations[primaryLanguage]}" updated successfully`
        );
      } else {
        // Create new event
        await ApiService.postWithAuth("/api/events", eventData);
        setSuccess(
          `Event "${formData.titleTranslations[primaryLanguage]}" created successfully`
        );
      }

      handleCloseDialog();
      fetchEvents();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      // Enhanced error handling with specific messages
      let errorMessage = "Failed to save event. Please try again.";

      if (err && typeof err === "object" && "status" in err) {
        const apiError = err as {
          status?: number;
          data?: { message?: string };
        };

        if (apiError.status === 401 || apiError.status === 403) {
          errorMessage =
            "You do not have permission to perform this action. Please log in as an admin.";
        } else if (apiError.status === 404) {
          errorMessage = "Event not found. It may have been deleted.";
        } else if (apiError.status === 400) {
          errorMessage =
            apiError.data?.message ||
            "Invalid event data. Please check all fields.";
        } else if (apiError.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (apiError.status === 0) {
          errorMessage = "Network error. Please check your connection.";
        }
      }

      setError(errorMessage);
      console.error("Error saving event:", err);
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

    const eventToDelete = selectedEvent;

    setLoading(true);
    setError(null);

    // Check authentication
    if (!user?.token) {
      setError("You must be logged in to delete events");
      setDeleteDialogOpen(false);
      return;
    }

    try {
      await ApiService.deleteWithAuth(`/api/events/${eventToDelete.id}`);

      setEvents((prev) =>
        prev.filter((event) => event.id !== eventToDelete.id)
      );
      setSuccess(`Event "${eventToDelete.title}" deleted successfully`);
      setDeleteDialogOpen(false);
      setSelectedEvent(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      let errorMessage = "Failed to delete event. Please try again.";

      if (err && typeof err === "object" && "status" in err) {
        const apiError = err as { status?: number };

        if (apiError.status === 401 || apiError.status === 403) {
          errorMessage = "You do not have permission to delete this event.";
        } else if (apiError.status === 404) {
          errorMessage = "Event not found. It may have already been deleted.";
        } else if (apiError.status === 0) {
          errorMessage = "Network error. Please check your connection.";
        }
      }

      setError(errorMessage);
      setDeleteDialogOpen(false);
      console.error("Error deleting event:", err);
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

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity='success'
          onClose={handleSuccessClose}
          variant='filled'
          elevation={6}
          role='status'
          aria-live='polite'
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>

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
        <DialogContent sx={{ pt: 3, position: "relative" }}>
          {dialogLoading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(255,255,255,0.86)",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 3,
              }}
            >
              <CircularProgress aria-label='Loading event details' />
              <Typography variant='body2' sx={{ mt: 2, color: "#004c91" }}>
                Loading event details...
              </Typography>
            </Box>
          )}
          <Typography
            id='event-dialog-description'
            sx={{ mb: 2, color: "#595959" }}
          >
            {selectedEvent
              ? "Edit event details. Select your primary language and fill in the required fields. Other languages will be auto-filled."
              : "Create a new event. Select your primary language and fill in the required fields. Other languages will be auto-filled with the same content."}
          </Typography>
          <Stack
            spacing={2.5}
            sx={{
              opacity: dialogLoading ? 0.4 : 1,
              pointerEvents: dialogLoading ? "none" : "auto",
            }}
          >
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
            <Box>
              <Box
                sx={{
                  border: formErrors.image
                    ? "2px dashed #d32f2f"
                    : "2px dashed #002855",
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
                  aria-invalid={!!formErrors.image}
                  aria-describedby={
                    formErrors.image ? "image-error" : undefined
                  }
                />
                <Stack spacing={1} alignItems='center'>
                  <CloudUploadIcon
                    sx={{
                      fontSize: 32,
                      color: formErrors.image ? "#d32f2f" : "#004c91",
                    }}
                  />
                  <Typography
                    variant='body2'
                    sx={{ color: formErrors.image ? "#d32f2f" : "#004c91" }}
                  >
                    Click to upload event image or drag and drop
                  </Typography>
                  <Typography variant='caption' sx={{ color: "#666" }}>
                    Accepted formats: JPEG, PNG, GIF, WebP • Max size: 5MB
                  </Typography>
                </Stack>
              </Box>
              {formErrors.image && (
                <Typography
                  id='image-error'
                  variant='caption'
                  sx={{ color: "#d32f2f", mt: 0.5, display: "block" }}
                  role='alert'
                >
                  {formErrors.image}
                </Typography>
              )}
            </Box>

            {/* Image Preview */}
            {imagePreview && (
              <Box sx={{ position: "relative" }}>
                <Box
                  component='img'
                  src={imagePreview}
                  alt='Event preview'
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 200,
                    borderRadius: 1,
                    objectFit: "cover",
                    border: "2px solid #e0e0e0",
                  }}
                />
                <IconButton
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  }}
                  aria-label='Remove image'
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
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
              onChange={(e) => {
                setFormData({
                  ...formData,
                  titleTranslations: {
                    ...formData.titleTranslations,
                    [currentLanguage]: e.target.value,
                  },
                });
                if (formErrors.title && currentLanguage === primaryLanguage) {
                  setFormErrors((prev) => {
                    const { title: _title, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required={currentLanguage === primaryLanguage}
              error={!!formErrors.title && currentLanguage === primaryLanguage}
              inputProps={{
                maxLength: 200,
                "aria-required":
                  currentLanguage === primaryLanguage ? "true" : "false",
                "aria-label": `Event title in ${currentLanguage.toUpperCase()}`,
                "aria-invalid":
                  formErrors.title && currentLanguage === primaryLanguage
                    ? "true"
                    : "false",
              }}
              helperText={
                formErrors.title && currentLanguage === primaryLanguage
                  ? formErrors.title
                  : currentLanguage === primaryLanguage
                  ? "Required - Maximum 200 characters"
                  : `Optional - If empty, will use ${primaryLanguage.toUpperCase()} content - Maximum 200 characters`
              }
            />
            <TextField
              fullWidth
              label={`Description (${currentLanguage.toUpperCase()})${
                currentLanguage === primaryLanguage ? " *" : ""
              }`}
              value={formData.descriptionTranslations[currentLanguage] || ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  descriptionTranslations: {
                    ...formData.descriptionTranslations,
                    [currentLanguage]: e.target.value,
                  },
                });
                if (
                  formErrors.description &&
                  currentLanguage === primaryLanguage
                ) {
                  setFormErrors((prev) => {
                    const { description: _description, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required={currentLanguage === primaryLanguage}
              error={
                !!formErrors.description && currentLanguage === primaryLanguage
              }
              multiline
              rows={3}
              inputProps={{
                maxLength: 1000,
                "aria-invalid":
                  formErrors.description && currentLanguage === primaryLanguage
                    ? "true"
                    : "false",
              }}
              helperText={
                formErrors.description && currentLanguage === primaryLanguage
                  ? formErrors.description
                  : currentLanguage === primaryLanguage
                  ? "Required - Maximum 1000 characters"
                  : `Optional - If empty, will use ${primaryLanguage.toUpperCase()} content`
              }
            />
            <TextField
              fullWidth
              label={`Alt Text (${currentLanguage.toUpperCase()})${
                (imagePreview || imageFile) &&
                currentLanguage === primaryLanguage
                  ? " *"
                  : ""
              }`}
              value={formData.altTextTranslations[currentLanguage] || ""}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  altTextTranslations: {
                    ...formData.altTextTranslations,
                    [currentLanguage]: e.target.value,
                  },
                });
                if (formErrors.altText && currentLanguage === primaryLanguage) {
                  setFormErrors((prev) => {
                    const { altText: _altText, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required={
                !!(imagePreview || imageFile) &&
                currentLanguage === primaryLanguage
              }
              error={
                !!formErrors.altText && currentLanguage === primaryLanguage
              }
              multiline
              rows={2}
              inputProps={{
                maxLength: 500,
                "aria-invalid":
                  formErrors.altText && currentLanguage === primaryLanguage
                    ? "true"
                    : "false",
              }}
              helperText={
                formErrors.altText && currentLanguage === primaryLanguage
                  ? formErrors.altText
                  : "Description of the event image for accessibility (required if image is uploaded)"
              }
            />

            {/* Common Fields (not language-specific) */}
            <TextField
              fullWidth
              label='Location *'
              name='location'
              value={formData.location}
              onChange={(e) => {
                handleFormChange(e);
                if (formErrors.location) {
                  setFormErrors((prev) => {
                    const { location: _location, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required
              error={!!formErrors.location}
              inputProps={{
                maxLength: 200,
                "aria-invalid": !!formErrors.location,
              }}
              helperText={
                formErrors.location || "Event location - Maximum 200 characters"
              }
            />
            <TextField
              fullWidth
              label='Start Date *'
              name='startDate'
              type='date'
              value={formData.startDate}
              onChange={(e) => {
                handleFormChange(e);
                if (formErrors.startDate) {
                  setFormErrors((prev) => {
                    const { startDate: _startDate, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required
              error={!!formErrors.startDate}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                "aria-invalid": !!formErrors.startDate,
              }}
              helperText={formErrors.startDate || "Event start date"}
            />
            <TextField
              fullWidth
              label='End Date *'
              name='endDate'
              type='date'
              value={formData.endDate}
              onChange={(e) => {
                handleFormChange(e);
                if (formErrors.endDate) {
                  setFormErrors((prev) => {
                    const { endDate: _endDate, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required
              error={!!formErrors.endDate}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                "aria-invalid": !!formErrors.endDate,
              }}
              helperText={
                formErrors.endDate ||
                "Event end date (must be on or after start date)"
              }
            />
            <TextField
              fullWidth
              label='Max Attendees *'
              name='maxAttendees'
              type='number'
              value={formData.maxAttendees}
              onChange={(e) => {
                handleFormChange(e);
                if (formErrors.maxAttendees) {
                  setFormErrors((prev) => {
                    const { maxAttendees: _maxAttendees, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              required
              error={!!formErrors.maxAttendees}
              inputProps={{
                min: 1,
                max: 10000,
                "aria-invalid": !!formErrors.maxAttendees,
              }}
              helperText={
                formErrors.maxAttendees ||
                "Maximum number of attendees (1-10,000)"
              }
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
            disabled={loading || dialogLoading}
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
