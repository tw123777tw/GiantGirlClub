//-----------------------------------------------------------------------------
//  Galv's Map Projectiles
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MapProjectiles.js
//-----------------------------------------------------------------------------
//  2017-07-18 - Version 1.7 - added size to projectiles to mimic hitboxes
//  2017-04-20 - Version 1.6 - fixed angle of fire when targeting player/event
//                           - while using y offset feature.
//  2017-02-09 - Version 1.5 - fixed a bug with effects activating on player
//  2017-01-25 - Version 1.4 - added ability to only run actions if the proj
//                             id is included in a list in event comment
//  2016-11-09 - Version 1.3 - updated event hit detection to be based on real
//                             sprite location instead of map x,y position.
//                             Projectiles fade when max range is reached.
//                             Added mouse target to projectile settings
//                             Added animated projectiles
//  2016-10-31 - Version 1.2 - events with no active page would crash on hit
//  2016-09-25 - Version 1.1 - fixed bug with switch change on hit
//  2016-09-14 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MapProjectiles = true;

var Galv = Galv || {};            // Galv's main object
Galv.PROJ = Galv.PROJ || {};      // Galv's plugin stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.7) Create projectiles that can interact with the map and map characters
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Tile Size
 * @desc 预设游戏期间调用的弹丸
 * Default: 48
 * @default 48
 *
 * @param Fade Speed
 * @desc 弹丸达到最大距离时会淡出。
 * @default 40
 *
 * @param Disable Mouse Move
 * @desc 禁止单击地图移动/与事件交互
 * @default false
 *
 * @param Premade 1
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 2
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 3
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 4
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 5
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 6
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 7
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 8
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 9
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 10
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 11
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 12
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 13
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 14
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 15
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 16
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 17
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 18
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 19
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @param Premade 20
 * @desc Premade projectile settings to call during game
 * sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size
 * @default
 *
 * @help
 *   Galv's Map Projectiles
 * ----------------------------------------------------------------------------
 * 使用此插件，您可以在地图上创建可以与角色和地图交互的投射物。
 * 
 *
 * 可以在游戏中使用自定义脚本调用手动创建弹丸，也可以在Premade插件设置中设置弹丸的自定义。
 * 
 * 以下有关如何执行此操作的信息。
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALLS (在事件脚本或移动路线脚本中)
 * ----------------------------------------------------------------------------
 * 在游戏中创建一个投射物有几种方法。第一个是使用以下脚本调用其中之一，包括射弹设置:
 * 
 *
 *      Galv.PROJ.atTarget(sid,tid,s,d,'img',anim,'action',[r],[t],z,pid,size);
 *      Galv.PROJ.dir(sid,dir,s,d,'img',anim,'action',[r],[t],z,pid,size);
 *
 *
 * sid     = 起点事件ID，-1为玩家，‘m’为鼠标
 * tid     = 目标事件ID，设置同上
 * dir     = 方向射击代替目标设计。可以是: 1,2,3,4,6,7,8,9,0
 *           具体方向代表可以看小键盘。0为面朝向。
 * s       = 速度 - 投射物飞行速度
 * d       = 距离 - 投射物最大飞行图块数
 * img     = 使用来自 /img/pictures/ 的图片
 *           动画图片:
 *           图像可以插入包括帧和速度的符号。
 *           图片名(帧数,速度)... 例子: bullet(8,5)
 *           没有括号的投射物为1帧。
 * action  = 投射物命中玩家或事件后执行的动作。
 *           这些操作仅影响带有<projEffect>注释的事件
 *           玩家和事件动作由 | 符号分隔
 *           例子. playerAction|eventAction
 *           Actions below:
 *           c(x)        // 运行公共事件x
 *           S(x:t)      // 把开关x改为t(开或关) (on or off)
 *           s(L:t)      // 将独立开关L更改为t(开或关)，仅限事件
 *           e           // 暂时消除事件-仅限事件
 * r       = 投射物将命中并停止的区域列表。空白=没有
 * t       = 地形列表，同上
 * z       = z值(默认为3，与人物相同)
 *           2 或更低的值优先命中“人物下方”的角色
 *           2.1-3.9 与上相反
 *           (3 与人物相同 < 3 draws under & > 3 draws over chars)
 *           4+ 人物上方
 * pid     = 弹丸的标识号id。如果留空，则默认为1。
 *           这是用于事件来确定射弹是否会通过或接触它们(更多内容在下面)
 *           
 * size    = 距弹丸中心的距离，该距离将导致碰撞。 将此空白留为基于点的碰撞
 *           
 *
 * 要在多个地方创建具有相同设置的投射器，您可以使用下面的脚本调用，
 * 它将在插件设置中使用“预先制作”的投射器。
 * 调用它们用:
 *
 *      Galv.PROJ.quickTar(id);  // 使用预先制作的id创建投射体
 *                               // (使用tid作为目标id)
 *      Galv.PROJ.quickDir(id);  // creates projectile using premade id
 *                               // (使用tid作为方向)
 *
 * Note: 您可以使用以下命令在这两个脚本调用中添加一个覆盖sid:
 *      Galv.PROJ.quickTar(id,overrideId);
 *      Galv.PROJ.quickDir(id,overrideId);
 *
 * 例子 1:
 * Galv.PROJ.dir(9,4,3,6,'bullet0',1,'c(7)|e',[5],[],3,1);
 * 从事件9发射射弹
 * 它使用Galv.PROJ.dir调用，这样它将按方向4(左)发射
 * 速度 3
 * 射程6格
 * 使用来自/img/pictures/的图像'bullet0' 。 
 * 它将在接触时播放动画1。
 * 如果它击中了玩家，它将运行公共事件7。
 * 如果它碰到一个事件，它将擦除它(如果事件具有<projEffect>标记)。
 * 它会在区域5碰撞
 * 它没有地形碰撞
 * 它的z值为3(与player相同)
 * 它的标识符是1
 *
 * 例子 2:
 * Galv.PROJ.atTarget(-1,2,5,7,'bullet1(8,5)',2,'|s(A:on),[5,6],[6],3,2);
 * 玩家发射一枚炮弹
 * 它使用Galv.PROJ.atTarget调用，因此它将在事件2中触发
 * 它的速度是5
 * 射程7
 * 使用来自/img/pictures/的图像'bullet1(8,5)' 。
 *   该图像需要有8帧，并以5的速度动画
 * 它将在接触时播放动画2。
 * 如果它击中了玩家，它什么也不做(反正它不能，因为它是来自玩家的)。
 * 如果它遇到一个事件，它会打开self开关A(如果有<projEffect> 标记)。
 * 它会在区域5和区域6发生碰撞
 * 它将与地形标签6在瓦片上碰撞
 * 它的z值为3(与player相同)
 * 它的标识符是2
 * 
 * 例子 3:
 * Galv.PROJ.quickTar(1);
 * 从'Premade 1'的插件设置中发射一个弹丸
 *
 * 例子 4:
 * Galv.PROJ.quickTar(1,8);
 * 使用插件设置中的“预制1”获取设置来发射射
 * 弹，但是这次，将sid替换为事件ID8。如果从移
 * 动路线完成，则可以使用this._eventId代替数字
 * 8来获得当前事件的ID。
 *
 * 例子 5:
 * Galv.PROJ.atTarget(-1,2,5,4,'bulletBlast',12,'|s(A:on),[9],[],3,7,60);
 * 玩家发射弹丸
 * 它使用Galv.PROJ.atTarget调用，因此它将在事件2中触发
 * 速度5
 * 射程4
 * It will use 'bulletBlast' graphic from /img/pictures/. 
 * 它将在接触时播放动画12。
 * 如果它击中了玩家，它什么也不做(反正它不能，因为它是来自玩家的)。
 * 如果它遇到一个事件，它会打开self开关A(如果有<projEffect> 标记)。
 * 它会在区域9碰撞
 * 它不会与任何地砖相撞
 * 它的z值为3(与player相同)
 * 它的标识符是7
 * 它的大小为60像素，所以它会击中更大的区域。
 *
 * 其他脚本调用场合:
 *
 *      $gamePlayer.projDodge = true/false;    // 如果为真，则弹丸将不能再击中玩家。
 *                                             // 
 *      $gamePlayer._projEffect = true/false;  // 默认是正确的。如果为假，
 *                                             // 当玩家被击中时投射效果不会被激活
 *                                             // 
 *      $gamePlayer._projYoffset = y;          // 从玩家身上发射物品时改变弹丸y位置。
 *                                             // 
 *
 * ----------------------------------------------------------------------------
 * ----------------------------------------------------------------------------
 *   EVENT COMMENTS
 * ----------------------------------------------------------------------------
 * 默认情况下，如果活动事件页面中没有注释标
 * 记，则所有射弹如果与它们处于同一z级别，将在事件中碰撞（请参见上文）
 *
 *   <projBlock:true>    // 将阻止所有射弹
 *   <projBlock:false>   // 不会挡住弹丸
 *   <projBlock:x,x,x>   // 将不会阻止包含此列表中的pid的投射器。
 *                       // 
 *
 *   <projEffect>        // 如果您想要在击中目标时产生投射效果，则必须在事件页中
 *                       // 包含此注释。如果没有标签存在，动作将不会被激活。
 *                       // 
 *
 *   <projEffect:x,x,x>  // 如果使用上述标记，
 *                       // 则仅当命中的弹丸包含此列表中的pid时，
 *                       // 才可以使用该选项来激活弹丸动作。
 *
 *   <projY:x>           // 弹丸起点的y偏移量。
 *
 * ----------------------------------------------------------------------------
 *
 * 从使用脚本命中目标的投射器调用的公共事件中获取事件id
 * （或-1代表玩家，或0代表无目标）:
 *
 *   Galv.PROJ.ceTargetId()
 *
 * 例如，您可以在控制变量-脚本中使用它，然后在条件分支
 * 中，您可以根据从中获得的id执行某些操作。在多个公共事
 * 件同时运行的情况下，这可能不可靠。
 * 
 *
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.PROJ.mouseMove = PluginManager.parameters('GALV_MapProjectiles')["Disable Mouse Move"].toLowerCase() === 'true' ? true : false;
Galv.PROJ.tileSize = Number(PluginManager.parameters('GALV_MapProjectiles')["Tile Size"]);
Galv.PROJ.fadeSpeed = Number(PluginManager.parameters('GALV_MapProjectiles')["Fade Speed"]);
Galv.PROJ.eYOff = parseInt(Galv.PROJ.tileSize * 0.25);
Galv.PROJ.hitDis = parseInt(Galv.PROJ.tileSize * 0.5);
Galv.PROJ.requireClean = false;


Galv.PROJ.premade = {};
var premadeCheck = true;
var i = 1;
while (premadeCheck) {
	var name = "Premade " + i;
	var s = PluginManager.parameters('GALV_MapProjectiles')[name];
	if (s == undefined) {
		premadeCheck = false;
	} else {
		Galv.PROJ.premade[i] = s;
		i += 1;
	};
};

Galv.PROJ.quickTar = function(id,overrideId) {
	var settings = Galv.PROJ.premade[id];
	if (overrideId) {
		var origId = settings.match(/\d+/i);
		settings = settings.replace(origId,overrideId);
	};
	
	if (Galv.PROJ.premade[id]) eval('Galv.PROJ.atTarget(' + settings + ')');
};

Galv.PROJ.quickDir = function(id,overrideId) {
	var settings = Galv.PROJ.premade[id];
	if (overrideId) {
		var origId = settings.match(/\d+/i);
		settings = settings.replace(origId,overrideId);
	};
	if (Galv.PROJ.premade[id]) eval('Galv.PROJ.dir(' + settings + ')');
};

Galv.PROJ.getTarget = function(id) {
	if (Number.isInteger(id)) {
		if (id >= -1) {
			switch (id) {
				case 0:
					// Current event
					return $gameMap.event($gameMap._interpreter._eventId);
					break;
				case -1:
					// Player
					return $gamePlayer;
					break;
				default:
					// Event
					var event = $gameMap.event(id)
					return event._erased ? null : $gameMap.event(id);
					break;
			};
		} else {
			// Follower
			var f = Math.abs(id) - 2;
			return $gamePlayer._followers.follower(f)
		};
	} else {
		if (id === 'm') {
			// id was mouse pos
			var x = $gameMap.canvasToMapX(TouchInput.x);
			var y = $gameMap.canvasToMapY(TouchInput.y);
			return {x:x, y:y, _characterName: true};
		} else {
			// id was an array [x,y]
			//return {x: id[0], y: id[1]};
			return id;
		}
		
	};
};

Galv.PROJ.dist = function(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
};

Galv.PROJ.atTarget = function(sid,eid,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type) {
	var sTarget = Galv.PROJ.getTarget(sid);
	var eTarget = Galv.PROJ.getTarget(eid);

	action = action ? action.split('|') : '';
	if (action) {
		var pActions = action[0].split(',');
		var eActions = action[1] ? action[1].split(',') : [];
	} else {
		var pActions = [];
		var eActions = [];
	};

	var obj = {
		x: Number(sTarget._realX * Galv.PROJ.tileSize + Galv.PROJ.tileSize / 2),
		y: Number(sTarget._realY * Galv.PROJ.tileSize + Galv.PROJ.tileSize / 2),
		sTarget: sTarget,
		eTarget: eTarget,
		speed: speed,
		id: sid,
		pid: pid || 1,
		z: z || 3,
		ttl: Galv.PROJ.getTtl(dist,speed),
		type: type || 'updateNorm',
		graphic: graphic,
		hitAnim: hitAnim || 0,
		regions: regions || [],
		terrains: terrains || [],
		action: {player: pActions, event: eActions},
		atTarget: eTarget._characterName,
		hitbox: Number(hitbox)
	};
	
	$gameMap.addMapProjectile(obj);
};

Galv.PROJ.diag = {
// dir: [horz,vert],
	1: [4,2],
	3: [6,2],
	7: [4,8],
	9: [6,8]
};

Galv.PROJ.dir = function(sid,dir,speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type) {
	var sTarget = Galv.PROJ.getTarget(sid);
	if (dir == 0) dir = sTarget._diagDir ? sTarget._diagDir : sTarget._direction;
	if ([1,3,7,9].contains(dir)) {
		// do diagonal direction
		var horVer = Galv.PROJ.diag[dir];
		
		var x = $gameMap.roundXWithDirection(sTarget.x, horVer[0]);
    	var y = $gameMap.roundYWithDirection(sTarget.y, horVer[1]);
	} else {
		// do normal direction
		var x = $gameMap.xWithDirection(sTarget.x,dir);
		var y = $gameMap.yWithDirection(sTarget.y,dir);
	};
	
	Galv.PROJ.atTarget(sid,{x:x,y:y},speed,dist,graphic,hitAnim,action,regions,terrains,z,pid,hitbox,type);
};

Galv.PROJ.getTtl = function(dist,speed) {
	if (!dist || !speed) return 120;
	
	var dist = dist * Galv.PROJ.tileSize + Galv.PROJ.tileSize / 2;
	var ttl = dist / speed;
	
	return ttl;
};

Galv.PROJ.doActions = function(target,proj) {
	if (!target._projEffects) return;
	var actions = null;
	if (target == $gamePlayer) {
		var actions = proj.action.player;
	} else if (target._projEffects) {
		if (target._projEffects.length != undefined) {
			// _projEffect is an array, check for id
			if (target._projEffects.contains(proj.pid)) var actions = proj.action.event;
		} else {
			var actions = proj.action.event;
		}
	}

	if (actions) {
		for (var i = 0; i < actions.length; i++) {
			Galv.PROJ.executeAction(actions[i],target);
		};
	};
};

Galv.PROJ.cTargets = {};

Galv.PROJ.setEventTarget = function(cEventId,target) {
	if (!target) {
		Galv.PROJ.cTargets[cEventId] = 0;
	} else {
		Galv.PROJ.cTargets[cEventId] = target == $gamePlayer ? -1 : target.eventId();
	};
};

Galv.PROJ.ceTargetId = function() {
	return Galv.PROJ.cTargets[$gameTemp._savedcommonEventId];
};

Galv.PROJ.executeAction = function(action,target) {
	if (!action) return;
	var data = action.match(/\((.*)\)/i);
	data = data ? data[1].split(':') : [];
	switch(action[0]) {
		case 'c':  // common event
			var id = Number(data[0]);
			$gameTemp.reserveCommonEventWithSave(id);
			Galv.PROJ.setEventTarget(id,target);
			break;
		case 's':  // self switch
			var key = [$gameMap.mapId(), target.eventId(), data[0].toUpperCase()];
			var setState = data[1].toLowerCase() == 'on' ? true : false;
			$gameSelfSwitches.setValue(key, setState);
			break;
		case 'S':  // switch
			var setState = data[1].toLowerCase() == 'on' ? true : false;
			$gameSwitches.setValue(Number(data[0]),setState);
			break;
		case 'e':  // erase event
			target.erase();
			break;
	};
};

// Disable mouse move for map if setting checked
if (Galv.PROJ.mouseMove) {
	Scene_Map.prototype.processMapTouch = function() {};
};


//-----------------------------------------------------------------------------
// GAME TEMP
//-----------------------------------------------------------------------------

Game_Temp.prototype.reserveCommonEventWithSave = function(commonEventId) {
	this._savedcommonEventId = commonEventId;
	this._commonEventId = commonEventId;
};


//-----------------------------------------------------------------------------
// GAME MAP
//-----------------------------------------------------------------------------

Galv.PROJ.Game_Map_initialize = Game_Map.prototype.initialize ;
Game_Map.prototype.initialize = function() {
    Galv.PROJ.Game_Map_initialize.call(this);
	Galv.PROJ.tileSize = this.tileWidth();
};

Galv.PROJ.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	this._mapProjectiles = [];  // Clear projectiles when on new map
	Galv.PROJ.Game_Map_setup.call(this,mapId);
};

Game_Map.prototype.addMapProjectile = function(object) {
	var index = 0;
	for (var i = 0; i < this._mapProjectiles.length + 1; i++) {
		if (!this._mapProjectiles[i]) {
			index = i;
			break;
		};
	};
	this._mapProjectiles[index] = object;
	SceneManager._scene._spriteset.createProjectile(index);
};

Game_Map.prototype.removeMapProjectile = function(id) {
	SceneManager._scene._spriteset.removeProjectile(id);
	this._mapProjectiles[id] = null;
};


//-----------------------------------------------------------------------------
// Spriteset Map
//-----------------------------------------------------------------------------

Galv.PROJ.Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	Galv.PROJ.Spriteset_Map_createCharacters.call(this);
	this.createProjectiles();
};

