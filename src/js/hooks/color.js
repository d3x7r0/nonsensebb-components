import { useMemo } from 'preact/hooks'
import isObject from 'lodash-es/isObject'

export function useDominantColor(color, style) {
  return useCSSVariable('dominant-color', color, style)
}

export function useAltDominantColor(color, style) {
  return useCSSVariable('alt-dominant-color', color, style)
}

export function useBgColor(color, style) {
  return useCSSVariable('bg-color', color, style)
}

export function useAltColor(color, style) {
  return useCSSVariable('alt-color', color, style)
}

export function useBorderColor(color, style) {
  return useCSSVariable('border-color', color, style)
}

export function useCSSVariable(name, value, style) {
  return useMemo(() => {
    if (!value) {
      return style
    }

    const varName = `--${name}`

    if (isObject(style)) {
      return {
        ...style,
        [varName]: value,
      }
    }

    return `${varName}: ${value};${style || ''}`
  }, [name, value, style])
}
