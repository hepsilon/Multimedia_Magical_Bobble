var game = new Phaser.Game(800,600,Phaser.AUTO,"game0.1", { preload: preload, create: create, update: update });
var player;
var leftKey;
var rightKey;
var flipflop;
var flipflop1;
var flipflop2;

var time_til_spawn = Math.random()*3000 + 2000;  //Random time between 2 and 5 seconds.
var last_spawn_time = game.time;

var nametext;

var state =0;
var state0=0;
var state1=0;
var state2=0;

var gameover = 0;

var ScoreS = 0;
var score = 0;
var scoreText;
var scoresaved;

var life = 3;
var lifeText;
var lifesaved;

var level = 1;

var speed;
var speed_hidden;
var time;
var random;


var starpow = 0;
var star_time = 0;
var ice_time = 0;
var icepow = 0;
var featherpow=0;
var feather_time = 0;
var coffeepow=0;
var coffee_time =0;

var onoff;
var music;

var mapa;
var mapa_time;


	var pageArray = ["/menu.html","/menuhighscores.html","/game/index.html","/game/index.html","/menuhelp.html"]; //penultimo e infinity

	function checkSound(){
		onoff = 0;
		var url = window.location.href;
		var index = url.indexOf('?');
		if ((index + 1) == (url.length - 1))
			var info = url[url.length - 1]; //info a partir do primeiro ?
		else{
			var info = url.substring(index + 1, url.length - 1);
		}
		var next = info.indexOf('?');
		if (next == -1){ //se nao ha mais parametros
			onoff = parseInt(info);
		}else{
			var dados = info.substring(0, next - 1);
			onoff = parseInt(dados);
		}
		return onoff;
	}

	function menuHandler(pageArray, onoff){
		var antiga = window.location.href;
		var index = antiga.lastIndexOf('/');
		var intermedia = antiga.substring(0, index);
		var realIndex = intermedia.lastIndexOf('/');
		var localizacao = intermedia.substring(0, realIndex);
		final = localizacao.concat(pageArray[0]);
		return final;
	}


	function preload(){


		game.load.image('level1', 'assets/space.png',800,600);

		game.load.spritesheet('circle', 'assets/circle.png', 99,99);
		game.load.image('red','assets/rball.png',20,20);
		game.load.image('blue','assets/bball.png',20,20);
		game.load.image('green','assets/gball.png',20,20);
		game.load.image('yellow','assets/yball.png',20,20);
		game.load.image('hearth','assets/hearth.png',20,20);
		game.load.image('star','assets/star.png',20,20);
		game.load.image('ice','assets/ice.png',20,20);
		game.load.image('feather','assets/feather.png',20,20);
		game.load.image('coffee','assets/coffee.png',20,20);

		game.load.audio('som', ['assets/Undertale - Megalovania.mp3', 'assets/Undertale - Megalovania.ogg']);
		
		player = 1;
		flipflop = true;
	}
	function create(){
		// create physics
		game.background  = game.add.image(0,0,'level1');
		game.physics.startSystem(Phaser.Physics.ARCADE);	

		onoff = checkSound();
    	if (onoff){
    		music = game.add.audio('som');
    		music.play();
    	}

		//cursors = game.input.keyboard.createCursorKeys();

		//scores
		scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
		lifeText = this.add.text(670, 16, 'Lives: 3', { fontSize: '32px', fill: '#ffffff' });

		circle = game.add.sprite(game.world.centerX,game.world.centerY,"circle");
		circle.anchor.setTo(0.5);
		circle.animations.add("circle1", [0], 10, true);
		circle.animations.add("circle2", [1], 10, true);
		circle.animations.add("circle3", [2], 10, true);
		circle.animations.add("circle4", [3], 10, true);
		circle.animations.add("circle5", [4],10,true);
		circle.animations.add("circle6", [5],10,true);
		game.physics.arcade.enable(circle);
		circle.body.immovable = true;



		//bubble codes

		//red 

		//left
		RLGroup = game.add.group();
		game.physics.arcade.enable(RLGroup);
		RLGroup.enableBody = true;

		//top
		RTGroup = game.add.group();
		game.physics.arcade.enable(RTGroup);
		RTGroup.enableBody = true;

		//right
		RRGroup = game.add.group();
		game.physics.arcade.enable(RRGroup);
		RRGroup.enableBody = true;
		//down
		RDGroup = game.add.group();
		game.physics.arcade.enable(RDGroup);
		RDGroup.enableBody = true;
		//blue 

		BLGroup = game.add.group();
		game.physics.arcade.enable(BLGroup);
		BLGroup.enableBody = true;

		//top
		BTGroup = game.add.group();
		game.physics.arcade.enable(BTGroup);
		BTGroup.enableBody = true;

		//right
		BRGroup = game.add.group();
		game.physics.arcade.enable(BRGroup);
		BRGroup.enableBody = true;
		//down
		BDGroup = game.add.group();
		game.physics.arcade.enable(BDGroup);
		BDGroup.enableBody = true;

		//yellow 
		YLGroup = game.add.group();
		game.physics.arcade.enable(YLGroup);
		YLGroup.enableBody = true;

		//top
		YTGroup = game.add.group();
		game.physics.arcade.enable(YTGroup);
		YTGroup.enableBody = true;

		//right
		YRGroup = game.add.group();
		game.physics.arcade.enable(YRGroup);
		YRGroup.enableBody = true;
		//down
		YDGroup = game.add.group();
		game.physics.arcade.enable(YDGroup);
		YDGroup.enableBody = true;


		// green
		GLGroup = game.add.group();
		game.physics.arcade.enable(GLGroup);
		GLGroup.enableBody = true;

		//top
		GTGroup = game.add.group();
		game.physics.arcade.enable(GTGroup);
		GTGroup.enableBody = true;

		//right
		GRGroup = game.add.group();
		game.physics.arcade.enable(GRGroup);
		GRGroup.enableBody = true;
		//down
		GDGroup = game.add.group();
		game.physics.arcade.enable(GDGroup);
		GDGroup.enableBody = true;



		//powerups

		//health
		HLGroup = game.add.group();
		game.physics.arcade.enable(HLGroup);
		HLGroup.enableBody = true;

		//top
		HTGroup = game.add.group();
		game.physics.arcade.enable(HTGroup);
		HTGroup.enableBody = true;

		//right
		HRGroup = game.add.group();
		game.physics.arcade.enable(HRGroup);
		HRGroup.enableBody = true;
		//down
		HDGroup = game.add.group();
		game.physics.arcade.enable(HDGroup);
		HDGroup.enableBody = true;

		//speedup

		//speedown

		//star

		SLGroup = game.add.group();
		game.physics.arcade.enable(SLGroup);
		SLGroup.enableBody = true;

		//top
		STGroup = game.add.group();
		game.physics.arcade.enable(STGroup);
		STGroup.enableBody = true;

		//right
		SRGroup = game.add.group();
		game.physics.arcade.enable(SRGroup);
		SRGroup.enableBody = true;
		//down
		SDGroup = game.add.group();
		game.physics.arcade.enable(SDGroup);
		SDGroup.enableBody = true;

		//ice

		ILGroup = game.add.group();
		game.physics.arcade.enable(ILGroup);
		ILGroup.enableBody = true;

		//top
		ITGroup = game.add.group();
		game.physics.arcade.enable(ITGroup);
		ITGroup.enableBody = true;

		//right
		IRGroup = game.add.group();
		game.physics.arcade.enable(IRGroup);
		IRGroup.enableBody = true;
		//down
		IDGroup = game.add.group();
		game.physics.arcade.enable(IDGroup);
		IDGroup.enableBody = true;

		//feather
		FLGroup = game.add.group();
		game.physics.arcade.enable(FLGroup);
		FLGroup.enableBody = true;

		//top
		FTGroup = game.add.group();
		game.physics.arcade.enable(FTGroup);
		FTGroup.enableBody = true;

		//right
		FRGroup = game.add.group();
		game.physics.arcade.enable(FRGroup);
		FRGroup.enableBody = true;
		//down
		FDGroup = game.add.group();
		game.physics.arcade.enable(FDGroup);
		FDGroup.enableBody = true;

		//coffee
		CLGroup = game.add.group();
		game.physics.arcade.enable(CLGroup);
		CLGroup.enableBody = true;

		//top
		CTGroup = game.add.group();
		game.physics.arcade.enable(CTGroup);
		CTGroup.enableBody = true;

		//right
		CRGroup = game.add.group();
		game.physics.arcade.enable(CRGroup);
		CRGroup.enableBody = true;
		//down
		CDGroup = game.add.group();
		game.physics.arcade.enable(CDGroup);
		CDGroup.enableBody = true;


		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
   	 	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
   	 	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   	 	downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
   	 	enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

   	 	
   	 	//var array = new Array();

   	 	speed = 100;
   	 	speed_hidden = 100;

	}
	function update(){

		
		if (leftKey.isDown && level !=0)
		{	
			if (player == 1 && !flipflop)
			{
				circle.animations.play("circle4");
				player = 4;
				flipflop = true;
			}
			else if (player == 2  && !flipflop)
			{
				circle.animations.play("circle1");
				player = 1;
				flipflop = true;
			}
			else if (player == 3  && !flipflop)
			{
				circle.animations.play("circle2");
				player = 2;
				flipflop = true;
			}
			else if (player == 4  && !flipflop)
			{
				circle.animations.play("circle3");
				player = 3;
				flipflop = true;
			}
		}
		else if (rightKey.isDown && level !=0)
		{
			if (player == 1  && !flipflop)
			{
				circle.animations.play("circle2");
				player = 2;
				flipflop = true;
			}
			else if (player == 2  && !flipflop)
			{
				circle.animations.play("circle3");
				player = 3;
				flipflop = true;
			}
			else if (player == 3  && !flipflop)
			{
				circle.animations.play("circle4");
				player = 4;
				flipflop = true;
			}
			else if (player == 4  && !flipflop)
			{
				circle.animations.play("circle1");
				player = 1;
				flipflop = true;
			}
		}
		else if (rightKey.isUp || leftKey.isUp && level !=0){
			flipflop = false;
		}



		var current_time = game.time.time;
		

		if((current_time - last_spawn_time > time_til_spawn) && life != 0){
		    time_til_spawn = Math.random()*3000 + 1000;
		    last_spawn_time = current_time;
			if (level == 1){
				level_1();
			}
		}






		if((current_time > star_time) && starpow ==1){
			starpow = 0;
			circle.animations.play("circle1");
			player = 1;
			flipflop = true;
		}

		if((current_time > ice_time) && icepow ==1){
			icepow = 0;
			circle.animations.play("circle1");
			player = 1;
			flipflop = true;
		}
		if((current_time > feather_time) && featherpow ==1){
			featherpow = 0;
			speed = speed_hidden;
		}
		if((current_time> coffee_time && coffeepow ==1 )){
			coffeepow = 0;
			speed = speed_hidden;
		}
	  



	   // this.physics.arcade.collide(circle,rl,RLdestroy);	
	//	this.physics.arcade.overlap(circle,rl,RLdestroy, null, this);
		if (level == 1 || level == 2 || level == 3  || level == 4  || level == 5  || level == 6  || level == 7  || level == 8){
			this.game.physics.arcade.overlap(circle,RLGroup,RLdestroy);
			this.game.physics.arcade.overlap(circle,RTGroup,RTdestroy);
			this.game.physics.arcade.overlap(circle,RRGroup,RRdestroy);
			this.game.physics.arcade.overlap(circle,RDGroup,RDdestroy);

			this.game.physics.arcade.overlap(circle,BLGroup,BLdestroy);
			this.game.physics.arcade.overlap(circle,BTGroup,BTdestroy);
			this.game.physics.arcade.overlap(circle,BRGroup,BRdestroy);
			this.game.physics.arcade.overlap(circle,BDGroup,BDdestroy);

			this.game.physics.arcade.overlap(circle,YLGroup,YLdestroy);
			this.game.physics.arcade.overlap(circle,YTGroup,YTdestroy);
			this.game.physics.arcade.overlap(circle,YRGroup,YRdestroy);
			this.game.physics.arcade.overlap(circle,YDGroup,YDdestroy);

			this.game.physics.arcade.overlap(circle,GLGroup,GLdestroy);
			this.game.physics.arcade.overlap(circle,GTGroup,GTdestroy);
			this.game.physics.arcade.overlap(circle,GRGroup,GRdestroy);
			this.game.physics.arcade.overlap(circle,GDGroup,GDdestroy);



			//powerups

			this.game.physics.arcade.overlap(circle,HLGroup,HLdestroy);
			this.game.physics.arcade.overlap(circle,HTGroup,HTdestroy);
			this.game.physics.arcade.overlap(circle,HRGroup,HRdestroy);
			this.game.physics.arcade.overlap(circle,HDGroup,HDdestroy);

			this.game.physics.arcade.overlap(circle,SLGroup,SLdestroy);
			this.game.physics.arcade.overlap(circle,STGroup,STdestroy);
			this.game.physics.arcade.overlap(circle,SRGroup,SRdestroy);
			this.game.physics.arcade.overlap(circle,SDGroup,SDdestroy);

			this.game.physics.arcade.overlap(circle,ILGroup,ILdestroy);
			this.game.physics.arcade.overlap(circle,ITGroup,ITdestroy);
			this.game.physics.arcade.overlap(circle,IRGroup,IRdestroy);
			this.game.physics.arcade.overlap(circle,IDGroup,IDdestroy);

			this.game.physics.arcade.overlap(circle,FLGroup,FLdestroy);
			this.game.physics.arcade.overlap(circle,FTGroup,FTdestroy);
			this.game.physics.arcade.overlap(circle,FRGroup,FRdestroy);
			this.game.physics.arcade.overlap(circle,FDGroup,FDdestroy);

			this.game.physics.arcade.overlap(circle,CLGroup,CLdestroy);
			this.game.physics.arcade.overlap(circle,CTGroup,CTdestroy);
			this.game.physics.arcade.overlap(circle,CRGroup,CRdestroy);
			this.game.physics.arcade.overlap(circle,CDGroup,CDdestroy);

		}



		if (ScoreS == 50){
			speed += 10;
			speed_hidden +=10;
			ScoreS = 0
		}
		//game over code



		if (life == 0 && (level == 1 || level == 2 || level == 3 || level == 4 || level == 5 || level ==  6 || level == 7 || level == 8) ){
				over = this.add.text(game.world.centerX, game.world.centerY, 'GAME OVER\n   Score:' + score, { fontSize: '64px', fill: '#ffffff' });
				over.anchor.setTo(0.5);
				level = 0;
				lifeText.destroy();
				scoreText.destroy();
				circle.destroy();
				flipflop1 = false;
				flipflop2 = false;

		}
		if (level == 0){

			var array = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			if(gameover == 0){
				var name0 = this.add.text(game.world.centerX -200, game.world.centerY +100, 'name' + score, { fontSize: '40px', fill: '#ffffff' });
				nametext = this.add.text(game.world.centerX, game.world.centerY +100, array[state0] + array[state1] + array[state2] , { fontSize: '80px', fill: '#ffffff' });
				gameover = 1;
			}
			if (leftKey.isDown)
			{	
				if (state == 0 && !flipflop1)
				{
					state = 2;
					flipflop1 = true;
				}
				else if (state == 1  && !flipflop1)
				{
					state = 0;
					flipflop1 = true;
				}
				else if (state == 2  && !flipflop1)
				{
					state = 1;
					flipflop1 = true;
				}
			}
			else if (rightKey.isDown)
			{
				if (state == 0  && !flipflop1)
				{
					state = 1;
					flipflop1 = true;
				}
				else if (state == 1  && !flipflop1)
				{
					state = 2;
					flipflop1 = true;
				}
				else if (state == 2  && !flipflop1)
				{
					state = 0;
					flipflop1 = true;
				}
			}
			else if (rightKey.isUp || leftKey.isUp){
				flipflop1 = false;
			}

			if (upKey.isDown)
			{	
				if (state == 0 && !flipflop2)
				{
					if(state0 < 25){
						state0 +=1;
					}
					else {
						state0 = 0;
					}
					nametext.setText(array[state0] + array[state1] + array[state2]);
					flipflop2 = true;
				}
				else if (state == 1  && !flipflop2)
				{
					if(state1 < 25){
						state1 +=1;
					}
					else {
						state1 = 0;
					}
					nametext.setText(array[state0] + array[state1] + array[state2]);
					flipflop2 = true;
				}
				else if (state == 2  && !flipflop2)
				{
					if(state2 < 25){
						state2 +=1;
					}
					else {
						state2 = 0;
					}
					nametext.setText(array[state0] + array[state1] + array[state2]);
					flipflop2 = true;
				}
			}
			else if (downKey.isDown)
			{
				if (state == 0 && !flipflop2)
				{
					if(state0 > 0){
						state0 -=1;
					}
					else {
						state0 = 25;
					}
					nametext.setText(array[state0] + array[state1] + array[state2]);
					flipflop2 = true;
				}
				else if (state == 1  && !flipflop2)
				{
					if(state1 > 0){
						state1 -=1;
					}
					else {
						state1 = 25;
					}
					nametext.setText(array[state0] + array[state1] + array[state2]);
					flipflop2 = true;
				}
				else if (state == 2  && !flipflop2)
				{
					if(state2 > 0){
						state2 -=1;
					}
					else {
						state2 = 25;
					}
					nametext.setText(array[state0] + array[state1] + array[state2]);
					flipflop2 = true;
				}
			}
			else if (upKey.isUp || downKey.isUp){
				flipflop2 = false;
			}
			if (enterKey.isDown){
				var char = array[state0] + array[state1] + array[state2];
				var valor = score.toString();
				//localStorage.setItem('highscore', score);
				//localStorage.setItem('name', char);
				var final = menuHandler(pageArray, onoff);
				window.location.href = final;
			}
		}
	}

	function RLcreate(){
		var rl = game.add.sprite(0,game.world.centerY,'red');
	    rl.anchor.setTo(0.5);
	    RLGroup.add(rl);
	    rl.body.velocity.x = speed;
	    game.physics.arcade.enable(rl);
	}

	function RLdestroy(circle,rl){
		rl.destroy();
		if (player == 4 ){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function RTcreate(){
		var rt = game.add.sprite(game.world.centerX,-200,'red');
	    rt.anchor.setTo(0.5);
	    RTGroup.add(rt);
	    rt.body.velocity.y = speed;
	    game.physics.arcade.enable(rt);
	}

	function RTdestroy(circle,rt){
		rt.destroy();
		if (player == 1 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}

	function RRcreate(){
		var rr = game.add.sprite(800,game.world.centerY,'red');
	    rr.anchor.setTo(0.5);
	    RRGroup.add(rr);
	    rr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(rr);
	}

	function RRdestroy(circle,rr){
		rr.destroy();
		if (player == 2 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function RDcreate(){
		var rd = game.add.sprite(game.world.centerX,800,'red');
	    rd.anchor.setTo(0.5);
	    RDGroup.add(rd);
	    rd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(rd);
	}

	function RDdestroy(circle,rd){
		rd.destroy();
		if (player == 3 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}










	function BLcreate(){
		var bl = game.add.sprite(0,game.world.centerY,'blue');
	    bl.anchor.setTo(0.5);
	    BLGroup.add(bl);
	    bl.body.velocity.x = speed;
	    game.physics.arcade.enable(bl);
	}

	function BLdestroy(circle,bl){
		bl.destroy();
		if (player == 3 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function BTcreate(){
		var bt = game.add.sprite(game.world.centerX,-200,'blue');
	    bt.anchor.setTo(0.5);
	    BTGroup.add(bt);
	    bt.body.velocity.y = speed;
	    game.physics.arcade.enable(bt);
	}

	function BTdestroy(circle,bt){
		bt.destroy();
		if (player == 4 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}

	function BRcreate(){
		var br = game.add.sprite(800,game.world.centerY,'blue');
	    br.anchor.setTo(0.5);
	    BRGroup.add(br);
	    br.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(br);
	}

	function BRdestroy(circle,br){
		br.destroy();
		if (player == 1 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function BDcreate(){
		var bd = game.add.sprite(game.world.centerX,800,'blue');
	    bd.anchor.setTo(0.5);
	    BDGroup.add(bd);
	    bd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(bd);
	}

	function BDdestroy(circle,bd){
		bd.destroy();
		if (player == 2 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}









	function YLcreate(){
		var yl = game.add.sprite(0,game.world.centerY,'yellow');
	    yl.anchor.setTo(0.5);
	    YLGroup.add(yl);
	    yl.body.velocity.x = speed;
	    game.physics.arcade.enable(yl);
	}

	function YLdestroy(circle,yl){
		yl.destroy();
		if (player == 1 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function YTcreate(){
		var yt = game.add.sprite(game.world.centerX,-200,'yellow');
	    yt.anchor.setTo(0.5);
	    YTGroup.add(yt);
	    yt.body.velocity.y = speed;
	    game.physics.arcade.enable(yt);
	}

	function YTdestroy(circle,yt){
		yt.destroy();
		if (player == 2 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}

	function YRcreate(){
		var yr = game.add.sprite(800,game.world.centerY,'yellow');2
	    yr.anchor.setTo(0.5);
	    YRGroup.add(yr);
	    yr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(yr);
	}

	function YRdestroy(circle,yr){
		yr.destroy();
		if (player == 3 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function YDcreate(){
		var yd = game.add.sprite(game.world.centerX,800,'yellow');
	    yd.anchor.setTo(0.5);
	    YDGroup.add(yd);
	    yd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(yd);
	}

	function YDdestroy(circle,yd){
		yd.destroy();
		if (player == 4 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}





	function GLcreate(){
		var gl = game.add.sprite(0,game.world.centerY,'green');
	    gl.anchor.setTo(0.5);
	    GLGroup.add(gl);
	    gl.body.velocity.x = speed;
	    game.physics.arcade.enable(gl);
	}

	function GLdestroy(circle,gl){
		gl.destroy();
		if (player == 2 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function GTcreate(){
		var gt = game.add.sprite(game.world.centerX,-200,'green');
	    gt.anchor.setTo(0.5);
	    GTGroup.add(gt);
	    gt.body.velocity.y = speed;
	    game.physics.arcade.enable(gt);
	}

	function GTdestroy(circle,gt){
		gt.destroy();
		if (player == 3 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}

	function GRcreate(){
		var gr = game.add.sprite(800,game.world.centerY,'green');
	    gr.anchor.setTo(0.5);
	    GRGroup.add(gr);
	    gr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(gr);
	}

	function GRdestroy(circle,gr){
		gr.destroy();
		if (player == 4 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}



	function GDcreate(){
		var gd = game.add.sprite(game.world.centerX,800,'green');
	    gd.anchor.setTo(0.5);
	    GDGroup.add(gd);
	    gd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(gd);
	}

	function GDdestroy(circle,gd){
		gd.destroy();
		if (player == 1 || player == 5){
			    score += 10;
			    ScoreS += 10;
    			scoreText.setText('Score: ' + score);
		}
		else{
			life-=1;
			lifeText.setText('Lives: ' + life);
		}
	}




	//powerups


	function HLcreate(){
		var hl = game.add.sprite(0,game.world.centerY,'hearth');
	    hl.anchor.setTo(0.5);
	    HLGroup.add(hl);
	    hl.body.velocity.x = speed;
	    game.physics.arcade.enable(hl);
	}

	function HLdestroy(circle,hl){
		hl.destroy();
		if (player == 4 || player == 5){
			if (life < 5){
				life +=1;
				lifeText.setText('Lives: ' + life);
			}
		    else{
		    	score += 10;
		    	ScoreS += 10;
				scoreText.setText('Score: ' + score);
		    }
		}
	}



	function HTcreate(){
		var ht = game.add.sprite(game.world.centerX,-200,'hearth');
	    ht.anchor.setTo(0.5);
	    HTGroup.add(ht);
	    ht.body.velocity.y = speed;
	    game.physics.arcade.enable(ht);
	}

	function HTdestroy(circle,ht){
		ht.destroy();
		if (player == 1 || player == 5){
			if (life < 5){
				life +=1;
				lifeText.setText('Lives: ' + life);
			}
		    else{
		    	score += 10;
		    	ScoreS += 10;
				scoreText.setText('Score: ' + score);
		    }
		}
	}

	function HRcreate(){
		var hr = game.add.sprite(800,game.world.centerY,'hearth');
	    hr.anchor.setTo(0.5);
	    HRGroup.add(hr);
	    hr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(hr);
	}

	function HRdestroy(circle,hr){
		hr.destroy();
		if (player == 2 || player == 5){
			if (life < 5){
				life +=1;
				lifeText.setText('Lives: ' + life);
			}
		    else{
		    	score += 10;
		    	ScoreS += 10;
				scoreText.setText('Score: ' + score);
		    }
		}
	}



	function HDcreate(){
		var hd = game.add.sprite(game.world.centerX,800,'hearth');
	    hd.anchor.setTo(0.5);
	    HDGroup.add(hd);
	    hd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(hd);
	}

	function HDdestroy(circle,hd){
		hd.destroy();
		if (player == 3 || player == 5){
			if (life < 5){
				life +=1;
				lifeText.setText('Lives: ' + life);
			}
		    else{
		    	score += 10;
		    	ScoreS += 10;
				scoreText.setText('Score: ' + score);
		    }
		}
	}



	function SLcreate(){
		var sl = game.add.sprite(0,game.world.centerY,'star');
	    sl.anchor.setTo(0.5);
	    SLGroup.add(sl);
	    sl.body.velocity.x = speed;
	    game.physics.arcade.enable(sl);
	}

	function SLdestroy(circle,sl){
		sl.destroy();
		if (player == 1 || player == 5){
			starpow=1;
			circle.animations.play("circle5");
			player = 5;
			current_time = game.time.time;
			star_time = game.time.time + 10000;

		}
	}



	function STcreate(){
		var st = game.add.sprite(game.world.centerX,-200,'star');
	    st.anchor.setTo(0.5);
	    STGroup.add(st);
	    st.body.velocity.y = speed;
	    game.physics.arcade.enable(st);
	}

	function STdestroy(circle,st){
		st.destroy();
		if (player == 2 || player == 5){
			starpow=1;
			circle.animations.play("circle5");
			player = 5;
			current_time = game.time.time;
			star_time = game.time.time + 10000;
		}

	}

	function SRcreate(){
		var sr = game.add.sprite(800,game.world.centerY,'star');2
	    sr.anchor.setTo(0.5);
	    SRGroup.add(sr);
	    sr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(sr);
	}

	function SRdestroy(circle,sr){
		sr.destroy();
		if (player == 3 || player == 5){
			starpow=1;
			circle.animations.play("circle5");
			player = 5;
			current_time = game.time.time;
			star_time = game.time.time + 10000;
		}
	}

	function SDcreate(){
		var sd = game.add.sprite(game.world.centerX,800,'star');
	    sd.anchor.setTo(0.5);
	    SDGroup.add(sd);
	    sd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(sd);
	}

	function SDdestroy(circle,sd){
		sd.destroy();
		if (player == 4 || player == 5){
			starpow=1;
			circle.animations.play("circle5");
			player = 5;
			current_time = game.time.time;
			star_time = game.time.time + 10000;
		}
	}

	function ILcreate(){
		var il = game.add.sprite(0,game.world.centerY,'ice');
	    il.anchor.setTo(0.5);
	    ILGroup.add(il);
	    il.body.velocity.x = speed;
	    game.physics.arcade.enable(il);
	}

	function ILdestroy(circle,il){
		il.destroy();
		if (player == 3 || player == 5){
			icepow=1;
			circle.animations.play("circle6");
			player = 6;
			current_time = game.time.time;
			ice_time = game.time.time + 5000;
		}
	}



	function ITcreate(){
		var it = game.add.sprite(game.world.centerX,-200,'ice');
	    it.anchor.setTo(0.5);
	    ITGroup.add(it);
	    it.body.velocity.y = speed;
	    game.physics.arcade.enable(it);
	}

	function ITdestroy(circle,it){
		it.destroy();
		if (player == 4 || player == 5){
			icepow=1;
			circle.animations.play("circle6");
			player = 6;
			current_time = game.time.time;
			ice_time = game.time.time + 5000;
		}
	}

	function IRcreate(){
		var ir = game.add.sprite(800,game.world.centerY,'ice');
	    ir.anchor.setTo(0.5);
	    IRGroup.add(ir);
	    ir.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(ir);
	}

	function IRdestroy(circle,ir){
		ir.destroy();
		if (player == 1 || player == 5){
			icepow=1;
			circle.animations.play("circle6");
			player = 6;
			current_time = game.time.time;
			ice_time = game.time.time + 5000;
		}
	}



	function IDcreate(){
		var id = game.add.sprite(game.world.centerX,800,'feather');
	    id.anchor.setTo(0.5);
	    IDGroup.add(id);
	    id.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(id);
	}

	function IDdestroy(circle,id){
		id.destroy();
		if (player == 2 || player == 5){
			icepow=1;
			circle.animations.play("circle6");
			player = 6;
			current_time = game.time.time;
			ice_time = game.time.time + 5000;
		}
	}

	function FLcreate(){
		var fl = game.add.sprite(0,game.world.centerY,'feather');
	    fl.anchor.setTo(0.5);
	    FLGroup.add(fl);
	    fl.body.velocity.x = speed;
	    game.physics.arcade.enable(fl);
	}

	function FLdestroy(circle,fl){
		fl.destroy();
		if (player == 2 || player == 5){
			current_time = game.time.time;
			feather_time = game.time.time + 5000;
			featherpow = 1;
			speed = speed *0.5;
		
		}
	}



	function FTcreate(){
		var ft = game.add.sprite(game.world.centerX,-200,'feather');
	    ft.anchor.setTo(0.5);
	    FTGroup.add(ft);
	    ft.body.velocity.y = speed;
	    game.physics.arcade.enable(ft);
	}

	function FTdestroy(circle,ft){
		ft.destroy();
		if (player == 3 || player == 5){
			current_time = game.time.time;
			feather_time = game.time.time + 5000;
			featherpow = 1;
			speed = speed *0.5;

		}
	}

	function FRcreate(){
		var fr = game.add.sprite(800,game.world.centerY,'feather');
	    fr.anchor.setTo(0.5);
	    FRGroup.add(fr);
	    fr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(fr);
	}

	function FRdestroy(circle,fr){
		fr.destroy();
		if (player == 4 || player == 5){
			current_time = game.time.time;
			feather_time = game.time.time + 5000;
			featherpow = 1;
			speed = speed *0.5;
		}
	}



	function FDcreate(){
		var fd = game.add.sprite(game.world.centerX,800,'feather');
	    fd.anchor.setTo(0.5);
	    FDGroup.add(fd);
	    fd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(fd);
	}

	function FDdestroy(circle,fd){
		fd.destroy();
		if (player == 1 || player == 5){
			current_time = game.time.time;
			feather_time = game.time.time + 5000;
			featherpow = 1;
			speed = speed *0.5;

		}
	}

	function CLcreate(){
		var cl = game.add.sprite(0,game.world.centerY,'coffee');
	    cl.anchor.setTo(0.5);
	    CLGroup.add(cl);
	    cl.body.velocity.x = speed;
	    game.physics.arcade.enable(cl);
	}

	function CLdestroy(circle,cl){
		cl.destroy();
		if (player == 4 || player == 5){
			current_time = game.time.time;
			coffee_time = game.time.time + 5000;
			coffeepow = 1;
			speed = speed *1.5;
		
		}
	}



	function CTcreate(){
		var ct = game.add.sprite(game.world.centerX,-200,'feather');
	    ct.anchor.setTo(0.5);
	    CTGroup.add(ct);
	    ct.body.velocity.y = speed;
	    game.physics.arcade.enable(ct);
	}

	function CTdestroy(circle,ct){
		ct.destroy();
		if (player == 1 || player == 5){
			current_time = game.time.time;
			coffee_time = game.time.time + 5000;
			coffeepow = 1;
			speed = speed *1.5;
		}
	}

	function CRcreate(){
		var cr = game.add.sprite(800,game.world.centerY,'feather');
	    cr.anchor.setTo(0.5);
	    CRGroup.add(cr);
	    cr.body.velocity.x = 0-speed;
	    game.physics.arcade.enable(cr);
	}

	function CRdestroy(circle,cr){
		cr.destroy();
		if (player == 2 || player == 5){
			current_time = game.time.time;
			coffee_time = game.time.time + 5000;
			coffeepow = 1;
			speed = speed *1.5;
		}
	}



	function CDcreate(){
		var cd = game.add.sprite(game.world.centerX,800,'feather');
	    cd.anchor.setTo(0.5);
	    CDGroup.add(cd);
	    cd.body.velocity.y = 0-speed;
	    game.physics.arcade.enable(cd);
	}

	function CDdestroy(circle,cd){
		cd.destroy();
		if (player == 3 || player == 5){
			current_time = game.time.time;
			coffee_time = game.time.time + 5000;
			coffeepow = 1;
			speed = speed *1.5;

		}
	}


	function level_1(){
		random = getRandomInt(100);
		if(random < 21){
			redball();
		}
		else if(random >= 21 && random < 42 ){
			blueball();
		}
		else if(random >= 42 && random < 63 ){
			greenball();
		}
		else if(random >= 63 && random < 84 ){
			yellowball();
		}
		else if(random >= 84 && random < 88 ){
			iceball();
		}
		else if(random >=88 && random < 90){
			hearthball();
		}
		else if(random >=90 && random < 94){
			coffeeball();
		}
		else if(random >=94 && random < 97){
			featherball();
		}
		else if(random >=97){
			starball();
		}
	}

	function blueball(){
		random = getRandomInt(4);
		if( random == 0){
			BLcreate();
		}
		else if (random ==1){
			BTcreate();
		}
		else if (random ==2){
			BRcreate();
		}
		else if (random == 3){
			BDcreate();
		}
	}
	function redball(){
		random = getRandomInt(4);
		if( random == 0){
			RLcreate();
		}
		else if (random ==1){
			RTcreate();
		}
		else if (random ==2){
			RRcreate();
		}
		else if (random == 3){
			RDcreate();
		}
	}

	function greenball(){
		random = getRandomInt(4);
		if( random == 0){
			GLcreate();
		}
		else if (random ==1){
			GTcreate();
		}
		else if (random ==2){
			GRcreate();
		}
		else if (random == 3){
			GDcreate();
		}
	}

	function yellowball(){
		random = getRandomInt(4);
		if( random == 0){
			YLcreate();
		}
		else if (random ==1){
			YTcreate();
		}
		else if (random ==2){
			YRcreate();
		}
		else if (random == 3){
			YDcreate();
		}
	}

	function hearthball(){
		random = getRandomInt(4);
		if( random == 0){
			HLcreate();
		}
		else if (random ==1){
			HTcreate();
		}
		else if (random ==2){
			HRcreate();
		}
		else if (random == 3){
			HDcreate();
		}
	}

	function coffeeball(){
		random = getRandomInt(4);
		if( random == 0){
			CLcreate();
		}
		else if (random ==1){
			CTcreate();
		}
		else if (random ==2){
			CRcreate();
		}
		else if (random == 3){
			CDcreate();
		}
	}

	function iceball(){
		random = getRandomInt(4);
		if( random == 0){
			ILcreate();
		}
		else if (random ==1){
			ITcreate();
		}
		else if (random ==2){
			IRcreate();
		}
		else if (random == 3){
			IDcreate();
		}
	}

	function starball(){
		random = getRandomInt(4);
		if( random == 0){
			SLcreate();
		}
		else if (random ==1){
			STcreate();
		}
		else if (random ==2){
			SRcreate();
		}
		else if (random == 3){
			SDcreate();
		}
	}

	function featherball(){
		random = getRandomInt(4);
		if( random == 0){
			FLcreate();
		}
		else if (random ==1){
			FTcreate();
		}
		else if (random ==2){
			FRcreate();
		}
		else if (random == 3){
			FDcreate();
		}
	}

	function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}