export const DEFAULT_GROUP = '__default__'

export function ensureGroup(group) {
  return group || DEFAULT_GROUP
}

let COUNTER = 0

export function ensureID(id) {
  return id || `lightbox_entry_${COUNTER++}`
}
