export function validateRun(run: string): boolean {
  return /^\d{7,8}-[\dkK]$/.test(run);
}