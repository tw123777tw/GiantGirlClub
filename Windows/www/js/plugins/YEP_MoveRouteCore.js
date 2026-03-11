//=============================================================================
// Yanfly Engine Plugins - Move Route Core
// YEP_MoveRouteCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MoveRouteCore = true;

var Yanfly = Yanfly || {};
Yanfly.MoveRoute = Yanfly.MoveRoute || {};
Yanfly.MoveRoute.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 移动路径核心★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * MV提供了很多命令来设定移动路线。
 * 可是它仍然强制限定了很多有用的移动命令，
 * 这个插件将提供额外的方法来构建你自己的运动路线，
 * 并且可以制作运动路线的进程。
 *
 * ============================================================================
 * 说明-简化移动路线
 * ============================================================================
 *
 * 如果你想使用这个插件来制作特定路线，你可以按照下面的步骤
 * 
 * 1. 打开你想移动的事件
 * 2. 选择移动命令或者自定义移动
 * 3.选择 “Script…”
 * 4.输入下面的命令
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * UP: x
 * LEFT: x
 * RIGHT: x
 * DOWN: x
 * UPPER LEFT: x
 * UPPER RIGHT: x
 * LOWER LEFT: x
 * LOWER RIGHT: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 这个可以让事件按照指定方向前进指定步数，
 *这个和系统直接插入没有却别，可以看做是传统命令的补充。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Up: 10
 *          Left: 7
 *          Down: 3
 *          Right: 4
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ANIMATION: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 播放指定动画
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Animation: 10
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * BALLOON: x
 * BALLOON: EXCLAMATION
 * BALLOON: !
 * BALLOON: QUESTION
 * BALLOON: ?
 * BALLOON: MUSIC NOTE
 * BALLOON: HEART
 * BALLOON: ANGER
 * BALLOON: SWEAT
 * BALLOON: COBWEB
 * BALLOON: SILENCE
 * BALLOON: ...
 * BALLOON: LIGHT BULB
 * BALLOON: ZZZ
 * BALLOON: USER 1
 * BALLOON: USER 2
 * BALLOON: USER 3
 * BALLOON: USER 4
 * BALLOON: USER 5
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 播放指定气泡图像
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Balloon: 5
 *          Balloon: Heart
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ICON BALLOON: x
 * ICON BALLOON: x to y
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 需要YEP_IconBalloons插件支持，这个可以让气泡图像使用指定图标
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Turn Away: 20, 30
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * JUMP FORWARD: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 事件将向面对方向跳跃
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Jump Forward: 5
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * JUMP TO: x, y
 * JUMP TO: EVENT x
 * JUMP TO: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 事件将会跳向指定坐标、事件x位置、角色所处位置等
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Jump To: 20, 30
 *          Jump To: Event 5
 *          Jump To: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MOVE TO: x, y
 * MOVE TO: EVENT x
 * MOVE TO: PLAYER
 *
 * AVOID MOVE TO: x, y
 * AVOID MOVE TO: EVENT x
 * AVOID MOVE TO: PLAYER
 *
 * CRASH MOVE TO: x, y
 * CRASH MOVE TO: EVENT x
 * CRASH MOVE TO: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 事件将会自动移动到指定坐标、事件x位置、角色所处位置等，
 * 这些移动将会在12次迭代计算之内完成。
 * 在到达指定位置之前，事件会持续不断的进行路线计算。
 * 
 * 命令可以让系统计算玩家和跟随者
 * 
 * 命令可以让玩家允许碰撞
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Move To: 20, 30
 *          Move To: Event 5
 *          Move To: Player
 *          Avoid Move To: 30, 40
 *          Crash Move To: 40, 50
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * PATTERN LOCK: x
 * PATTERN UNLOCK
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 出于某些原因，MV并不会让你理由路线编辑器来设置图像，这个
 * 命令可以让你实现。如果图像锁打开，图像将会锁定在位置上。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Pattern Lock: 0
 *          Pattern Lock: 2
 *          Pattern Unlock
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SELF SWITCH x: ON
 * SELF SWITCH x: OFF
 * SELF SWITCH x: TOGGLE
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 可以操作事件的独立开关。如果你使用了YEP_SelfSwVar.js，则仍然
 * 可以继续使用数字。
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Self Switch A: On
 *          Self Switch B: Off
 *          Self Switch 123: Toggle
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SELF VARIABLE x: y
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 这个需要YEP_SelfSwVar.js支持，可以设置事件的独立变量
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Self Variable A: On
 *          Self Variable B: Off
 *          Self Variable 123: Toggle
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STEP AWAY FROM: x, y
 * STEP AWAY FROM: EVENT x
 * STEP AWAY FROM: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 可以让事件逃离指定坐标、指定事件、玩家当前位置等
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Step Away: 20, 30
 *          Step Away: Event 5
 *          Step Away: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STEP TOWARD: x, y
 * STEP TOWARD: EVENT x
 * STEP TOWARD: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 可以让事件靠近指定坐标、指定事件、玩家当前位置等
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Step Toward: 20, 30
 *          Step Toward: Event 5
 *          Step Toward: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TELEPORT: x, y
 * TELEPORT: EVENT x
 * TELEPORT: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 可以将事件立即传送到指定坐标、指定事件、玩家当前位置等
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Teleport: 20, 30
 *          Teleport: Event 5
 *          Teleport: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN AWAY FROM: x, y
 * TURN AWAY FROM: EVENT x
 * TURN AWAY FROM: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 可以让事件背向指定坐标、指定事件、玩家当前位置等
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Turn Away: 20, 30
 *          Turn Away: Event 5
 *          Turn Away: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN TOWARDS: x, y
 * TURN TOWARDS: EVENT x
 * TURN TOWARDS: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 可以让事件转向指定坐标、指定事件、玩家当前位置等
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Turn Towards: 50, 60
 *          Turn Towards: Event 5
 *          Turn Towards: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * 可以让事件转向指定坐标、指定事件、玩家当前位置等
 *
 * ============================================================================
 * 便签
 * ============================================================================
 *
 * These are some notetags you can utilize for your events.
 *
 * Event Notetags:
 *
 *   <Always Update Movement>
 *   - 事件在关闭屏幕前一般不会刷新，
 *   这个可以让事件无论是否关闭屏幕都会刷新
 *
 * ============================================================================
 * 疯狂模式-脚本调用
 * ============================================================================
 *
 * For those with JavaScript experience and would like to use the raw command
 * functions without resorting to the simplified commands, you can use the
 * following code inside of a Script:
 *
 *   this.jumpForward(x)
 *   - Replace x with the amount of tiles you want the designated event to jump
 *   forward. x will be automatically rounded to the nearest integar value if
 *   it is a float value.
 *
 *   this.jumpToPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to jump towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.jumpToEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   jump towards. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.moveRepeat(direction, times)
 *   - This will make the designated event move in 'direction' a certain amount
 *   of 'times'. Replace 'direction' with the number value you wish the event
 *   to move in (refer to NumPad) and replace 'times' with the number of times
 *   to step in that direction.
 *
 *   this.moveToPoint(x, y)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach coordinates x, y within 12 iterations. The designated event
 *   will keep repeating this command until it has reached the coordinates.
 *   This will cause the designated event to go around the player and followers
 *   on the map without colliding into them.
 *
 *   this.moveToPoint(x, y, true)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach coordinates x, y within 12 iterations. The designated event
 *   will keep repeating this command until it has reached the coordinates.
 *   This will cause the designated event to crash into the player and/or any
 *   followers if they are in the path way.
 *
 *   this.moveToEvent(x)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach event x within 12 iterations. The designated event will
 *   keep repeating this command until it has reached the coordinates. If 0 is
 *   used, it will refer to the player. This will cause the designated event to
 *   go around the player and followers on the map without colliding into them.
 *
 *   this.moveToEvent(x, true)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach event x within 12 iterations. The designated event will
 *   keep repeating this command until it has reached the coordinates. If 0 is
 *   used, it will refer to the player. This will cause the designated event to
 *   crash into the player and/or any followers if they are in the path way.
 *
 *   this.requestAnimation(x)
 *   - Replace x with the animation ID you want to play on the designated
 *   event. x will be automatically rounded to the nearest integar value if it
 *   is a float value.
 *
 *   this.requestBalloon(x)
 *   - Replace x with the balloon ID you want to play on the designated event.
 *   x will be automatically rounded to the nearest integar value if it is a
 *   float value.
 *
 *   this.stepAwayFromPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to step away from. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.stepAwayFromEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   step away from. x will be automatically rounded to the nearest integar
 *   value if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.stepTowardPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to step towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.stepTowardPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to step towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.stepTowardEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   step towards. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.teleportToPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to teleport to. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.teleportToEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   teleport to. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.turnAwayFromPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to turn away from. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.turnAwayFromEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   turn away from. x will be automatically rounded to the nearest integar
 *   value if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.turnTowardPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to turn towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.turnTowardEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   turn towards. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Bug fixed for the repeated commands that caused the commands to add upon
 * one another.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Game_Character
