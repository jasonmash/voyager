import { ChartType, ChartData } from "./chart-data";

export interface Report {
  id: number;
  name: string;
  configurationIds: string[];
  sections: Section[];
}

export interface Section {
  title: string;
  type: ChartType;
  data: ChartData | null;
}
