import React from 'react';
import { Check, Star } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 'R0',
    period: 'Forever',
    description: 'Perfect for occasional travelers',
    features: [
      'Browse and search trips',
      'Basic messaging',
      'Community ratings',
      'Trip booking',
      'Standard support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'LiftMate Plus',
    price: 'R79',
    period: 'per month',
    description: 'Best for frequent travelers',
    features: [
      'Everything in Free',
      'Priority trip listings',
      'Advanced search filters',
      'Unlimited messages',
      'Premium support',
      'Trip cancellation protection',
      'Exclusive deals & discounts',
    ],
    popular: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Business',
    price: 'R299',
    period: 'per month',
    description: 'For package delivery businesses',
    features: [
      'Everything in Plus',
      'Bulk package delivery',
      'Business dashboard',
      'Analytics & reporting',
      'Dedicated account manager',
      'Custom delivery solutions',
      'API access',
    ],
    cta: 'Contact Sales',
  },
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                tier.popular
                  ? 'border-4 border-emerald-500 transform scale-105'
                  : 'border-2 border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  {tier.period !== 'Forever' && (
                    <span className="text-gray-600">/{tier.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include our safety features and community ratings.{' '}
            <a href="#" className="text-emerald-600 hover:underline font-semibold">
              Compare plans →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

