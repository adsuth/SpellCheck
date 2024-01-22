import { BASE_POINTS, BASE_POINT_MODIFIER } from "./declarations";
import { SpellCheckWord } from "./definitions";

export function formatWordContextForSpeech( currentWord: SpellCheckWord )
{
  if ( currentWord === null ) return ""
  return `${currentWord.word}; as in "${currentWord.context.replace( currentWord.word, `*${currentWord.word}*` )}"`
}

/**
 * Returns true if the two strings are equal (enough):
 * - We convert to lowercase
 * - We trim additional space
 * 
 * @param a a string
 * @param b another string
 * @returns `true` if equal
 */
export function compareStrings( a: string, b: string )
{
  return a.toLowerCase().trim() === b.toLowerCase().trim()
}

export function calculateRoundPoints( timeRemaining: number )
{
  if ( timeRemaining === 0 ) return 0
  return BASE_POINTS + ( timeRemaining * BASE_POINT_MODIFIER )
}

export function wasUserCorrect( userInput: string, currentWord: SpellCheckWord )
{
  if ( currentWord === null ) return false

  let accepted = [ currentWord.word ]

  if ( currentWord.variations !== undefined )
    accepted = [ ...accepted, ...currentWord.variations ]

  console.log( `wasUserCorrect: Accepted ${accepted}` )
  
  for ( const word of accepted )
    if ( compareStrings( word, userInput ) )
      return true
  
  return false
}