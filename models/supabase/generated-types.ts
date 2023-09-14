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
      i18n: {
        Row: {
          created_at: string | null
          id: number
          key: string
          locale: string
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          key?: string
          locale?: string
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          key?: string
          locale?: string
          value?: string | null
        }
        Relationships: []
      }
      likes: {
        Row: {
          id: number
          inserted_at: string | null
          ip: string | null
          slug: string
        }
        Insert: {
          id?: number
          inserted_at?: string | null
          ip?: string | null
          slug: string
        }
        Update: {
          id?: number
          inserted_at?: string | null
          ip?: string | null
          slug?: string
        }
        Relationships: []
      }
      lura_events: {
        Row: {
          created_at: string | null
          date: string | null
          id: number
          location: string | null
          name: string | null
          participants: Json | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          id?: number
          location?: string | null
          name?: string | null
          participants?: Json | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          id?: number
          location?: string | null
          name?: string | null
          participants?: Json | null
        }
        Relationships: []
      }
      lurdle_solutions: {
        Row: {
          day: string | null
          id: number
          word: string | null
        }
        Insert: {
          day?: string | null
          id?: number
          word?: string | null
        }
        Update: {
          day?: string | null
          id?: number
          word?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          body: string | null
          created_at: string | null
          date: string | null
          id: number
          image: string | null
          locale: string | null
          slug: string | null
          status: string | null
          subtitle: string | null
          title: string | null
          translated_slug: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          image?: string | null
          locale?: string | null
          slug?: string | null
          status?: string | null
          subtitle?: string | null
          title?: string | null
          translated_slug?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string | null
          date?: string | null
          id?: number
          image?: string | null
          locale?: string | null
          slug?: string | null
          status?: string | null
          subtitle?: string | null
          title?: string | null
          translated_slug?: string | null
        }
        Relationships: []
      }
      realtime_clicks: {
        Row: {
          id: number
          inserted_at: string | null
          type: string | null
        }
        Insert: {
          id?: number
          inserted_at?: string | null
          type?: string | null
        }
        Update: {
          id?: number
          inserted_at?: string | null
          type?: string | null
        }
        Relationships: []
      }
      translation_requests: {
        Row: {
          guessed_country: string | null
          id: number
          inserted_at: string | null
          ip: string | null
          slug: string
        }
        Insert: {
          guessed_country?: string | null
          id?: number
          inserted_at?: string | null
          ip?: string | null
          slug: string
        }
        Update: {
          guessed_country?: string | null
          id?: number
          inserted_at?: string | null
          ip?: string | null
          slug?: string
        }
        Relationships: []
      }
      url_redirects: {
        Row: {
          created_at: string | null
          from: string | null
          id: number
          to: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          from?: string | null
          id?: number
          to?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          from?: string | null
          id?: number
          to?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      users: {
        Row: {
          aud: string | null
          banned_until: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          email: string | null
          email_change: string | null
          email_change_confirm_status: number | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          id: string | null
          instance_id: string | null
          invited_at: string | null
          is_super_admin: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: string | null
          reauthentication_token: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string | null
          instance_id?: string | null
          invited_at?: string | null
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string | null
          instance_id?: string | null
          invited_at?: string | null
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
