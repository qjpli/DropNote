import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabaseConn: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const logError = (error: PostgrestError) => {
  console.error(`Supabase Error: ${error.message}`, error.details);
};

/**
 * Fetches data from the specified table with optional filters, ordering, limit, and offset.
 */
export const fetchData = async <T>(table: string, filters?: any, orderBy?: string, limit?: number, offset?: number): Promise<T[]> => {
  let query = supabaseConn.from(table).select('*');

  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (filters[key] instanceof Array) {
        query = query.in(key, filters[key]);
      } else if (typeof filters[key] === 'string' && filters[key].includes('%')) {
        query = query.ilike(key, filters[key]);
      } else {
        query = query.eq(key, filters[key]);
      }
    });
  }

  if (orderBy) {
    query = query.order(orderBy);
  }

  if (limit) {
    query = query.limit(limit);
  }

  if (offset) {
    query = query.range(offset, offset + (limit || 0) - 1);
  }

  const { data, error } = await query;
  if (error) {
    logError(error);
    throw error;
  }

  return (data ?? []) as T[]; // Ensures data is always an array, even if null or undefined
};

/**
 * Inserts data into the specified table.
 */
export const insertData = async <T>(table: string, values: T): Promise<T[]> => {
  const { data, error } = await supabaseConn.from(table).insert(values);
  if (error) {
    logError(error);
    throw error;
  }
  return (data ?? []) as T[]; // Ensures data is always an array, even if null or undefined
};

/**
 * Updates data in the specified table based on filters and new values.
 */
export const updateData = async <T>(table: string, filters: any, updatedValues: Partial<T>): Promise<T[]> => {
  let query = supabaseConn.from(table).update(updatedValues);
  Object.keys(filters).forEach((key) => {
    query = query.eq(key, filters[key]);
  });

  const { data, error } = await query;
  if (error) {
    logError(error);
    throw error;
  }

  return (data ?? []) as T[]; // Ensures data is always an array, even if null or undefined
};

/**
 * Deletes data from the specified table based on filters.
 */
export const deleteData = async (table: string, filters: any): Promise<number> => {
  let query = supabaseConn.from(table).delete();
  Object.keys(filters).forEach((key) => {
    query = query.eq(key, filters[key]);
  });

  const { data, error } = await query;
  if (error) {
    logError(error);
    throw error;
  }

  return (data ?? []).length || 0; // Returns the length of data, or 0 if no data
};

/**
 * Counts the number of records in the specified table, optionally applying filters.
 */
export const countData = async (table: string, filters?: any): Promise<number> => {
  let query = supabaseConn.from(table).select('count', { count: 'exact' });

  if (filters) {
    Object.keys(filters).forEach((key) => {
      query = query.eq(key, filters[key]);
    });
  }

  const { count, error } = await query;
  if (error) {
    logError(error);
    throw error;
  }

  return count || 0;
};

/**
 * Checks if a record exists in the specified table based on filters.
 */
export const existsData = async (table: string, filters: any): Promise<boolean> => {
  let query = supabaseConn.from(table).select('id').limit(1);
  Object.keys(filters).forEach((key) => {
    query = query.eq(key, filters[key]);
  });

  const { data, error } = await query;
  if (error) {
    logError(error);
    throw error;
  }

  return (data ?? []).length > 0; // Returns true if there is at least one record
};
