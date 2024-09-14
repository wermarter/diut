import { endOfDay, startOfDay } from 'date-fns'

export function makeDateFilter(fromDate?: Date | null, toDate?: Date | null) {
  return {
    $gte: startOfDay(fromDate ?? new Date()).toISOString(),
    $lte: endOfDay(toDate ?? new Date()).toISOString(),
  }
}
