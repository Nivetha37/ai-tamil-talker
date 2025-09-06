import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { MessageCircle, BarChart3, Info, CreditCard, Bot } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Chat", icon: MessageCircle },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/pricing", label: "Pricing", icon: CreditCard },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ChatBot SaaS
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="flex items-center space-x-2 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="default" className="hidden md:flex bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};