import {
  MOCK_HISTORICAL_CASES,
  MOCK_MODEL_BENCHMARKS,
  MOCK_VALIDATION_METRICS,
} from "@/mock/validation";
import {
  HistoricalCase,
  ModelPerformanceBenchmark,
  ValidationMetric,
} from "@/types/validation";

export const validationService = {
  getHistoricalCases(): HistoricalCase[] {
    return MOCK_HISTORICAL_CASES;
  },

  getCaseById(id: string): HistoricalCase | undefined {
    return MOCK_HISTORICAL_CASES.find((c) => c.id === id) || MOCK_HISTORICAL_CASES[0];
  },

  getValidationMetrics(): ValidationMetric[] {
    return MOCK_VALIDATION_METRICS;
  },

  getModelBenchmarks(): ModelPerformanceBenchmark[] {
    return MOCK_MODEL_BENCHMARKS;
  },
};
