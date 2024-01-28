import { BASE_POINTS, BASE_POINT_MODIFIER, ROUND_TIME } from "./declarations";
import { RoundTime, SpellCheckWord } from "./definitions";

export function formatWordContextForSpeech( currentWord: SpellCheckWord )
{
  if ( currentWord === null ) return ""
  return `${currentWord.word}; as in: "${currentWord.example.replace( currentWord.word, `*${currentWord.word}*` )}"`
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

export function calculateRoundPoints( roundTime: number )
{
  if ( isRoundTimeUp( roundTime ) ) return 0
  return pointsFormula( roundTime )
}

export function pointsFormula( roundTime: number )
{
  return BASE_POINTS + ( ROUND_TIME - roundTime ) * BASE_POINT_MODIFIER
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

/**
 * @param size How many items to retrieve, default is 1
 * @param list The list to sample from
 * @param allowDuplicates whether you accept duplicates in the sample, default is false
 */
export function randomSample( list: any[], size: number = 1, allowDuplicates: boolean = false ): any[] | any
{
  if ( size === 1 ) return list[ randomInt( list.length ) ]

  const sample: any[] = []

  while ( sample.length < size )
  {
    const candidate = list[ randomInt( list.length ) ]
    if ( !allowDuplicates && sample.includes( candidate ) ) continue

    sample.push( candidate )
  }

  

  return sample
}

/**
 * Generate a number between max and min
 * @param max exclusive
 * @param min default is 0
 */
export function randomInt( max: number, min: number = 0, )
{
  return Math.floor( Math.random() * (max - min) ) + min
}

export function isRoundTimeUp( currentTime: number )
{
  return ROUND_TIME - currentTime === 0
}

export function getRoundTimeDifference( startTime: number, rounding: number = 3 )
{
  // ! - this wont round properly
  return ( ( new Date().getTime() - startTime ) / 1_000 ).toFixed( rounding )
}