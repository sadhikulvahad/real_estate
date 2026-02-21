export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          photo: string | null
          specialization: string | null
          experience_years: number
          bio: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          photo?: string | null
          specialization?: string | null
          experience_years?: number
          bio?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          photo?: string | null
          specialization?: string | null
          experience_years?: number
          bio?: string | null
          created_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          location: string
          property_type: string
          bedrooms: number
          bathrooms: number
          area_sqft: number | null
          images: Json
          amenities: Json
          status: string
          featured: boolean
          floor_plans: Json
          agent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          location: string
          property_type: string
          bedrooms?: number
          bathrooms?: number
          area_sqft?: number | null
          images?: Json
          amenities?: Json
          status?: string
          featured?: boolean
          floor_plans?: Json
          agent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          location?: string
          property_type?: string
          bedrooms?: number
          bathrooms?: number
          area_sqft?: number | null
          images?: Json
          amenities?: Json
          status?: string
          featured?: boolean
          floor_plans?: Json
          agent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          client_photo: string | null
          rating: number
          comment: string
          property_sold: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          client_photo?: string | null
          rating?: number
          comment: string
          property_sold?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          client_photo?: string | null
          rating?: number
          comment?: string
          property_sold?: string | null
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          property_id: string | null
          inquiry_type: string
          preferred_date: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          property_id?: string | null
          inquiry_type?: string
          preferred_date?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          property_id?: string | null
          inquiry_type?: string
          preferred_date?: string | null
          status?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          category: string
          author_id: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          category?: string
          author_id?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          category?: string
          author_id?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
