import json
from bs4 import BeautifulSoup
import pandas as pd

with open( "./scrape.html", "r" ) as html:
  soup = BeautifulSoup(html)
  rows = soup.select( "td:nth-child(1), td:nth-child(8)" )
  
  # [ print(row.text) for row in rows ]
  
  words     = [ word.text for word in rows[::2] ]
  examples = [ example.text for example in rows[1::2] ]
  
  # print( words[-3:] )
  # print( examples[-3:] )
  
  data = []
  
  for word, example in zip(words, examples):
    data += [{ "word": word, "example": example }]
    
  
  with open("./scraped.json", "w") as json_file:
    json.dump(data, json_file)