Spriteset_Map.prototype.createProjectiles = function() {
	this._mapProjectileSprites = [];
	
	// Create existing projectiles
	for (var i = 0; i < $gameMap._mapProjectiles.length; i++) {
		this.createProjectile(i);
	};
};

Spriteset_Map.prototype.createProjectile = function(pIndex) {
	// Create new projectile
	if ($gameMap._mapProjectiles[pIndex]) {
		var isChar = Boolean($gameMap._mapProjectiles[pIndex].atTarget);
		this._mapProjectileSprites[pIndex] = new Sprite_MapProjectile(pIndex,isChar);
		this._tilemap.addChild(this._mapProjectileSprites[pIndex]);
	};
};

Galv.PROJ.Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    Galv.PROJ.Spriteset_Map_update.call(this);
	this.updateProjectiles();
};

Spriteset_Map.prototype.updateProjectiles = function() {
	if (Galv.PROJ.requireClean) {
		Galv.PROJ.requireClean = false;
		
		// clean up dead projectiles
		for (var i = 0; i < this._mapProjectileSprites.length; i++) {
			if (!this._mapProjectileSprites[i] || this._mapProjectileSprites[i].dead) {
				this._tilemap.removeChild(this._mapProjectileSprites[i]);
				this._mapProjectileSprites[i] = null;    
				$gameMap._mapProjectiles[i] = null;
			};
		};
	};
};

})();


