import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionPlan {
  id: string;
  name: string;
  name_ar: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  max_projects: number;
  max_chats_per_day: number;
  has_custom_domain: boolean;
  has_analytics: boolean;
  has_priority_support: boolean;
  has_remove_branding: boolean;
  paddle_product_id: string | null;
  lemonsqueezy_product_id: string | null;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  payment_provider: string | null;
  external_subscription_id: string | null;
  current_period_start: string;
  current_period_end: string | null;
  created_at: string;
  cancelled_at: string | null;
  plan?: SubscriptionPlan;
}

export const useSubscription = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
    fetchSubscription();
  }, []);

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('price', { ascending: true });

    if (!error && data) {
      // Parse features from jsonb
      const parsedPlans = data.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : JSON.parse(plan.features as string)
      }));
      setPlans(parsedPlans);
    }
  };

  const fetchSubscription = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();

    if (!error && data) {
      setSubscription(data);
      
      // Fetch the plan details
      const { data: planData } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', data.plan_id)
        .single();
      
      if (planData) {
        setCurrentPlan({
          ...planData,
          features: Array.isArray(planData.features) ? planData.features : JSON.parse(planData.features as string)
        });
      }
    }
    
    setLoading(false);
  };

  const subscribeToPlan = async (planId: string, provider: 'paddle' | 'lemonsqueezy' | 'manual') => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    // For free plan or manual, create subscription directly
    const plan = plans.find(p => p.id === planId);
    
    if (!plan) {
      throw new Error('الخطة غير موجودة');
    }

    if (plan.price === 0 || provider === 'manual') {
      // Create free subscription
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan_id: planId,
          status: 'active',
          payment_provider: provider === 'manual' ? 'manual' : null,
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });

      if (error) throw error;
      
      await fetchSubscription();
      return { success: true };
    }

    // For paid plans, return the payment URL
    if (provider === 'paddle' && plan.paddle_product_id) {
      return { 
        redirect: true, 
        url: `https://checkout.paddle.com/checkout/product/${plan.paddle_product_id}` 
      };
    }
    
    if (provider === 'lemonsqueezy' && plan.lemonsqueezy_product_id) {
      return { 
        redirect: true, 
        url: `https://store.lemonsqueezy.com/checkout/${plan.lemonsqueezy_product_id}` 
      };
    }

    // Manual payment - show contact info
    return { 
      manual: true,
      message: 'تواصل معنا عبر واتساب لإتمام الدفع'
    };
  };

  const getFreePlan = () => plans.find(p => p.price === 0);
  
  const canCreateProject = (currentProjectCount: number) => {
    if (!currentPlan) {
      const freePlan = getFreePlan();
      return currentProjectCount < (freePlan?.max_projects || 1);
    }
    return currentProjectCount < currentPlan.max_projects;
  };

  return {
    plans,
    subscription,
    currentPlan,
    loading,
    subscribeToPlan,
    canCreateProject,
    getFreePlan,
    refreshSubscription: fetchSubscription
  };
};
