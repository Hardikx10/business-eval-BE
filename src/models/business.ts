import { required, string } from 'joi';
import { Schema, model, Document } from 'mongoose';

// KPI Metric Schema 
const KPIMetricSchema = new Schema({
  value: { type: Number }, 
  notes: { type: [String], default: [] },
});

// Custom cards for additional dynamic metrics
const CustomCardSchema = new Schema({
  id: {type:String, required:true},
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }, // Can store numbers or strings
  metricType: { type: String, enum: ['$', 'X', 'N', '%'], required: true },
  notes: { type: [String], default: [] },
  isIndependent : {type:Boolean, default:true}
});

// Main Business Interface
interface IBusiness extends Document {
  user_id: string;
  business_name: string;
  business_location?: string;
  business_url?: string;
  business_attachments?: string[];
  business_notes?:string[];
  // Independent KPIs 
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

  // Dependent KPIs 
  dscr?: { value: number; notes?: string[] };
  projected_cashflow?: { value: number; notes?: string[] };
  gross_multiple?: { value: number; notes?: string[] };
  sde_multiple?: { value: number; notes?: string[] };
  sba_loan_payment?: { value: number; notes?: string[] };
  total_debt_payments?: { value: number; notes?: string[] };
  projected_net_profit_margin?: { value: number; notes?: string[] };

  // Custom Cards for additional user-defined metrics
  custom_cards_columns?: {
    title: string;
    value: string | number;
    metric_type: '$' | 'X' | 'N' | '%';
    notes?: string[];
  }[];
}

// Main Business Schema
const BusinessSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  business_name: { type: String, required: true },
  business_location: { type: String },
  business_url: { type: String },
  business_attachments: { type: [String], default: [] },
  business_notes:{type:[String],default:[]},

  // Independent KPIs 
  current_cashflow: KPIMetricSchema,
  expected_salary: KPIMetricSchema,
  gross_revenue: KPIMetricSchema,
  growth_rate: KPIMetricSchema,
  asking_price: KPIMetricSchema,
  sde_value: KPIMetricSchema,
  loan_sba: {
    amount: KPIMetricSchema,
    rate: KPIMetricSchema,
    term: KPIMetricSchema,
  },
  loan_additional: {
    amount: KPIMetricSchema,
    rate: KPIMetricSchema,
    term: KPIMetricSchema,
  },
  additional_debt: KPIMetricSchema,

  // Dependent KPIs 
  dscr: KPIMetricSchema,
  projected_cashflow: KPIMetricSchema,
  gross_multiple: KPIMetricSchema,
  sde_multiple: KPIMetricSchema,
  sba_loan_payment: KPIMetricSchema,
  total_debt_payments: KPIMetricSchema,
  projected_net_profit_margin: KPIMetricSchema,

  // Custom KPI cards
  custom_cards_columns: [CustomCardSchema],
});


const Business = model<IBusiness>('Business', BusinessSchema);

export default Business;
