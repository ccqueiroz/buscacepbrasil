export interface ResponseRateLimitAdapter {
  code: number;
  message: string;
}

export interface ResponsePenalRateLimitAdapter {
  key: string;
  count: number;
}
