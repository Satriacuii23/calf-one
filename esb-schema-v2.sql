-- ESB Phase 4: Advanced Operations & HR Data Structure
-- Execute this script in your Supabase SQL Editor

-- 1. ESB Shifts (Sesi Kasir)
CREATE TABLE IF NOT EXISTS public.esb_shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    cashier_name VARCHAR(100) NOT NULL,
    shift_start TIMESTAMP WITH TIME ZONE NOT NULL,
    shift_end TIMESTAMP WITH TIME ZONE,
    opening_float NUMERIC(15,2) DEFAULT 0,
    expected_cash NUMERIC(15,2) DEFAULT 0,
    actual_cash NUMERIC(15,2) DEFAULT 0,
    cash_variance NUMERIC(15,2) GENERATED ALWAYS AS (actual_cash - expected_cash) STORED,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ESB Attendances (Absensi Karyawan)
CREATE TABLE IF NOT EXISTS public.esb_attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    employee_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
    clock_out TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'late', 'absent', 'leave')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ESB Suppliers (Vendor Logistik)
CREATE TABLE IF NOT EXISTS public.esb_suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    category VARCHAR(50), -- e.g., 'Produce', 'Packaging', 'Meat'
    avg_lead_time_days INTEGER DEFAULT 0,
    rating NUMERIC(2,1) DEFAULT 5.0 CHECK (rating >= 1.0 AND rating <= 5.0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ESB Stock Adjustments (Penyusutan/Wastage)
CREATE TABLE IF NOT EXISTS public.esb_stock_adjustments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID REFERENCES public.inventories(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    adjustment_qty NUMERIC(10,2) NOT NULL, -- negative for wastage/spoilage
    reason VARCHAR(50) NOT NULL CHECK (reason IN ('wastage', 'spoilage', 'damaged', 'stock_opname_correction')),
    remarks TEXT,
    reported_by VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ESB Kitchen Tickets (SLA Dapur)
CREATE TABLE IF NOT EXISTS public.esb_kitchen_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES public.orders(order_id) ON DELETE CASCADE,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    ticket_received_at TIMESTAMP WITH TIME ZONE NOT NULL,
    started_prep_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    prep_time_seconds INTEGER GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (completed_at - ticket_received_at))) STORED,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ESB Delivery Tracking (SLA Kurir)
CREATE TABLE IF NOT EXISTS public.esb_delivery_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES public.orders(order_id) ON DELETE CASCADE,
    courier_name VARCHAR(100),
    provider VARCHAR(50), -- e.g., 'GoFood', 'GrabFood', 'In-house'
    dispatched_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    delivery_time_seconds INTEGER GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (delivered_at - dispatched_at))) STORED,
    status VARCHAR(20) DEFAULT 'assigned' CHECK (status IN ('assigned', 'picked_up', 'delivered', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ESB Campaigns (Marketing)
CREATE TABLE IF NOT EXISTS public.esb_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_name VARCHAR(100) NOT NULL,
    channel VARCHAR(50) CHECK (channel IN ('email', 'push_notification', 'sms')),
    target_audience INTEGER NOT NULL,
    sent_count INTEGER DEFAULT 0,
    open_count INTEGER DEFAULT 0,
    conversion_count INTEGER DEFAULT 0,
    cost NUMERIC(15,2) DEFAULT 0,
    revenue_generated NUMERIC(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed')),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ESB Referrals (CRM)
CREATE TABLE IF NOT EXISTS public.esb_referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_member_code VARCHAR(50) REFERENCES public.members(member_code) ON DELETE CASCADE,
    referred_member_code VARCHAR(50) REFERENCES public.members(member_code) ON DELETE CASCADE,
    referral_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reward_granted BOOLEAN DEFAULT FALSE,
    reward_value NUMERIC(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ESB Taxes & Service (Accounting)
CREATE TABLE IF NOT EXISTS public.esb_taxes_and_service (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) REFERENCES public.orders(order_id) ON DELETE CASCADE,
    subtotal NUMERIC(15,2) NOT NULL,
    tax_amount NUMERIC(15,2) NOT NULL,
    service_charge NUMERIC(15,2) NOT NULL,
    total_amount NUMERIC(15,2) GENERATED ALWAYS AS (subtotal + tax_amount + service_charge) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow anonymous access (assuming public RLS)
ALTER TABLE public.esb_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_stock_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_kitchen_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.esb_taxes_and_service ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_shifts;
CREATE POLICY "Allow read access to all" ON public.esb_shifts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_attendances;
CREATE POLICY "Allow read access to all" ON public.esb_attendances FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_suppliers;
CREATE POLICY "Allow read access to all" ON public.esb_suppliers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_stock_adjustments;
CREATE POLICY "Allow read access to all" ON public.esb_stock_adjustments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_kitchen_tickets;
CREATE POLICY "Allow read access to all" ON public.esb_kitchen_tickets FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_delivery_tracking;
CREATE POLICY "Allow read access to all" ON public.esb_delivery_tracking FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_campaigns;
CREATE POLICY "Allow read access to all" ON public.esb_campaigns FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_referrals;
CREATE POLICY "Allow read access to all" ON public.esb_referrals FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow read access to all" ON public.esb_taxes_and_service;
CREATE POLICY "Allow read access to all" ON public.esb_taxes_and_service FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_shifts;
CREATE POLICY "Allow write access to all" ON public.esb_shifts FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_attendances;
CREATE POLICY "Allow write access to all" ON public.esb_attendances FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_suppliers;
CREATE POLICY "Allow write access to all" ON public.esb_suppliers FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_stock_adjustments;
CREATE POLICY "Allow write access to all" ON public.esb_stock_adjustments FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_kitchen_tickets;
CREATE POLICY "Allow write access to all" ON public.esb_kitchen_tickets FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_delivery_tracking;
CREATE POLICY "Allow write access to all" ON public.esb_delivery_tracking FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_campaigns;
CREATE POLICY "Allow write access to all" ON public.esb_campaigns FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_referrals;
CREATE POLICY "Allow write access to all" ON public.esb_referrals FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow write access to all" ON public.esb_taxes_and_service;
CREATE POLICY "Allow write access to all" ON public.esb_taxes_and_service FOR ALL USING (true) WITH CHECK (true);
