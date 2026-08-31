export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: { PostgrestVersion: '14.5' };
    graphql_public: { Tables: { [_ in never]: never }; Views: { [_ in never]: never }; Functions: { graphql: { Args: { extensions?: Json; operationName?: string; query?: string; variables?: Json }; Returns: Json } }; Enums: { [_ in never]: never }; CompositeTypes: { [_ in never]: never } };
    public: {
        Tables: {
            admin: {
                Row: { avatar_url: string | null; bio: string | null; company: string | null; created_at: string; email: string | null; id: string; location: string | null; login: string; name: string | null; stargazercount: number; url: string; website_url: string | null };
                Insert: { avatar_url?: string | null; bio?: string | null; company?: string | null; created_at: string; email?: string | null; id: string; location?: string | null; login: string; name?: string | null; stargazercount?: number; url: string; website_url?: string | null };
                Update: { avatar_url?: string | null; bio?: string | null; company?: string | null; created_at?: string; email?: string | null; id?: string; location?: string | null; login?: string; name?: string | null; stargazercount?: number; url?: string; website_url?: string | null };
                Relationships: [];
            };
            language: { Row: { color: string; id: string; name: string }; Insert: { color?: string; id: string; name: string }; Update: { color?: string; id?: string; name?: string }; Relationships: [] };
            license: { Row: { id: string; name: string; url: string }; Insert: { id: string; name: string; url: string }; Update: { id?: string; name?: string; url?: string }; Relationships: [] };
            owner: { Row: { avatar_url: string | null; id: string; login: string; url: string }; Insert: { avatar_url?: string | null; id: string; login: string; url: string }; Update: { avatar_url?: string | null; id?: string; login?: string; url?: string }; Relationships: [] };
            repository: {
                Row: {
                    created_at: string | null;
                    description: string | null;
                    disk_usage: number;
                    fork_count: number;
                    homepage_url: string | null;
                    id: string;
                    is_archived: boolean;
                    license_id: string | null;
                    name: string;
                    owner_id: string;
                    owner_starred_id: string;
                    primary_language_id: string | null;
                    pushed_at: string | null;
                    readme_url: string | null;
                    ssh_url: string;
                    stargazer_count: number;
                    url: string;
                };
                Insert: {
                    created_at?: string | null;
                    description?: string | null;
                    disk_usage?: number;
                    fork_count?: number;
                    homepage_url?: string | null;
                    id: string;
                    is_archived: boolean;
                    license_id?: string | null;
                    name: string;
                    owner_id: string;
                    owner_starred_id: string;
                    primary_language_id?: string | null;
                    pushed_at?: string | null;
                    readme_url?: string | null;
                    ssh_url: string;
                    stargazer_count: number;
                    url: string;
                };
                Update: {
                    created_at?: string | null;
                    description?: string | null;
                    disk_usage?: number;
                    fork_count?: number;
                    homepage_url?: string | null;
                    id?: string;
                    is_archived?: boolean;
                    license_id?: string | null;
                    name?: string;
                    owner_id?: string;
                    owner_starred_id?: string;
                    primary_language_id?: string | null;
                    pushed_at?: string | null;
                    readme_url?: string | null;
                    ssh_url?: string;
                    stargazer_count?: number;
                    url?: string;
                };
                Relationships: [
                    { foreignKeyName: 'repository_license_id_license_id'; columns: ['license_id']; isOneToOne: false; referencedRelation: 'license'; referencedColumns: ['id'] },
                    { foreignKeyName: 'repository_owner_id_owner_id'; columns: ['owner_id']; isOneToOne: false; referencedRelation: 'owner'; referencedColumns: ['id'] },
                    { foreignKeyName: 'repository_owner_starred_id_admin_id'; columns: ['owner_starred_id']; isOneToOne: false; referencedRelation: 'admin'; referencedColumns: ['id'] },
                    { foreignKeyName: 'repository_primary_language_id_language_id'; columns: ['primary_language_id']; isOneToOne: false; referencedRelation: 'language'; referencedColumns: ['id'] },
                ];
            };
            topic: { Row: { id: string; name: string; stargazer_count: number }; Insert: { id: string; name: string; stargazer_count?: number }; Update: { id?: string; name?: string; stargazer_count?: number }; Relationships: [] };
            topicxrepository: {
                Row: { idrepo: string; idtopic: string };
                Insert: { idrepo: string; idtopic: string };
                Update: { idrepo?: string; idtopic?: string };
                Relationships: [{ foreignKeyName: 'topicxrepository_idrepo_repository_id'; columns: ['idrepo']; isOneToOne: false; referencedRelation: 'repository'; referencedColumns: ['id'] }, { foreignKeyName: 'topicxrepository_idtopic_topic_id'; columns: ['idtopic']; isOneToOne: false; referencedRelation: 'topic'; referencedColumns: ['id'] }];
            };
        };
        Views: { [_ in never]: never };
        Functions: { [_ in never]: never };
        Enums: { [_ in never]: never };
        CompositeTypes: { [_ in never]: never };
    };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views']) | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals } ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views']) : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends { Row: infer R }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
      ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends { Row: infer R }
          ? R
          : never
      : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals } ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends { Insert: infer I }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends { Insert: infer I }
          ? I
          : never
      : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals } ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends { Update: infer U }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
      ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends { Update: infer U }
          ? U
          : never
      : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals } ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'] : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals } ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName] : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions] : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals } ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'] : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
      ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never;

export const Constants = { graphql_public: { Enums: {} }, public: { Enums: {} } } as const;
