
window.previous_min = null;

$(document).ready(function(){
  var html = '<button id="button1">読み上げ開始</button><div id="count"></div>'
  $('.contentsFooterSection__contentsWrapper').html(html);    
    
  $('#button1').on('click', function() {
    speach('読み上げを開始しました');
  });    
  exec();
});

function exec(){
  var min = parseInt(moment().format('m'));
  var sec = parseInt(moment().format('s'));
  var text = '';
  if(min > 30){
      min -= 30;
  }
  min = 25 - min -1;
  sec = 60 - sec;
  if(min > 1){
    text = '5分休憩まであと' + min + ':' + sec;
  } else {
    text = '25分集中まであと' +(5 - Math.abs(min)) + ':' + sec;      
  }
  $('#count').html(text);

  if(sec == 0){  
    if(min > 0 && min%5 == 0 && window.previous_min != min){
        speach('あと'+min+'ふんです');
    } else if (min == 0 && window.previous_min != min){
       speach('5 , 4, 3, 2, 1 しゅうりょうです　　おつかれさまでした');
    } else if (min == -5 && window.previous_min != min){
       speach('5 , 4, 3, 2, 1 すたーと　25分集中してください');      
    }
  }
  window.previous_min = min;    
  setTimeout(exec, 100);
}

function speach(text){
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));    
}
