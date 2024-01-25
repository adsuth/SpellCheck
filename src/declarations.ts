import { KeybindsMap, RoundTime } from "./definitions"

export const TOTAL_ROUND_COUNT     = 10
export const ROUND_TIME            = 3 // if you want to make this variable, change all instances of use
export const START_TIME            = 0
export const BASE_POINTS           = 100
export const BASE_POINT_MODIFIER   = 25

/**
 * Dictionary for each keybind.
 * Bind is determined by the e.code of a KeyEvent 
 */
export const KEYBINDS: KeybindsMap = {
  playAudio: {
    code: "Enter"
  },
  nextRound: {
    code: "Enter"
  },
  restartGame: {
    code: "Escape",
  }
}