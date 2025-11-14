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
} from "@mui/material";
import { CloudUpload, Delete, Refresh, Download } from "@mui/icons-material";
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
  guideline: "Guidelines",
  newsletter: "Newsletters",
};

export default function ResourceUploadPanel() {
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

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ApiService.get("/api/resources");
      setResources(data.resources || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setMessage({ type: "error", text: "Failed to load resources" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

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
      // Extract category and filename from fileUrl
      const urlParts = resourceToDelete.fileUrl.split("/");
      const filename = urlParts[urlParts.length - 1];
      const category = urlParts[urlParts.length - 2];

      // Delete file from storage
      await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || ""
        }/api/files/${category}/${filename}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to delete file");
        return res;
      });

      // Delete resource from database
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/resources/${
          resourceToDelete.id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to delete resource entry");
        return res;
      });

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
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CloudUpload /> Upload New Resource
          </Typography>

          {message && (
            <Alert
              severity={message.type}
              sx={{ mb: 2 }}
              onClose={() => setMessage(null)}
            >
              {message.text}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label='Category'
                onChange={(e) => setCategory(e.target.value)}
                disabled={uploading}
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
                borderColor: dragActive ? "primary.main" : "grey.300",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                backgroundColor: dragActive
                  ? "action.hover"
                  : "background.paper",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
            >
              <input
                type='file'
                id='file-upload'
                accept='.pdf,application/pdf'
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={uploading}
              />
              <label htmlFor='file-upload' style={{ cursor: "pointer" }}>
                <CloudUpload
                  sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                />
                <Typography variant='body1' gutterBottom>
                  Drag & drop your PDF here, or click to browse
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Maximum file size: 10MB
                </Typography>
              </label>
            </Box>

            {selectedFile && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "success.light",
                  borderRadius: 1,
                }}
              >
                <Typography variant='body2'>
                  <strong>Selected:</strong> {selectedFile.name} (
                  {formatFileSize(selectedFile.size)})
                </Typography>
              </Box>
            )}
          </Box>

          {uploading && <LinearProgress sx={{ mb: 2 }} />}

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant='contained'
              onClick={handleUpload}
              disabled={!selectedFile || !category || uploading}
              startIcon={<CloudUpload />}
              fullWidth
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
            <Typography variant='h5'>
              Uploaded Resources ({resources.length})
            </Typography>
            <Button
              startIcon={<Refresh />}
              onClick={fetchResources}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>

          {loading ? (
            <LinearProgress />
          ) : (
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Title</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Category</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Views</strong>
                    </TableCell>
                    <TableCell align='right'>
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resources.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align='center'>
                        <Typography color='text.secondary'>
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
                            color='primary'
                            onClick={() =>
                              window.open(resource.fileUrl, "_blank")
                            }
                            title='Download'
                          >
                            <Download />
                          </IconButton>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => handleDeleteClick(resource)}
                            title='Delete'
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
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
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
    </Box>
  );
}
