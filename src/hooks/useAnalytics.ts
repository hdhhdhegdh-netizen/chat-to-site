import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  weeklyVisits: number;
  visitsPerDay: { date: string; count: number }[];
  topProjects: { project_id: string; project_name: string; visits: number }[];
}

export function useAnalytics(userId?: string) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // Get user's projects first
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name')
        .eq('user_id', userId);

      if (!projects || projects.length === 0) {
        setData({
          totalVisits: 0,
          todayVisits: 0,
          weeklyVisits: 0,
          visitsPerDay: [],
          topProjects: [],
        });
        return;
      }

      const projectIds = projects.map(p => p.id);

      // Get total visits
      const { count: totalVisits } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .in('project_id', projectIds);

      // Get today's visits
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayVisits } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .in('project_id', projectIds)
        .gte('created_at', today.toISOString());

      // Get this week's visits
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { count: weeklyVisits } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .in('project_id', projectIds)
        .gte('created_at', weekAgo.toISOString());

      // Get visits per day (last 7 days)
      const { data: rawVisits } = await supabase
        .from('analytics')
        .select('created_at')
        .in('project_id', projectIds)
        .gte('created_at', weekAgo.toISOString())
        .order('created_at', { ascending: true });

      const visitsPerDay: { date: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const count = rawVisits?.filter(v => 
          v.created_at.startsWith(dateStr)
        ).length || 0;
        visitsPerDay.push({ date: dateStr, count });
      }

      // Get top projects by visits
      const { data: projectVisits } = await supabase
        .from('analytics')
        .select('project_id')
        .in('project_id', projectIds);

      const visitCounts: Record<string, number> = {};
      projectVisits?.forEach(v => {
        visitCounts[v.project_id] = (visitCounts[v.project_id] || 0) + 1;
      });

      const topProjects = Object.entries(visitCounts)
        .map(([project_id, visits]) => ({
          project_id,
          project_name: projects.find(p => p.id === project_id)?.name || 'غير معروف',
          visits,
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 5);

      setData({
        totalVisits: totalVisits || 0,
        todayVisits: todayVisits || 0,
        weeklyVisits: weeklyVisits || 0,
        visitsPerDay,
        topProjects,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, loading, refetch: fetchAnalytics };
}
