import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  CloudUpload,
  Delete,
  Refresh,
  Download,
  Edit,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import ApiService from "../../services/ApiService";

interface UploadedFile {
  id: number;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileName?: string;
  fileSize?: number;
  publishDate: string;
  clicks: number;
}

const CATEGORY_MAP: Record<string, string> = {
  "annual-report": "Annual Reports",
  "policy-brief": "Policy Briefs",
  "training-manual": "Training Manuals",
  research: "Research",
  registration: "Registrations",
  newsletter: "Newsletters",
};

interface ResourceUploadPanelProps {
  onCountChange?: (count: number) => void;
}

export default function ResourceUploadPanel({
  onCountChange,
}: ResourceUploadPanelProps) {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [resources, setResources] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<UploadedFile | null>(
    null
  );
  const [dragActive, setDragActive] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState<UploadedFile | null>(
    null
  );
  const [editCategory, setEditCategory] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      interface ResourcesResponse {
        resources: UploadedFile[];
      }
      const data = await ApiService.get<ResourcesResponse>("/api/resources");
      const resourcesArray = data.resources || [];
      setResources(resourcesArray);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setMessage({ type: "error", text: "Failed to load resources" });
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    onCountChange?.(resources.length);
  }, [resources, onCountChange]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setMessage(null);
      } else {
        setMessage({ type: "error", text: "Only PDF files are allowed" });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setMessage(null);
      } else {
        setMessage({ type: "error", text: "Only PDF files are allowed" });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !category) {
      setMessage({
        type: "error",
        text: "Please select both a file and category",
      });
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size must be less than 10MB" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      // Step 1: Upload file
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", category);

      const uploadData = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/files/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: formData,
        }
      ).then((res) => res.json());

      if (!uploadData.success) {
        throw new Error(uploadData.message || "Upload failed");
      }

      // Step 2: Create resource entry in database
      const resource = {
        title: selectedFile.name.replace(".pdf", ""),
        description: `${CATEGORY_MAP[category] || category} document`,
        type: category,
        fileUrl: `${import.meta.env.VITE_API_BASE_URL || ""}${
          uploadData.fileUrl
        }`,
        pages: 0,
        featured: false,
        clicks: 0,
        favoriteCount: 0,
        publishDate: new Date().toISOString(),
      };

      const resourceData = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/resources`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(resource),
        }
      ).then((res) => res.json());

      if (!resourceData.success) {
        throw new Error("Failed to create resource entry");
      }

      setMessage({
        type: "success",
        text: `Successfully uploaded ${selectedFile.name}`,
      });
      setSelectedFile(null);
      setCategory("");
      fetchResources();

      // Clear file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload file",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (resource: UploadedFile) => {
    setResourceToDelete(resource);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!resourceToDelete) return;

    try {
      // First delete resource from database
      const dbResponse = await ApiService.deleteWithAuth<{
        success: boolean;
        message: string;
      }>(`/api/resources/${resourceToDelete.id}`);

      if (!dbResponse || !dbResponse.success) {
        throw new Error("Failed to delete resource from database");
      }

      // Then try to delete file from storage (optional - may fail if file doesn't exist)
      try {
        const urlParts = resourceToDelete.fileUrl.split("/");
        const filename = urlParts[urlParts.length - 1];
        const category = urlParts[urlParts.length - 2];

        await ApiService.deleteWithAuth(`/api/files/${category}/${filename}`);
      } catch (fileError) {
        console.warn("File deletion failed (may not exist):", fileError);
      }

      setMessage({
        type: "success",
        text: "Resource deleted successfully",
      });
      fetchResources();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to delete resource",
      });
    } finally {
      setDeleteDialogOpen(false);
      setResourceToDelete(null);
    }
  };

  const handleEditClick = (resource: UploadedFile) => {
    setResourceToEdit(resource);
    setEditCategory(resource.type);
    setEditTitle(resource.title);
    setEditDialogOpen(true);
  };

  const handleEditConfirm = async () => {
    if (!resourceToEdit || !editCategory || !editTitle.trim()) return;

    try {
      const updatedResource = {
        ...resourceToEdit,
        type: editCategory,
        title: editTitle.trim(),
      };

      const response = await ApiService.putWithAuth<{
        success: boolean;
        message: string;
        resource: UploadedFile;
      }>(`/api/resources/${resourceToEdit.id}`, updatedResource);

      if (!response || !response.success) {
        throw new Error("Failed to update resource");
      }

      // Update local state immediately for instant feedback
      setResources((prevResources) => {
        const updated = prevResources.map((r) =>
          r.id === resourceToEdit.id
            ? { ...r, type: editCategory, title: editTitle.trim() }
            : r
        );
        console.log("Updated resources locally:", updated);
        return updated;
      });

      // Force re-render
      setRefreshKey((prev) => prev + 1);

      setMessage({
        type: "success",
        text: "Resource updated successfully",
      });

      // Close dialog and reset state
      setEditDialogOpen(false);
      setResourceToEdit(null);
      setEditCategory("");
      setEditTitle("");

      // Fetch from backend to ensure sync (but local state should already show the change)
      setTimeout(() => fetchResources(), 100);
    } catch (error) {
      console.error("Update error:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to update resource",
      });
      // Close dialog on error too
      setEditDialogOpen(false);
      setResourceToEdit(null);
      setEditCategory("");
      setEditTitle("");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      {/* Upload Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#002855",
            }}
          >
            <CloudUpload aria-hidden='true' /> Upload New Resource
          </Typography>

          {message && (
            <Alert
              severity={message.type}
              sx={{ mb: 2 }}
              onClose={() => setMessage(null)}
              role={message.type === "error" ? "alert" : "status"}
              aria-live={message.type === "error" ? "assertive" : "polite"}
            >
              {message.text}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id='resource-category-label'>Category *</InputLabel>
              <Select
                labelId='resource-category-label'
                id='resource-category-select'
                value={category}
                label='Category *'
                onChange={(e) => setCategory(e.target.value)}
                disabled={uploading}
                required
                aria-required='true'
                aria-label='Select resource category'
              >
                <MenuItem value='annual-report'>Annual Report</MenuItem>
                <MenuItem value='policy-brief'>Policy Brief</MenuItem>
                <MenuItem value='training-manual'>Training Manual</MenuItem>
                <MenuItem value='research'>Research</MenuItem>
                <MenuItem value='guideline'>Guideline</MenuItem>
                <MenuItem value='newsletter'>Newsletter</MenuItem>
              </Select>
            </FormControl>

            <Box
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              sx={{
                border: "2px dashed",
                borderColor: dragActive ? "#002855" : "#757575",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                backgroundColor: dragActive
                  ? "rgba(0, 40, 85, 0.05)"
                  : "background.paper",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "#002855",
                  backgroundColor: "rgba(0, 40, 85, 0.05)",
                },
                "&:focus-within": {
                  outline: "3px solid #4a90e2",
                  outlineOffset: "2px",
                },
              }}
              role='button'
              tabIndex={0}
              aria-label='Upload PDF file - drag and drop or click to browse'
            >
              <input
                type='file'
                id='file-upload'
                accept='.pdf,application/pdf'
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={uploading}
                aria-label='Select PDF file to upload'
                aria-describedby='file-upload-help'
              />
              <label
                htmlFor='file-upload'
                style={{ cursor: "pointer", display: "block" }}
              >
                <CloudUpload
                  sx={{ fontSize: 48, color: "#002855", mb: 1 }}
                  aria-hidden='true'
                />
                <Typography
                  variant='body1'
                  gutterBottom
                  sx={{ color: "#212121" }}
                >
                  Drag & drop your PDF here, or click to browse
                </Typography>
                <Typography
                  id='file-upload-help'
                  variant='caption'
                  sx={{ color: "#595959" }}
                >
                  Maximum file size: 10MB. Accepted format: PDF only
                </Typography>
              </label>
            </Box>

            {selectedFile && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#e8f5e9",
                  borderRadius: 1,
                  border: "1px solid #4caf50",
                }}
                role='status'
                aria-live='polite'
              >
                <Typography variant='body2' sx={{ color: "#1b5e20" }}>
                  <strong>Selected file:</strong> {selectedFile.name} (
                  {formatFileSize(selectedFile.size)})
                </Typography>
              </Box>
            )}
          </Box>

          {uploading && (
            <Box role='status' aria-live='polite' aria-label='Uploading file'>
              <LinearProgress sx={{ mb: 2 }} />
              <Typography sx={{ position: "absolute", left: "-10000px" }}>
                Uploading file, please wait...
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant='contained'
              onClick={handleUpload}
              disabled={!selectedFile || !category || uploading}
              startIcon={<CloudUpload />}
              fullWidth
              aria-label='Upload selected resource'
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
              {uploading ? "Uploading..." : "Upload Resource"}
            </Button>
            <Button
              variant='outlined'
              onClick={() => {
                setSelectedFile(null);
                setCategory("");
                setMessage(null);
              }}
              disabled={uploading}
              aria-label='Clear selected file and category'
              sx={{
                borderColor: "#002855",
                color: "#002855",
                "&:hover": {
                  borderColor: "#001a3d",
                  backgroundColor: "rgba(0, 40, 85, 0.05)",
                },
                "&:focus": {
                  outline: "3px solid #4a90e2",
                  outlineOffset: "2px",
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Resources List */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant='h5' component='h2' sx={{ color: "#002855" }}>
              Uploaded Resources ({resources.length})
            </Typography>
            <Button
              startIcon={<Refresh aria-hidden='true' />}
              onClick={fetchResources}
              disabled={loading}
              aria-label='Refresh resources list'
              sx={{
                "&:focus": {
                  outline: "3px solid #4a90e2",
                  outlineOffset: "2px",
                },
              }}
            >
              Refresh
            </Button>
          </Box>

          {loading ? (
            <Box
              role='status'
              aria-live='polite'
              aria-label='Loading resources'
            >
              <LinearProgress />
              <Typography sx={{ position: "absolute", left: "-10000px" }}>
                Loading resources, please wait...
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} variant='outlined'>
              <Table aria-label='Uploaded resources table'>
                <caption
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  Uploaded resources with {resources.length} total entries
                </caption>
                <TableHead>
                  <TableRow>
                    <TableCell
                      component='th'
                      scope='col'
                      sx={{ fontWeight: 600, color: "#002855" }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='col'
                      sx={{ fontWeight: 600, color: "#002855" }}
                    >
                      Category
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='col'
                      sx={{ fontWeight: 600, color: "#002855" }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='col'
                      sx={{ fontWeight: 600, color: "#002855" }}
                    >
                      Views
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='col'
                      align='right'
                      sx={{ fontWeight: 600, color: "#002855" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody key={refreshKey}>
                  {resources.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align='center' role='status'>
                        <Typography sx={{ color: "#595959", fontSize: "1rem" }}>
                          No resources uploaded yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    resources.map((resource) => (
                      <TableRow key={resource.id} hover>
                        <TableCell>
                          <Typography variant='body2'>
                            {resource.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={CATEGORY_MAP[resource.type] || resource.type}
                            size='small'
                            color='primary'
                            variant='outlined'
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' color='text.secondary'>
                            {formatDate(resource.publishDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            {resource.clicks}
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <IconButton
                            size='small'
                            onClick={() =>
                              window.open(resource.fileUrl, "_blank")
                            }
                            aria-label={`View or download ${resource.title}`}
                            sx={{
                              color: "#002855",
                              "&:focus": {
                                outline: "3px solid #4a90e2",
                                outlineOffset: "2px",
                              },
                            }}
                          >
                            <Download />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleEditClick(resource)}
                            aria-label={`Edit ${resource.title}`}
                            sx={{
                              color: "#01579b",
                              "&:focus": {
                                outline: "3px solid #4a90e2",
                                outlineOffset: "2px",
                              },
                            }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleDeleteClick(resource)}
                            aria-label={`Delete ${resource.title}`}
                            sx={{
                              color: "#b71c1c",
                              "&:focus": {
                                outline: "3px solid #4a90e2",
                                outlineOffset: "2px",
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby='delete-resource-dialog-title'
        aria-describedby='delete-resource-dialog-description'
      >
        <DialogTitle
          id='delete-resource-dialog-title'
          sx={{ color: "#b71c1c", fontWeight: 600 }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography id='delete-resource-dialog-description'>
            Are you sure you want to delete "{resourceToDelete?.title}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Resource Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth='sm'
        fullWidth
        aria-labelledby='edit-resource-dialog-title'
        aria-describedby='edit-resource-dialog-description'
      >
        <DialogTitle
          id='edit-resource-dialog-title'
          sx={{ color: "#002855", fontWeight: 600 }}
        >
          Edit Resource
        </DialogTitle>
        <DialogContent>
          <Typography
            id='edit-resource-dialog-description'
            variant='body2'
            sx={{ mb: 2, color: "#595959" }}
          >
            Update the title and category for this resource. All fields are
            required.
          </Typography>
          <TextField
            fullWidth
            label='Title *'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
            required
            inputProps={{
              "aria-required": "true",
              "aria-label": "Resource title",
            }}
            helperText='Required - Enter the resource title'
          />
          <FormControl fullWidth required>
            <InputLabel id='edit-category-label'>Category *</InputLabel>
            <Select
              labelId='edit-category-label'
              id='edit-category-select'
              value={editCategory}
              label='Category *'
              onChange={(e) => setEditCategory(e.target.value)}
              aria-required='true'
              aria-label='Select resource category'
            >
              <MenuItem value='annual-report'>Annual Report</MenuItem>
              <MenuItem value='policy-brief'>Policy Brief</MenuItem>
              <MenuItem value='training-manual'>Training Manual</MenuItem>
              <MenuItem value='research'>Research</MenuItem>
              <MenuItem value='registration'>Registration</MenuItem>
              <MenuItem value='newsletter'>Newsletter</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditConfirm}
            color='primary'
            variant='contained'
            disabled={!editCategory || !editTitle.trim()}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
