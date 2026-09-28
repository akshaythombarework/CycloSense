import {
  MOCK_EXPLAINABILITY,
  MOCK_FORECAST_POINTS,
  MOCK_INTENSITY_INTERVALS,
  MOCK_PATTERN_EVOLUTION,
} from "@/mock/predictions";
import {
  ExplainabilityData,
  ForecastPoint,
  IntensityForecastInterval,
  PatternEvolutionSnapshot,
} from "@/types/prediction";

export const predictionService = {
  getForecastPoints(): ForecastPoint[] {
    return MOCK_FORECAST_POINTS;
  },

  getIntensityIntervals(): IntensityForecastInterval[] {
    return MOCK_INTENSITY_INTERVALS;
  },

  getPatternEvolution(): PatternEvolutionSnapshot[] {
    return MOCK_PATTERN_EVOLUTION;
  },

  getExplainability(): ExplainabilityData {
    return MOCK_EXPLAINABILITY;
  },
};
