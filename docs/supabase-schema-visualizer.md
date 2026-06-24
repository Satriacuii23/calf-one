Project ID : uzkcbnyeqhtgzoflxenq
Publishable key : YOUR_SUPABASE_PUBLISHED_KEY_HERE
Secret keys : YOUR_SUPABASE_SECRET_KEY_HERE


## Table `companies`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_code` | `varchar` |  Unique |
| `company_name` | `varchar` |  |
| `company_alias` | `varchar` |  Nullable |
| `logo_url` | `text` |  Nullable |
| `address` | `text` |  Nullable |
| `phone` | `varchar` |  Nullable |
| `email` | `varchar` |  Nullable |
| `tax_number` | `varchar` |  Nullable |
| `founded_date` | `date` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `branches`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_id` | `uuid` |  Nullable |
| `branch_code` | `varchar` |  Unique |
| `branch_name` | `varchar` |  |
| `address` | `text` |  Nullable |
| `phone` | `varchar` |  Nullable |
| `latitude` | `numeric` |  Nullable |
| `longitude` | `numeric` |  Nullable |
| `city` | `varchar` |  Nullable |
| `region` | `varchar` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `is_open` | `bool` |  Nullable |
| `is_temporary_closed` | `bool` |  Nullable |
| `temporary_closed_info` | `text` |  Nullable |
| `theme_primary_color` | `varchar` |  Nullable |
| `theme_secondary_color` | `varchar` |  Nullable |
| `banner_image_url` | `text` |  Nullable |
| `thumbnail_image_url` | `text` |  Nullable |
| `membership_type` | `varchar` |  Nullable |
| `currency_sign` | `varchar` |  Nullable |
| `branch_timezone` | `varchar` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `business_hours`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `branch_id` | `uuid` |  Nullable |
| `day_id` | `int4` |  |
| `day_name` | `varchar` |  |
| `start_time` | `time` |  |
| `end_time` | `time` |  |
| `is_operating` | `bool` |  Nullable |
| `is_current_day` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_categories`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `branch_id` | `uuid` |  Nullable |
| `category_code` | `varchar` |  Unique |
| `category_name` | `varchar` |  |
| `category_name_en` | `varchar` |  Nullable |
| `category_description` | `text` |  Nullable |
| `category_image_url` | `text` |  Nullable |
| `category_order` | `int4` |  Nullable |
| `is_available` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_items`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `branch_id` | `uuid` |  Nullable |
| `category_id` | `uuid` |  Nullable |
| `menu_code` | `varchar` |  Unique |
| `menu_name` | `varchar` |  |
| `menu_name_en` | `varchar` |  Nullable |
| `menu_description` | `text` |  Nullable |
| `menu_description_en` | `text` |  Nullable |
| `menu_image_url` | `text` |  Nullable |
| `menu_price` | `numeric` |  |
| `menu_promotion_price` | `numeric` |  Nullable |
| `menu_calories` | `int4` |  Nullable |
| `menu_stock` | `int4` |  Nullable |
| `menu_stock_status` | `varchar` |  Nullable |
| `is_available` | `bool` |  Nullable |
| `is_recommended` | `bool` |  Nullable |
| `is_new` | `bool` |  Nullable |
| `preparation_time` | `int4` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_modifiers`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `menu_item_id` | `uuid` |  Nullable |
| `modifier_name` | `varchar` |  |
| `modifier_name_en` | `varchar` |  Nullable |
| `modifier_price` | `numeric` |  Nullable |
| `is_required` | `bool` |  Nullable |
| `min_select` | `int4` |  Nullable |
| `max_select` | `int4` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_modifier_options`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `modifier_id` | `uuid` |  Nullable |
| `option_name` | `varchar` |  |
| `option_name_en` | `varchar` |  Nullable |
| `option_price` | `numeric` |  Nullable |
| `is_default` | `bool` |  Nullable |
| `is_available` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_extras`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `menu_item_id` | `uuid` |  Nullable |
| `extra_name` | `varchar` |  |
| `extra_name_en` | `varchar` |  Nullable |
| `extra_price` | `numeric` |  |
| `extra_image_url` | `text` |  Nullable |
| `is_available` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_packages`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `menu_item_id` | `uuid` |  Nullable |
| `package_name` | `varchar` |  |
| `package_name_en` | `varchar` |  Nullable |
| `package_price` | `numeric` |  |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `package_items`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `package_id` | `uuid` |  Nullable |
| `item_name` | `varchar` |  |
| `item_quantity` | `int4` |  Nullable |
| `is_default` | `bool` |  Nullable |
| `is_replaceable` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `menu_addons`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `menu_item_id` | `uuid` |  Nullable |
| `addon_name` | `varchar` |  |
| `addon_name_en` | `varchar` |  Nullable |
| `addon_price` | `numeric` |  |
| `is_available` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `promotions`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `branch_id` | `uuid` |  Nullable |
| `promotion_code` | `varchar` |  Nullable |
| `promotion_name` | `varchar` |  |
| `promotion_name_en` | `varchar` |  Nullable |
| `promotion_description` | `text` |  Nullable |
| `promotion_description_en` | `text` |  Nullable |
| `promotion_type` | `varchar` |  Nullable |
| `discount_type` | `varchar` |  Nullable |
| `discount_value` | `numeric` |  Nullable |
| `max_discount` | `numeric` |  Nullable |
| `min_purchase` | `numeric` |  Nullable |
| `max_usage` | `int4` |  Nullable |
| `used_count` | `int4` |  Nullable |
| `start_date` | `timestamptz` |  Nullable |
| `end_date` | `timestamptz` |  Nullable |
| `image_url` | `text` |  Nullable |
| `terms_and_conditions` | `text` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `members`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_id` | `uuid` |  Nullable |
| `member_code` | `varchar` |  Unique |
| `member_name` | `varchar` |  |
| `member_email` | `varchar` |  Nullable |
| `member_phone` | `varchar` |  |
| `country_code` | `varchar` |  Nullable |
| `member_points` | `int4` |  Nullable |
| `member_tier` | `varchar` |  Nullable |
| `total_spent` | `numeric` |  Nullable |
| `total_transactions` | `int4` |  Nullable |
| `last_visit_date` | `timestamptz` |  Nullable |
| `registered_date` | `timestamptz` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `member_addresses`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `member_id` | `uuid` |  Nullable |
| `address_label` | `varchar` |  |
| `address` | `text` |  |
| `latitude` | `numeric` |  Nullable |
| `longitude` | `numeric` |  Nullable |
| `recipient_name` | `varchar` |  Nullable |
| `recipient_phone` | `varchar` |  Nullable |
| `notes` | `text` |  Nullable |
| `is_default` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `vouchers`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `branch_id` | `uuid` |  Nullable |
| `member_id` | `uuid` |  Nullable |
| `voucher_code` | `varchar` |  Unique |
| `voucher_name` | `varchar` |  |
| `voucher_name_en` | `varchar` |  Nullable |
| `voucher_description` | `text` |  Nullable |
| `voucher_type` | `varchar` |  Nullable |
| `discount_type` | `varchar` |  Nullable |
| `discount_value` | `numeric` |  Nullable |
| `max_discount` | `numeric` |  Nullable |
| `min_purchase` | `numeric` |  Nullable |
| `max_usage` | `int4` |  Nullable |
| `used_count` | `int4` |  Nullable |
| `valid_from` | `timestamptz` |  Nullable |
| `valid_until` | `timestamptz` |  Nullable |
| `image_url` | `text` |  Nullable |
| `terms_and_conditions` | `text` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `orders`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_id` | `varchar` |  Unique |
| `company_id` | `uuid` |  Nullable |
| `branch_id` | `uuid` |  Nullable |
| `member_id` | `uuid` |  Nullable |
| `external_order_id` | `varchar` |  Nullable |
| `delivery_transaction_id` | `varchar` |  Nullable |
| `order_type` | `varchar` |  |
| `order_type_name` | `varchar` |  Nullable |
| `queue_number` | `int4` |  Nullable |
| `subtotal` | `numeric` |  Nullable |
| `tax` | `numeric` |  Nullable |
| `service_charge` | `numeric` |  Nullable |
| `delivery_cost` | `numeric` |  Nullable |
| `total_discount` | `numeric` |  Nullable |
| `total_payment` | `numeric` |  Nullable |
| `payment_method` | `varchar` |  Nullable |
| `payment_status` | `varchar` |  Nullable |
| `status` | `varchar` |  Nullable |
| `customer_name` | `varchar` |  Nullable |
| `customer_phone` | `varchar` |  Nullable |
| `customer_email` | `varchar` |  Nullable |
| `delivery_address` | `text` |  Nullable |
| `delivery_latitude` | `numeric` |  Nullable |
| `delivery_longitude` | `numeric` |  Nullable |
| `notes` | `text` |  Nullable |
| `scheduled_time` | `timestamptz` |  Nullable |
| `transaction_date` | `timestamptz` |  Nullable |
| `completed_at` | `timestamptz` |  Nullable |
| `cancelled_at` | `timestamptz` |  Nullable |
| `cancel_reason` | `text` |  Nullable |
| `refund_status` | `varchar` |  Nullable |
| `refund_url` | `text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `order_items`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `order_id` | `uuid` |  Nullable |
| `menu_item_id` | `uuid` |  Nullable |
| `menu_code` | `varchar` |  Nullable |
| `menu_name` | `varchar` |  |
| `menu_price` | `numeric` |  |
| `menu_qty` | `int4` |  |
| `menu_subtotal` | `numeric` |  |
| `menu_notes` | `text` |  Nullable |
| `is_foc` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |

