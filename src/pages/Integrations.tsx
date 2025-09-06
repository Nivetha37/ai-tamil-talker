import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Globe, Smartphone, Webhook, Zap, Clock } from "lucide-react";

const integrations = [
  {
    name: "WhatsApp Business API",
    description: "Connect your chatbot directly to WhatsApp Business for seamless customer communication",
    icon: <MessageSquare className="h-8 w-8 text-secondary" />,
    status: "Coming Soon",
    statusColor: "bg-yellow-500",
    features: [
      "Auto-reply to WhatsApp messages",
      "Rich media support (images, documents)",
      "Contact management",
      "Broadcast messaging"
    ]
  },
  {
    name: "Website Widget",
    description: "Embed our chatbot directly into your website with a customizable chat widget",
    icon: <Globe className="h-8 w-8 text-primary" />,
    status: "Available",
    statusColor: "bg-secondary",
    features: [
      "Easy copy-paste integration",
      "Customizable colors and branding",
      "Mobile responsive design",
      "Analytics integration"
    ]
  },
  {
    name: "Mobile App SDK",
    description: "Native mobile SDKs for iOS and Android to integrate chatbot into your mobile apps",
    icon: <Smartphone className="h-8 w-8 text-secondary" />,
    status: "Coming Soon",
    statusColor: "bg-yellow-500",
    features: [
      "Native iOS and Android SDKs",
      "Offline message queuing",
      "Push notifications",
      "In-app chat interface"
    ]
  },
  {
    name: "REST API",
    description: "Powerful REST API for custom integrations with your existing systems",
    icon: <Webhook className="h-8 w-8 text-primary" />,
    status: "Available",
    statusColor: "bg-secondary",
    features: [
      "RESTful API endpoints",
      "Real-time webhooks",
      "Authentication & rate limiting",
      "Comprehensive documentation"
    ]
  },
  {
    name: "Zapier Integration",
    description: "Connect with 5000+ apps through Zapier for automated workflows",
    icon: <Zap className="h-8 w-8 text-secondary" />,
    status: "Coming Soon",
    statusColor: "bg-yellow-500",
    features: [
      "Trigger actions from chat events",
      "Send data to CRM systems",
      "Automated follow-ups",
      "Workflow automation"
    ]
  },
  {
    name: "Slack Integration",
    description: "Route escalated queries directly to your Slack channels for team collaboration",
    icon: <Clock className="h-8 w-8 text-primary" />,
    status: "Coming Soon",
    statusColor: "bg-yellow-500",
    features: [
      "Real-time escalation alerts",
      "Team assignment",
      "Conversation history sync",
      "Status updates"
    ]
  }
];

export const Integrations = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Integrations & Connections
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your AI chatbot with popular platforms and services to maximize reach and efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <Card 
              key={integration.name}
              className="relative transition-all duration-300 hover:shadow-elegant border border-border"
            >
              <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {integration.icon}
                    <div>
                      <CardTitle className="text-xl">{integration.name}</CardTitle>
                    </div>
                  </div>
                  <Badge 
                    className={`${integration.statusColor} text-white border-none`}
                  >
                    {integration.status}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {integration.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-2">
                  {integration.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={integration.status === "Available" ? "default" : "outline"}
                  className="w-full"
                  disabled={integration.status !== "Available"}
                >
                  {integration.status === "Available" ? "Setup Integration" : "Notify When Ready"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Integration?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team can build custom integrations for your specific business needs. 
            Contact our solutions team to discuss your requirements.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow text-white px-8 py-3"
          >
            Contact Solutions Team
          </Button>
        </div>
      </div>
    </div>
  );
};