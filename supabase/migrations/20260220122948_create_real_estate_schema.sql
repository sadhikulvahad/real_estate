-- Real Estate Website Database Schema
--
-- 1. New Tables
--    - properties: Main property listings table
--    - agents: Real estate agents/team members
--    - testimonials: Client testimonials and reviews
--    - inquiries: Lead capture and contact forms
--    - blog_posts: Market insights and real estate tips
--
-- 2. Security
--    - Enable RLS on all tables
--    - Public read access for properties, agents, testimonials, blog_posts
--    - Public insert access for inquiries

-- Create agents table first (referenced by other tables)
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  photo text,
  specialization text,
  experience_years integer DEFAULT 0,
  bio text,
  created_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  property_type text NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  area_sqft numeric,
  images jsonb DEFAULT '[]'::jsonb,
  amenities jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'available',
  featured boolean DEFAULT false,
  floor_plans jsonb DEFAULT '[]'::jsonb,
  agent_id uuid REFERENCES agents(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_photo text,
  rating integer DEFAULT 5,
  comment text NOT NULL,
  property_sold text,
  created_at timestamptz DEFAULT now()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  property_id uuid REFERENCES properties(id),
  inquiry_type text DEFAULT 'general',
  preferred_date date,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  category text DEFAULT 'tips',
  author_id uuid REFERENCES agents(id),
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents (public read)
CREATE POLICY "Public can view agents"
  ON agents FOR SELECT
  TO public
  USING (true);

-- RLS Policies for properties (public read)
CREATE POLICY "Public can view properties"
  ON properties FOR SELECT
  TO public
  USING (true);

-- RLS Policies for testimonials (public read)
CREATE POLICY "Public can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- RLS Policies for blog_posts (public read published posts)
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

-- RLS Policies for inquiries (public insert)
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);