//-----------------------------------------------------------------------------
// SPRITE: Projectile
//-----------------------------------------------------------------------------

function Sprite_MapProjectile() {
    this.initialize.apply(this, arguments);
}

Sprite_MapProjectile.prototype = Object.create(Sprite_Base.prototype);
Sprite_MapProjectile.prototype.constructor = Sprite_MapProjectile;

Sprite_MapProjectile.prototype.initialize = function(objId,yoFix) {
    Sprite_Base.prototype.initialize.call(this);
	this._obj = $gameMap._mapProjectiles[objId];
	this._id = this._obj.id;
	this._updateType = this._obj.type;
	this._ticker = 0;
	this.ttd = 5;
	this._yo = this._obj.sTarget._projYoffset;
	this._yoFix = yoFix || false;
	this.setBitmap();
	this.updateDirection();
	this.setupHitbox();
};

Sprite_MapProjectile.prototype.setupHitbox = function() {
	this._hitDist = this._obj.hitbox ? this._obj.hitbox : Galv.PROJ.hitDis;
};

Sprite_MapProjectile.prototype.updateDirection = function() {
	var yo = this._yo && this._yoFix ? this._yo / 48 : 0;
	
	this._angle = Math.atan2(this._obj.eTarget.y - yo - this._obj.sTarget.y, this._obj.eTarget.x - this._obj.sTarget.x) * 180 / Math.PI;
	this.rotation = (this._angle + 90) * Math.PI / 180;

	this._animId = 0;
	this.xMove = this._obj.speed * Math.cos(this._angle * Math.PI / 180);
	this.yMove = this._obj.speed * Math.sin(this._angle * Math.PI / 180);
};

