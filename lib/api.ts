import { supabase } from './supabase';
import { InfoFormData } from '@/types/info';

export async function saveUserInfo(data: InfoFormData) {
  const { data: result, error } = await supabase
    .from('user_info')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getUserInfo(id: string) {
  const { data, error } = await supabase
    .from('user_info')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
} 