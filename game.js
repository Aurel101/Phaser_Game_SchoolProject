window.addEventListener('load',inputname);
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth-20,
    height: window.innerHeight-20,
    pixelArt:true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug:true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var Enemies={};
const game = new Phaser.Game(config);
var enemies_array=[];
const gameState = {
    middleScreen:{
        x:(innerWidth-20)/2,
        y:(innerHeight-20)/2
    },
    gameover:true,
    altcursors:{},
    invincible:false,
    score:1000

};

function preload ()
{
    this.load.image('bullet1','rsrc/bullet1.png');
    this.load.image('starfield','rsrc/startfield.png');
    this.load.image('spaceship','rsrc/spaceship.png');
    this.load.image('enemy1','rsrc/enemy1.png');
    this.load.image('bullet2','rsrc/bullet2.png');
    this.load.image('enemy2','rsrc/enemy2.png');
    this.load.json('Enemies','rsrc/Enemies.json');
    this.load.image('logo','rsrc/logofinal.png');
}

function create ()
{

    //Game objects
    Enemies=this.cache.json.get('Enemies');
    gameState.background=this.add.image(0,0,'starfield').setOrigin(0,0).setDisplaySize(window.innerWidth-20,window.innerHeight-20);
    gameState.player=this.physics.add.sprite(gameState.middleScreen.x,500,'spaceship');
    gameState.logo=this.add.image(gameState.middleScreen.x,gameState.middleScreen.y-400,'logo').setDisplaySize(window.innerWidth/4,window.innerHeight/4);
    gameState.player.setCollideWorldBounds(true);
    gameState.player.setBounce(0.2);
    gameState.player_bullet=this.physics.add.group();
    gameState.cursors=this.input.keyboard.createCursorKeys();
    gameState.altcursors.up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    gameState.altcursors.down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    gameState.altcursors.left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    gameState.altcursors.right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    gameState.altcursors.enter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    gameState.altcursors.shift=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    gameState.circle=this.add.circle(gameState.player.x,gameState.player.y,5,0xff0000);
    gameState.hitbox=this.physics.add.existing(gameState.circle,0);
    gameState.bullets=this.physics.add.group();
    gameState.enemies=this.physics.add.group();
    gameState.test1=this.add.text(0, 0, gameState.bullets.countActive(), {fontFamily:'joystix',fontSize: '15px', fill: '#ffffff'});
    gameState.scoreboard=this.add.text(gameState.middleScreen.x, gameState.middleScreen.y, '', {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
    gameState.scoreboard.visible=false;
    if(gameState.gameover) {
        gameState.player.visible=false;
        gameState.hitbox.visible=false;
        this.physics.pause();
        gameState.logo.visible=true;
        gameState.startbutton=this.add.rectangle(gameState.middleScreen.x,gameState.middleScreen.y,200,40,0x0506ee).setOrigin(0.5);
        gameState.starttext=this.add.text(gameState.startbutton.x,gameState.startbutton.y,'START',{fontFamily: 'joystix',fontSize:'20px',fill:'#ffffff'}).setOrigin(0.5);
        gameState.startbutton.strokeColor=0x000000;
        gameState.startbutton.isStroked=true;
        gameState.startbutton.lineWidth=2;
        gameState.startbutton.setInteractive();
        gameState.startbutton.on('pointerup',startgame,this);
        gameState.startbutton.on('pointerover',function () {
            gameState.startbutton.strokeColor = 0xffffff;
        });
        gameState.startbutton.on('pointerout',function () {
           gameState.startbutton.strokeColor= 0x000000;
        });
        gameState.highscore=this.add.rectangle(gameState.middleScreen.x,gameState.middleScreen.y+100,200,40,0x0506ee).setOrigin(0.5);
        gameState.highscoretext=this.add.text(gameState.startbutton.x,gameState.startbutton.y+100,'Highscores',{fontFamily: 'joystix',fontSize:'20px',fill:'#ffffff'}).setOrigin(0.5);
        gameState.highscore.strokeColor=0x000000;
        gameState.highscore.isStroked=true;
        gameState.highscore.lineWidth=2;
        gameState.highscore.setInteractive();
        gameState.highscore.on('pointerup',showhighscores,this);
        gameState.highscore.on('pointerover',function () {
            gameState.highscore.strokeColor = 0xffffff;
        });
        gameState.highscore.on('pointerout',function () {
            gameState.highscore.strokeColor= 0x000000;
        });
        gameState.changename=this.add.rectangle(gameState.middleScreen.x,gameState.middleScreen.y+200,200,40,0x0506ee).setOrigin(0.5);
        gameState.changenametext=this.add.text(gameState.startbutton.x,gameState.startbutton.y+200,'Change name',{fontFamily: 'joystix',fontSize:'20px',fill:'#ffffff'}).setOrigin(0.5);
        gameState.changename.strokeColor=0x000000;
        gameState.changename.isStroked=true;
        gameState.changename.lineWidth=2;
        gameState.changename.setInteractive();
        gameState.changename.on('pointerup',inputname,this);
        gameState.changename.on('pointerover',function () {
            gameState.changename.strokeColor = 0xffffff;
        });
        gameState.changename.on('pointerout',function () {
            gameState.changename.strokeColor= 0x000000;
        });
    }
    //Events and colliders:
    function startgame() {
        gameState.logo.visible=false;
        gameState.startbutton.visible=false;
        gameState.starttext.visible=false;
        gameState.highscore.visible=false;
        gameState.highscoretext.visible=false;
        gameState.changename.visible=false;
        gameState.changenametext.visible=false;
        gameState.gameover=false;
        gameState.player.visible=true;
        gameState.hitbox.visible=true;
        this.scene.restart();
    }
    function showhighscores() {
        gethighscore();
        gameState.logo.visible=false;
        gameState.changename.visible=false;
        gameState.changenametext.visible=false;
        gameState.startbutton.visible=false;
        gameState.starttext.visible=false;
        gameState.highscore.visible=false;
        gameState.highscoretext.visible=false;
        gameState.scoreboard.visible=true;
        this.input.keyboard.on('keydown-ESC',function () {
            this.scene.restart();
        },this);
    }
    this.physics.add.overlap(gameState.enemies,gameState.player_bullet,hitEnemy,null,this);
    gameState.hitbox_collider=this.physics.add.collider(gameState.hitbox,gameState.bullets,() => {
        this.physics.pause();
        sendhighscore();
        gameState.ShootingLoop.destroy();
        gameState.gameover=true;
        this.add.text(gameState.middleScreen.x,gameState.middleScreen.y-30,'Score:'+gameState.score.toString(),{fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
        this.add.text(gameState.middleScreen.x, gameState.middleScreen.y, 'Game Over', {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
        this.add.text(gameState.middleScreen.x, gameState.middleScreen.y+30, 'Click or Press Enter to Restart', {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
        this.input.on('pointerup',restartgame,this);
        gameState.altcursors.enter.on('down',restartgame,this);
            function restartgame() {
            gameState.score = 1000;
            gameRounds.gameRound=0;
            Phaser.Actions.Call(gameState.enemies.getChildren(),function (enemy) {
               gameState.enemies.remove(enemy,true,true);
            });
            //gameState.enemies=this.physics.add.group();
            this.scene.restart();
            gameState.gameover=false;
        }
        this.input.keyboard.on('keydown-ESC',backtomenu,this);
            function backtomenu() {
                gameState.test1.hidden=true;
                gameState.score=1000;
                gameRounds.gameRound=0;
                Phaser.Actions.Call(gameState.enemies.getChildren(),function (enemy) {
                    gameState.enemies.remove(enemy,true,true);
                });
                gameState.gameover=true;
                this.scene.restart();
            }
    });
    this.input.keyboard.on('keydown-SPACE',function () {
        if (gameState.hitbox_collider.active) {
            let bullet = gameState.player_bullet.createFromConfig({
                setXY: {
                    x: gameState.player.x,
                    y: gameState.player.y - 20
                }, key: 'bullet1', repeat: 0, max: 1
            });
            bullet[0].setScale(0.5);
            bullet[0].setCircle(4);
            bullet[0].setAccelerationY(-800);
        }
    });
    gameState.ShootingLoop = this.time.addEvent({
        delay: 2000,
        callback: shootEnemy,
        callbackScope: this,
        loop: true,
        paused:true
    });
}
function  update() {
    gameState.test1.text='Score:'+gameState.score.toString()+"        "+'Round:'+gameRounds.gameRound.toString();//+gameState.player_bullet.countActive().toString();;
    // Hitbox and movement
    gameState.hitbox.x=gameState.player.x;
    gameState.hitbox.y=gameState.player.y;
    if(gameState.cursors.up.isDown || gameState.altcursors.up.isDown){
    gameState.player.setVelocityY(-300);
    }
    else if(gameState.cursors.down.isDown || gameState.altcursors.down.isDown){
    gameState.player.setVelocityY(300);
    }
    else {
    gameState.player.setDragY(1000);
    //gameState.player.setVelocityY(0);
    }
    if(gameState.cursors.right.isDown || gameState.altcursors.right.isDown){
        gameState.player.setVelocityX(300);
    }
    else if(gameState.cursors.left.isDown || gameState.altcursors.left.isDown){
        gameState.player.setVelocityX(-300);
    }
    else
    {
        gameState.player.setDragX(1000);
        //gameState.player.setVelocityX(0);
    }
    // Enemy spawning
    if (gameState.enemies.countActive()===0 && gameState.gameover===false)
    {
        gameRounds.gameRound+=1;
        if (gameRounds.gameRound>1){
            gameState.score+=1000;
            gameState.starttext=this.add.text(gameState.middleScreen.x, gameState.middleScreen.y, 'Stage:'+gameRounds.gameRound.toString(), {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
        }
        gameState.ShootingLoop.paused=true;
        switch(gameRounds.gameRound){
            case 1:
                gameRounds.enemytype1=1;
                gameRounds.enemytype2=0;
                break;
            case 2:
                gameRounds.enemytype1=2;
                gameRounds.enemytype2=0;
                break;
            case 3:
                gameRounds.enemytype1=2;
                gameRounds.enemytype2=1;
                break;
            case 4:
                gameRounds.enemytype1=3;
                gameRounds.enemytype2=1;
                gameRounds.gameRound=0;
                break;
        }
        gameState.gameover=true;
        setTimeout(function(){
            spawnEnemy();
            gameState.starttext.visible=false;
            gameState.gameover=false;
            gameState.ShootingLoop.paused=false;
        },2000);

    }
    Phaser.Actions.Call(gameState.bullets.getChildren(),function (bullet) {
        if((bullet.x<0 || bullet.x>window.innerWidth)||(bullet.y<0 ||bullet.y>window.innerHeight))
            gameState.bullets.remove(bullet,true,true);
    });
    Phaser.Actions.Call(gameState.enemies.getChildren(),function (enemy) {
       if(enemy.x<60 || enemy.x>window.innerWidth-60)
            enemy.body.velocity.x*=-1;
    });
    Phaser.Actions.Call(gameState.player_bullet.getChildren(),function (bullet) {
        if((bullet.x<0 || bullet.x>window.innerWidth)||(bullet.y<0 ||bullet.y>window.innerHeight))
            gameState.player_bullet.remove(bullet,true,true);
    });
    if (gameState.altcursors.shift.isDown && gameState.invincible===false){
        setInvincible();
        window.setTimeout(resetInvincible,1500);
    }
}

//Functions for events, and other misc functions:
function setInvincible() {
    gameState.hitbox_collider.active=false;
    //gameState.cursors.space.enabled=false;
    gameState.player.setAlpha(0.5);
    gameState.hitbox.setBlendMode(Phaser.BlendModes.SCREEN);
    gameState.invincible=true;
    gameState.score-=200;
}
function resetInvincible () {
    //gameState.altcursors.space.enabled=true;
    gameState.player.setAlpha(1);
    gameState.hitbox_collider.active=true;
    //gameState.cursors.space.enabled=true;
    gameState.hitbox.setBlendMode(Phaser.BlendModes.NORMAL);
    window.setTimeout(function () {
        gameState.invincible=false;
    },1000)
}
function PlaceGroupAroundCircle(x,y,group,radius=100){
    let circle=new Phaser.Geom.Circle(x,y,radius);
    Phaser.Actions.PlaceOnCircle(group,circle);
}
function PlaceGroupInCircle(x,y,group,radius=100) {
    let circle=new Phaser.Geom.Circle(x,y,radius);
    Phaser.Actions.RandomCircle(group,circle);
}
function PlaceGroupAroundRectangle(x,y,group,width=100,height=100)
{
    let rectangle = new Phaser.Geom.Rectangle(x,y,width,height);
    Phaser.Actions.PlaceOnRectangle(group,rectangle);
}
function hitEnemy(enemy,player_bullet) {
        player_bullet.active=false;
        gameState.player_bullet.remove(player_bullet,true,true);
        enemy.setData('health',enemy.getData('health')-1);
        enemy.setAlpha(0.5);
        enemy.setVelocityY(0);
        // For now, change later for decrease health instead:
        if (enemy.getData('health')==0) {
            gameState.score+=enemy.getData('score');
            gameState.enemies.remove(enemy, true, true);

        }
        setTimeout(function () {
        enemy.setAlpha(1);
    },1000);
}
function spawnEnemy(){
    for(let i=0;i<gameRounds.enemytype1;i++) {
        let enemy=gameState.enemies.create(0, 0, Enemies.enemy1.sprite_config.texture);
        enemy.setData('number',Enemies.enemy1.number);
        enemy.setData('score',Enemies.enemy1.score);
        enemy.setData('health',Enemies.enemy1.health);
        enemy.setVelocityX(50);
    }
    for(let i=0;i<gameRounds.enemytype2;i++) {
        let enemy=gameState.enemies.create(0,0,Enemies.enemy2.sprite_config.texture);
        enemy.setData('number',Enemies.enemy2.number);
        enemy.setData('score',Enemies.enemy2.score);
        enemy.setData('health',Enemies.enemy2.health);
        enemy.setVelocityX(-50);
    }
    let rect=new Phaser.Geom.Rectangle(60,16,window.innerWidth-110,window.innerHeight/2-100);
    Phaser.Actions.RandomRectangle(gameState.enemies.getChildren(),rect);
}
function shootCircle(enemy,bullets) {
    for(let i=0;i<bullets.length;i++){
        let bullet=bullets[i];
        bullet.collideWorldBounds=true;
        bullet.body.onWorldBounds=true;
        if(enemy.getData('number')===1) {
            bullet.setCircle(8);
        }
        else {
            bullet.setCircle(16);
        }
        bullet.setAcceleration((bullet.x-enemy.x)*10,(bullet.y-enemy.y)*10);

    }
}
function shootEnemy() {
    gameState.score-=50;
    if(gameState.enemies.countActive()>0) {
        let E = gameState.enemies.getChildren();
        for (let i = 0; i < E.length;i++) {
            let current_enemy = E[i];
            if(current_enemy.getData('number')===1){
                let bullets = gameState.bullets.createMultiple(Enemies.enemy1.bullet_config);
                PlaceGroupInCircle(current_enemy.x, current_enemy.y+10, bullets, 20);

                shootCircle(current_enemy, bullets);
            }
            else {
                let bullets = gameState.bullets.createMultiple(Enemies.enemy2.bullet_config);
                PlaceGroupAroundCircle(current_enemy.x, current_enemy.y, bullets, 20);
                shootCircle(current_enemy, bullets);
            }
        }
    }
}
function inputname() {
    let name;
    let person = prompt("Please enter your name:", "Unknown");
    if (person == null || person == "") {
        name = "Unknown";
    }
    else {
        name = person;
    }
    gameState.player_name=name;
}
function sendhighscore(){
    let xhttp= new XMLHttpRequest();
    xhttp.open('GET','process.php?name='+gameState.player_name+'&score='+gameState.score+'&stage='+gameRounds.gameRound,true);
    xhttp.send();
}
function gethighscore(){
    let xhttp=new XMLHttpRequest();
    xhttp.open('GET','process.php?t='+Math.random(),true);
    xhttp.send();
    xhttp.onreadystatechange =  function () {
        if (xhttp.status==200) {
            gameState.scoreboard.setText(this.responseText);
        }

    }
}
const gameRounds={
    gameRound:0,
    enemytype1:0,
    enemytype2:0
};