Sprite_MapProjectile.prototype.setBitmap = function() {
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._cFrame = 0;
	this._fTicker = 0;
	this.x = this._obj.x;
	this.y = this._obj.y + this._yo;
	this.z = this._obj.z;
	var frames = this._obj.graphic.match(/\((.*)\)/i);
	if (frames) {
		frames = frames[1].split(',');
		this._frames = Number(frames[0]);
		this._frameSpeed = Number(frames[1]);
	}
	
	this.bitmap = ImageManager.loadPicture(this._obj.graphic);
};

Sprite_MapProjectile.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	this.updatePosition();
	this.updateAnimation();
	this.updateFrame();
	if (this._hasHit) {
		if (!this.isAnimationPlaying()) {
			this._obj.ttl = 0;
			this.updateDead();
		};
	} else {
		this[this._updateType]();
		this.updateCollide();
		this.updateDead();
		this._obj.ttl -= 1;
	};
};


Sprite_MapProjectile.prototype.updateFrame = function() {
	if (this._frames) {
		var pw = this.bitmap.width / this._frames;
		var ph = this.bitmap.height;
		var sx = this._cFrame * pw;
		var sy = 0;
		
		if (this._fTicker >= this._frameSpeed) {

			this._fTicker = 0;
			this._cFrame = this._cFrame >= this._frames - 1 ? 0 : this._cFrame + 1;
		}

		this.setFrame(sx, sy, pw, ph);
		this._fTicker += 1;
	}
};

