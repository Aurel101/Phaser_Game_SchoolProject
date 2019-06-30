//Variables,constants,objects etc... all the global stuff I use
window.addEventListener('load',inputname);
window.sessionStorage;
const gameWindow={
    width:1000,
    height:700
};
var timerEvents=[];
var particleEmitters=[];
const config = {
    type: Phaser.AUTO,
    width: gameWindow.width,
    height: gameWindow.height,
    pixelArt:true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug:false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//This is the variable for the Game rounds, (should be moved to the top)
const gameRounds={
    gameRound:0,
    enemytype1:0,
    enemytype2:0,
    enemytype3:0,
    enemytype4:0
};
var Enemies={};
const game = new Phaser.Game(config);
var enemies_array=[];
const gameState = {
    middleScreen:{
        x:(gameWindow.width)/2,
        y:(gameWindow.height)/2
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
    this.load.image('enemy3','rsrc/enemy3.png');
    this.load.image('enemy4','rsrc/enemy4.png');
    this.load.image('playerbullet','rsrc/player_bullet.png');
    this.load.json('Enemies','rsrc/Enemies.json');
    this.load.image('logo','rsrc/logofinal.png');
    this.load.image('particle1','rsrc/particlered.png');
    this.load.image('particle2','rsrc/particlepurp.png');
}

function create ()
{

    //Game objects(images,sprites,texts,buttons etc...)
    Enemies=this.cache.json.get('Enemies');
    gameState.emiter=new Phaser.Events.EventEmitter();
    gameState.background=this.add.image(0,0,'starfield').setOrigin(0,0).setDisplaySize(gameWindow.width,gameWindow.height);
    gameState.player=this.physics.add.sprite(gameState.middleScreen.x,500,'spaceship');
    gameState.logo=this.add.image(gameState.middleScreen.x,gameState.middleScreen.y-180,'logo').setDisplaySize(gameWindow.width/2,gameWindow.height/2).setVisible(false);
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
    gameState.wintext=this.add.text(gameState.middleScreen.x, gameState.middleScreen.y-100, 'You Won!!!', {fontFamily:'joystix',fontSize: '40px', fill: '#ffffff'}).setOrigin(0.5);
    gameState.wintext.visible=false;
    gameState.controltext=this.add.text(gameState.middleScreen.x, gameState.middleScreen.y-100, "Constrols\n Movement - WASD or ArrowKeys\n Fire - Space\n Cloaking - Left Shift\n Cloaking makes you\n impervious for a\n short time", {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
    gameState.controltext.visible=false;
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
        gameState.controlscheme=this.add.rectangle(gameState.middleScreen.x,gameState.middleScreen.y+300,200,40,0x0506ee).setOrigin(0.5);
        gameState.controlschemetext=this.add.text(gameState.startbutton.x,gameState.startbutton.y+300,'Controls',{fontFamily: 'joystix',fontSize:'20px',fill:'#ffffff'}).setOrigin(0.5);
        gameState.controlscheme.strokeColor=0x000000;
        gameState.controlscheme.isStroked=true;
        gameState.controlscheme.lineWidth=2;
        gameState.controlscheme.setInteractive();
        gameState.controlscheme.on('pointerup',showcontrols,this);
        gameState.controlscheme.on('pointerover',function () {
            gameState.controlscheme.strokeColor = 0xffffff;
        });
        gameState.controlscheme.on('pointerout',function () {
            gameState.controlscheme.strokeColor= 0x000000;
        });
    }
    //Events and colliders(and the menu):
    function startgame() {
        gameState.logo.visible=false;
        gameState.startbutton.visible=false;
        gameState.starttext.visible=false;
        gameState.highscore.visible=false;
        gameState.highscoretext.visible=false;
        gameState.changename.visible=false;
        gameState.changenametext.visible=false;
        gameState.controlscheme.visible=false;
        gameState.controlschemetext.visible=false;
        gameState.gameover=false;
        gameState.player.visible=true;
        gameState.hitbox.visible=true;
        gameState.player.particleEmitter.active=true;
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
        gameState.controlscheme.visible=false;
        gameState.controlschemetext.visible=false;
        gameState.scoreboard.visible=true;
        this.input.keyboard.on('keydown-ESC',function () {
            this.scene.restart();
        },this);
    }
    function showcontrols() {
        gameState.logo.visible=false;
        gameState.changename.visible=false;
        gameState.changenametext.visible=false;
        gameState.startbutton.visible=false;
        gameState.starttext.visible=false;
        gameState.highscore.visible=false;
        gameState.highscoretext.visible=false;
        gameState.controlscheme.visible=false;
        gameState.controlschemetext.visible=false;
        gameState.controltext.visible=true;
        this.input.keyboard.on('keydown-ESC',function () {
            this.scene.restart();
        },this);

    }
    this.physics.add.overlap(gameState.enemies,gameState.player_bullet,hitEnemy,null,this);
    gameState.hitbox_collider=this.physics.add.collider(gameState.hitbox,gameState.bullets,GameOver.bind(this));
    gameState.emiter.on("Win",GameOver.bind(this));
    this.input.keyboard.on('keydown-SPACE',function () {
        if (gameState.hitbox_collider.active) {
            let bullet = gameState.player_bullet.createFromConfig({
                setXY: {
                    x: gameState.player.x,
                    y: gameState.player.y - 20
                }, key: 'playerbullet', repeat: 0, max: 1
            });
            bullet[0].setScale(0.5);
            bullet[0].setAccelerationY(-800);
        }
    });
    //Timers for the enemy shooting
    timerEvents.push(this.time.addEvent({
        delay:Phaser.Math.Between(5000,8000),
        loop:true,
        paused:true,
        callback:function () {
            shootEnemy(1);
            },
    }));
    timerEvents.push(this.time.addEvent({
        delay:Phaser.Math.Between(3000,4000),
        loop:true,
        paused:true,
        callback:function () {
            shootEnemy(2);
            },
    }));
    timerEvents.push(this.time.addEvent({
        delay:Phaser.Math.Between(1000,3000),
        loop:true,
        paused:true,
        callback:function () {
            shootEnemy(3);
        },
    }));
    timerEvents.push(this.time.addEvent({
        delay:Phaser.Math.Between(1000,2000),
        loop:true,
        paused:true,
        callback:function () {
            shootEnemy(4);
        },
    }));
    //Particle emitters
    particleEmitters.push(
        this.add.particles('particle1').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            active: false,
            lifespan: 600,
        }));
    particleEmitters.push(
        this.add.particles('particle2').createEmitter({
            x: 400,
            y: 300,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            active: false,
            lifespan: 300,
        }));
    gameState.player.particleEmitter=this.add.particles('particle2').createEmitter({
        x: 100,
        y: 100,
        speed: { min: 200, max: 500 },
        angle: { min: 45, max: 135 },
        scale: { start: 0.3, end: 0 },
        blendMode: 'ADD',
        active: false,
        lifespan: 300,
    });
}
function  update() {
    //Scoreboard and Game round counter
    gameState.test1.text='Score:'+gameState.score.toString()+"        "+'Round:'+gameRounds.gameRound.toString();
    // Hitbox and movement controls and emitter
    gameState.player.particleEmitter.setPosition(gameState.player.x,gameState.player.y+32);
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
        gameState.player.particleEmitter.active=true;
        if (gameRounds.gameRound>1){
            gameState.score+=1000;
            gameState.starttext=this.add.text(gameState.middleScreen.x, gameState.middleScreen.y, 'Stage:'+gameRounds.gameRound.toString(), {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
        }
        timerEvents.forEach(function (item) {
           item.paused=true;
        });
        switch(gameRounds.gameRound){
            case 1:
                gameRounds.enemytype1=0;
                gameRounds.enemytype2=0;
                gameRounds.enemytype3=3;
                gameRounds.enemytype4=0;
                break;
            case 2:
                gameRounds.enemytype1=1;
                gameRounds.enemytype2=0;
                gameRounds.enemytype3=2;
                gameRounds.enemytype4=0;
                break;
            case 3:
                gameRounds.enemytype1=3;
                gameRounds.enemytype2=0;
                gameRounds.enemytype3=0;
                gameRounds.enemytype4=0;
                break;
            case 4:
                gameRounds.enemytype1=3;
                gameRounds.enemytype2=1;
                gameRounds.enemytype3=0;
                gameRounds.enemytype4=0;
                break;
            case 5:
                gameRounds.enemytype1=2;
                gameRounds.enemytype2=1;
                gameRounds.enemytype3=3;
                gameRounds.enemytype4=0;
                break;
            case 6:
                gameRounds.enemytype1=2;
                gameRounds.enemytype2=2;
                gameRounds.enemytype3=2;
                gameRounds.enemytype4=0;
                break;
            case 7:
                gameRounds.enemytype1=2;
                gameRounds.enemytype2=0;
                gameRounds.enemytype3=2;
                gameRounds.enemytype4=1;
                break;
            case 8:
                gameRounds.enemytype1=0;
                gameRounds.enemytype2=0;
                gameRounds.enemytype3=0;
                gameRounds.enemytype4=0;
                gameRounds.gameRound=7;
                gameState.wintext.visible=true;
                gameState.emiter.emit("Win");
                break;
        }
        gameState.gameover=true;
        setTimeout(function(){
            spawnEnemy();
            gameState.starttext.visible=false;
            gameState.gameover=false;
            timerEvents.forEach(function (item) {
                item.paused=false;
            })
        },2000);

    }
    //Various calls for the bullet or the enemy reaching the edge of the screen(Needs some tiny fixes)
    Phaser.Actions.Call(gameState.bullets.getChildren(),function (bullet) {
        if((bullet.x<0 || bullet.x>gameWindow.width)||(bullet.y<0 ||bullet.y>gameWindow.height))
            gameState.bullets.remove(bullet,true,true);
    });
    Phaser.Actions.Call(gameState.enemies.getChildren(),function (enemy) {
       if(enemy.x<60 || enemy.x>gameWindow.width-60) {
           enemy.body.velocity.x *= -1;
           enemy.body.acceleration.x*=-1;
           enemy.x -= ((enemy.x - 500) * 0.01);
       }});
    Phaser.Actions.Call(gameState.player_bullet.getChildren(),function (bullet) {
        if((bullet.x<0 || bullet.x>gameWindow.width)||(bullet.y<0 ||bullet.y>gameWindow.height))
            gameState.player_bullet.remove(bullet,true,true);
    });
    if (gameState.altcursors.shift.isDown && gameState.invincible===false){
        setInvincible();
        window.setTimeout(resetInvincible,1500);
    }
}

//Functions for events, and other misc functions:
//Function that makes the player invincible
function setInvincible() {
    gameState.hitbox_collider.active=false;
    //gameState.cursors.space.enabled=false;
    gameState.player.setAlpha(0.5);
    gameState.hitbox.setBlendMode(Phaser.BlendModes.SCREEN);
    gameState.player.particleEmitter.blendMode=Phaser.BlendModes.SCREEN;
    gameState.invincible=true;
    gameState.score-=200;
}
//Function that makes the player vulnerable again
function resetInvincible () {
    //gameState.altcursors.space.enabled=true;
    gameState.player.setAlpha(1);
    gameState.hitbox_collider.active=true;
    //gameState.cursors.space.enabled=true;
    gameState.hitbox.setBlendMode(Phaser.BlendModes.NORMAL);
    gameState.player.particleEmitter.blendMode=Phaser.BlendModes.ADD;
    window.setTimeout(function () {
        gameState.invincible=false;
    },1000)
}
//Places entitites on a circle around a point
function PlaceGroupAroundCircle(x,y,group,radius=100){
    let circle=new Phaser.Geom.Circle(x,y,radius);
    Phaser.Actions.PlaceOnCircle(group,circle);
}
//Places entities randomly in a cirlce
function PlaceGroupInCircle(x,y,group,radius=100) {
    let circle=new Phaser.Geom.Circle(x,y,radius);
    Phaser.Actions.RandomCircle(group,circle);
}
//Places entitites on a rectangle (Not used / useless as of now)
function PlaceGroupAroundRectangle(x,y,group,width=100,height=100)
{
    let rectangle = new Phaser.Geom.Rectangle(x,y,width,height);
    Phaser.Actions.PlaceOnRectangle(group,rectangle);
}
//Function that's called when the player hits an enemy with a bullet
function hitEnemy(enemy,player_bullet) {
        player_bullet.active=false;
        gameState.player_bullet.remove(player_bullet,true,true);
        enemy.setData('health',enemy.getData('health')-1);
        enemy.setAlpha(0.5);
        enemy.setVelocityY(0);
        if (enemy.getData('health')==0) {
            gameState.score+=enemy.getData('score');
            gameState.enemies.remove(enemy, true, true);
            particleEmitters.forEach(function (emitter) {
                emitter.setPosition(enemy.x,enemy.y);
                emitter.active=true;
                emitter.explode(Phaser.Math.Between(15,25));
            });

        }
        else {
            particleEmitters.forEach(function (emitter) {
                emitter.setPosition(enemy.x,enemy.y);
                emitter.active=true;
                emitter.explode(Phaser.Math.Between(1,4));
            });

        }
        setTimeout(function () {
        enemy.setAlpha(1);
    },1000);
}
//Function that spawns enemies(Needs reworking)
function spawnEnemy(){
    for(let i=0;i<gameRounds.enemytype1;i++) {
        let enemy=gameState.enemies.create(0,0,Enemies.enemy1.sprite_config.texture);
        enemy.setData('number',Enemies.enemy1.number);
        enemy.setData('score',Enemies.enemy1.score);
        enemy.setData('health',Enemies.enemy1.health);
        enemy.setVelocityX(50);
        enemy.setAccelerationX(5);
    }
    for(let i=0;i<gameRounds.enemytype2;i++) {
        let enemy=gameState.enemies.create(0,0,Enemies.enemy2.sprite_config.texture);
        enemy.setData('number',Enemies.enemy2.number);
        enemy.setData('score',Enemies.enemy2.score);
        enemy.setData('health',Enemies.enemy2.health);
        enemy.setVelocityX(-50);
        enemy.setAccelerationX(-3)
    }
    for(let i=0;i<gameRounds.enemytype3;i++) {
        let enemy=gameState.enemies.create(0,0,Enemies.enemy3.sprite_config.texture);
        enemy.setData('number',Enemies.enemy3.number);
        enemy.setData('score',Enemies.enemy3.score);
        enemy.setData('health',Enemies.enemy3.health);
        enemy.setVelocityX(-80);
        enemy.setAccelerationX(-3)
    }
    for(let i=0;i<gameRounds.enemytype4;i++) {
        let enemy=gameState.enemies.create(0,0,Enemies.enemy4.sprite_config.texture);
        enemy.setData('number',Enemies.enemy4.number);
        enemy.setData('score',Enemies.enemy4.score);
        enemy.setData('health',Enemies.enemy4.health);
        enemy.setScale(2);
        enemy.setVelocityX(40);
        enemy.setAccelerationX(5);
        enemy.setAngularVelocity(40);
    }
    let rect=new Phaser.Geom.Rectangle(60,16,800,200);
    Phaser.Actions.RandomRectangle(gameState.enemies.getChildren(),rect);
}
//Function that shoots bullets that are placed ,in a cirlce/around a point(Needs rework?)
function shootCircle(enemy,bullets,mode=1) {
    for(let i=0;i<bullets.length;i++){
        let bullet=bullets[i];
        bullet.collideWorldBounds=true;
        bullet.body.onWorldBounds=true;
        if(mode==1) {
            bullet.setCircle(8);
        }
        else {
            bullet.setCircle(16);
        }
        bullet.setAcceleration((bullet.x-enemy.x)*10,(bullet.y-enemy.y)*10);

    }
}
//Function to shoot bullets right at the players current position
function ShootTrackingBullets(enemy,bullets,placebullets=false) {
    for(let i=0;i<bullets.length;i++) {
        let bullet=bullets[i];
        if(placebullets) {
            bullet.x = enemy.x;
            bullet.y = enemy.y + 10;
        }
        bullet.setCircle(8);
        bullet.setAcceleration((gameState.player.x-bullet.x),(gameState.player.y-bullet.y));
    }
}
//Function that spawns enemy bullets, reworked to some degree
function shootEnemy(number) {
    gameState.score-=10;
    if(gameState.enemies.countActive()>0) {
        let E = gameState.enemies.getChildren();
        for (let i = 0; i < E.length;i++) {
            let current_enemy = E[i];
            if(current_enemy.getData('number')==Enemies.enemy1.number && current_enemy.getData('number')==number ){
                let bullets = gameState.bullets.createMultiple(Enemies.enemy1.bullet_config);
                PlaceGroupInCircle(current_enemy.x, current_enemy.y+10, bullets, 20);

                shootCircle(current_enemy, bullets);
            }
            else if (current_enemy.getData('number')==Enemies.enemy2.number && current_enemy.getData('number')==number) {
                let bullets = gameState.bullets.createMultiple(Enemies.enemy2.bullet_config);
                PlaceGroupAroundCircle(current_enemy.x, current_enemy.y, bullets, 20);
                shootCircle(current_enemy, bullets,2);
            }
            else if(current_enemy.getData('number')==Enemies.enemy3.number && current_enemy.getData('number')==number ){
                let bullets = gameState.bullets.createMultiple(Enemies.enemy3.bullet_config);
                ShootTrackingBullets(current_enemy, bullets,true);
            }
            else if(current_enemy.getData('number')==Enemies.enemy4.number && current_enemy.getData('number')==number ){
                let k=Phaser.Math.Between(1,3);
                let bullets;
                switch (k) {
                    case 1:
                        bullets = gameState.bullets.createMultiple(Enemies.enemy4.bullet_config);
                        PlaceGroupInCircle(current_enemy.x, current_enemy.y+10, bullets, 40);
                        shootCircle(current_enemy, bullets, 2);
                        break;
                    case 2:
                        bullets = gameState.bullets.createMultiple(Enemies.enemy4.bullet_config);
                        PlaceGroupAroundCircle(current_enemy.x, current_enemy.y, bullets, 40);
                        shootCircle(current_enemy, bullets,2);
                        break;
                    case 3:
                        bullets = gameState.bullets.createMultiple(Enemies.enemy4.bullet_config);
                        PlaceGroupInCircle(current_enemy.x, current_enemy.y+10, bullets, 50);
                        ShootTrackingBullets(current_enemy, bullets,);
                        break;
                }
            }
        }
    }
}
//Function that saves the players name
function inputname() {
    let defaultname='Unknown';
    if(sessionStorage.getItem('playername'))
     defaultname=sessionStorage.getItem('playername');
    let name;
    let person = prompt("Please enter your name:", defaultname.toString());
    if (person == null || person == "") {
        name = "Unknown";
    }
    else {
        name = person;
    }
    gameState.player_name=name;
    sessionStorage.setItem('playername',name);
}
//Function that sends the score to the database
function sendhighscore(){
    let xhttp= new XMLHttpRequest();
    xhttp.open('GET','process.php?name='+gameState.player_name+'&score='+gameState.score+'&stage='+gameRounds.gameRound,true);
    xhttp.send();
}
//Function that gets the top 10 scores from the database
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
//Gameover function that ends the game, and sends the score, and resets the scene
function GameOver() {

    this.physics.pause();
    sendhighscore();
    gameRounds.gameRound=0;
    timerEvents.forEach(function (item) {
        item.destroy();
    });
    timerEvents=[];
    gameState.gameover=true;
    gameState.player.particleEmitter.active=false;
    this.add.text(gameState.middleScreen.x,gameState.middleScreen.y-30,'Score:'+gameState.score.toString(),{fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
    this.add.text(gameState.middleScreen.x, gameState.middleScreen.y, 'Game Over', {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
    this.add.text(gameState.middleScreen.x, gameState.middleScreen.y+30, 'Click or Press Enter to Restart', {fontFamily:'joystix',fontSize: '30px', fill: '#ffffff'}).setOrigin(0.5);
    this.input.on('pointerup',restartgame,this);
    gameState.altcursors.enter.on('down',restartgame,this);
    function restartgame() {
        gameState.wintext.visible=false;
        gameState.score = 1000;
        gameRounds.gameRound=0;
        Phaser.Actions.Call(gameState.enemies.getChildren(),function (enemy) {
            gameState.enemies.remove(enemy,true,true);
        });
        //gameState.enemies=this.physics.add.group();
        gameState.player.particleEmitter.active=true;
        this.scene.restart();
        gameState.gameover=false;
    }
    this.input.keyboard.on('keydown-ESC',backtomenu,this);
    function backtomenu() {
        gameState.wintext.visible=false;
        gameState.test1.hidden=true;
        gameState.score=1000;
        gameRounds.gameRound=0;
        Phaser.Actions.Call(gameState.enemies.getChildren(),function (enemy) {
            gameState.enemies.remove(enemy,true,true);
        });
        gameState.gameover=true;
        this.scene.restart();
    }
}

