import { emptySplitApi as api } from './slice'
export const addTagTypes = [] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      prometheusIndex: build.query<
        PrometheusIndexApiResponse,
        PrometheusIndexApiArg
      >({
        query: () => ({ url: `/api/metrics` }),
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as enhancedApi }
export type PrometheusIndexApiResponse = unknown
export type PrometheusIndexApiArg = void
export const { usePrometheusIndexQuery } = injectedRtkApi
