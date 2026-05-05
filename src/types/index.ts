export type Company = {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
};

export type GhgEmission = {
  yearMonth: string;
  source: string;
  emissions: number;
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
};

export interface ScopeEmissionsDataType {
  [key: string]: { scope: string; value: number; unit: string };
}

export interface YearlyEmissionDataType {
  year: string;
  scopeData: ScopeEmissionsDataType | null;
  total: number;
}

export interface MonthlyEmissionDataType {
  [key: string]: {
    month: string;
    scopeData: ScopeEmissionsDataType | null;
    total: number;
  };
}
