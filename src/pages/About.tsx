import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const About = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">About AI Support</h1>
          <p className="text-xl text-muted-foreground">
            Multilingual customer support powered by artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                🤖 AI-Powered
              </CardTitle>
              <CardDescription>
                Advanced natural language processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our chatbot uses state-of-the-art AI models from HuggingFace to understand and respond to customer queries in real-time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                🌍 Multilingual
              </CardTitle>
              <CardDescription>
                Tamil and English support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatically detects and responds in Tamil (தமிழ்) or English, making support accessible to diverse customers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                📊 Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track conversation volume, language preferences, and resolution rates with detailed analytics and visualizations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                ⚡ Real-time
              </CardTitle>
              <CardDescription>
                Instant responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fast, responsive chat interface with WhatsApp-style messaging and real-time conversation flow.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Built with modern technologies for reliability and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl mb-2">⚛️</div>
                <p className="font-semibold">React</p>
                <p className="text-xs text-muted-foreground">Frontend</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl mb-2">🎨</div>
                <p className="font-semibold">Tailwind</p>
                <p className="text-xs text-muted-foreground">Styling</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl mb-2">🗄️</div>
                <p className="font-semibold">Supabase</p>
                <p className="text-xs text-muted-foreground">Database</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-2xl mb-2">🤖</div>
                <p className="font-semibold">HuggingFace</p>
                <p className="text-xs text-muted-foreground">AI Models</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
          <p className="text-muted-foreground">
            Navigate to the Chat page and start a conversation in Tamil or English!
          </p>
        </div>
      </div>
    </div>
  );
};