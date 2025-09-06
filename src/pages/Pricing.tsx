import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Basic",
    description: "Perfect for small businesses getting started",
    price: "₹0.50",
    period: "per message",
    icon: <Zap className="h-8 w-8 text-primary" />,
    features: [
      "Pay per message",
      "Tamil + English support",
      "Basic analytics",
      "Email support",
      "Up to 1,000 messages/month"
    ],
    popular: false,
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    description: "Ideal for growing businesses with regular support needs",
    price: "₹2,999",
    period: "per month",
    icon: <Star className="h-8 w-8 text-primary" />,
    features: [
      "Unlimited messages",
      "Tamil + English + Hindi support",
      "Advanced analytics & reports",
      "Priority support",
      "Custom integrations",
      "WhatsApp Business API",
      "Website widget"
    ],
    popular: true,
    buttonText: "Start Pro Plan",
    buttonVariant: "default" as const
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "pricing",
    icon: <Crown className="h-8 w-8 text-primary" />,
    features: [
      "Everything in Pro",
      "Custom branding",
      "Multi-language support",
      "Dedicated account manager",
      "SLA guarantees",
      "On-premise deployment",
      "Custom AI training"
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
];

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your business. Start free, scale as you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary shadow-xl scale-105 bg-gradient-to-br from-primary/5 to-secondary/5' 
                  : 'hover:shadow-elegant'
              }`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1"
                >
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  {plan.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.period}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold mb-2">What languages are supported?</h3>
              <p className="text-muted-foreground">We currently support Tamil and English, with Hindi coming soon in Pro plans.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I upgrade my plan anytime?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time with no penalties.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes, all plans come with a 7-day free trial. No credit card required.</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">What integrations are available?</h3>
              <p className="text-muted-foreground">WhatsApp Business API, website widgets, and custom integrations via API.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};