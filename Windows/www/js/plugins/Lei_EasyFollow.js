//=============================================================================
// Lei_EasyFollow.js
//=============================================================================
/*:
 * @plugindesc (v1.03)  简单的跟随 - 模拟队伍成员追随机制
 *
 * @author Lei-Ray
 * 
 * @help  
 * =============================================================================
 * +++ lei - Easy Follow (v1.03) +++
 * By Lei-Ray
 * =============================================================================
 * 让你可以用指令简单的设定玩家跟随事件或事件跟随玩家的场景。
 * This plugin allows you to use simple commands to enable the follow mode of player/ events
 * when you need to make a scene where the player or the event need to follow the others. 
 *
 * 当前版本仅支持玩家跟随一个事件，或一个事件跟随玩家。
 * 跟随者将会像玩家的队员跟随玩家一样紧密地跟随着被跟随者，若跟随者是事件的话，被跟随者将会是
 * 队内的最末尾成员（玩家或队员， 取决于队伍长度）。
 * The current version only supports one single event follows the player team, or the 
 * player team follows one single event. 
 * The follower will act like the followers in the player team if using the commands provided
 * by this plugin correctly. If the leader is the player, the follower event will be attached
 * to the end of the player team, like an extra follower of the team.
 * 
 * 跟随者的速度在跟随期间将会被设置为被跟随者速度，解除跟随时将会还原为跟随前速度。
 * 	- 仅支持引擎默认六档速度，若有精确速度插件，需要在两者之一中自行修改适配。 
 * 同时， 当前版本将自动将跟随者穿透状态设置为可穿透，解除跟随时将还原为跟随前状态。 
 * The moving speed of the follower will be set to the same rate as the leader, and the previous 
 * speed will be set back to what it was before enacting the follow mode. 
 * 	- This plugin only supports the default 6 rate speed system provided by the RM, thus if you 
 * are using any accurate speed plugins, the speed might not be set back correctly by default,
 * you might need to edit either of the 2 plugins for better preformance (should be super simple,
 * at least that's what I did for my game. )
 *
 *	
 * 当玩家作为领队时，
 *	- 激活跟随后，玩家队伍会主动收敛队伍，自动帮你把事件定位在队尾
 *		- 俺寻思这个应该挺有用的，就写出来自动化了
 *	- 玩家可以疾跑/变速，事件将无缝跟随（大概
 * 	- 玩家可被设置移动路线移动，跟随事件将跟随在队末，行动模式与队员大体一致。 
 * 	- 玩家可被自由操作，跟随事件一样会同模式跟随。
 *	- 玩家可与跟随过程中的事件互动：
 *		- 也就是说你可以做一个可以随时要他跟上或者在原地解散的NPC
 *	- 若激活跟随之后更新了事件页，新事件页的穿透状态将覆盖插件设置的穿透状态。目前版本没有刷新机制，所以这点请注意。
 *		- 所以在规划移动路线时要注意这点，不要让路被不小心堵死
 * When the leader is the player, 
 *	- After enabling the following mode of the target event, the player team will be gathered 
 * automaticly, thus the position of the last team member (if you have them) will be the same 
 * as the player's team leader, no need to do extra work to position the leader and the follower 
 * next to each other. 
 *		- thought dis would be quite useful thus added dis feature
 *	- the player can dash or change their speed, the event would catch up perfectly. (likely so 
 *	- the player character can be either controlled by the player or the move route commands, 
 * the following event will catch up in either case. 
 *	- the player can trigger the following event:
 *		- that is to say, you can have an npc that can be carried or left behind by the player 
 *	freely. 
 *	- if the following event's event page get changed after enabling the follow mode, the new 
 *	through status will overwrite the plugin's setting. 
 *		- be care full dont set a move route that can block the player with the following event. 
 *
 *	
 * 当事件作为领队时，
 *	- 玩家将像队员一样跟随事件，且在领头事件执行移动指令时玩家无法操作（大概
 *	- 事件可以变速
 *	- 自动移动指令好像无效。 
 * When the leader is an event, 
 *	- Player will be following the event like its follower, and the player will not be able to 
 * move by input when the leading event is processing move route commands. (I think
 *	- the leading event can change its speed by move route command. 
 *	- seems like autonomous movement doesnt quite work. 
 *
 *		
 * 使用方法：
 *	- 直接尻函数：
 *		- 你可以直接在事件的脚本接口里面使用提供的函数来激活或解除跟随效果：
 *			this.leiPlayerFollowEvent(事件id); 	玩家开始跟随指定id事件； 
 *			this.leiPlayerStopFollowing(); 		玩家停止跟随当前跟随事件； 
 *			this.leiEventFollowPlayer(事件id); 	指定id事件将开始跟随玩家队末成员（若无队友，则为玩家本人）； 
 *			this.leiEventStopFollowingPlayer(); 当前跟随玩家事件将解除跟随状态； 
 *	- 移动指令脚本：
 *		- 你也可以在移动指令的脚本接口里面使用以下指令来激活或解除跟随效果：
 *			>玩家尻事件 事件id	 玩家开始跟随指定id事件； 
 *			>玩家停止尻事件	 玩家停止跟随当前跟随事件； 
 *			>事件尻玩家 事件id	 指定id事件将开始跟随玩家队末成员（若无队友，则为玩家本人）； 
 *			>事件停止尻玩家	 当前跟随玩家事件将解除跟随状态； 
 *	- *请将以上指令中的“事件id”替换成一个数字，就是你想操作的那个事件的id数字，蟹蟹。 
 *		- 填入0则代表本事件
 *		- 不要忽视空格
 * How to use:
 *	- Make the script call directly:
 *		- you can call the provided functions via the script call command provided in the event commands
 *	to enable/ disable the follow mode of the target event/ player:
 *			this.leiPlayerFollowEvent(eventId); Player starts following the event with provided id. 
 *			this.leiPlayerStopFollowing(); 		Player stops following.  
 *			this.leiEventFollowPlayer(eventId); The target event starts to follow the player team. 
 *			this.leiEventStopFollowingPlayer(); The event stops following.  
 *	- Moveroute Commands:
 *		- you can also use the following commands in the script command provided by the move route commands
 *			>PlayerFollowEvent eventId	Player starts following the event with provided id. 
 *			>PlayerStopFollowing	 	Player stops following.  
 *			>EventFollowPlayer eventId	The target event starts to follow the player team.
 *			>EventStopFollowing	 		The event stops following.
 *	- Change the "eventId" thing to an integer representing the event id of the event you want it to be 
 * the leader/ follower and dont forget the little space between the commands and the eventId, thx
 *		- if you enters 0, it means the current event that are running these commands. 
 *		- dont forget the space
 *
 *
 * 工作原理：
 *	- 简单说就是每帧刷新检测被跟随者动态，如果坐标移动，则跟随者移动到被跟随者之前的坐标
 *		- 被跟随者原地转向时，跟随者不会一起转向
 *		- 原理函数基于游戏自带队员跟随函数，做了一些调整来适配
 * Why it works:
 *	- Basicly what I did is writing some extra commands to the functions that get runned every single frame 
 * when the game is working, they detect the leaders current and previous x/ y coordinates - if position changed, 
 * move the follower correspondingly. 
 *		- so if the leader simply turns to a different direction without position change, the follower dont. 
 *		- it was written based on the functions the RM used for the player team followers, with adjustments to 
 * make it work normally in our case. 
 *
 *
 * 使用注意：
 *	- 激活跟随后请仅对被跟随者施加移动指令
 *	- 激活跟随后，使用完毕请不要忘记解除跟随
 *	- 当前版本仅支持引擎默认的普通四向移动（包括疾跑）， 除此之外的移动模式会导致队伍暂时性脱节等问题
 *	- 在激活跟随效果时，请将目标事件放在玩家临近格，因为激活后如果两者之间有距离，他们不会自行收缩距离
 *		- 俺寻思这个没啥写的必要，就没写这个机制
 *	- 当前版本跟随过程中直接换地图游戏应该会裂开，虽然没试过
 *	- 基本没刻意做使用错误补救，就是说假如没有激活跟随就解除跟随，就跑出地图，指令用错了，参数写错了啥的，游戏应该会裂开
 *	- 用一些奇怪的用法，比如设置跟随了之后没解除跟随还给跟随者设置移动路线之类的，游戏大概会裂开
 *	- 将来有机会打算扩展功能，例如加入事件跟随事件，事件伴行玩家等功能，有修改意见欢迎提出
 * Notice:
 *	- Do not set move route commands to the follower if you want it to work normally. 
 *	- Do not forget to disable the follow mode after you enable it. 
 *	- Current version only supports the default 4 direction normal movements, diagonal movements, jumps etc doesnt work 
 * normally. 
 *	- when you enable the follow mode, it's better to have the leader and the follower next to each other. They won't 
 * automaticly walk to each other if they do not connect, and they will keep the same distance during the follow mode,
 * unless this is what you want. 
 *	- If you change the map before disabling the follow mode, the game will get wrecked. 
 *	- If you use the commands wrong (like didnt put the right number in right spot, used disable command before the enable
 * command, blahblah), the game will get wrecked. 
 *	- If you try to blow things up, things will be blown up.   :)
 *	- Might add more functions in to the plugin in the future version, such as event follows event, event walk aside player. 
 *
 *
 * 使用规约：
 * 	- 可无偿用于商用或非商用游戏
 *	- 请勿转载/二次发布
 *	- 自用可以随意自行编辑内容适配其他插件
 *	- 请勿盗用/二次署名
 * Term of Use:
 *	- Free for commercial or noncommercial
 *	- Do not repost.
 *	- Can be edited within the plugin. 
 *	- Do not claim of your own. 
 *
 *
 *
 *
 *
 *
 *
 *
 * -----------------------------------------------------------------------------
*/


