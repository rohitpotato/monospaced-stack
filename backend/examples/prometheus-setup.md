# Prometheus Core Web Vitals System

## How It Works

### 1. Data Flow
```
Frontend → Backend API → Queue → Worker → Database → Prometheus Endpoint
```

### 2. Prometheus Scraping (2-minute intervals)
- Prometheus scrapes `/api/metrics` every 2 minutes
- Returns aggregated metrics in Prometheus format
- Handles real-time Core Web Vitals changes

### 3. Example Prometheus Output
```
# HELP lcp Core Web Vitals metric
# TYPE lcp gauge
lcp{route="/",label="mobile"} 2.5
lcp{route="/blog",label="desktop"} 1.8

# HELP cls Core Web Vitals metric  
# TYPE cls gauge
cls{route="/",label="mobile"} 0.1
cls{route="/blog",label="desktop"} 0.05
```

### 4. PromQL Queries for Core Web Vitals

```promql
# Average LCP by route
avg(lcp) by (route)

# 95th percentile LCP
histogram_quantile(0.95, lcp)

# CLS threshold alerts
cls > 0.25

# Mobile vs Desktop performance
lcp{label="mobile"} / lcp{label="desktop"}
```

### 5. Frontend Integration Example

```javascript
// Send Core Web Vitals to backend
function sendWebVitals() {
  // LCP
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lcp = entries[entries.length - 1];
    
    fetch('/api/track', {
      method: 'POST',
      body: JSON.stringify({
        id: generateId(),
        events: [{
          id: generateId(),
          timestamp: Date.now(),
          name: 'lcp',
          value: lcp.startTime,
          route: window.location.pathname,
          label: getDeviceType()
        }]
      })
    });
  }).observe({entryTypes: ['largest-contentful-paint']});
}
```

### 6. Prometheus Configuration

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'core-web-vitals'
    scrape_interval: 2m
    static_configs:
      - targets: ['your-backend:5001']
    metrics_path: '/api/metrics'
```

### 7. Alerting Rules

```yaml
# alerts.yml
groups:
  - name: core-web-vitals
    rules:
      - alert: HighLCP
        expr: lcp > 4.0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "LCP is above 4 seconds"
          
      - alert: HighCLS
        expr: cls > 0.25
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "CLS is above 0.25"
```

## Key Benefits

1. **Real-time**: Captures CW Vitals as they happen
2. **Scalable**: Queue-based processing handles high volume
3. **Flexible**: Supports any metric type and labels
4. **Observable**: Full Prometheus integration for monitoring
5. **Alerting**: Can alert on threshold breaches
