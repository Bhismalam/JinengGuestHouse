import { supabase } from './supabaseClient.js';

const TOTAL_ROOM_UNITS = 2;

// Checks whether `unitsRequested` room units are free for [checkin, checkout).
// Returns { available, remainingUnits } on success, or { available: false, error } on failure.
export async function checkAvailability(checkin, checkout, unitsRequested) {
  const { data, error } = await supabase
    .from('booking_availability')
    .select('check_in, check_out, room_units')
    .lt('check_in', checkout)
    .gt('check_out', checkin);

  if (error) {
    console.error('Availability check failed:', error);
    return { available: false, error };
  }

  const bookedUnits = data.reduce((sum, row) => sum + row.room_units, 0);
  const remainingUnits = TOTAL_ROOM_UNITS - bookedUnits;

  return {
    available: remainingUnits >= unitsRequested,
    remainingUnits,
  };
}
