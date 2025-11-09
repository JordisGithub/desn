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
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import ResourceService from "../services/ResourceService";
import type { Resource, ResourcesResponse } from "../services/ResourceService";

const Resources: React.FC = () => {
  const { t } = useTranslation();
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
    { key: "", label: t("resources.resource_types.all"), icon: "📚" },
    {
      key: "annual-report",
      label: t("resources.resource_types.annual_report"),
      icon: "📊",
    },
    {
      key: "policy-brief",
      label: t("resources.resource_types.policy_brief"),
      icon: "📋",
    },
    {
      key: "training-manual",
      label: t("resources.resource_types.training_manual"),
      icon: "📖",
    },
    {
      key: "research",
      label: t("resources.resource_types.research"),
      icon: "🔬",
    },
    {
      key: "guideline",
      label: t("resources.resource_types.guideline"),
      icon: "📝",
    },
    {
      key: "newsletter",
      label: t("resources.resource_types.newsletter"),
      icon: "📰",
    },
    { key: "video", label: t("resources.resource_types.video"), icon: "🎥" },
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
                  {resource.pages} {t("resources.pages")}
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
                {isVideo
                  ? `${resource.clicks} ${t("resources.views")}`
                  : resource.clicks}
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
            {isVideo ? t("resources.watch") : t("resources.download")}
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
    <>
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
            label={t("nav.resources")}
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
            {t("resources.hero_title")}
          </Typography>
          <Typography variant='h6' sx={{ mb: 4, maxWidth: 800, opacity: 0.95 }}>
            {t("resources.hero_description")}
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
              {t("resources.browse_resources")}
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
              {t("resources.featured_content")}
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
            {t("resources.featured_title")}
          </Typography>
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mb: 6 }}
          >
            {t("resources.featured_description")}
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
            {t("resources.all_resources_title")}
          </Typography>
          <Typography
            variant='body1'
            align='center'
            color='text.secondary'
            sx={{ mb: 6 }}
          >
            {t("resources.all_resources_description")}
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
                placeholder={t("resources.search_placeholder")}
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
                {t("resources.showing_results", {
                  count: resources.length,
                  total: resources.length,
                })}
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
                {t("resources.no_resources_found")}
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
            {t("resources.stay_updated_title")}
          </Typography>
          <Typography variant='h6' sx={{ mb: 4, opacity: 0.95 }}>
            {t("resources.stay_updated_description")}
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
              {t("resources.subscribe_now")}
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
              {t("resources.request_resources")}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Resources;
