import { MOCK_ACTIVE_CYCLONES } from "@/mock/cyclones";
import { MOCK_AI_EVENTS } from "@/mock/events";
import { ActiveCyclone, AIEvent, CycloneObservation } from "@/types/cyclone";

export const cycloneService = {
  getActiveCyclones(): ActiveCyclone[] {
    return MOCK_ACTIVE_CYCLONES;
  },

  getCycloneById(id: string): ActiveCyclone | undefined {
    return MOCK_ACTIVE_CYCLONES.find((c) => c.id === id) || MOCK_ACTIVE_CYCLONES[0];
  },

  getAIEvents(cycloneId?: string): AIEvent[] {
    if (cycloneId) {
      return MOCK_AI_EVENTS.filter((e) => e.cycloneId === cycloneId);
    }
    return MOCK_AI_EVENTS;
  },

  getObservationAtTime(cycloneId: string, timeOffset: string): CycloneObservation | undefined {
    const cyclone = this.getCycloneById(cycloneId);
    if (!cyclone) return undefined;
    return cyclone.temporalSequence.find((obs) => obs.timeOffsetLabel === timeOffset) || cyclone.temporalSequence[cyclone.temporalSequence.length - 1];
  },
};