Game_Interpreter.prototype.leiPlayerFollowEvent = function(followingEventId){		//尻这个函数让玩家开始跟随事件
	$gamePlayer.leiPlayerFollowingEvent = true; 
	$gamePlayer.leiPlayerThroughStatus = $gamePlayer.isThrough(); 
	$gamePlayer.setThrough(true);
	var eventId = followingEventId; 
	if(eventId <1){
		eventId = $gameMap._interpreter._eventId; 
	};
	$gamePlayer.leiFollowingEventOldX = $gameMap.event(eventId)._x; 
	$gamePlayer.leiFollowingEventOldY = $gameMap.event(eventId)._y; 
	$gamePlayer.leiFollowingEventId = eventId; 
	$gamePlayer.leiPlayerOriginalSpeed = $gamePlayer.realMoveSpeed(); 
};

Game_Interpreter.prototype.leiPlayerStopFollowing = function(){		//尻这个函数让玩家鳖跟了
	$gamePlayer.leiPlayerFollowingEvent = false; 
	$gamePlayer.setThrough($gamePlayer.leiPlayerThroughStatus);
	$gamePlayer.leiFollowingEventOldX = -1; 
	$gamePlayer.leiFollowingEventOldY = -1; 
	$gamePlayer.leiFollowingEventId = -1; 
	$gamePlayer.setMoveSpeed($gamePlayer.leiPlayerOriginalSpeed); 
};

