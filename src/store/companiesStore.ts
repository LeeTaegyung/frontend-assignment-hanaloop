import { Company } from '@/types';
import { create } from 'zustand';

interface CompanyStore {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  getCompanyById: (id: string) => Company | undefined;
}

export const useCompaniesStore = create<CompanyStore>((set, get) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
  getCompanyById: (id) => get().companies.find((c) => c.id === id),
}));
