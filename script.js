if (true) {// получение ID элементы меню
  var menu = document.getElementById('menu');
  var game_icon = document.getElementById('game_icon');
  var bt_search = document.getElementById('bt_search');
  var field_search = document.getElementById('field_search');
  var search = document.getElementById('search');
  var bt_tag = document.getElementById('bt_tag');
  var field_tag = document.getElementById('field_tag');

  var lang = 1;
}

if (true) {// получение ID поиск по названию
  var search_help = [];

  var search_bt_0 = document.getElementById('search_bt_0');   search_help[0] = '';
  var search_bt_1 = document.getElementById('search_bt_1');   search_help[1] = '';
  var search_bt_2 = document.getElementById('search_bt_2');   search_help[2] = '';
}

if (true) {// получение ID поиск по тегам
  var builds = [];
  var build = '';
  var players = [];
  var player = 0;
  var tags = [];
  var tag = [];

  builds[0] = document.getElementById('unity');   builds[0].style.background = 'white';
  builds[1] = document.getElementById('web');     builds[1].style.background = 'white';

  players[0] = document.getElementById('p_1');   players[0].style.background = 'white';
  players[1] = document.getElementById('p_2');   players[1].style.background = 'white';
  players[2] = document.getElementById('p_3');   players[2].style.background = 'white';
  players[3] = document.getElementById('p_4');   players[3].style.background = 'white';
  players[4] = document.getElementById('p_9');   players[4].style.background = 'white';

  for (let i = 0; i < 8; i++) {
    tags[i] = document.getElementById('t_'+i);
    tags[i].style.background = 'white';
    tag[i] = "";
  }
}

if (true) {// получение ID элементы поля игры
  var field_game = document.getElementById('field_game');
  var icon = document.getElementById('icon');
  var title = document.getElementById('title');
  var size = document.getElementById('size');
  var date = document.getElementById('date');
  var download = document.getElementById('download');
  var play = document.getElementById('play');
  var brief = document.getElementById('brief');
  var field_screenshots = document.getElementById('field_screenshots');
  var desc = document.getElementById('desc');
}

let games = [
  Puzzle,Puzzle,Puzzle,Puzzle,Puzzle,Puzzle,Puzzle
];
function sortingDate(old_new, up_down) {
  let sort_date = [];
  let _games = [];

  for (let i = 0; i < games.length; i++) {
    sort_date[i] = games[i].date[0 + old_new] + (games[i].date[1 + old_new] * 30) + (games[i].date[2 + old_new] * 360);
    sort_date[i] = sort_date[i] + '.' + i;
  }

  if (up_down == 0) {
    sort_date.sort(function(b, a){ return a-b; })
  } else {
    sort_date.sort(function(a, b){ return a-b; })
  }

  for (let i = 0; i < sort_date.length; i++) {
    _games[i] = '';
    if (sort_date[i][sort_date[i].length-2] != '.') {
      _games[i] += sort_date[i][sort_date[i].length-2];
    }
    _games[i] += sort_date[i][sort_date[i].length-1];
  }

  for (let i = 0; i < games.length; i++) {
    _games[i] = games[_games[i]];
  }

  games = _games;
}
sortingDate(3, 0);
let game_num = 0, pred_num = 0, pred_x = 1;
moreGame();
let choose_id = 0;
let final_version = '1.0.0';

function gameOpen(num) {// нажатие на иконку игры
  if (field_game.style.display == 'none') {
    field_game.style.display = 'block';
    menu.style.display = 'none';

    choose_id = num;

    icon.src = games[num].way + 'web_data/icon.png';
    title.innerHTML = games[num].title[lang];
    size.innerHTML = games[num].size / 1000 + ' mb';
    date.innerHTML = 'v ' + games[num].vers + ' (' + games[num].date[3] + '.' + games[num].date[4] + '.20' + games[num].date[5] + ')';
    download = '';
    play = '';
    brief.innerHTML = games[num].brief[lang];
    field_screenshots.innerHTML = '';
    for (let i = 1; i < 4; i++) {
      let img = new Image();
      img.src = games[num].way + 'web_data/screen_' + i + '.png';
      img.onload = function() {
        field_screenshots.innerHTML +=
          "<img "+
          "src='"+games[num].way +"web_data/screen_"+i+".png' "+
          "style='height: 400px;'>"+
          "</img>";
      }
    }
    desc.innerHTML = games[num].desc[lang];
  }
}

function gamePlay(version) {
  console.log('play ' + choose_id + ' (' + version + ')');
}

function gameDownload(version) {
  console.log('download ' + choose_id + ' (' + version + ')');
}


function btSearch() {// нажатие на кнопку поиска
  if (field_search.style.display == "none") {
    field_search.style.display = "block";
    game_icon.style.display = "none";
    field_tag.style.display = "none";
    more_game.innerHTML = 'начать поиск'; }
  else {
    field_search.style.display = "none";
    game_icon.style.display = "block";
    more_game.innerHTML = 'показать больше игр'; }
}

