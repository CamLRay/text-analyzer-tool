// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}


// Business Logic

function wordCounter(text) {
  if(text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if(!parseInt(element)){
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function mostCommonWords(passage) {
  if(passage.trim().length === 0) {
    return 0;
  }
  const wordArray= passage.split(" ");
  let wordCount = [];
  wordArray.forEach(function(word) {
    if(!wordCount.includes(numberOfOccurrencesInText(word, passage) + " " + word)) {
      wordCount.push(numberOfOccurrencesInText(word, passage) + " " + word);
    }
  });
  sortCount = wordCount.sort().reverse();
  return sortCount;
}

console.log(mostCommonWords("camp camp hello hello hello there crab"));


// UI Logic
function boldPassage(word, text) {
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

function commonWordList(passage) {
  let commonArray = mostCommonWords(passage);
  let listArray = []
  commonArray.forEach(function(element){ 
  listArray.push(element.split(" ").reverse().join(": "));
});
return listArray;
}

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const frequencyOfWord = commonWordList(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    $("#common-words").append("<li>"+ frequencyOfWord[0]+ "</li>");
    $("#common-words").append("<li>"+ frequencyOfWord[1]+ "</li>");
    $("#common-words").append("<li>"+frequencyOfWord[2]+"</li>");
  });
});