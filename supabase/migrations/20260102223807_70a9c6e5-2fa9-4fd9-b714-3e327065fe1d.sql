-- Create subscription_plans table
CREATE TABLE public.subscription_plans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  name_ar text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'SAR',
  period text NOT NULL DEFAULT 'monthly',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  max_projects integer NOT NULL DEFAULT 1,
  max_chats_per_day integer NOT NULL DEFAULT 50,
  has_custom_domain boolean NOT NULL DEFAULT false,
  has_analytics boolean NOT NULL DEFAULT false,
  has_priority_support boolean NOT NULL DEFAULT false,
  has_remove_branding boolean NOT NULL DEFAULT false,
  paddle_product_id text,
  lemonsqueezy_product_id text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert default plans
INSERT INTO public.subscription_plans (name, name_ar, price, features, max_projects, max_chats_per_day, has_custom_domain, has_analytics, has_priority_support, has_remove_branding) VALUES
('free', 'مجاني', 0, '["موقع واحد", "نطاق فرعي chat2site.app", "محادثات غير محدودة", "تحديثات أسبوعية"]', 1, 50, false, false, false, false),
('pro', 'احترافي', 49, '["5 مواقع", "نطاق مخصص", "أولوية في البناء", "تحليلات متقدمة", "دعم فني سريع", "إزالة شعار Chat2Site"]', 5, 200, true, true, true, true),
('business', 'أعمال', 149, '["مواقع غير محدودة", "نطاقات متعددة", "API للتكامل", "أعضاء فريق متعددين", "دعم مخصص", "SLA مضمون"]', 999, 999, true, true, true, true);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  plan_id uuid REFERENCES public.subscription_plans(id),
  status text NOT NULL DEFAULT 'active',
  payment_provider text,
  external_subscription_id text,
  current_period_start timestamp with time zone NOT NULL DEFAULT now(),
  current_period_end timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  cancelled_at timestamp with time zone
);

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Plans are viewable by everyone
CREATE POLICY "Anyone can view active plans" 
ON public.subscription_plans 
FOR SELECT 
USING (is_active = true);

-- Users can view their own subscription
CREATE POLICY "Users can view their own subscription" 
ON public.subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own subscription (for free plan)
CREATE POLICY "Users can create their own subscription" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

-- Add trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();