function sortingSearch(num) {// поиск по имени
  let can = true;

  if (search.value != '') { if (games[num].title[lang].startsWith(search.value)) { } else { can = false; } }

  return can;
}

search.oninput = function() {// ввод в строку поиска
  if (search.value != '') {
    search_help[0] = '';
    search_help[1] = '';
    search_help[2] = '';

    for (let i = 0; i < games.length; i++) {
      if (games[i].title[lang].startsWith(search.value)) {

        if (search_help[0] == '') {
          search_help[0] = games[i].title[lang];
          search_bt_0.innerHTML = search_help[0];
          search_bt_0.style.display = 'block';
          continue;
        } else
        if (search_help[1] == '' && games[i].title[lang] != search_help[0]) {
          search_help[1] = games[i].title[lang];
          search_bt_1.innerHTML = search_help[1];
          search_bt_1.style.display = 'block';
          continue;
        } else
        if (search_help[2] == '' && games[i].title[lang] != search_help[1] && games[i].title[lang] != search_help[0]) {
          search_help[2] = games[i].title[lang];
          search_bt_2.innerHTML = search_help[2];
          search_bt_2.style.display = 'block';
          break;
        }
      }
    }

    if (search_help[0] == '') { search_bt_0.style.display = 'none'; }
    if (search_help[1] == '') { search_bt_1.style.display = 'none'; }
    if (search_help[2] == '') { search_bt_2.style.display = 'none'; }
  }
  else {
    search_bt_0.style.display = 'none';
    search_bt_1.style.display = 'none';
    search_bt_2.style.display = 'none';
  }
}

function searchButton(num) {// подсказки с авто вводом
  search.value = search_help[num];
}


function moreGame() {// запускает сортировку игр
  if (game_icon.style.display == "none") {
    game_icon.style.display = "block";
    field_search.style.display = "none";
    field_tag.style.display = "none";

    game_icon.innerHTML = '';
    game_num = 0;
    pred_num = 0;
    pred_x = 1;
    sorting(); }
  else {
    sorting();
  }
}

function sorting() {// сортировка и отрисовка иконок игр
  for (let num = pred_num; num < games.length; num++) {
    if (game_num > 11 * pred_x + pred_x - 1) { break; }

    if (sortingTag(num) && sortingSearch(num)) {
      game_icon.innerHTML += "<button onclick='gameOpen("+num+");'><img height='100%' width='100%'src='"+games[num].way+'web_data/screen_1.png'+"'></button>"
      game_num++;
      pred_num = num + 1;
    }
  }

  if (game_num < 12 * pred_x) { more_game.innerHTML = 'больше игр нет'; } else { more_game.innerHTML = 'показать больше игр'; }

  pred_x++;

  if (game_icon.innerHTML == '') {
    game_icon.innerHTML = '<h1 style="font-size: 50px;   text-align: center;">игры по запросу не найдены</h1>';
    more_game.innerHTML = 'больше игр нет';
  }
}


function btTag() {// нажатие на кнопку списка тегов
  if (field_tag.style.display == "none") {
    field_tag.style.display = "block";
    game_icon.style.display = "none";
    field_search.style.display = "none";
    more_game.innerHTML = 'начать поиск'; }
  else {
    field_tag.style.display = "none";
    game_icon.style.display = "block";
    more_game.innerHTML = 'показать больше игр'; }
}

function btTagBuild(get_tag) {// тег движка
  if (build != get_tag) {
    build = get_tag;
    for (let i = 0; i < builds.length; i++) {
      builds[i].style.background = 'white';
    }
    document.getElementById(get_tag).style.background = 'green';
  }
  else {
    build = '';
    document.getElementById(get_tag).style.background = 'white';
  }

  tag_res = true;
}

function btTagPlayer(get_tag) {// тег количества игроков
  if (player != get_tag) {
    player = get_tag;
    for (let i = 0; i < players.length; i++) {
      players[i].style.background = 'white';
    }
    document.getElementById("p_" + get_tag).style.background = 'green';
  }
  else {
    player = 0;
    document.getElementById("p_" + get_tag).style.background = 'white';
  }

  tag_res = true;
}

function btTagOther(get_tag, id) {// прочие теги
  if (tag[id] != get_tag) {
    tag[id] = get_tag;
    document.getElementById(tags[id].id).style.background = 'green';
  }
  else {
    tag[id] = '';
    document.getElementById(tags[id].id).style.background = 'white';
  }

  tag_res = true;
}

function sortingTag(num) {// поиск по тегам
    let can = true;

    if (build != '') { if (games[num].build != build) { can = false; } }
    if (player > 0) { if (games[num].player != player) { can = false; } }
    for (let i = 0; i < tag.length; i++) {
      if (tag[i] != '') {
        let can_num = 0;
        for (let j = 0; j < games[num].tag.length; j++) {
          if (games[num].tag[j] == tag[i]) { can_num++; }
        }
        if (can_num == 0) { can = false; }
      }
    }

    return can;
}































//
