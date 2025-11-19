import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SearchService from "../services/SearchService";
import type { SearchItem } from "../services/SearchService";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAnnouncer } from "../hooks/useAnnouncer";

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8),
  minHeight: "60vh",
}));

const PageHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: "#004c91",
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const SearchInfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#e8f4f8",
  padding: theme.spacing(2),
  borderRadius: "8px",
  marginBottom: theme.spacing(4),
  textAlign: "center",
  borderLeft: "4px solid #004c91",
  border: "1px solid #004c91",
}));

const ResultsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ResultCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  border: "2px solid #e0e0e0",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 76, 145, 0.15)",
    transform: "translateY(-4px)",
    borderColor: "#004c91",
  },
  "&:focus-within": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
}));

const ResultTitle = styled(Link)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#004c91",
  textDecoration: "none",
  marginBottom: theme.spacing(1),
  display: "block",
  transition: "color 0.2s ease",
  "&:hover, &:focus": {
    color: "#002b52",
    textDecoration: "underline",
  },
  "&:focus": {
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
    borderRadius: "4px",
  },
}));

const ResultType = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#004c91",
  backgroundColor: "#e8f4f8",
  padding: theme.spacing(0.5, 1),
  borderRadius: "4px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: theme.spacing(1),
  display: "inline-block",
  border: "1px solid #004c91",
}));

const ResultExcerpt = styled(Typography)(({ theme }) => ({
  fontSize: "0.9375rem",
  color: "#333",
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
  flexGrow: 1,
}));

const ResultMatch = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: "#333",
  fontStyle: "italic",
  padding: theme.spacing(1),
  backgroundColor: "#fff3cd",
  borderRadius: "4px",
  marginTop: "auto",
  border: "1px solid #ffc107",
}));

const ResultTypeIcon = ({ type }: { type: string }) => {
  const iconAriaLabel: { [key: string]: string } = {
    event: "Event",
    resource: "Resource",
    page: "Page",
  };

  switch (type) {
    case "event":
      return (
        <EventIcon
          sx={{ fontSize: "1.25rem", mr: 1, color: "#004c91" }}
          aria-label={iconAriaLabel.event}
        />
      );
    case "resource":
      return (
        <DescriptionIcon
          sx={{ fontSize: "1.25rem", mr: 1, color: "#004c91" }}
          aria-label={iconAriaLabel.resource}
        />
      );
    default:
      return (
        <MenuBookIcon
          sx={{ fontSize: "1.25rem", mr: 1, color: "#004c91" }}
          aria-label={iconAriaLabel.page}
        />
      );
  }
};

export default function SearchResults() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { announce } = useAnnouncer();

  // Set document title
  usePageTitle(
    query ? `Search Results for "${query}"` : "Search Results - DESN"
  );

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        announce(
          t("search_results_no_query", {
            defaultValue: "Enter a search term to see results",
          })
        );
        return;
      }

      setLoading(true);
      announce(t("search_results_searching", { defaultValue: "Searching..." }));

      try {
        const searchResults = await SearchService.search(query, 50);
        setResults(searchResults);
        announce(
          `${searchResults.length} ${t("search_results_found", {
            defaultValue: "results found",
          })}`
        );

        // Move focus to results after search completes
        setTimeout(() => {
          resultsRef.current?.focus();
        }, 100);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
        announce(
          t("search_results_error", {
            defaultValue: "An error occurred during search",
          })
        );
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, announce, t]);

  return (
    <PageContainer maxWidth='lg'>
      <PageHeading variant='h1'>
        {t("search_results_title", { defaultValue: "Search Results" })}
      </PageHeading>

      <SearchInfoBox role='region' aria-label='Search information'>
        <Typography variant='body1' sx={{ fontWeight: 500, color: "#333" }}>
          {query ? (
            <>
              {t("search_results_for", { defaultValue: "Results for" })}:{" "}
              <strong>{query}</strong> — {results.length}{" "}
              {results.length === 1
                ? t("search_results_result_singular", {
                    defaultValue: "result found",
                  })
                : t("search_results_found", { defaultValue: "results found" })}
            </>
          ) : (
            t("search_results_no_query", {
              defaultValue: "Enter a search term to see results",
            })
          )}
        </Typography>
      </SearchInfoBox>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress aria-label='Loading search results' />
            <Typography variant='body2' sx={{ color: "#666" }}>
              {t("search_results_loading", {
                defaultValue: "Loading results...",
              })}
            </Typography>
          </Box>
        </Box>
      ) : results.length > 0 ? (
        <Box
          ref={resultsRef}
          tabIndex={-1}
          sx={{ outline: "none" }}
          role='region'
          aria-label='Search results'
        >
          <ResultsGrid>
            {results.map((result, index) => (
              <ResultCard key={result.id} elevation={0}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}
                  aria-label={`Result ${index + 1} of ${results.length}`}
                >
                  <ResultTypeIcon type={result.type} />
                  <ResultType>
                    {result.type === "page"
                      ? "Page"
                      : result.type === "resource"
                      ? "Resource"
                      : "Event"}
                  </ResultType>
                </Box>
                <ResultTitle to={result.url}>{result.title}</ResultTitle>
                {result.excerpt && (
                  <ResultExcerpt>{result.excerpt}</ResultExcerpt>
                )}
                {result.matchText && (
                  <ResultMatch>
                    <strong>Match:</strong> {result.matchText}
                  </ResultMatch>
                )}
              </ResultCard>
            ))}
          </ResultsGrid>
        </Box>
      ) : (
        <Alert severity='info' sx={{ my: 4 }}>
          <Typography variant='h6' sx={{ mb: 1 }}>
            {query
              ? t("search_results_no_results", {
                  defaultValue: "No results found for your search.",
                })
              : t("search_results_no_query", {
                  defaultValue: "Enter a search term to see results",
                })}
          </Typography>
          {query && (
            <Typography variant='body2'>
              {t("search_results_try_other", {
                defaultValue: "Try different keywords or browse our pages.",
              })}
            </Typography>
          )}
        </Alert>
      )}
    </PageContainer>
  );
}
