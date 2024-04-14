import { endOfDay, startOfDay } from 'date-fns'

export function makeDateFilter(fromDate = new Date(), toDate = new Date()) {
  return {
    $gte: startOfDay(fromDate).toISOString(),
    $lte: endOfDay(toDate).toISOString(),
  }
}
