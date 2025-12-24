export const parseOptionalNumber = (value: string) => {
  if (!value || value.trim() === '') return undefined
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return undefined
  if (parsed < 0) return undefined
  return parsed
}
