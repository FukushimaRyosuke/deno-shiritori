const player_image = document.getElementById("player-image");
const cpu_image = document.getElementById("cpu-image");
const gu_image = document.getElementById("gu-image");
const pa_image = document.getElementById("pa-image");
const tyoki_image = document.getElementById("tyoki-image");
const result_word = document.getElementById("result-word");

let player, cpu;// ぐーは1, パーは2、チョキは３

gu_image.addEventListener('click', function(){
    player_image.src = "/image/gu-.png";   
    computer();
    player = 1;
    result();
});

pa_image.addEventListener('click', function(){
    player_image.src = "/image/pa-.png";  
    computer();
    player = 2;
    result();
});

tyoki_image.addEventListener('click', function(){
    player_image .src = "/image/tyoki.png";  
    computer();
    player = 3;
    result();
});

function computer() {
    let i = Math.floor(Math.random() * 3) + 1;

    switch(i % 3){
        case 0:
            cpu_image.src = "/image/gu-.png";
            cpu = 1;
            break;
        case 1:
            cpu_image.src = "/image/pa-.png";
            cpu = 2;
            break;
        case 2:
            cpu_image.src = "/image/tyoki.png";
            cpu = 3;
            break;
    }
}

function result(){ 

    // ぐーは1, パーは2、チョキは３
    if( player == 1 && cpu == 1)
    result_word.innerText = "DRAW";
    if( player == 2 && cpu == 2)
    result_word.innerText = "DRAW";
    if( player == 3 && cpu == 3)
    result_word.innerText = "DRAW";
    if( player == 1 && cpu == 3)
    result_word.innerText = "YOU WIN";
    if( player == 2 && cpu == 1)
    result_word.innerText = "YOU WIN";
    if( player == 3 && cpu == 2)
    result_word.innerText = "YOU WIN";
    if( player == 1 && cpu == 2)
    result_word.innerText = "YOU LOSE";
    if( player == 2 && cpu == 3)
    result_word.innerText = "YOU LOSE";
    if( player == 3 && cpu == 1)
    result_word.innerText = "YOU LOSE";

}
