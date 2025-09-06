import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Multilingual AI Customer Support for Tamil Nadu
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering SMEs with 24x7 AI chatbot support in Tamil and English. 
              Reduce costs, improve customer satisfaction, and scale your business.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">The Problem</h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Small and Medium Enterprises (SMEs) in Tamil Nadu face significant challenges in providing 24x7 customer support:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>High costs of hiring multilingual support staff</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Limited availability during off-hours and weekends</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Language barriers between customers and support teams</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Slow response times leading to customer frustration</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-destructive">Business Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">70%</div>
                  <div className="text-sm text-muted-foreground">Customer churn due to poor support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">₹50K+</div>
                  <div className="text-sm text-muted-foreground">Monthly support staff costs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-primary">Our Solution Benefits</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">24x7</div>
                    <div className="text-sm text-muted-foreground">Instant availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">90%</div>
                    <div className="text-sm text-muted-foreground">Cost reduction</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our AI Solution</h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Our multilingual AI chatbot platform solves these challenges with:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Instant responses in Tamil and English 24x7</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>90% reduction in customer support costs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automatic language detection and response</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Seamless escalation to human agents when needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl border border-border hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">₹</span>
              </div>
              <h3 className="text-xl font-semibold">Cost Savings</h3>
              <p className="text-muted-foreground">
                Reduce customer support costs by up to 90% while maintaining quality service.
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-2xl border border-border hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold">Instant Response</h3>
              <p className="text-muted-foreground">
                Provide immediate answers to customer queries, improving satisfaction and retention.
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-2xl border border-border hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">📈</span>
              </div>
              <h3 className="text-xl font-semibold">Business Growth</h3>
              <p className="text-muted-foreground">
                Scale your customer support without additional hiring, focus on core business growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};