Sprite_MapProjectile.prototype.updateNorm = function() {
	this._obj.x += this.xMove;
	this._obj.y += this.yMove;
};

Sprite_MapProjectile.prototype.updatePosition = function() {
	this.x = this._obj.x - $gameMap.displayX() * Galv.PROJ.tileSize;
	this.y = this._obj.y - $gameMap.displayY() * Galv.PROJ.tileSize + this._yo;
};

Sprite_MapProjectile.prototype.updateDead = function() {
	if (this._obj.ttl <= 0) {
		if (this.ttd <= 0) {
			this.opacity -= Galv.PROJ.fadeSpeed;
			if (this.opacity <= 0) {
				this.dead = true;
				Galv.PROJ.requireClean = true;
			}
		};
		this.ttd -= 1;
	};
};

Sprite_MapProjectile.prototype.updateCollide = function() {
	if (this._ticker <= 0 && this.opacity == 255) {
		// check hit player
		var player = this.checkHitPlayer();
		if (player) {
			// do hit player
			this.doHit($gamePlayer);
		} else {
			// check hit event
			var event = this.checkHitEvent();
			if (event) {
				// do hit event
				this.doHit(event);
			};
		};
		this._ticker = 2;
	};
	this._ticker -= 1;
};

Sprite_MapProjectile.prototype.checkHitPlayer = function() {
	return this._obj.sTarget != $gamePlayer && !$gamePlayer.projDodge && Galv.PROJ.dist($gamePlayer.screenX(),$gamePlayer.screenY(),this.x,this.y) < this._hitDist && this.isSameLevel($gamePlayer._priorityType);
};

