export type ApiResponse<T = unknown> = {
  status: 'success' | 'fail' | 'error';
  message: string;
  data?: T;
};

export type ExerciseParams = {
  params: {
    exerciseId: string;
  };
};
