export type TUserTypes = {
  name: string;
  email: string;
  password: string;
};

export type TBusinessTypes = {
  user_id?: string;
  business_name: string;
  business_location?: string;
  business_url?: string;
  business_attachments?: string[]; // Array for attachments (URLs or file paths)

  // Independent KPI fields with value and notes
  current_cashflow?: { value: number; notes?: string[] };
  expected_salary?: { value: number; notes?: string[] };
  gross_revenue?: { value: number; notes?: string[] };
  growth_rate?: { value: number; notes?: string[] };
  asking_price?: { value: number; notes?: string[] };
  sde_value?: { value: number; notes?: string[] };

  loan_sba?: {
    amount?: { value: number; notes?: string[] };
    rate?: { value: number; notes?: string[] };
    term?: { value: number; notes?: string[] };
  };

  loan_additional?: {
    amount?: { value: number; notes?: string[] };
    rate?: { value: number; notes?: string[] };
    term?: { value: number; notes?: string[] };
  };

  additional_debt?: { value: number; notes?: string[] };

  // Dependent KPIs (calculated)
  dscr?: { value: number; notes?: string[] };
  projected_cashflow?: { value: number; notes?: string[] };
  gross_multiple?: { value: number; notes?: string[] };
  sde_multiple?: { value: number; notes?: string[] };
  sba_loan_payment?: { value: number; notes?: string[] };
  total_debt_payments?: { value: number; notes?: string[] };
  projected_net_profit_margin?: { value: number; notes?: string[] };

  // General business notes
  business_notes?: string[];

  // Custom KPI cards
  custom_cards_columns?: {
    id:string;
    name: string;                  // Custom metric title (e.g., "Customer Retention Rate")
    value: string | number;         // Can store numbers or strings
    metricType: '$' | 'X' | 'N' | '%'; // Metric type: $, number (X), text (N), or percentage (%)
    notes?: string[];               // Optional notes for this custom metric
    isIndependent?:boolean
  }[];
};