//=============================================================================

Yanfly.MoveRoute.Game_Character_setMoveRoute =
  Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function(moveRoute) {
  var route = JsonEx.makeDeepCopy(moveRoute);
  Yanfly.MoveRoute.Game_Character_setMoveRoute.call(this, route);
};

Yanfly.MoveRoute.Game_Character_processMoveCommand =
  Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
  var gc = Game_Character;
  switch (command.code) {
  case gc.ROUTE_SCRIPT:
    this.processMoveRouteScriptCall(command.parameters[0]);
    break;
  default:
    Yanfly.MoveRoute.Game_Character_processMoveCommand.call(this, command);
    break;
  }
};

Game_Character.prototype.processMoveRouteScriptCall = function(line) {
  // EVAL
  if (line.match(/EVAL:[ ](.*)/i)) {
    this.processMoveRouteEval(String(RegExp.$1));
  // ANIMATION
  } else if (line.match(/(?:ANIMATION|REQUEST ANIMATION):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.requestAnimation(x);
  // ICON BALLOON
  } else if (line.match(/(?:ICON BALLOON|REQUEST ICON BALLOON):[ ](.*)/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteIconBalloon(str);
  // BALLOON
  } else if (line.match(/(?:BALLOON|REQUEST BALLOON):[ ](.*)/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteBalloon(str);
  // JUMP FORWARD
  } else if (line.match(/(?:JUMP FORWARD|JUMP FORWARDS):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.jumpForward(x);
  // JUMP TO: POINT
  } else if (line.match(/JUMP[ ](?:TO|TOWARD|TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.jumpToPoint(x, y);
  // JUMP TO: EVENT
  } else if (line.match(/JUMP[ ](?:TO|TOWARD|TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.jumpToEvent(x);
  // JUMP TO: PLAYER
  } else if (line.match(/JUMP[ ](?:TO|TOWARD|TOWARDS):[ ]PLAYER/i)) {
    this.jumpToEvent(0);
  // MOVE TO: POINT
  } else if (line.match(/MOVE[ ](?:TO|TOWARD|TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    var collision = this.checkCollisionKeywords(line);
    this.moveToPoint(x, y, collision);
  // MOVE TO: EVENT
  } else if (line.match(/MOVE[ ](?:TO|TOWARD|TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var collision = this.checkCollisionKeywords(line);
    this.moveToEvent(x, collision);
  // MOVE TO: PLAYER
  } else if (line.match(/MOVE[ ](?:TO|TOWARD|TOWARDS):[ ]PLAYER/i)) {
    this.moveToEvent(0);
  // PATTERN LOCK
  } else if (line.match(/(?:PATTERN LOCK):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.patternLock(x);
  // PATTERN UNLOCK
  } else if (line.match(/(?:PATTERN UNLOCK)/i)) {
    this.patternUnlock();
  // SELF SWITCH: ON
  } else if (line.match(/(?:SELF SWITCH)[ ](.*):[ ]ON/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteSelfSwitch(str, 'on');
  // SELF SWITCH: OFF
  } else if (line.match(/(?:SELF SWITCH)[ ](.*):[ ]OFF/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteSelfSwitch(str, 'off');
  // SELF SWITCH: TOGGLE
  } else if (line.match(/(?:SELF SWITCH)[ ](.*):[ ]TOGGLE/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteSelfSwitch(str, 'toggle');
  // SELF VARIABLE
  } else if (line.match(/(?:SELF VARIABLE)[ ](.*):[ ](.*)/i)) {
    var str = String(RegExp.$1);
    var code = String(RegExp.$2);
    this.processMoveRouteSelfVariable(str, code);
  // STEP AWAY FROM: POINT
  } else if (line.match(/(?:STEP AWAY|STEP AWAY FROM):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.stepAwayFromPoint(x, y);
  // STEP AWAY FROM: EVENT
  } else if (line.match(/(?:STEP AWAY|STEP AWAY FROM):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.stepAwayFromEvent(x);
  // STEP AWAY FROM: PLAYER
  } else if (line.match(/(?:STEP AWAY|STEP AWAY FROM):[ ]PLAYER/i)) {
    this.stepAwayFromEvent(0);
  // STEP TOWARD: POINT
  } else if (line.match(/(?:STEP TOWARD|STEP TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.stepTowardPoint(x, y);
  // STEP TOWARD: EVENT
  } else if (line.match(/(?:STEP TOWARD|STEP TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.stepTowardEvent(x);
  // STEP TOWARD: PLAYER
  } else if (line.match(/(?:STEP TOWARD|STEP TOWARDS):[ ]PLAYER/i)) {
    this.stepTowardEvent(0);
  // TELEPORT: POINT
  } else if (line.match(/(?:TELEPORT|TELEPORT TO):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.teleportToPoint(x, y);
  // TELEPORT: EVENT
  } else if (line.match(/(?:TELEPORT):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.teleportToEvent(x);
  // TELEPORT: PLAYER
  } else if (line.match(/(?:TELEPORT):[ ]PLAYER/i)) {
    this.teleportToEvent(0);
  // TURN AWAY FROM: POINT
  } else if (line.match(/(?:TURN AWAY FROM|TURN AWAY):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.turnAwayFromPoint(x, y);
  // TURN AWAY FROM: EVENT
  } else if (line.match(/(?:TURN AWAY FROM|TURN AWAY):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.turnAwayFromEvent(x);
  // TURN AWAY FROM: PLAYER
  } else if (line.match(/(?:TURN AWAY FROM|TURN AWAY):[ ]PLAYER/i)) {
    this.turnAwayFromEvent(0);
  // TURN TOWARD: POINT
  } else if (line.match(/(?:TURN TOWARD|TURN TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.turnTowardPoint(x, y);
  // TURN TOWARD: EVENT
  } else if (line.match(/(?:TURN TOWARD|TURN TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.turnTowardEvent(x);
  // TURN TOWARD: PLAYER
  } else if (line.match(/(?:TURN TOWARD|TURN TOWARDS):[ ]PLAYER/i)) {
    this.turnTowardEvent(0);
  // MOVE DIRECTION
  } else if (line.match(/(?:MOVE LOWER LEFT|LOWER LEFT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(1, x);
  } else if (line.match(/(?:MOVE LOWER RIGHT|LOWER RIGHT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(3, x);
  } else if (line.match(/(?:MOVE UPPER LEFT|UPPER LEFT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(7, x);
  } else if (line.match(/(?:MOVE UPPER RIGHT|UPPER RIGHT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(9, x);
  } else if (line.match(/(?:MOVE UP|UP):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(8, x);
  } else if (line.match(/(?:MOVE DOWN|DOWN):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(2, x);
  } else if (line.match(/(?:MOVE LEFT|LEFT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(4, x);
  } else if (line.match(/(?:MOVE RIGHT|RIGHT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(6, x);
  // ELSE/EVAL
  } else {
    this.processMoveRouteEval(line);
  }
};

Game_Character.prototype.checkCollisionKeywords = function(line) {
  if (line.match(/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)) {
    return true;
  } else if (line.match(/(?:AVOID|EVADE|DODGE)/i)) {
    return false;
  } else {
    return false;
  }
};

Game_Character.prototype.processMoveRouteEval = function(code) {
  var a = this;
  var b = this;
  var player = $gamePlayer;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'MOVE ROUTE SCRIPT ERROR');
  }
};

Game_Character.prototype.processMoveRouteIconBalloon = function(str) {
  if (!Yanfly.IBalloon) return;
  if (str.match(/(\d+)[ ]TO[ ](\d+)/i)) {
    var iconIndex1 = parseInt(RegExp.$1);
    var iconIndex2 = parseInt(RegExp.$2);
  } else if (str.match(/(\d+)/i)) {
    var iconIndex1 = parseInt(RegExp.$1);
    var iconIndex2 = iconIndex1;
  } else {
    return;
  }
  this.setIconBalloon(iconIndex1, iconIndex2);
};

Game_Character.prototype.processMoveRouteBalloon = function(str) {
  var id = 0;
  if (str.match(/(?:EXCLAMATION|\!)/i)) {
    id = 1;
  } else if (str.match(/(?:QUESTION|\?)/i)) {
    id = 2;
  } else if (str.match(/(?:MUSIC NOTE|MUSIC|NOTE)/i)) {
    id = 3;
  } else if (str.match(/(?:HEART|LOVE)/i)) {
    id = 4;
  } else if (str.match(/(?:ANGER)/i)) {
    id = 5;
  } else if (str.match(/(?:SWEAT)/i)) {
    id = 6;
  } else if (str.match(/(?:COBWEB)/i)) {
    id = 7;
  } else if (str.match(/(?:SILENCE|\.\.\.)/i)) {
    id = 8;
  } else if (str.match(/(?:LIGHT BULB|LIGHT|BULB)/i)) {
    id = 9;
  } else if (str.match(/(?:ZZZ|ZZ|Z)/i)) {
    id = 10;
  } else if (str.match(/(?:USER|USER-DEFINED|USER DEFINED)[ ](\d+)/i)) {
    id = 10 + parseInt(RegExp.$1);
  }
  this.requestBalloon(id);
};

Game_Character.prototype.processMoveRouteSelfSwitch = function(str, setting) {
  if (this === $gamePlayer) return;
  if (Imported.YEP_SelfSwVar && str.match(/(\d+)/i)) {
    var keyName = 'SELF SWITCH ' + parseInt(RegExp.$1);
  } else {
    var keyName = str.toUpperCase();
  }
  var key = [$gameMap.mapId(), this.eventId(), keyName];
  if (setting.toUpperCase() === 'ON') {
    $gameSelfSwitches.setValue(key, true);
  } else if (setting.toUpperCase() === 'OFF') {
    $gameSelfSwitches.setValue(key, false);
  } else if (setting.toUpperCase() === 'TOGGLE') {
    $gameSelfSwitches.setValue(key, !$gameSelfSwitches.value(key));
  }
};

Game_Character.prototype.processMoveRouteSelfVariable = function(str, code) {
  if (!Imported.YEP_SelfSwVar) return;
  if (this === $gamePlayer) return;
  if (str.match(/(\d+)/i)) {
    var keyName = 'SELF VARIABLE ' + parseInt(RegExp.$1);
  } else {
    var keyName = str.toUpperCase();
  }
  var key = [$gameMap.mapId(), this.eventId(), keyName];
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'MOVE ROUTE SELF VARIABLE SCRIPT ERROR');
  }
  $gameSelfSwitches.setValue(key, value);
};

// Simplified Functions

Game_Character.prototype.jumpForward = function(distance) {
  distance = Math.round(distance);
  var direction = this.direction();
  var dx = 0;
  var dy = 0;
  switch (direction) {
  case 1:
    dx = -distance;
    dy = distance;
    break;
  case 2:
    dy = distance;
    break;
  case 3:
    dx = distance;
    dy = distance;
    break;
  case 4:
    dx = -distance;
    break;
  case 6:
    dx = distance;
    break;
  case 7:
    dx = -distance;
    dy = -distance;
    break;
  case 8:
    dy = -distance;
    break;
  case 9:
    dx = distance;
    dy = -distance;
    break;
  }
  this.jump(dx, dy);
};

Game_Character.prototype.jumpToPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  dx = (this.x - x) * -1;
  dy = (this.y - y) * -1;
  this.jump(dx, dy);
};

Game_Character.prototype.jumpToEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.jumpToPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.jumpToPoint(x, y);
  }
};

Game_Character.prototype.moveRepeat = function(direction, times) {
  times = times || 0;
  times = Math.round(times);
  var command = {
    code: 1,
    indent: null,
    parameters: []
  }
  var gc = Game_Character;
  switch (direction) {
  case 1:
    command.code = gc.ROUTE_MOVE_LOWER_L;
    break;
  case 2:
    command.code = gc.ROUTE_MOVE_DOWN;
    break;
  case 3:
    command.code = gc.ROUTE_MOVE_LOWER_R;
    break;
  case 4:
    command.code = gc.ROUTE_MOVE_LEFT;
    break;
  case 5:
    return;
    break;
  case 6:
    command.code = gc.ROUTE_MOVE_RIGHT;
    break;
  case 7:
    command.code = gc.ROUTE_MOVE_UPPER_L;
    break;
  case 8:
    command.code = gc.ROUTE_MOVE_UP;
    break;
  case 9:
    command.code = gc.ROUTE_MOVE_UPPER_R;
    break;
  }
  this._moveRoute = JsonEx.makeDeepCopy(this._moveRoute);
  while (times--) {
    this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, command);
  }
};

Game_CharacterBase.prototype.moveToPoint = function(x, y, collision) {
  collision = collision || false;
  x = Math.round(x);
  y = Math.round(y);
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  var direction = this.findDirectionTo(x, y);
  if (collision) $gameTemp._moveAllowPlayerCollision = false;
  if (direction > 0) this.moveStraight(direction);
  if (this.x !== x || this.y !== y) this._moveRouteIndex -= 1;
  this.setMovementSuccess(true);
};

Game_CharacterBase.prototype.moveTowardPoint = function(x, y, collision) {
  this.moveToPoint(x, y, collision);
};

Game_Character.prototype.moveToEvent = function(eventId, collision) {
  collision = collision || false;
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.moveToPoint(x, y, collision);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.moveToPoint(x, y, collision);
  }
};

Game_Character.prototype.patternLock = function(index) {
  index = Math.round(index);
  this._patternMoveRouteLocked = true;
  this.setPattern(index);
};

Game_Character.prototype.patternUnlock = function() {
  this._patternMoveRouteLocked = false;
};

Game_Character.prototype.stepAwayFromPoint = function(x, y) {
  var sx = this.deltaXFrom(Math.round(x));
  var sy = this.deltaYFrom(Math.round(y));
  if (Math.abs(sx) > Math.abs(sy)) {
    this.moveStraight(sx > 0 ? 6 : 4);
    if (!this.isMovementSucceeded() && sy !== 0) {
      this.moveStraight(sy > 0 ? 2 : 8);
    }
  } else if (sy !== 0) {
    this.moveStraight(sy > 0 ? 2 : 8);
    if (!this.isMovementSucceeded() && sx !== 0) {
      this.moveStraight(sx > 0 ? 6 : 4);
    }
  }
};

Game_Character.prototype.stepAwayFromEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.stepAwayFromPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.stepAwayFromPoint(x, y);
  }
};

Game_Character.prototype.stepTowardPoint = function(x, y) {
  var sx = this.deltaXFrom(Math.round(x));
  var sy = this.deltaYFrom(Math.round(y));
  if (Math.abs(sx) > Math.abs(sy)) {
    this.moveStraight(sx > 0 ? 4 : 6);
    if (!this.isMovementSucceeded() && sy !== 0) {
      this.moveStraight(sy > 0 ? 8 : 2);
    }
  } else if (sy !== 0) {
    this.moveStraight(sy > 0 ? 8 : 2);
    if (!this.isMovementSucceeded() && sx !== 0) {
      this.moveStraight(sx > 0 ? 4 : 6);
    }
  }
};

Game_Character.prototype.stepTowardEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.stepTowardPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.stepTowardPoint(x, y);
  }
};

Game_Character.prototype.teleportToPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  this.locate(x, y);
};

Game_Character.prototype.teleportToEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.teleportToPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.teleportToPoint(x, y);
  }
};

Game_Character.prototype.turnAwayFromPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  var sx = this.deltaXFrom(x);
  var sy = this.deltaYFrom(y);
  if (Math.abs(sx) > Math.abs(sy)) {
    this.setDirection(sx > 0 ? 6 : 4);
  } else if (sy !== 0) {
    this.setDirection(sy > 0 ? 2 : 8);
  }
};

Game_Character.prototype.turnAwayFromEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.turnAwayFromPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.turnAwayFromPoint(x, y);
  }
};

Game_Character.prototype.turnTowardPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  var sx = this.deltaXFrom(x);
  var sy = this.deltaYFrom(y);
  if (Math.abs(sx) > Math.abs(sy)) {
    this.setDirection(sx > 0 ? 4 : 6);
  } else if (sy !== 0) {
    this.setDirection(sy > 0 ? 8 : 2);
  }
};

Game_Character.prototype.turnTowardEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.turnTowardPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.turnTowardPoint(x, y);
  }
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.MoveRoute.Game_CharacterBase_isNearTheScreen =
  Game_CharacterBase.prototype.isNearTheScreen;
Game_CharacterBase.prototype.isNearTheScreen = function() {
  if (this._isAlwaysUpdateMovement) return true;
  return Yanfly.MoveRoute.Game_CharacterBase_isNearTheScreen.call(this);
};

Yanfly.MoveRoute.Game_CharacterBase_updatePattern =
  Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function() {
  if (this._patternMoveRouteLocked) return;
  Yanfly.MoveRoute.Game_CharacterBase_updatePattern.call(this);
};

Yanfly.MoveRoute.Game_CharacterBase_requestAnimation =
  Game_CharacterBase.prototype.requestAnimation;
Game_CharacterBase.prototype.requestAnimation = function(animationId) {
  animationId = Math.round(animationId);
  Yanfly.MoveRoute.Game_CharacterBase_requestAnimation.call(this, animationId);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.MoveRoute.Game_Event_updateSelfMovement =  
  Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
  if (this._isAlwaysUpdateMovement === undefined) this.checkUpdateSelfMove();
  Yanfly.MoveRoute.Game_Event_updateSelfMovement.call(this);
};

Game_Event.prototype.checkUpdateSelfMove = function() {
  var note = this.event().note;
  this._isAlwaysUpdateMovement = note.match(/<ALWAYS UPDATE MOVEMENT>/i);
};

Yanfly.MoveRoute.Game_Event_isPlayerCollided =
  Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
  if ($gameTemp._moveAllowPlayerCollision) return false;
  return Yanfly.MoveRoute.Game_Event_isPlayerCollided.call(this, x, y);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================