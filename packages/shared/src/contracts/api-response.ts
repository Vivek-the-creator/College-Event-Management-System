export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ApiResponse<TData, TMeta extends Record<string, unknown> = Record<string, unknown>> =
  | {
      success: true;
      data: TData;
      meta: TMeta;
      error: null;
    }
  | {
      success: false;
      data: null;
      meta: TMeta;
      error: ApiError;
    };