var lei_easyFollowPFE_updates = Game_Player.prototype.moveByInput; 		//邪恶地利用引擎原函数来每帧检测 
Game_Player.prototype.moveByInput = function(){
	if($gamePlayer.leiPlayerFollowingEvent == true){
		var eventId = $gamePlayer.leiFollowingEventId; 
		if (eventId > 0){
			if ($gameMap.event(eventId)._moveRouteForcing){	
				var cx = $gameMap.event(eventId)._x; 
				var cy = $gameMap.event(eventId)._y; 
				var ox = $gamePlayer.leiFollowingEventOldX; 
				var oy = $gamePlayer.leiFollowingEventOldY; 
				if (ox > -1 && oy >-1){	
					if (cx != ox || cy != oy){	//检测跟随的事件是否移动
						var cd = $gameMap.event(eventId)._direction; 
						$gameMap.leiEasyFollowAlgorithm("PFE", $gamePlayer.leiFollowingEventId);
						$gamePlayer.leiFollowingEventOldX = $gameMap.event(eventId)._x; 
						$gamePlayer.leiFollowingEventOldY = $gameMap.event(eventId)._y; 
					}; 
				};
			};
		};
	};
	if($gameMap.leiEventFollowingPlayer == true){
		var eventId = $gameMap.leiEventFollowingId; 
		if (eventId > 0){
			if($gamePlayer.leiEasyFollowCheckGathering){
				if($gamePlayer.areFollowersGathered()){
					$gameMap.leiFollowingPlayerOldX = $gameMap.leiCheckEventFollowingTeamPositionX(); 
					$gameMap.leiFollowingPlayerOldY = $gameMap.leiCheckEventFollowingTeamPositionY(); 
					$gamePlayer.leiEasyFollowCheckGathering = false; 
				};
			}else{
				var cx = $gameMap.leiCheckEventFollowingTeamPositionX();
				var cy = $gameMap.leiCheckEventFollowingTeamPositionY(); 
				var ox = $gameMap.leiFollowingPlayerOldX; 
				var oy = $gameMap.leiFollowingPlayerOldY; 
				if (ox > -1 && oy >-1){	
					if (cx != ox || cy != oy){	
						$gameMap.leiEasyFollowAlgorithm("EFP", $gameMap.leiEventFollowingId);
						$gameMap.leiFollowingPlayerOldX = $gameMap.leiCheckEventFollowingTeamPositionX();
						$gameMap.leiFollowingPlayerOldY = $gameMap.leiCheckEventFollowingTeamPositionY(); 
					}; 
				};
			};
		};
	};
	lei_easyFollowPFE_updates.call(this); 
};





