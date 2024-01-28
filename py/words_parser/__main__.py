import json
import regex as re
import requests

# script to parse and clean words api sample
PATH_TO_SAMPLE = "sample.csv"
MIN_WORD_LENGTH = 4
MAX_WORD_LENGTH = 12

def word_filter( word ):
  hasInvalidChars = re.search( r"[^A-Z]", word, re.IGNORECASE ) != None
  if hasInvalidChars:
    return None
  
  isValidLength = (
    len( word ) >= MIN_WORD_LENGTH and
    len( word ) <= MAX_WORD_LENGTH
  )
  if not isValidLength:
    return None
  
  return word

def write_json():
  with open( PATH_TO_SAMPLE ) as file:
    words = [ line.strip().split(",") for line in file ]
    word_dicts = []
    for word in words:
      word_dicts.append( { "word": word[0], "example": word[1] } )
    
  with open( "words.json", "w" ) as file:
    file.write( json.dumps( word_dicts, indent=2 ) )
    

def main():
  with open( PATH_TO_SAMPLE ) as file:
    lines = [ line.strip().split(" ") for line in file ]
    words = [ word_filter( word ) for line in lines for word in line if word_filter( word ) != None ]
    
  with open( "./words_list.csv", "w" ) as out_file:
    [ out_file.write( word + "\n" ) for word in words ]
    
  
if __name__ == "__main__":
  # main()
  write_json()
  # test()
  
