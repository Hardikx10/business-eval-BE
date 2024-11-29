import Joi from "joi";

export const createBusinessValidator = {
  body: Joi.object().keys({
    user_id: Joi.string().optional(),
    business_name: Joi.string().required(),
    business_location: Joi.string().optional().allow(''),
    business_url: Joi.string().uri().optional().allow(''),
    business_attachments: Joi.array().items(Joi.string()).optional(),
    cards_order : Joi.array().items(Joi.string()).optional(),
    // Independent KPIs with value and notes
    current_cashflow: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    expected_salary: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    gross_revenue: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    growth_rate: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    asking_price: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    sde_value: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    loan_sba: Joi.object({
      amount: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      rate: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      term: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
    }).optional(),
    loan_additional: Joi.object({
      amount: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      rate: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      term: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
    }).optional(),
    additional_debt: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),

    // Dependent KPIs (calculated)
    dscr: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    projected_cashflow: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    gross_multiple: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    sde_multiple: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    sba_loan_payment: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    total_debt_payments: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    projected_net_profit_margin: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),

    // Custom KPI cards
    custom_cards_columns: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
        value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        metric_type: Joi.string().valid('$', 'X', 'N', '%').required(),
        notes: Joi.array().items(Joi.string()).optional(),
      })
    ).optional(),

    // General business notes
    business_notes: Joi.array().items(Joi.string()).optional(),
  }),
};

export const updateBusinessValidator = {
  body: Joi.object().keys({
    business_name: Joi.string().optional(),
    business_location: Joi.string().optional().allow(''),
    business_url: Joi.string().uri().optional().allow(''),
    business_attachments: Joi.array().items(Joi.string()).optional(),
    cards_order : Joi.array().items(Joi.string()).optional(),
    // Core KPI fields with value and notes (all optional for updates)
    current_cashflow: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    expected_salary: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    gross_revenue: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    growth_rate: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    asking_price: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    sde_value: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    loan_sba: Joi.object({
      amount: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      rate: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      term: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
    }).optional(),
    loan_additional: Joi.object({
      amount: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      rate: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
      term: Joi.object({
        value: Joi.number().optional(),
        notes: Joi.array().items(Joi.string()).optional(),
      }).optional(),
    }).optional(),
    additional_debt: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),

    // Dependent KPIs (calculated)
    dscr: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    projected_cashflow: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    gross_multiple: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    sde_multiple: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    sba_loan_payment: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    total_debt_payments: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),
    projected_net_profit_margin: Joi.object({
      value: Joi.number().optional(),
      notes: Joi.array().items(Joi.string()).optional(),
    }).optional(),

    // Custom KPI cards
    custom_cards_columns: Joi.array().items(
      Joi.object({
        id:Joi.string().optional(),
        name: Joi.string().required(),
        value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        metricType: Joi.string().valid('$', 'X', 'N', '%').required(),
        notes: Joi.array().items(Joi.string()).optional(),
        isIndependent: Joi.boolean().optional()
      })
    ).optional(),

    // General business notes
    business_notes: Joi.array().items(Joi.string()).optional(),
  }),
};