## Table `reservations`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `reservation_id` | `varchar` |  Unique |
| `company_id` | `uuid` |  Nullable |
| `branch_id` | `uuid` |  Nullable |
| `customer_name` | `varchar` |  |
| `customer_email` | `varchar` |  Nullable |
| `customer_phone` | `varchar` |  Nullable |
| `reservation_date` | `date` |  |
| `reservation_time` | `time` |  |
| `pax_total` | `int4` |  Nullable |
| `purpose` | `varchar` |  Nullable |
| `notes` | `text` |  Nullable |
| `status` | `varchar` |  Nullable |
| `cancel_reason` | `text` |  Nullable |
| `table_number` | `varchar` |  Nullable |
| `guest_emails` | `_text` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |
| `completed_at` | `timestamptz` |  Nullable |
| `cancelled_at` | `timestamptz` |  Nullable |

## Table `risk_alerts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_id` | `uuid` |  Nullable |
| `branch_id` | `uuid` |  Nullable |
| `risk_type` | `varchar` |  |
| `severity` | `varchar` |  |
| `title` | `varchar` |  |
| `description` | `text` |  Nullable |
| `suggested_action` | `text` |  Nullable |
| `is_actionable` | `bool` |  Nullable |
| `is_dismissed` | `bool` |  Nullable |
| `dismissed_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `ai_insights`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_id` | `uuid` |  Nullable |
| `insight_category` | `varchar` |  |
| `title` | `varchar` |  |
| `description` | `text` |  |
| `confidence` | `int4` |  |
| `expected_impact` | `text` |  Nullable |
| `potential_revenue` | `numeric` |  Nullable |
| `action_items` | `_text` |  Nullable |
| `is_implemented` | `bool` |  Nullable |
| `implemented_at` | `timestamptz` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `loop_themes`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_id` | `uuid` |  Nullable |
| `theme_name` | `varchar` |  |
| `primary_color` | `varchar` |  Nullable |
| `secondary_color` | `varchar` |  Nullable |
| `accent_color` | `varchar` |  Nullable |
| `background_color` | `varchar` |  Nullable |
| `text_color` | `varchar` |  Nullable |
| `font_family` | `varchar` |  Nullable |
| `logo_url` | `text` |  Nullable |
| `splash_screen_url` | `text` |  Nullable |
| `is_default` | `bool` |  Nullable |
| `is_active` | `bool` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |

## Table `vehicles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `company_id` | `uuid` |  Nullable |
| `plate_number` | `varchar` |  Unique |
| `vehicle_type` | `varchar` |  Nullable |
| `driver_name` | `varchar` |  Nullable |
| `driver_phone` | `varchar` |  Nullable |
| `status` | `varchar` |  Nullable |
| `location` | `varchar` |  Nullable |
| `latitude` | `numeric` |  Nullable |
| `longitude` | `numeric` |  Nullable |
| `efficiency` | `numeric` |  Nullable |
| `last_maintenance` | `date` |  Nullable |
| `created_at` | `timestamptz` |  Nullable |
| `updated_at` | `timestamptz` |  Nullable |


