import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import ResourceService from "../services/ResourceService";
import type { Resource, ResourcesResponse } from "../services/ResourceService";

const Resources: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const token = user?.token;

  const [loading, setLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const resourceTypes = [
    { key: "", label: "All Resources", icon: "📚" },
    { key: "annual-report", label: "Annual Reports", icon: "📊" },
    { key: "policy-brief", label: "Policy Briefs", icon: "📋" },
    { key: "training-manual", label: "Training Manuals", icon: "📖" },
    { key: "research", label: "Research", icon: "🔬" },
    { key: "guideline", label: "Guidelines", icon: "📝" },
    { key: "newsletter", label: "Newsletters", icon: "📰" },
    { key: "video", label: "Video Resources", icon: "🎥" },
  ];

  // Fetch featured resources
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const featured = await ResourceService.getFeaturedResources();
        setFeaturedResources(featured);
      } catch (err) {
        console.error("Error fetching featured resources:", err);
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Fetch resources based on filters
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError("");
      try {
        const response: ResourcesResponse = await ResourceService.getResources(
          selectedType || undefined,
          searchQuery || undefined
        );
        setResources(response.resources);
        setTypeCounts(response.typeCounts);
      } catch (err) {
        setError("Failed to load resources. Please try again.");
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [selectedType, searchQuery]);

  // Fetch user favorites if authenticated
  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated && user?.username && token) {
        try {
          const userFavorites = await ResourceService.getUserFavorites(
            user.username,
            token
          );
          const favoriteIds = new Set(userFavorites.map((f) => f.resource.id));
          setFavorites(favoriteIds);
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user, token]);

  const handleToggleFavorite = async (resourceId: number) => {
    if (!isAuthenticated || !user?.username || !token) {
      // Could show login prompt here
      return;
    }

    try {
      const response = await ResourceService.toggleFavorite(
        resourceId,
        user.username,
        token
      );

      if (response.success) {
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          if (response.isFavorited) {
            newFavorites.add(resourceId);
          } else {
            newFavorites.delete(resourceId);
          }
          return newFavorites;
        });

        // Update favorite count in resources
        setResources((prev) =>
          prev.map((r) =>
            r.id === resourceId
              ? { ...r, favoriteCount: response.favoriteCount }
              : r
          )
        );
        setFeaturedResources((prev) =>
          prev.map((r) =>
            r.id === resourceId
              ? { ...r, favoriteCount: response.favoriteCount }
              : r
          )
        );
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const handleDownload = async (resource: Resource) => {
    try {
      // Track click
      await ResourceService.trackClick(resource.id);

      // Update click count in UI
      setResources((prev) =>
        prev.map((r) =>
          r.id === resource.id ? { ...r, clicks: r.clicks + 1 } : r
        )
      );

      // Open file in new tab
      window.open(resource.fileUrl, "_blank");
    } catch (err) {
      console.error("Error tracking download:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const isVideo = resource.type === "video";
    const isFavorited = favorites.has(resource.id);

    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component='div'
          sx={{
            height: 200,
            bgcolor: "grey.200",
            position: "relative",
            backgroundImage: resource.thumbnailUrl
              ? `url(${resource.thumbnailUrl})`
              : "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              bgcolor: "white",
              borderRadius: 1,
              px: 1.5,
              py: 0.5,
            }}
          >
            <Typography variant='caption' fontWeight='bold'>
              {isVideo ? "VIDEO" : "PDF"}
            </Typography>
          </Box>
          {!isVideo && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                bgcolor: "rgba(0, 76, 145, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                p: 2,
              }}
            >
              <DescriptionIcon sx={{ fontSize: 32, color: "primary.main" }} />
            </Box>
          )}
        </CardMedia>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant='h6'
            component='h3'
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            {resource.title}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            {resource.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {resource.pages && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <DescriptionIcon fontSize='small' color='action' />
                <Typography variant='caption' color='text.secondary'>
                  {resource.pages} pages
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarIcon fontSize='small' color='action' />
              <Typography variant='caption' color='text.secondary'>
                {formatDate(resource.publishDate)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityIcon fontSize='small' color='action' />
              <Typography variant='caption' color='text.secondary'>
                {isVideo ? `${resource.clicks} views` : resource.clicks}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            variant='contained'
            fullWidth
            startIcon={isVideo ? <PlayArrowIcon /> : <DownloadIcon />}
            onClick={() => handleDownload(resource)}
          >
            {isVideo ? "Watch" : "Download"}
          </Button>
          <IconButton
            color={isFavorited ? "error" : "default"}
            onClick={() => handleToggleFavorite(resource.id)}
            disabled={!isAuthenticated}
          >
            {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #004c91 0%, #004c91 50%, #00a77f 100%)",
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: 80,
            right: "10%",
            width: 384,
            height: 384,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -33,
            left: 160,
            width: 600,
            height: 600,
            bgcolor: "rgba(246, 212, 105, 0.1)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            label='Resources & Publications'
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontSize: "1.125rem",
              px: 2,
              py: 3,
              mb: 3,
            }}
          />
          <Typography
            variant='h2'
            component='h1'
            gutterBottom
            fontWeight='bold'
          >
            Knowledge Library
          </Typography>
          <Typography variant='h6' sx={{ mb: 4, maxWidth: 800, opacity: 0.95 }}>
            Access our comprehensive collection of reports, research papers,
            training materials, and multimedia resources on disability rights
            and inclusion.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant='contained'
              size='large'
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.100" },
                boxShadow: 3,
              }}
              href='#all-resources'
            >
              Browse Resources
            </Button>
            <Button
              variant='outlined'
              size='large'
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": { borderColor: "grey.300" },
              }}
              href='#featured'
            >
              Featured Content
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Publications Section */}
      <Box id='featured' sx={{ py: 10, bgcolor: "grey.50" }}>
        <Container maxWidth='lg'>
          <Typography
            variant='h3'
            component='h2'
            align='center'
            gutterBottom
            color='primary'
          >
            Featured Publications
          </Typography>
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mb: 6 }}
          >
            Our most recent and impactful publications addressing disability
            rights, accessibility, and inclusive development.
          </Typography>

          {featuredLoading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
              }}
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant='rectangular' height={400} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
              }}
            >
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* All Resources Section */}
      <Box id='all-resources' sx={{ py: 10 }}>
        <Container maxWidth='lg'>
          <Typography
            variant='h3'
            component='h2'
            align='center'
            gutterBottom
            color='primary'
          >
            All Resources
          </Typography>
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mb: 6 }}
          >
            Browse our complete library of publications, organized by type and
            topic.
          </Typography>

          {/* Search and Filter */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <TextField
                fullWidth
                placeholder='Search by title or description...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: 600 }}
              />
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ ml: "auto" }}
              >
                <VisibilityIcon
                  fontSize='small'
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                />
                Showing {resources.length} of {resources.length} resources
              </Typography>
            </Box>

            {/* Category Chips */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {resourceTypes.map((type) => (
                <Chip
                  key={type.key}
                  label={
                    <>
                      <span style={{ marginRight: 8 }}>{type.icon}</span>
                      {type.label}
                      {typeCounts[type.key] !== undefined &&
                        type.key !== "" && (
                          <Box
                            component='span'
                            sx={{
                              ml: 1,
                              bgcolor:
                                selectedType === type.key
                                  ? "white"
                                  : "primary.light",
                              color:
                                selectedType === type.key
                                  ? "primary.main"
                                  : "white",
                              borderRadius: 1,
                              px: 1,
                              py: 0.25,
                              fontSize: "0.75rem",
                              fontWeight: "bold",
                            }}
                          >
                            {typeCounts[type.key] || 0}
                          </Box>
                        )}
                      {type.key === "" && (
                        <Box
                          component='span'
                          sx={{
                            ml: 1,
                            bgcolor:
                              selectedType === type.key
                                ? "white"
                                : "primary.light",
                            color:
                              selectedType === type.key
                                ? "primary.main"
                                : "white",
                            borderRadius: 1,
                            px: 1,
                            py: 0.25,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                          }}
                        >
                          {Object.values(typeCounts).reduce((a, b) => a + b, 0)}
                        </Box>
                      )}
                    </>
                  }
                  onClick={() => setSelectedType(type.key)}
                  color={selectedType === type.key ? "primary" : "default"}
                  variant={selectedType === type.key ? "filled" : "outlined"}
                  sx={{ fontSize: "1rem", py: 2.5 }}
                />
              ))}
            </Box>
          </Box>

          {/* Error State */}
          {error && (
            <Alert severity='error' sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* Resources Grid */}
          {loading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant='rectangular' height={400} />
              ))}
            </Box>
          ) : resources.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant='h6' color='text.secondary'>
                No resources found matching your criteria.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
              }}
            >
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: "10%",
            width: 600,
            height: 600,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <Container
          maxWidth='md'
          sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <Typography variant='h3' gutterBottom fontWeight='bold'>
            Stay Updated
          </Typography>
          <Typography variant='h6' sx={{ mb: 4, opacity: 0.95 }}>
            Subscribe to our newsletter to receive the latest publications and
            resources directly to your inbox.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant='contained'
              size='large'
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              Subscribe Now
            </Button>
            <Button
              variant='outlined'
              size='large'
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": { borderColor: "grey.300" },
              }}
            >
              Request Resources
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Resources;