Game_Interpreter.prototype.leiEventFollowPlayer = function(followingEventId){		//尻这个函数让事件尾随玩家
	$gameMap.leiEventFollowingPlayer = true; 
	var eventId = followingEventId; 
	if(eventId <1){
		eventId = $gameMap._interpreter._eventId; 
	};
	$gameMap.eventFPThroughStatus = $gameMap.event(eventId).isThrough(); 
	$gameMap.event(eventId).setThrough(true); 
	$gameMap.leiFollowingPlayerOldX = $gameMap.leiCheckEventFollowingTeamPositionX(); 
	$gameMap.leiFollowingPlayerOldY = $gameMap.leiCheckEventFollowingTeamPositionY(); 
	$gameMap.leiEventFollowingId = eventId; 
	$gameMap.leiEventFollowingOriginalSpeed = $gameMap.event(eventId).realMoveSpeed(); 
	$gamePlayer.leiEasyFollowCheckGathering = true; 
	$gamePlayer.gatherFollowers(); 
};

Game_Interpreter.prototype.leiEventStopFollowingPlayer = function(){		//尻这个函数让事件鳖跟玩家了
	$gameMap.leiEventFollowingPlayer = false;
	var eventId = $gameMap.leiEventFollowingId; 
	$gameMap.event(eventId).setThrough($gameMap.eventFPThroughStatus); 
	$gameMap.leiFollowingPlayerOldX = -1;  
	$gameMap.leiFollowingPlayerOldY = -1;  
	$gameMap.event(eventId).setMoveSpeed($gameMap.event(eventId).realMoveSpeed());
	$gameMap.leiEventFollowingId = -1; 
	$gamePlayer.leiEasyFollowCheckGathering = false; 
};

Game_Map.prototype.leiCheckEventFollowingTeamPositionX = function(){		//这两个函数检查队尾成员位置
	var partyLength = $gameParty.battleMembers().length; 
	var targetX = 0; 
	if (partyLength == 1){
		targetX = $gamePlayer._x; 
	}else{
		var followerPosition = partyLength - 2; 
		targetX = $gamePlayer._followers._data[followerPosition]._x; 
	};
	return targetX; 
};

Game_Map.prototype.leiCheckEventFollowingTeamPositionY = function(){
	var partyLength = $gameParty.battleMembers().length; 
	var targetY = 0; 
	if (partyLength == 1){
		targetY = $gamePlayer._y; 
	}else{
		var followerPosition = partyLength - 2; 
		targetY = $gamePlayer._followers._data[followerPosition]._y; 
	};
	return targetY; 
};

Game_Map.prototype.leiCheckEventFollowingTeamDirection = function(){		//给出玩家队尾成员当前朝向（好像没啥用
	var partyLength = $gameParty.battleMembers().length; 
	var targetY = 0; 
	if (partyLength == 1){
		targetY = $gamePlayer._direction; 
	}else{
		var followerPosition = partyLength - 2; 
		targetY = $gamePlayer._followers._data[followerPosition]._direction; 
	};
	return targetY; 
};