-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.companies (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_code character varying NOT NULL UNIQUE,
  company_name character varying NOT NULL,
  company_alias character varying,
  logo_url text,
  address text,
  phone character varying,
  email character varying,
  tax_number character varying,
  founded_date date,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT companies_pkey PRIMARY KEY (id)
);
CREATE TABLE public.branches (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid,
  branch_code character varying NOT NULL UNIQUE,
  branch_name character varying NOT NULL,
  address text,
  phone character varying,
  latitude numeric,
  longitude numeric,
  city character varying,
  region character varying,
  is_active boolean DEFAULT true,
  is_open boolean DEFAULT true,
  is_temporary_closed boolean DEFAULT false,
  temporary_closed_info text,
  theme_primary_color character varying DEFAULT '#1e3a8a'::character varying,
  theme_secondary_color character varying DEFAULT '#3b82f6'::character varying,
  banner_image_url text,
  thumbnail_image_url text,
  membership_type character varying DEFAULT 'looplite'::character varying,
  currency_sign character varying DEFAULT 'Rp'::character varying,
  branch_timezone character varying DEFAULT '+07:00'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT branches_pkey PRIMARY KEY (id),
  CONSTRAINT branches_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id)
);
CREATE TABLE public.business_hours (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  branch_id uuid,
  day_id integer NOT NULL,
  day_name character varying NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  is_operating boolean DEFAULT true,
  is_current_day boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT business_hours_pkey PRIMARY KEY (id),
  CONSTRAINT business_hours_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.menu_categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  branch_id uuid,
  category_code character varying NOT NULL UNIQUE,
  category_name character varying NOT NULL,
  category_name_en character varying,
  category_description text,
  category_image_url text,
  category_order integer DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_categories_pkey PRIMARY KEY (id),
  CONSTRAINT menu_categories_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.menu_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  branch_id uuid,
  category_id uuid,
  menu_code character varying NOT NULL UNIQUE,
  menu_name character varying NOT NULL,
  menu_name_en character varying,
  menu_description text,
  menu_description_en text,
  menu_image_url text,
  menu_price numeric NOT NULL DEFAULT 0,
  menu_promotion_price numeric,
  menu_calories integer,
  menu_stock integer DEFAULT 0,
  menu_stock_status character varying DEFAULT 'available'::character varying,
  is_available boolean DEFAULT true,
  is_recommended boolean DEFAULT false,
  is_new boolean DEFAULT false,
  preparation_time integer DEFAULT 15,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_items_pkey PRIMARY KEY (id),
  CONSTRAINT menu_items_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id),
  CONSTRAINT menu_items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.menu_categories(id)
);
CREATE TABLE public.menu_modifiers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  menu_item_id uuid,
  modifier_name character varying NOT NULL,
  modifier_name_en character varying,
  modifier_price numeric DEFAULT 0,
  is_required boolean DEFAULT false,
  min_select integer DEFAULT 0,
  max_select integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_modifiers_pkey PRIMARY KEY (id),
  CONSTRAINT menu_modifiers_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
);
CREATE TABLE public.menu_modifier_options (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  modifier_id uuid,
  option_name character varying NOT NULL,
  option_name_en character varying,
  option_price numeric DEFAULT 0,
  is_default boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_modifier_options_pkey PRIMARY KEY (id),
  CONSTRAINT menu_modifier_options_modifier_id_fkey FOREIGN KEY (modifier_id) REFERENCES public.menu_modifiers(id)
);
CREATE TABLE public.menu_extras (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  menu_item_id uuid,
  extra_name character varying NOT NULL,
  extra_name_en character varying,
  extra_price numeric NOT NULL DEFAULT 0,
  extra_image_url text,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_extras_pkey PRIMARY KEY (id),
  CONSTRAINT menu_extras_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
);
CREATE TABLE public.menu_packages (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  menu_item_id uuid,
  package_name character varying NOT NULL,
  package_name_en character varying,
  package_price numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_packages_pkey PRIMARY KEY (id),
  CONSTRAINT menu_packages_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
);
CREATE TABLE public.package_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  package_id uuid,
  item_name character varying NOT NULL,
  item_quantity integer DEFAULT 1,
  is_default boolean DEFAULT true,
  is_replaceable boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT package_items_pkey PRIMARY KEY (id),
  CONSTRAINT package_items_package_id_fkey FOREIGN KEY (package_id) REFERENCES public.menu_packages(id)
);
CREATE TABLE public.menu_addons (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  menu_item_id uuid,
  addon_name character varying NOT NULL,
  addon_name_en character varying,
  addon_price numeric NOT NULL DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT menu_addons_pkey PRIMARY KEY (id),
  CONSTRAINT menu_addons_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
);
CREATE TABLE public.promotions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  branch_id uuid,
  promotion_code character varying,
  promotion_name character varying NOT NULL,
  promotion_name_en character varying,
  promotion_description text,
  promotion_description_en text,
  promotion_type character varying DEFAULT 'discount'::character varying,
  discount_type character varying DEFAULT 'percentage'::character varying,
  discount_value numeric DEFAULT 0,
  max_discount numeric,
  min_purchase numeric DEFAULT 0,
  max_usage integer,
  used_count integer DEFAULT 0,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  image_url text,
  terms_and_conditions text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT promotions_pkey PRIMARY KEY (id),
  CONSTRAINT promotions_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.members (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid,
  member_code character varying NOT NULL UNIQUE,
  member_name character varying NOT NULL,
  member_email character varying,
  member_phone character varying NOT NULL,
  country_code character varying DEFAULT '+62'::character varying,
  member_points integer DEFAULT 0,
  member_tier character varying DEFAULT 'bronze'::character varying,
  total_spent numeric DEFAULT 0,
  total_transactions integer DEFAULT 0,
  last_visit_date timestamp with time zone,
  registered_date timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT members_pkey PRIMARY KEY (id),
  CONSTRAINT members_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id)
);
CREATE TABLE public.member_addresses (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  member_id uuid,
  address_label character varying NOT NULL,
  address text NOT NULL,
  latitude numeric,
  longitude numeric,
  recipient_name character varying,
  recipient_phone character varying,
  notes text,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT member_addresses_pkey PRIMARY KEY (id),
  CONSTRAINT member_addresses_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id)
);
CREATE TABLE public.vouchers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  branch_id uuid,
  member_id uuid,
  voucher_code character varying NOT NULL UNIQUE,
  voucher_name character varying NOT NULL,
  voucher_name_en character varying,
  voucher_description text,
  voucher_type character varying DEFAULT 'discount'::character varying,
  discount_type character varying DEFAULT 'percentage'::character varying,
  discount_value numeric DEFAULT 0,
  max_discount numeric,
  min_purchase numeric DEFAULT 0,
  max_usage integer,
  used_count integer DEFAULT 0,
  valid_from timestamp with time zone,
  valid_until timestamp with time zone,
  image_url text,
  terms_and_conditions text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT vouchers_pkey PRIMARY KEY (id),
  CONSTRAINT vouchers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id),
  CONSTRAINT vouchers_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_id character varying NOT NULL UNIQUE,
  company_id uuid,
  branch_id uuid,
  member_id uuid,
  external_order_id character varying,
  delivery_transaction_id character varying,
  order_type character varying NOT NULL,
  order_type_name character varying,
  queue_number integer,
  subtotal numeric DEFAULT 0,
  tax numeric DEFAULT 0,
  service_charge numeric DEFAULT 0,
  delivery_cost numeric DEFAULT 0,
  total_discount numeric DEFAULT 0,
  total_payment numeric DEFAULT 0,
  payment_method character varying,
  payment_status character varying DEFAULT 'pending'::character varying,
  status character varying DEFAULT 'New'::character varying,
  customer_name character varying,
  customer_phone character varying,
  customer_email character varying,
  delivery_address text,
  delivery_latitude numeric,
  delivery_longitude numeric,
  notes text,
  scheduled_time timestamp with time zone,
  transaction_date timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  cancelled_at timestamp with time zone,
  cancel_reason text,
  refund_status character varying,
  refund_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id),
  CONSTRAINT orders_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id),
  CONSTRAINT orders_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id)
);
CREATE TABLE public.order_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_id uuid,
  menu_item_id uuid,
  menu_code character varying,
  menu_name character varying NOT NULL,
  menu_price numeric NOT NULL DEFAULT 0,
  menu_qty integer NOT NULL DEFAULT 1,
  menu_subtotal numeric NOT NULL DEFAULT 0,
  menu_notes text,
  is_foc boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_menu_item_id_fkey FOREIGN KEY (menu_item_id) REFERENCES public.menu_items(id)
);
CREATE TABLE public.reservations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  reservation_id character varying NOT NULL UNIQUE,
  company_id uuid,
  branch_id uuid,
  customer_name character varying NOT NULL,
  customer_email character varying,
  customer_phone character varying,
  reservation_date date NOT NULL,
  reservation_time time without time zone NOT NULL,
  pax_total integer DEFAULT 1,
  purpose character varying,
  notes text,
  status character varying DEFAULT 'New'::character varying,
  cancel_reason text,
  table_number character varying,
  guest_emails ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  cancelled_at timestamp with time zone,
  CONSTRAINT reservations_pkey PRIMARY KEY (id),
  CONSTRAINT reservations_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id),
  CONSTRAINT reservations_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.risk_alerts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid,
  branch_id uuid,
  risk_type character varying NOT NULL,
  severity character varying NOT NULL,
  title character varying NOT NULL,
  description text,
  suggested_action text,
  is_actionable boolean DEFAULT true,
  is_dismissed boolean DEFAULT false,
  dismissed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT risk_alerts_pkey PRIMARY KEY (id),
  CONSTRAINT risk_alerts_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id),
  CONSTRAINT risk_alerts_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(id)
);
CREATE TABLE public.ai_insights (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid,
  insight_category character varying NOT NULL,
  title character varying NOT NULL,
  description text NOT NULL,
  confidence integer NOT NULL,
  expected_impact text,
  potential_revenue numeric,
  action_items ARRAY,
  is_implemented boolean DEFAULT false,
  implemented_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ai_insights_pkey PRIMARY KEY (id),
  CONSTRAINT ai_insights_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id)
);
CREATE TABLE public.loop_themes (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid,
  theme_name character varying NOT NULL,
  primary_color character varying DEFAULT '#1e3a8a'::character varying,
  secondary_color character varying DEFAULT '#3b82f6'::character varying,
  accent_color character varying DEFAULT '#60a5fa'::character varying,
  background_color character varying DEFAULT '#ffffff'::character varying,
  text_color character varying DEFAULT '#1e293b'::character varying,
  font_family character varying DEFAULT 'Inter'::character varying,
  logo_url text,
  splash_screen_url text,
  is_default boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT loop_themes_pkey PRIMARY KEY (id),
  CONSTRAINT loop_themes_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id)
);
CREATE TABLE public.vehicles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_id uuid,
  plate_number character varying NOT NULL UNIQUE,
  vehicle_type character varying,
  driver_name character varying,
  driver_phone character varying,
  status character varying DEFAULT 'active'::character varying,
  location character varying,
  latitude numeric,
  longitude numeric,
  efficiency numeric DEFAULT 100,
  last_maintenance date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT vehicles_pkey PRIMARY KEY (id),
  CONSTRAINT vehicles_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id)
);