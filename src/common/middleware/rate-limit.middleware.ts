import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private store: RateLimitStore = {};
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor() {
    this.maxRequests = parseInt(
      process.env.RATE_LIMIT_MAX_REQUESTS || '100',
      10,
    );
    this.windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
  }

  use(req: Request, res: Response, next: NextFunction) {
    const key = this.getKey(req);
    const now = Date.now();
    const record = this.store[key];

    if (Math.random() < 0.01) {
      this.cleanExpiredRecords(now);
    }

    if (!record || now > record.resetTime) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      this.setRateLimitHeaders(res, this.maxRequests, 1, this.windowMs);
      return next();
    }

    if (record.count >= this.maxRequests) {
      this.setRateLimitHeaders(
        res,
        this.maxRequests,
        record.count,
        record.resetTime - now,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Too many requests, please try again later',
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    this.setRateLimitHeaders(
      res,
      this.maxRequests,
      record.count,
      record.resetTime - now,
    );
    next();
  }

  private getKey(req: Request): string {
    return req.ip || req.socket.remoteAddress || 'unknown';
  }

  private setRateLimitHeaders(
    res: Response,
    limit: number,
    remaining: number,
    resetTime: number,
  ): void {
    res.setHeader('X-RateLimit-Limit', limit.toString());
    res.setHeader(
      'X-RateLimit-Remaining',
      Math.max(0, limit - remaining).toString(),
    );
    res.setHeader(
      'X-RateLimit-Reset',
      new Date(Date.now() + resetTime).toISOString(),
    );
  }

  private cleanExpiredRecords(now: number): void {
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }
}
