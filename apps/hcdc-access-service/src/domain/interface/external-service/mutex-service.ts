export const MUTEX_SERVICE_TOKEN = Symbol('MUTEX_SERVICE_TOKEN')

export interface IMutexService {
  mutex<T>(
    lockIdentifier: string,
    executionTimeout: number,
    executeCriticalCode: (signal: AbortSignal) => Promise<T>,
    acquireLockTimeout?: number,
  ): Promise<T>
}
