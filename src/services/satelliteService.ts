import {
  MOCK_DATA_QUALITY,
  MOCK_FUSION_METRICS,
  MOCK_IR_METRICS,
  MOCK_MICROWAVE_METRICS,
  MOCK_PREPROCESSING_STEPS,
  MOCK_VISIBLE_METRICS,
} from "@/mock/satellite";
import {
  DataQualityReport,
  IRAnalysisMetrics,
  MicrowaveAnalysisMetrics,
  MultiSourceFusionMetrics,
  PreprocessingStep,
  VisibleAnalysisMetrics,
} from "@/types/satellite";

export const satelliteService = {
  getIRMetrics(): IRAnalysisMetrics {
    return MOCK_IR_METRICS;
  },

  getVisibleMetrics(): VisibleAnalysisMetrics {
    return MOCK_VISIBLE_METRICS;
  },

  getMicrowaveMetrics(): MicrowaveAnalysisMetrics {
    return MOCK_MICROWAVE_METRICS;
  },

  getFusionMetrics(): MultiSourceFusionMetrics {
    return MOCK_FUSION_METRICS;
  },

  getDataQualityReport(): DataQualityReport {
    return MOCK_DATA_QUALITY;
  },

  getPreprocessingSteps(): PreprocessingStep[] {
    return MOCK_PREPROCESSING_STEPS;
  },
};
