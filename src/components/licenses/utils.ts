export const parseOptionalNumber = (value: string) => {
  if (!value || value.trim() === '') return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}
