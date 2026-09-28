import { MOCK_DATA_SOURCES } from "@/mock/dataSources";
import { DataSourceFeed } from "@/types/dataSources";

export const dataSourcesService = {
  getDataSources(): DataSourceFeed[] {
    return MOCK_DATA_SOURCES;
  },
};
