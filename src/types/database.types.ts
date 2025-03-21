export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          cpf: string | null;
          profession: string | null;
          specialization: string | null;
          member_since: string;
          member_id: string | null;
          payment_status: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          cpf?: string | null;
          profession?: string | null;
          specialization?: string | null;
          member_since?: string;
          member_id?: string | null;
          payment_status?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          cpf?: string | null;
          profession?: string | null;
          specialization?: string | null;
          member_since?: string;
          member_id?: string | null;
          payment_status?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          document_type: string;
          document_name: string;
          document_url: string;
          status: string | null;
          uploaded_at: string;
          verified_at: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          document_type: string;
          document_name: string;
          document_url: string;
          status?: string | null;
          uploaded_at?: string;
          verified_at?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          document_type?: string;
          document_name?: string;
          document_url?: string;
          status?: string | null;
          uploaded_at?: string;
          verified_at?: string | null;
          notes?: string | null;
        };
      };
      credentials: {
        Row: {
          id: string;
          user_id: string;
          credential_type: string;
          issued_at: string;
          expires_at: string | null;
          credential_id: string;
          qr_code_data: string | null;
          status: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          credential_type: string;
          issued_at?: string;
          expires_at?: string | null;
          credential_id: string;
          qr_code_data?: string | null;
          status?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          credential_type?: string;
          issued_at?: string;
          expires_at?: string | null;
          credential_id?: string;
          qr_code_data?: string | null;
          status?: string | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          asaas_customer_id: string | null;
          asaas_subscription_id: string | null;
          status: string | null;
          plan_type: string | null;
          amount: number;
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asaas_customer_id?: string | null;
          asaas_subscription_id?: string | null;
          status?: string | null;
          plan_type?: string | null;
          amount: number;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asaas_customer_id?: string | null;
          asaas_subscription_id?: string | null;
          status?: string | null;
          plan_type?: string | null;
          amount?: number;
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          subscription_id: string;
          user_id: string;
          asaas_payment_id: string | null;
          amount: number;
          status: string;
          payment_date: string | null;
          due_date: string;
          payment_method: string | null;
          invoice_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subscription_id: string;
          user_id: string;
          asaas_payment_id?: string | null;
          amount: number;
          status: string;
          payment_date?: string | null;
          due_date: string;
          payment_method?: string | null;
          invoice_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string;
          user_id?: string;
          asaas_payment_id?: string | null;
          amount?: number;
          status?: string;
          payment_date?: string | null;
          due_date?: string;
          payment_method?: string | null;
          invoice_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contents: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          content_type: string;
          thumbnail_url: string | null;
          content_url: string;
          author: string | null;
          published_at: string;
          tags: string[] | null;
          is_featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          content_type: string;
          thumbnail_url?: string | null;
          content_url: string;
          author?: string | null;
          published_at?: string;
          tags?: string[] | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          content_type?: string;
          thumbnail_url?: string | null;
          content_url?: string;
          author?: string | null;
          published_at?: string;
          tags?: string[] | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          event_type: string;
          start_time: string;
          end_time: string;
          location: string | null;
          zoom_link: string | null;
          max_participants: number | null;
          thumbnail_url: string | null;
          instructor: string | null;
          is_featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          event_type: string;
          start_time: string;
          end_time: string;
          location?: string | null;
          zoom_link?: string | null;
          max_participants?: number | null;
          thumbnail_url?: string | null;
          instructor?: string | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          event_type?: string;
          start_time?: string;
          end_time?: string;
          location?: string | null;
          zoom_link?: string | null;
          max_participants?: number | null;
          thumbnail_url?: string | null;
          instructor?: string | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          registered_at: string;
          attendance_status: string | null;
          feedback: string | null;
          rating: number | null;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          registered_at?: string;
          attendance_status?: string | null;
          feedback?: string | null;
          rating?: number | null;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          registered_at?: string;
          attendance_status?: string | null;
          feedback?: string | null;
          rating?: number | null;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          thumbnail_url: string | null;
          instructor: string | null;
          duration: string | null;
          level: string | null;
          is_featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          thumbnail_url?: string | null;
          instructor?: string | null;
          duration?: string | null;
          level?: string | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          instructor?: string | null;
          duration?: string | null;
          level?: string | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      course_modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string | null;
          order_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description?: string | null;
          order_number: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          order_number?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          description: string | null;
          content_url: string | null;
          duration: number | null;
          order_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          description?: string | null;
          content_url?: string | null;
          duration?: number | null;
          order_number: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          description?: string | null;
          content_url?: string | null;
          duration?: number | null;
          order_number?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_course_progress: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          progress_percentage: number | null;
          last_accessed_lesson: string | null;
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          progress_percentage?: number | null;
          last_accessed_lesson?: string | null;
          started_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          progress_percentage?: number | null;
          last_accessed_lesson?: string | null;
          started_at?: string;
          completed_at?: string | null;
        };
      };
      user_lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: string | null;
          started_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          status?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          status?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
