import { z } from 'zod';

export const onboardingRoleSchema = z.enum(['farmer', 'trader']);

const requiredText = (message: string) => z.string().trim().min(1, message);

export const onboardingProfileSchema = z
  .object({
    full_name: requiredText('Please enter your full name'),
    role: onboardingRoleSchema,
    farmer_crops: z.string().trim().optional(),
    farmer_area_m2: z.string().trim().optional(),
    farmer_estimated_productivity: z.string().trim().optional(),
    farmer_harvest_day: z.string().trim().optional(),
    farmer_harvest_month: z.string().trim().optional(),
    farmer_harvest_year: z.string().trim().optional(),
    trader_company: z.string().trim().optional(),
    trader_crop_types: z.string().trim().optional(),
    trader_weights: z.string().trim().optional(),
    trader_export_markets: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === 'farmer') {
      if (!data.farmer_crops) {
        ctx.addIssue({
          code: 'custom',
          path: ['farmer_crops'],
          message: 'Please enter your harvested crops',
        });
      }
      if (!data.farmer_area_m2) {
        ctx.addIssue({
          code: 'custom',
          path: ['farmer_area_m2'],
          message: 'Please enter your farm area',
        });
      }
      if (!data.farmer_estimated_productivity) {
        ctx.addIssue({
          code: 'custom',
          path: ['farmer_estimated_productivity'],
          message: 'Please enter estimated productivity',
        });
      }
    }

    if (data.role === 'trader') {
      if (!data.trader_company) {
        ctx.addIssue({
          code: 'custom',
          path: ['trader_company'],
          message: 'Please enter your company',
        });
      }
      if (!data.trader_crop_types) {
        ctx.addIssue({
          code: 'custom',
          path: ['trader_crop_types'],
          message: 'Please enter crop types to buy',
        });
      }
      if (!data.trader_weights) {
        ctx.addIssue({
          code: 'custom',
          path: ['trader_weights'],
          message: 'Please enter target weights',
        });
      }
      if (!data.trader_export_markets) {
        ctx.addIssue({
          code: 'custom',
          path: ['trader_export_markets'],
          message: 'Please enter export markets',
        });
      }
    }
  });

export const onboardingDraftSchema = z.object({
  full_name: requiredText('Please enter your full name').optional(),
  role: onboardingRoleSchema.optional(),
  onboarding_step: z.number().int().min(1).max(3).optional(),
});

export const onboardingCompleteSchema = z.object({
  full_name: requiredText('Please enter your full name'),
  role: onboardingRoleSchema,
});

export type OnboardingRole = z.infer<typeof onboardingRoleSchema>;
export type OnboardingProfileSchema = z.infer<typeof onboardingProfileSchema>;
export type OnboardingDraftSchema = z.infer<typeof onboardingDraftSchema>;
export type OnboardingCompleteSchema = z.infer<typeof onboardingCompleteSchema>;
