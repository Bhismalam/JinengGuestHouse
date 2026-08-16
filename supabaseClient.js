import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// createClient() throws synchronously if either value is missing, which would
// break this whole module chain (and everything that imports it) on any page
// that hasn't been configured yet. Fall back to a stub client instead so the
// rest of the site keeps working; callers see a normal Supabase-shaped error.
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createUnconfiguredStub();

function createUnconfiguredStub() {
  const configError = {
    message:
      'Supabase is not configured. Copy .env.example to .env and fill in VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.',
  };
  console.error(configError.message);

  const chain = {
    select: () => chain,
    lt: () => chain,
    gt: () => chain,
    then: (resolve) => resolve({ data: [], error: configError }),
  };

  return {
    from: () => ({
      select: () => chain,
      insert: async () => ({ data: null, error: configError }),
    }),
  };
}
