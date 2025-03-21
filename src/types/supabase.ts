export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_logs: {
        Row: {
          accessed_at: string | null
          created_at: string | null
          id: string
          member_id: string
          resource_id: string
          resource_type: string
        }
        Insert: {
          accessed_at?: string | null
          created_at?: string | null
          id?: string
          member_id: string
          resource_id: string
          resource_type: string
        }
        Update: {
          accessed_at?: string | null
          created_at?: string | null
          id?: string
          member_id?: string
          resource_id?: string
          resource_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          created_at: string | null
          id: string
          member_id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id: string
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_roles_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          id: number
          password: string
          username: string
        }
        Insert: {
          id?: number
          password: string
          username: string
        }
        Update: {
          id?: number
          password?: string
          username?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          completion_date: string | null
          course_id: string
          created_at: string | null
          enrollment_date: string | null
          id: string
          member_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          completion_date?: string | null
          course_id: string
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          member_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          completion_date?: string | null
          course_id?: string
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          member_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      course_materials: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          title: string
          type: Database["public"]["Enums"]["material_type"]
          url: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          title: string
          type: Database["public"]["Enums"]["material_type"]
          url: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["material_type"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string
          duration: number
          id: string
          instructor: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          duration: number
          id?: string
          instructor: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          duration?: number
          id?: string
          instructor?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      credential_validations: {
        Row: {
          id: string
          ip_address: string | null
          member_id: string
          validated_at: string | null
        }
        Insert: {
          id?: string
          ip_address?: string | null
          member_id: string
          validated_at?: string | null
        }
        Update: {
          id?: string
          ip_address?: string | null
          member_id?: string
          validated_at?: string | null
        }
        Relationships: []
      }
      credentials: {
        Row: {
          created_at: string | null
          credential_number: string
          expiry_date: string
          id: string
          issue_date: string
          qr_code: string
          status: string
          updated_at: string | null
          user_id: string
          validation_token: string
        }
        Insert: {
          created_at?: string | null
          credential_number: string
          expiry_date: string
          id?: string
          issue_date: string
          qr_code: string
          status?: string
          updated_at?: string | null
          user_id: string
          validation_token: string
        }
        Update: {
          created_at?: string | null
          credential_number?: string
          expiry_date?: string
          id?: string
          issue_date?: string
          qr_code?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          validation_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ebooks: {
        Row: {
          category: string
          cover_url: string
          created_at: string | null
          description: string
          file_url: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          cover_url: string
          created_at?: string | null
          description: string
          file_url: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          cover_url?: string
          created_at?: string | null
          description?: string
          file_url?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      layout_settings: {
        Row: {
          component_id: string
          created_at: string | null
          id: string
          page_id: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          component_id: string
          created_at?: string | null
          id?: string
          page_id: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          component_id?: string
          created_at?: string | null
          id?: string
          page_id?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      live_classes: {
        Row: {
          course_id: string
          created_at: string | null
          description: string
          duration: unknown
          id: string
          instructor_id: string
          meeting_url: string | null
          start_time: string
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description: string
          duration: unknown
          id?: string
          instructor_id: string
          meeting_url?: string | null
          start_time: string
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string
          duration?: unknown
          id?: string
          instructor_id?: string
          meeting_url?: string | null
          start_time?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_classes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      member_ebooks: {
        Row: {
          downloaded_at: string | null
          ebook_id: string
          id: string
          member_id: string
        }
        Insert: {
          downloaded_at?: string | null
          ebook_id: string
          id?: string
          member_id: string
        }
        Update: {
          downloaded_at?: string | null
          ebook_id?: string
          id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_ebooks_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_ebooks_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          active: boolean | null
          address: string
          address_proof_url: string | null
          certificate_url: string | null
          cpf: string
          created_at: string | null
          full_name: string
          id: string
          id_document_url: string | null
          membership_expiry: string | null
          photo_url: string | null
          rg: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          address: string
          address_proof_url?: string | null
          certificate_url?: string | null
          cpf: string
          created_at?: string | null
          full_name: string
          id?: string
          id_document_url?: string | null
          membership_expiry?: string | null
          photo_url?: string | null
          rg: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          address?: string
          address_proof_url?: string | null
          certificate_url?: string | null
          cpf?: string
          created_at?: string | null
          full_name?: string
          id?: string
          id_document_url?: string | null
          membership_expiry?: string | null
          photo_url?: string | null
          rg?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          asaas_id: string | null
          created_at: string | null
          id: string
          installments: number | null
          member_id: string
          payment_method: string
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          asaas_id?: string | null
          created_at?: string | null
          id?: string
          installments?: number | null
          member_id: string
          payment_method: string
          status: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          asaas_id?: string | null
          created_at?: string | null
          id?: string
          installments?: number | null
          member_id?: string
          payment_method?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      recorded_classes: {
        Row: {
          course_id: string
          created_at: string | null
          description: string
          duration: unknown
          id: string
          order: number
          title: string
          updated_at: string | null
          video_url: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description: string
          duration: unknown
          id?: string
          order: number
          title: string
          updated_at?: string | null
          video_url: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string
          duration?: unknown
          id?: string
          order?: number
          title?: string
          updated_at?: string | null
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "recorded_classes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          admin_id: string | null
          created_at: string | null
          id: string
          member_id: string | null
          message: string
          ticket_id: string
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          message: string
          ticket_id: string
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          message?: string
          ticket_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          member_id: string
          priority: string
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description: string
          id?: string
          member_id: string
          priority?: string
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          member_id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          profession: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          profession?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          profession?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_super_admin:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              user_id: number
            }
            Returns: boolean
          }
      process_payment: {
        Args: {
          customer_name: string
          customer_cpf: string
          customer_email: string
          customer_phone: string
          amount: number
        }
        Returns: string
      }
      update_payment_status: {
        Args: {
          asaas_id: string
          event: string
        }
        Returns: undefined
      }
    }
    Enums: {
      material_type: "pdf" | "video"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