Game_Map.prototype.leiEasyFollowAlgorithm = function(type, eventId){					//跟随行为的运算逻辑 
	switch (type){
		case "PFE":
			$gamePlayer.setMoveSpeed($gameMap.event(eventId).realMoveSpeed());
			cx = $gamePlayer.leiFollowingEventOldX; //Math.floor($gameMap.event(eventId)._realX); 
			cy = $gamePlayer.leiFollowingEventOldY; //Math.floor($gameMap.event(eventId)._realY); 
			var sx = $gamePlayer.deltaXFrom(cx);
			var sy = $gamePlayer.deltaYFrom(cy);
			asx = Math.abs(sx); 
			asy = Math.abs(sy); 
			currentDirection = $gamePlayer._direction; 
			if (asx >= 1 && asy >= 1) {
				$gamePlayer.moveStraight(currentDirection);     
			} else if (asx >= 1) {
				$gamePlayer.moveStraight(sx > 0 ? 4 : 6);
			} else if (asy >= 1) {
				$gamePlayer.moveStraight(sy > 0 ? 8 : 2);
			}
			$gamePlayer.setMoveSpeed($gameMap.event(eventId).realMoveSpeed());
			break; 
		case "EFP":
			var datEvent = $gameMap.event(eventId); 
			datEvent.setMoveSpeed($gamePlayer.realMoveSpeed());
			cx = $gameMap.leiFollowingPlayerOldX; //Math.floor($gamePlayer._realX); 
			cy = $gameMap.leiFollowingPlayerOldY; //Math.floor($gamePlayer._realY); 
			var sx = datEvent.deltaXFrom(cx);
			var sy = datEvent.deltaYFrom(cy);
			asx = Math.abs(sx); 
			asy = Math.abs(sy); 
			var currentDirection = datEvent._direction; 
			if (asx >= 1 && asy >= 1) {
				datEvent.moveStraight(currentDirection); 
			} else if (asx >= 1) {
				datEvent.moveStraight(sx > 0 ? 4 : 6);
			} else if (asy >= 1) {
				datEvent.moveStraight(sy > 0 ? 8 : 2);
			} else if (asx == 0 && asy == 0){
				datEvent.moveStraight(currentDirection); 
			};
			datEvent.setMoveSpeed($gamePlayer.realMoveSpeed());
			break; 
	};
};


var _lei_EasyFollow_processMoveCommand = Game_Character.prototype.processMoveCommand; 				//将脚本功能适配进移动路线指令 
Game_Character.prototype.processMoveCommand = function(command){
	if (command.code === 45){
		if(command.parameters[0].match(/^>玩家尻事件/)||command.parameters[0].match(/^>PlayerFollowEvent/)){
			var leiEasyFollowCommand = command.parameters[0].split(" "); 
			var leiEasyFollowEventId = Number(leiEasyFollowCommand[1]); 
			$gameMap._interpreter.leiPlayerFollowEvent(leiEasyFollowEventId); 
		};
		if(command.parameters[0].match(/^>玩家停止尻事件/)||command.parameters[0].match(/^>PlayerStopFollowing/)){
			$gameMap._interpreter.leiPlayerStopFollowing(); 
		};
		if(command.parameters[0].match(/^>事件尻玩家/)||command.parameters[0].match(/^>EventFollowPlayer/)){
			var leiEasyFollowCommand = command.parameters[0].split(" "); 
			var leiEasyFollowEventId = Number(leiEasyFollowCommand[1]); 
			$gameMap._interpreter.leiEventFollowPlayer(leiEasyFollowEventId);  
		};
		if(command.parameters[0].match(/^>事件停止尻玩家/)||command.parameters[0].match(/^>EventStopFollowing/)){
			$gameMap._interpreter.leiEventStopFollowingPlayer(); 
		};
	}else{
		_lei_EasyFollow_processMoveCommand.call(this, command); 
	};
};

var _lei_EasyFollow_processMoveCommandPlayer = Game_Player.prototype.processMoveCommand; 				//将脚本功能适配进移动路线指令（玩家）		
Game_Player.prototype.processMoveCommand = function(command){
	if (command.code === 45){
		if(command.parameters[0].match(/^>事件尻玩家/)||command.parameters[0].match(/^>EventFollowPlayer/)){
			var leiEasyFollowCommand = command.parameters[0].split(" "); 
			var leiEasyFollowEventId = Number(leiEasyFollowCommand[1]); 
			$gameMap._interpreter.leiEventFollowPlayer(leiEasyFollowEventId);  
		};
		if(command.parameters[0].match(/^>事件停止尻玩家/)||command.parameters[0].match(/^>EventStopFollowing/)){
			$gameMap._interpreter.leiEventStopFollowingPlayer(); 
		};
	}else{
		_lei_EasyFollow_processMoveCommandPlayer.call(this, command); 
	};
};
