Sprite_MapProjectile.prototype.checkHitEvent = function() {
	// Basic checking for events
	var tx = Math.floor(this._obj.x / Galv.PROJ.tileSize);
	var ty = Math.floor(this._obj.y / Galv.PROJ.tileSize);
	
	// check regions
	if (this._obj.regions.contains($gameMap.regionId(tx,ty)) || this._obj.terrains.contains($gameMap.terrainTag(tx,ty))) {
		this.doHit();
		return null;
	};

	var events = $gameMap.events();
	var event = null;
	for (var i = 0; i < events.length; i++) {
		var dis = Galv.PROJ.dist(events[i].screenX(),events[i].screenY() - Galv.PROJ.eYOff,this.x,this.y);

		if (dis < this._hitDist && events[i] != this._obj.sTarget && this.isBlockerEvent(events[i])) {
			event = events[i];
			break;
		};
	};
	return event;
};

Sprite_MapProjectile.prototype.isBlockerEvent = function(event) {
	if (event._erased) return false;
	if (event._projBlock === -1) return true;
	if (event._projBlock === -2) return false;
	if (event._projBlockList.contains(this._obj.pid)) return false;
	return this.isSameLevel(event._priorityType);
};


Sprite_MapProjectile.prototype.isSameLevel = function(prioType) {
	if (this.z <= 2) {
		// below chars
		return prioType == 0;
	} else if (this.z <= 4) {
		// same as chars
		return prioType == 1;
	} else {
		return prioType == 3;
	}
	return false;
};

