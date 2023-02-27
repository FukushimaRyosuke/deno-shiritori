import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";


const hiraganas = ['あじあ', 'かい', 'さとう', 'あぶらえ', 'かお', 'いか', 'かき', 'ばいく', 'いけ', 'あいこ', 'ささ', 'かし', 
'あす', 'らいせ', 'さんそ', 'さんた', 'おせち', 'させつ', 'からて', 'あいすすけーと'];
let num;
let previousWord;
const hiragana = /^[\u002D+\u3041-\u3093+\u30FC]+$/u;


function random(min, max){
  return Math.floor(Math.random()*(max - min + 1)) + min;
};



console.log("Listening on http://localhost:8000");
serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);



  if (req.method === "GET" && pathname === "/shiritori") {
    num = random(0, 20);
    previousWord = hiraganas[num];
    return new Response(previousWord);
  }
  if (req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;
    const word = requestJson.fullword;

    let len = 0;

    len = previousWord.length;
    if(previousWord.charAt(len - 1) === "ー"){
      const word = previousWord.charAt(len - 2);
      previousWord = previousWord.replace("ー", word);
    }
    if(previousWord.charAt(len - 1) === "ゃ"){
      previousWord = previousWord.replace("ゃ", "や");
    }
    if(previousWord.charAt(len - 1) === "ゅ"){
      previousWord = previousWord.replace("ゅ", "ゆ");
    }
    if(previousWord.charAt(len - 1) === "ょ"){
      previousWord = previousWord.replace("ょ", "よ");
    }
    if(previousWord.charAt(len - 1) === "が"){
      if(nextWord[0] === "か"){
        previousWord = previousWord.replace("が", "か");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぎ"){
      if(nextWord[0] === "き"){
        previousWord = previousWord.replace("ぎ", "き");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぐ"){
      if(nextWord[0] === "く"){
        previousWord = previousWord.replace("ぐ", "く");
      } 
    }
    if(previousWord.charAt(len - 1) === "げ"){
      if(nextWord[0] === "け"){
        previousWord = previousWord.replace("げ", "け");
      } 
    }
    if(previousWord.charAt(len - 1) === "ご"){
      if(nextWord[0] === "こ"){
        previousWord = previousWord.replace("ご", "こ");
      } 
    }
    if(previousWord.charAt(len - 1) === "ざ"){
      if(nextWord[0] === "さ"){
        previousWord = previousWord.replace("ざ", "さ");
      } 
    }
    if(previousWord.charAt(len - 1) === "じ"){
      if(nextWord[0] === "し"){
        previousWord = previousWord.replace("じ", "し");
      } 
    }
    if(previousWord.charAt(len - 1) === "ず"){
      if(nextWord[0] === "す"){
        previousWord = previousWord.replace("ず", "す");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぜ"){
      if(nextWord[0] === "せ"){
        previousWord = previousWord.replace("ぜ", "せ");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぞ"){
      if(nextWord[0] === "そ"){
        previousWord = previousWord.replace("ぞ", "そ");
      } 
    }
    if(previousWord.charAt(len - 1) === "だ"){
      if(nextWord[0] === "た"){
        previousWord = previousWord.replace("だ", "た");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぢ"){
      if(nextWord[0] === "ち"){
        previousWord = previousWord.replace("ぢ", "ち");
      } 
    }
    if(previousWord.charAt(len - 1) === "づ"){
      if(nextWord[0] === "つ"){
        previousWord = previousWord.replace("づ", "つ");
      } 
    }
    if(previousWord.charAt(len - 1) === "で"){
      if(nextWord[0] === "て"){
        previousWord = previousWord.replace("で", "て");
      } 
    }
    if(previousWord.charAt(len - 1) === "ど"){
      if(nextWord[0] === "と"){
        previousWord = previousWord.replace("ど", "と");
      } 
    }
    if(previousWord.charAt(len - 1) === "ば"){
      if(nextWord[0] === "は"){
        previousWord = previousWord.replace("ば", "は");
      } 
    }
    if(previousWord.charAt(len - 1) === "び"){
      if(nextWord[0] === "ひ"){
        previousWord = previousWord.replace("び", "ひ");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぶ"){
      if(nextWord[0] === "ふ"){
        previousWord = previousWord.replace("ぶ", "ふ");
      } 
    }
    if(previousWord.charAt(len - 1) === "ぼ"){
      if(nextWord[0] === "ほ"){
        previousWord = previousWord.replace("ぼ", "ほ");
      } 
    }

    
    if(nextWord.length !== 0){

      for(let i = 0; i < word.length; i++){
        if(word[i] === nextWord){
          return new Response("bad", {status: 300});
        }
      }

      if(nextWord.charAt(nextWord.length - 1) === "ん"){
        return new Response("bad", {status: 300});
      }

      if(nextWord.length === 1){
        return new Response("1文字は禁止です", {status: 400});
      }

      if(hiragana.test(nextWord) === false){
        return new Response("ひらがなのみ入力してください", {status: 400});
      }

      if(nextWord.length > 0 &&
        previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)){
          return new Response("前の単語に続いていません。", {status: 400});
        }
      
    }else{
      return new Response("文字が入力されていません", {status: 400});
    }
    


    previousWord = nextWord;
    return new Response(previousWord);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});




