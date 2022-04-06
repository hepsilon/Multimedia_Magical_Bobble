(function()
{
	//automatically called as soon as the javascript is loaded
	window.addEventListener("load", main);
}());

function main()
{
	var pageArray = ["/menu.html","/menuhighscores.html","/game/story.html","/game/arcade.html","/menuhelp.html"];
    var audio = document.getElementsByTagName("audio")[0];
	var btnInfinity = document.getElementById("infinity");
	var btnPlay = document.getElementById("play");
	var btnHighscores = document.getElementById("highscores");
	var btnSound = document.getElementById("sound");
	var btnBack = document.getElementById("back");
	var btnHelp = document.getElementById("help");
	var botoesNav = [btnInfinity, btnPlay, btnHighscores, btnSound, btnBack, btnHelp];
	var onoff = 1;
	audio.volume = onoff;

	//listener do evento click
    var listener = function(ev){
		if (ev.target.id == "infinity"){
			var infinito = menuHandler(ev, pageArray, onoff);
			window.location.href = infinito;
		}else if (ev.target.id == "play"){
			var jogar = menuHandler(ev, pageArray, onoff);
			window.location.href = jogar;
		}else if (ev.target.id == "highscores"){
			//updateScore();
			var final = menuHandler(ev, pageArray, onoff);
			window.location.href = final;
		}else if(ev.target.id == "back"){
			var voltar = menuHandler(ev, pageArray, onoff);
			window.location.href = voltar;
		}else if (ev.target.id == "sound"){ 
			onoff = soundHandler(ev, onoff, audio);
			audio.volume = onoff;
		}else{ //help
			var help = menuHandler(ev, pageArray, onoff);
			window.location.href = help;
		}
	}

	//escutar clicks nos botões de navegação
	for (var i = 0; i < 6; i++){
		botoesNav[i].addEventListener("click", listener); 
	}
}

function writeScore(top, nomes) {
	var canvas = document.getElementById("canvasText");
	var context = canvas.getContext('2d');

	context.lineWidth = 1;
	context.fillStyle = "#ffffff";
	context.font = "16px arial";
	for (var i = 0; i < top.length; i++){
		context.fillText(top[i], 20, 20);
		context.fillText(nomes[i], 20, 20);
	}
}

function updateScore(){
	if (localStorage.getItem("highscore") != null && localStorage.getItem("name") != null){
		var pontos = parseInt(localStorage.getItem("highscore"));
		var nome = localStorage.getItem("name");
		var top = new Array(3);
		if (localStorage.getItem("first") === null) localStorage.setItem("first", "0");
		if (localStorage.getItem("second") === null) localStorage.setItem("second", "0");
		if (localStorage.getItem("third") === null) localStorage.setItem("third", "0");
		top[0] = localStorage.getItem("first");
		top[1] = localStorage.getItem("second");
		top[2] = localStorage.getItem("third");

		var nomes = new Array(3);
		if (localStorage.getItem("name1") === null) localStorage.setItem("name1", "AAA");
		if (localStorage.getItem("name2") === null) localStorage.setItem("name2", "AAA");
		if (localStorage.getItem("name3") === null) localStorage.setItem("name3", "AAA");
		nomes[0] = localStorage.getItem("name1");
		nomes[1] = localStorage.getItem("name2");
		nomes[2] = localStorage.getItem("name3");

		if (top.length != 0) {
	  		//array não está vazio
			for (var i = 0; i < array.length; i++){
				if (pontos > top[i]){
					top[i] = pontos;
					nomes[i] = nome;
					var res = pontos.toString();
					if (i == 0){
						localStorage.setItem("first", res);
						localStorage.setItem("name1", nome);
						localStorage.setItem("second", top[0]);
						localStorage.setItem("name2", nomes[0]);
						localStorage.setItem("third", top[1]);
						localStorage.setItem("name3", nomes[1]);
					}
					else if (i == 1){
						localStorage.setItem("second", res);
						localStorage.setItem("name2", nome);
						localStorage.setItem("third", top[1]);
						localStorage.setItem("name3", nomes[1]);
					}
					else{
						localStorage.setItem("third", res);
						localStorage.setItem("name3", nome);
					}
					localStorage.removeItem("highscore");
					localStorage.removeItem("name");
					break;
				}
			}
		}else{
			localStorage.setItem("first", res);
			localStorage.setItem("name1", nome);
			localStorage.removeItem("highscore");
			localStorage.removeItem("name");
		}
	}		
	writeScore(top, nomes);
}

function menuHandler(ev, pageArray, onoff){
	var antiga = window.location.href;
	var index = antiga.lastIndexOf('/');
	var localizacao = antiga.substring(0, index);
	var final = antiga;
	if (antiga.localeCompare(localizacao.concat(pageArray[0])) == 0){ //se no menu inicial
		if (ev.target.id == "highscores")
			final = localizacao.concat(pageArray[1]);
		else if (ev.target.id == "play")
			final = localizacao.concat(pageArray[2]+"?"+onoff);
		else if (ev.target.id == "infinity")
			final = localizacao.concat(pageArray[3]+"?"+onoff);
		else //se help
			final = localizacao.concat(pageArray[4]);
	}else  // se back
		final = localizacao.concat(pageArray[0]);
	return final;
}

function soundHandler(ev, onoff, audio){
	var btn = ev.target;
	if (onoff){
		btn.style.backgroundImage = "url(assets/botaosomoff.png)";
        onoff = 0;
	}else{
        btn.style.backgroundImage = "url(assets/botaosomon.png)";
        onoff = 1;
	}
	return onoff;
}