Sprite_MapProjectile.prototype.doHit = function(target) {
	this._hasHit = true;
	this.opacity = 0;
	this._animId = this._obj.hitAnim;

	if (target) Galv.PROJ.doActions(target,this._obj);
};

Sprite_MapProjectile.prototype.updateAnimation = function() {
    this.setupAnimation();
    if (!this.isAnimationPlaying()) {
       this._animationPlaying = false;
    }
};

Sprite_MapProjectile.prototype.setupAnimation = function() {
    if (this._animId > 0) {
        var animation = $dataAnimations[this._animId];
        this.startAnimation(animation, false, 0);
		this._animId = 0;
		this._animationPlaying = true;
    }
};


//-----------------------------------------------------------------------------
// GAME PLAYER
//-----------------------------------------------------------------------------

Galv.PROJ.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	this._projEffects = true;
	this._projYoffset = 0;
	Galv.PROJ.Game_Player_initMembers.call(this);
};

//-----------------------------------------------------------------------------
// GAME EVENT
//-----------------------------------------------------------------------------

Galv.PROJ.Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	Galv.PROJ.Game_Event_initMembers.call(this);
	this.initProjVars();
};

Game_Event.prototype.initProjVars = function() {
	this._projBlock = 0;
	this._projBlockList = [];
	this._projEffects = false;
};

Galv.PROJ.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	Galv.PROJ.Game_Event_setupPageSettings.call(this);
	this.setProjStuff();
};

Game_Event.prototype.setProjStuff = function() {
	var page = this.page();
	this.initProjVars();
	if (!page) return;
	
	for (var i = 0; i < page.list.length; i++) {
		if (page.list[i].code == 108) {
			var params = page.list[i].parameters[0];
			
			var yO = params.match(/<projY:(.*)>/i)
			this._projYoffset = yO ? Number(yO[1]) : 0;
			
			
			if (params == '<projEffect>') {
				this._projEffects = true;
				continue;
			};
			
			var projEffects = params.match(/<projEffect:(.*)>/i);
			
			if (projEffects) {
				projEffects = projEffects[1].split(",");
				this._projEffects = [];
				for (var b = 0; b < projEffects.length; b++) {
					this._projEffects.push(Number(projEffects[b]));
				};
				continue;
			}
			
			var blockId = params.match(/<projBlock:(.*)>/i);
			if (blockId) {
				blockId = blockId[1].toLowerCase();
				if (blockId === 'true') {
					this._projBlock = -1;
				} else if (blockId === 'false') {
					this._projBlock = -2;
				} else {
					blockId = blockId.split(",");
					for (var b = 0; b < blockId.length; b++) {
						this._projBlockList.push(Number(blockId[b]));
					};
				};
			};
		};
	};
};