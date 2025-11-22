import React, { useState, useEffect } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { useSearchHighlight } from "../hooks/useSearchHighlight";
import {
  Box,
  Container,
  Typography,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  IconButton,
  Skeleton,
  Alert,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  PlayArrow as PlayArrowIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import ResourceService from "../services/ResourceService";
import type { Resource, ResourcesResponse } from "../services/ResourceService";
import { getResourceTranslation } from "../utils/resourceTranslations";

const Resources: React.FC = () => {
  const { t, i18n } = useTranslation();
  usePageTitle("page_titles.resources");
  useSearchHighlight();
  const { isAuthenticated, user } = useAuth();
  const token = user?.token;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [resources, setResources] = useState<Resource[]>([]);
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
      key: "registration",
      label: t("resources.resource_types.registration"),
      icon: "📝",
    },
    {
      key: "newsletter",
      label: t("resources.resource_types.newsletter"),
      icon: "📰",
    },
    { key: "video", label: t("resources.resource_types.video"), icon: "🎥" },
  ];

  // Fetch resources based on filters
  useEffect(() => {
    let isMounted = true;

    const fetchResources = async () => {
      if (!isMounted) return;
      setLoading(true);
      setError("");
      try {
        const response: ResourcesResponse = await ResourceService.getResources(
          selectedType || undefined,
          undefined
        );
        if (isMounted) {
          setResources(response.resources);
          setTypeCounts(response.typeCounts);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load resources. Please try again.");
          console.error("Error fetching resources:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchResources();

    return () => {
      isMounted = false;
    };
  }, [selectedType]);

  // Fetch user favorites if authenticated
  useEffect(() => {
    let isMounted = true;

    const fetchFavorites = async () => {
      if (isAuthenticated && user?.username && token) {
        try {
          const userFavorites = await ResourceService.getUserFavorites(
            user.username,
            token
          );
          if (isMounted) {
            const favoriteIds = new Set(
              userFavorites.map((f) => f.resource.id)
            );
            setFavorites(favoriteIds);
          }
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      }
    };

    fetchFavorites();

    return () => {
      isMounted = false;
    };
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
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Use current i18n locale for date formatting
    const locale = t("date_locale") || "en-US";
    return date.toLocaleDateString(locale, {
      month: "short",
      year: "numeric",
    });
  };

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    const isVideo = resource.type === "video";
    const isFavorited = favorites.has(resource.id);

    // Get translated title and description based on current language
    const currentLang = i18n.language;
    const translated = getResourceTranslation(
      resource.id,
      resource.title,
      resource.description,
      currentLang
    );

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
        <Box sx={{ position: "relative" }}>
          {resource.thumbnailUrl ? (
            <CardMedia
              component='img'
              image={resource.thumbnailUrl}
              loading='lazy'
              alt={translated.title}
              sx={{
                height: 200,
                width: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <CardMedia
              component='div'
              sx={{
                height: 200,
                bgcolor: "grey.200",
                backgroundImage:
                  "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

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
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant='h6'
            component='h3'
            gutterBottom
            sx={{ color: "primary.main" }}
            id={`resource-title-${resource.id}`}
          >
            {translated.title}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            {translated.description}
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
              <CalendarIcon
                fontSize='small'
                color='action'
                aria-hidden='true'
              />
              <Typography variant='caption' color='text.secondary'>
                <Box
                  component='span'
                  sx={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: 0,
                  }}
                >
                  {t("resources.published_date") || "Published date:"}
                </Box>
                {formatDate(resource.publishDate)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityIcon
                fontSize='small'
                color='action'
                aria-hidden='true'
              />
              <Typography variant='caption' color='text.secondary'>
                <Box
                  component='span'
                  sx={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: 0,
                  }}
                >
                  {isVideo
                    ? t("resources.video_views_label") || "Video views:"
                    : t("resources.download_count_label") || "Download count:"}
                </Box>
                {isVideo
                  ? `${resource.clicks} ${t("resources.views")}`
                  : resource.clicks}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Link
            href={resource.fileUrl}
            target='_blank'
            rel='noopener noreferrer'
            onClick={async (_e) => {
              // Track click without preventing default link behavior
              try {
                await ResourceService.trackClick(resource.id);
                // Update click count in UI
                setResources((prev) =>
                  prev.map((r) =>
                    r.id === resource.id ? { ...r, clicks: r.clicks + 1 } : r
                  )
                );
              } catch (err) {
                console.error("Error tracking click:", err);
              }
            }}
            underline='none'
            sx={{
              width: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              padding: "8px 16px",
              backgroundColor: "#004c91",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "4px",
              textTransform: "none",
              letterSpacing: "0.02em",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#003d73",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 76, 145, 0.3)",
              },
              "&:focus": {
                outline: "3px solid #004c91",
                outlineOffset: "2px",
                backgroundColor: "#003d73",
                color: "#ffffff",
              },
              "&:focus-visible": {
                outline: "3px solid #004c91",
                outlineOffset: "2px",
                backgroundColor: "#003d73",
                color: "#ffffff",
              },
            }}
          >
            {isVideo ? (
              <>
                <PlayArrowIcon aria-hidden='true' sx={{ fontSize: 20 }} />
                {t("resources.watch")}
                <Box
                  component='span'
                  sx={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: 0,
                  }}
                >
                  : {translated.title}
                </Box>
                <OpenInNewIcon
                  aria-label={
                    t("resources.opens_new_window") || "opens in new window"
                  }
                  sx={{ fontSize: 18, ml: 0.5 }}
                />
              </>
            ) : (
              <>
                <DescriptionIcon aria-hidden='true' sx={{ fontSize: 20 }} />
                {t("view")}
                <Box
                  component='span'
                  sx={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: 0,
                  }}
                >
                  : {translated.title}
                </Box>
                <OpenInNewIcon
                  aria-label={
                    t("resources.opens_pdf_new_window") ||
                    "opens PDF in new window"
                  }
                  sx={{ fontSize: 18, ml: 0.5 }}
                />
              </>
            )}
          </Link>
          <IconButton
            color={isFavorited ? "error" : "default"}
            onClick={() => handleToggleFavorite(resource.id)}
            disabled={!isAuthenticated}
            aria-label={
              isFavorited
                ? t("resources.remove_favorite") ||
                  `Remove ${translated.title} from favorites`
                : t("resources.add_favorite") ||
                  `Add ${translated.title} to favorites`
            }
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 76, 145, 0.12)",
                transform: "scale(1.1)",
                "& svg": {
                  stroke: "#004c91",
                  strokeWidth: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                },
              },
              "&:focus": {
                outline: "3px solid #004c91",
                outlineOffset: "2px",
                backgroundColor: "rgba(0, 76, 145, 0.12)",
                transform: "scale(1.1)",
                "& svg": {
                  stroke: "#004c91",
                  strokeWidth: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                },
              },
              "&:focus-visible": {
                outline: "3px solid #004c91",
                outlineOffset: "2px",
                backgroundColor: "rgba(0, 76, 145, 0.12)",
                transform: "scale(1.1)",
                "& svg": {
                  stroke: "#004c91",
                  strokeWidth: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                },
              },
            }}
          >
            {isFavorited ? (
              <FavoriteIcon aria-hidden='true' />
            ) : (
              <FavoriteBorderIcon aria-hidden='true' />
            )}
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        component='section'
        aria-labelledby='hero-heading'
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

        <Container
          maxWidth='xl'
          sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3, md: 6 } }}
        >
          <Chip
            label={t("resources.knowledge_library")}
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
            id='hero-heading'
            sx={{ color: "white" }}
          >
            {t("resources.hero_title")}
          </Typography>
          <Typography
            variant='body1'
            sx={{ mb: 4, maxWidth: 800, opacity: 0.95, fontSize: "1.125rem" }}
          >
            {t("resources.hero_description")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}></Box>
        </Container>
      </Box>

      {/* All Resources Section */}
      <Box
        component='section'
        id='all-resources'
        sx={{ py: 10 }}
        aria-labelledby='all-resources-heading'
      >
        <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <Typography
            variant='h3'
            component='h2'
            align='center'
            gutterBottom
            color='primary'
            id='all-resources-heading'
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
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant='body2'
                color='text.secondary'
                aria-live='polite'
                aria-atomic='true'
              >
                <VisibilityIcon
                  fontSize='small'
                  sx={{ verticalAlign: "middle", mr: 0.5 }}
                  aria-hidden='true'
                />
                {t("resources.showing_results", {
                  count: resources.length,
                  total:
                    Object.values(typeCounts).reduce((a, b) => a + b, 0) ||
                    resources.length,
                })}
              </Typography>
            </Box>

            {/* Category Chips */}
            <Box
              sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
              role='group'
              aria-label={
                t("resources.filter_by_category") ||
                "Filter resources by category"
              }
            >
              {resourceTypes.map((type) => {
                const count =
                  type.key === ""
                    ? Object.values(typeCounts).reduce((a, b) => a + b, 0)
                    : typeCounts[type.key] || 0;
                const ariaDescId = `filter-desc-${type.key || "all"}`;

                return (
                  <Box key={type.key} sx={{ position: "relative" }}>
                    <Chip
                      label={
                        <>
                          <span aria-hidden='true' style={{ marginRight: 8 }}>
                            {type.icon}
                          </span>
                          {type.label}
                          {typeCounts[type.key] !== undefined &&
                            type.key !== "" && (
                              <Box
                                component='span'
                                aria-hidden='true'
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
                              aria-hidden='true'
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
                              {Object.values(typeCounts).reduce(
                                (a, b) => a + b,
                                0
                              )}
                            </Box>
                          )}
                        </>
                      }
                      onClick={() => setSelectedType(type.key)}
                      color={selectedType === type.key ? "primary" : "default"}
                      variant={
                        selectedType === type.key ? "filled" : "outlined"
                      }
                      aria-describedby={ariaDescId}
                      sx={{
                        fontSize: "1rem",
                        py: 2.5,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow:
                            selectedType === type.key
                              ? "0px 4px 12px rgba(0, 76, 145, 0.4)"
                              : "0px 4px 12px rgba(0, 0, 0, 0.2)",
                          backgroundColor:
                            selectedType === type.key
                              ? "#003d73"
                              : "rgba(0, 76, 145, 0.08)",
                          borderColor:
                            selectedType === type.key ? "#003d73" : "#004c91",
                        },
                        "&:focus": {
                          outline: "3px solid #004c91",
                          outlineOffset: "2px",
                          boxShadow:
                            selectedType === type.key
                              ? "0px 4px 12px rgba(0, 76, 145, 0.4)"
                              : "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        },
                        "&:focus-visible": {
                          outline: "3px solid #004c91",
                          outlineOffset: "2px",
                          boxShadow:
                            selectedType === type.key
                              ? "0px 4px 12px rgba(0, 76, 145, 0.4)"
                              : "0px 4px 12px rgba(0, 0, 0, 0.2)",
                        },
                        "& .MuiTouchRipple-root": {
                          display: "none",
                        },
                      }}
                    />
                    <span
                      id={ariaDescId}
                      style={{
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    >
                      {count} {t("resources.available_resources")}
                    </span>
                  </Box>
                );
              })}
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
              component='ul'
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 4,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {resources.map((resource) => (
                <Box component='li' key={resource.id}>
                  <ResourceCard resource={resource} />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Resources;
