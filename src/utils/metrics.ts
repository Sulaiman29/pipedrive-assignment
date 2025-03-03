// metrics collector for tracking API performance
class MetricsCollector {
    private endpoints: Map<string, { 
      count: number, 
      totalDuration: number, 
      minDuration: number,
      maxDuration: number,
      lastTimestamp: number 
    }>;
    
    constructor() {
      this.endpoints = new Map();
    }
  
    recordRequest(endpoint: string, duration: number): void {
      const now = Date.now();
      const metrics = this.endpoints.get(endpoint) || { 
        count: 0, 
        totalDuration: 0, 
        minDuration: Number.MAX_VALUE,
        maxDuration: 0,
        lastTimestamp: now 
      };
      
      metrics.count += 1;
      metrics.totalDuration += duration;
      metrics.minDuration = Math.min(metrics.minDuration, duration);
      metrics.maxDuration = Math.max(metrics.maxDuration, duration);
      metrics.lastTimestamp = now;
      
      this.endpoints.set(endpoint, metrics);
      
      // Log the request metrics
      console.log(`[METRICS] ${endpoint} - Duration: ${duration}ms`);
    }
  
    getMetrics(): Record<string, any> {
      const result: Record<string, any> = {
        overall: {
          totalRequests: 0,
          meanDuration: 0,
          minDuration: Number.MAX_VALUE,
          maxDuration: 0
        },
        endpoints: {}
      };
      
      let totalRequests = 0;
      let totalDuration = 0;
      let minDuration = Number.MAX_VALUE;
      let maxDuration = 0;
      
      this.endpoints.forEach((metrics, endpoint) => {
        totalRequests += metrics.count;
        totalDuration += metrics.totalDuration;
        minDuration = Math.min(minDuration, metrics.minDuration);
        maxDuration = Math.max(maxDuration, metrics.maxDuration);
        
        result.endpoints[endpoint] = {
          requests: metrics.count,
          meanDuration: metrics.count > 0 ? Math.round(metrics.totalDuration / metrics.count) : 0,
          minDuration: metrics.minDuration === Number.MAX_VALUE ? 0 : metrics.minDuration,
          maxDuration: metrics.maxDuration,
          lastAccessed: new Date(metrics.lastTimestamp).toISOString()
        };
      });
      
      result.overall.totalRequests = totalRequests;
      result.overall.meanDuration = totalRequests > 0 ? Math.round(totalDuration / totalRequests) : 0;
      result.overall.minDuration = minDuration === Number.MAX_VALUE ? 0 : minDuration;
      result.overall.maxDuration = maxDuration;
      
      return result;
    }
  }
  
  // Export a singleton instance
  export const metricsCollector = new MetricsCollector();