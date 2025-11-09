package com.example.proxy;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/proxy")
public class ProxyController {

    private final Logger log = LoggerFactory.getLogger(ProxyController.class);

    @Value("${upstream.base.url}")
    private String upstreamBaseUrl;

    @Value("${server.api.key:}")
    private String serverApiKey;

    private final RestTemplate rest;

    public ProxyController(RestTemplate restTemplate) {
        this.rest = restTemplate;
    }

    private String extractPath(HttpServletRequest req) {
        String uri = req.getRequestURI();
        // strip /proxy prefix
        return uri.replaceFirst(req.getContextPath() + "/proxy", "");
    }

    @RequestMapping(value = "**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public ResponseEntity<String> proxy(HttpMethod method, HttpEntity<byte[]> httpEntity, HttpServletRequest request) throws IOException {
        String path = extractPath(request);
        String query = request.getQueryString();
        String target = upstreamBaseUrl + path + (query != null ? "?" + query : "");

        log.info("Incoming request: {} {} -> {}", method, path, target);

        HttpHeaders headers = new HttpHeaders();
        headers.putAll(httpEntity.getHeaders());

        // For POST/PUT/DELETE, ensure the server-side API key header is present
        if (method == HttpMethod.POST || method == HttpMethod.PUT || method == HttpMethod.DELETE) {
            if (serverApiKey != null && !serverApiKey.isEmpty()) {
                headers.set("X-API-Key", serverApiKey);
                log.debug("Added server-side X-API-Key header for method {}", method);
            } else {
                log.warn("Server API key is not configured but a mutating request was proxied: {} {}", method, path);
            }
        }

        byte[] body = httpEntity.getBody();

        HttpEntity<byte[]> forwardEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> resp = rest.exchange(URI.create(target), method, forwardEntity, String.class);

        log.info("Upstream responded: {} for {} {}", resp.getStatusCode(), method, path);

        return ResponseEntity.status(resp.getStatusCode()).headers(resp.getHeaders()).body(resp.getBody());
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        log.info("Health check requested");
        return ResponseEntity.ok("OK");
    }
}
