import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface DashboardData {
  totalChats: number;
  dailyChats: Array<{ date: string; chats: number }>;
  languageStats: Array<{ name: string; value: number; color: string }>;
  escalationStats: Array<{ name: string; value: number }>;
}

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData>({
    totalChats: 0,
    dailyChats: [],
    languageStats: [],
    escalationStats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all chats
      const { data: chats, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!chats || chats.length === 0) {
        setData({
          totalChats: 0,
          dailyChats: [],
          languageStats: [
            { name: 'No data', value: 1, color: '#8884d8' }
          ],
          escalationStats: [
            { name: 'No data', value: 1 }
          ],
        });
        setLoading(false);
        return;
      }

      // Process data for charts
      const totalChats = chats.length;

      // Daily chats (last 7 days)
      const dailyChatsMap = new Map();
      const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      last7Days.forEach(date => {
        dailyChatsMap.set(date, 0);
      });

      chats.forEach(chat => {
        const date = new Date(chat.created_at).toISOString().split('T')[0];
        if (dailyChatsMap.has(date)) {
          dailyChatsMap.set(date, dailyChatsMap.get(date) + 1);
        }
      });

      const dailyChats = Array.from(dailyChatsMap, ([date, chats]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        chats
      }));

      // Language statistics
      const languageCounts = chats.reduce((acc, chat) => {
        const lang = chat.language || 'unknown';
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const languageStats = Object.entries(languageCounts).map(([name, value]) => ({
        name: name === 'tamil' ? 'Tamil' : name === 'english' ? 'English' : 'Unknown',
        value,
        color: name === 'tamil' ? '#FF6B35' : name === 'english' ? '#004E89' : '#8884d8'
      }));

      // Escalation statistics
      const escalatedCount = chats.filter(chat => chat.escalated).length;
      const answeredCount = chats.length - escalatedCount;

      const escalationStats = [
        { name: 'Answered', value: answeredCount },
        { name: 'Escalated', value: escalatedCount },
      ];

      setData({
        totalChats,
        dailyChats,
        languageStats,
        escalationStats,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">Monitor your chatbot performance and usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Chats */}
        <Card>
          <CardHeader>
            <CardTitle>Total Conversations</CardTitle>
            <CardDescription>All time chat interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{data.totalChats}</div>
          </CardContent>
        </Card>

        {/* Daily Chats Line Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Daily Chat Volume</CardTitle>
            <CardDescription>Conversations over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.dailyChats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="chats" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Language Usage Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Language Usage</CardTitle>
            <CardDescription>Distribution by language</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data.languageStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.languageStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Escalation Stats Bar Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Query Resolution</CardTitle>
            <CardDescription>Answered vs Escalated queries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.escalationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};