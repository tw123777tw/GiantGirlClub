//=============================================================================
// Yanfly Engine Plugins - Footstep Sounds
// YEP_FootstepSounds.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_FootstepSounds = true;

var Yanfly = Yanfly || {};
Yanfly.Footsteps = Yanfly.Footsteps || {};
Yanfly.Footsteps.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc 【YEP❀实用类】脚步声系统|YEP_FootstepSounds.js
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @param ---Default---
 * @text ---默认值---
 * @default
 *
 * @param Default Sound
 * @text 默认声音
 * @parent ---Default---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc 用于所有默认SE声音
 * @default Move1
 *
 * @param Default Volume
 * @text 默认音量
 * @parent ---Default---
 * @desc 默认情况下生成的足迹音量
 * Insert a number value.
 * @default 10
 *
 * @param Default Pitch
 * @text 默认音调
 * @parent ---Default---
 * @desc 默认情况下，足迹的音调
 * Insert a number value.
 * @default 150
 *
 * @param ---Player Settings---
 * @text ---玩家脚步声设置---
 * @default
 *
 * @param Player Enable
 * @text 玩家脚步声启用
 * @parent ---Player Settings---
 * @type boolean
 * @on 启用
 * @off 不启用
 * @desc 为玩家角色播放足迹声音？
 * Disable - false     Enable - true
 * @default true
 *
 * @param Player Volume
 * @text 玩家脚步声音量
 * @parent ---Player Settings---
 * @desc 为玩家播放足迹的音量速率是多少？
 * 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Player Pitch
 * @text 玩家脚步声音调
 * @parent ---Player Settings---
 * @desc 为玩家播放足迹的音调多少？
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param ---Event Settings---
 * @text ---事件设置---
 * @default
 *
 * @param Event Enable
 * @text 事件启用
 * @parent ---Event Settings---
 * @type boolean
 * @on 启用
 * @off 不启用
 * @desc 为事件播放足迹声音？
 * Disable - false     Enable - true
 * @default true
 *
 * @param Event Volume
 * @text 事件音量
 * @parent ---Event Settings---
 * @desc What volume rate to play the footsteps at for events?
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Volume
 * @text 距离音量
 * @parent ---Event Settings---
 * @desc 将音量更改为每块瓷砖的差异
 * 从一个事件到另一个玩家。
 * @default -0.10
 *
 * @param Event Pitch
 * @text 事件音调
 * @parent ---Event Settings---
 * @desc What pitch rate to play the footsteps at for events?
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Pitch
 * @text 距离音调
 * @parent ---Event Settings---
 * @desc Change the pitch by this much per tile difference
 * from event to player. Use a float value.
 * @default -0.00
 *
 * @param Distance Pan
 * @text 距离平移
 * @parent ---Event Settings---
 * @desc 距离平移将平移更改为每块瓷砖的差异
 * 从一个事件到另一个玩家。使用一个int值。
 * @default 10
 *
 * @help
 * ============================================================================
 * ▼ 介绍
 * ============================================================================
 *
 * 让事件或者玩家出现脚步声效果，同时可以设定区域单独声音脚步声。
 *
 * ============================================================================
 * ▼ 备注标签
 * ============================================================================
 *
 *
 * 事件备注标签：
 *
 *   <No Footsteps>
 *   -让事件走路无声音效果
 *
 *
 * 备注标签地图（图块组备注）：
 *
 *   <Region x Footstep Sound: filename>
 *   <Region x Footstep Sound: filename, volume>
 *   <Region x Footstep Sound: filename, volume, pitch>
 *   - X 地标ID值(1 to 255). 
 *   示例：
 *   <Region 10 Footstep Sound: Move1>
 *   <Region 20 Footstep Sound: Move2, 80>
 *   <Region 30 Footstep Sound: Move3, 75, 150>
 *
 * 在以上示例中，由区域10、20或30标记的瓦片将播放
 * 当玩家或事件踩到它们时，它们各自的声音效果
 * 可以触发脚步声。
 *
 * ============================================================================
 * ▼ 插件指令
 * ============================================================================
 *
 * 如果在任何时候您希望在游戏中启用/禁用足迹声音，您
 * 可以使用一些插件命令来做到这一点。
 *
 * 插件指令
 *
 *   EnableFootsteps
 *   - 打开足迹声音。
 *
 *   DisableFootsteps
 *   - 关闭足迹声音。
 * ============================================================================
 *  YEP官网：http://yanfly.moe/yep
 *  插件作者：Yanfly
 *  汉化插件：云书 
 *  使用条款：除非另有说明，否则 Yanfly 
 *  制作的任何原始材料均可免费用于免费和商业 RPG Maker 游戏。
 *  要求你在你的游戏致谢名单中提供“Yanfly”或“Yanfly Engine”。
 *  使用条款：http://www.yanfly.moe/wiki/Category:Yanfly_Engine_Plugins#Terms_of_Use
 *  声明：仅用于汉化参考，如发布游戏到官网下载原版插件。
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FootstepSounds');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Footsteps = {
  defaultSound:   String(Yanfly.Parameters['Default Sound']),
  defaultVolume:  Number(Yanfly.Parameters['Default Volume']),
  defaultPitch:   Number(Yanfly.Parameters['Default Pitch']),

  PlayerEnable:   eval(String(Yanfly.Parameters['Player Enable'])),
  PlayerVolume:   parseFloat(Yanfly.Parameters['Player Volume']),
  PlayerPitch:    parseFloat(Yanfly.Parameters['Player Pitch']),

  EventEnable:    eval(String(Yanfly.Parameters['Event Enable'])),
  EventVolume:    parseFloat(Yanfly.Parameters['Event Volume']),
  DistanceVolume: parseFloat(Yanfly.Parameters['Distance Volume']),
  EventPitch:     parseFloat(Yanfly.Parameters['Event Pitch']),
  DistancePitch:  parseFloat(Yanfly.Parameters['Distance Pitch']),
  DistancePan:    parseInt(Yanfly.Parameters['Distance Pan'])
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Footsteps.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Footsteps.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_FootstepSounds) {
    this.processFootstepNotetags($dataTilesets);
    Yanfly._loaded_YEP_FootstepSounds = true;
  }
  return true;
};

DataManager.processFootstepNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.terrainTagFootstepSounds = {
      0: [
        Yanfly.Param.Footsteps.defaultSound, 
        Yanfly.Param.Footsteps.defaultVolume, 
        Yanfly.Param.Footsteps.defaultPitch
      ]
    };

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<TERRAIN[ ]TAG[ ](\d+)[ ]FOOTSTEP SOUND:[ ](.*)>/i)) {
        var tagId = parseInt(RegExp.$1).clamp(1, 7);
        var footstepData = String(RegExp.$2).split(',');
        footstepData[0] = footstepData[0].trim();
        footstepData[1] = footstepData[1] ||
          Yanfly.Param.Footsteps.defaultVolume;
        footstepData[1] = parseInt(footstepData[1]);
        footstepData[2] = footstepData[2] ||
          Yanfly.Param.Footsteps.defaultPitch;
        footstepData[2] = parseInt(footstepData[2]);
        obj.terrainTagFootstepSounds[tagId] = footstepData;
      }
    }
  }
};

DataManager.processMapFootstepNotetags = function() {
  if (!$dataMap) return;

  $dataMap.regionFootstepSounds = {
    0: [
      Yanfly.Param.Footsteps.defaultSound, 
      Yanfly.Param.Footsteps.defaultVolume, 
      Yanfly.Param.Footsteps.defaultPitch
    ]
  };

  if (!$dataMap.note) return;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<REGION[ ](\d+)[ ]FOOTSTEP SOUND:[ ](.*)>/i)) {
      var regionId = parseInt(RegExp.$1).clamp(0, 255);
      var footstepData = String(RegExp.$2).split(',');
      footstepData[0] = footstepData[0].trim();
      footstepData[1] = footstepData[1] || Yanfly.Param.Footsteps.defaultVolume;
      footstepData[1] = parseInt(footstepData[1]);
      footstepData[2] = footstepData[2] || Yanfly.Param.Footsteps.defaultPitch;
      footstepData[2] = parseInt(footstepData[2]);
      $dataMap.regionFootstepSounds[regionId] = footstepData;
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Footsteps.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Footsteps.Game_System_initialize.call(this);
  this.initFootstepSettings();
};

Game_System.prototype.initFootstepSettings = function() {
  this._footstepsEnabled = true;
};

Game_System.prototype.canHearFootsteps = function() {
  if (this._footstepsEnabled === undefined) this.initFootstepSettings();
  return this._footstepsEnabled;
};

Game_System.prototype.setHearFootsteps = function(value) {
  if (this._footstepsEnabled === undefined) this.initFootstepSettings();
  this._footstepsEnabled = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Footsteps.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Footsteps.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'EnableFootsteps') {
    $gameSystem.setHearFootsteps(true);
  } else if (command === 'DisableFootsteps') {
    $gameSystem.setHearFootsteps(false);
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.FootstepsGame_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  if ($dataMap) DataManager.processMapFootstepNotetags();
  Yanfly.FootstepsGame_Map_setup.call(this, mapId);
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.Footsteps.Game_CharacterBase_increaseSteps =
  Game_CharacterBase.prototype.increaseSteps;
Game_CharacterBase.prototype.increaseSteps = function() {
  Yanfly.Footsteps.Game_CharacterBase_increaseSteps.call(this);
  if (this !== $gamePlayer) {
    this.processFootstepSound();
  }
};

Game_CharacterBase.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (this._canPlayFootsteps !== undefined) return this._canPlayFootsteps;
  this._canPlayFootsteps = Yanfly.Param.Footsteps.EventEnable;
  return this._canPlayFootsteps;
};

Game_CharacterBase.prototype.processFootstepSound = function() {
  if (this.canPlayFootsteps() && $gameSystem.canHearFootsteps()) {
    var player = $gamePlayer;
    var distance = $gameMap.distance(this.x, this.y, player.x, player.y);
    var volume = Yanfly.Param.Footsteps.EventVolume || 0;
    volume += distance * Yanfly.Param.Footsteps.DistanceVolume;
    var pitch = Yanfly.Param.Footsteps.EventPitch || 0;
    pitch += distance * Yanfly.Param.Footsteps.DistancePitch;
    var pan = 0;
    pan -= $gameMap.deltaX(this.x, player.x);
    this.playFootstepSound(volume, pitch, pan);
  };
};

Game_CharacterBase.prototype.playFootstepSound = function(volume, pitch, pan) {
  if (volume <= 0) return;
  if (pitch <= 0) return;
  if (!$dataMap) return;
  if (!$dataMap.regionFootstepSounds) DataManager.processMapFootstepNotetags();
  var x = this.x;
  if (this.x === 6) {
    x += 1;
  } else if (this.x === 4) {
    x -= 1;
  }
  var y = this.y;
  if (this.y === 2) {
    y += 1;
  } else if (this.y === 8) {
    y -= 1;
  }
  var regionId = $gameMap.regionId(x, y)
  var terrainTag = $gameMap.terrainTag(x, y);
  if (regionId > 0) {
    var footstepData = $dataMap.regionFootstepSounds[regionId];
  }
  if (!footstepData && terrainTag > 0) {
    var footstepData = $gameMap.tileset().terrainTagFootstepSounds[terrainTag];
  }
  if (!footstepData) footstepData = $dataMap.regionFootstepSounds[0];
  var se = {
    name:   footstepData[0],
    volume: footstepData[1] * volume,
    pitch:  footstepData[2] * pitch,
    pan:    pan.clamp(-100, 100)
  };
  AudioManager.playSe(se);
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.Footsteps.Game_Player_increaseSteps =
  Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
  Yanfly.Footsteps.Game_Player_increaseSteps.call(this);
  this.processFootstepSound();
};

Game_Player.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (!this.isNormal()) return false;
  return Yanfly.Param.Footsteps.PlayerEnable;
};

Game_Player.prototype.processFootstepSound = function() {
  if (this.canPlayFootsteps()) {
    var volume = Yanfly.Param.Footsteps.PlayerVolume || 0;
    var pitch = Yanfly.Param.Footsteps.PlayerPitch || 0;
    var pan = 0;
    this.playFootstepSound(volume, pitch, pan);
  };
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (this._canPlayFootsteps !== undefined) return this._canPlayFootsteps;
  this._canPlayFootsteps = Yanfly.Param.Footsteps.EventEnable;
  var note = this.event().note;
  if (note.match(/<NO FOOTSTEPS>/i)) this._canPlayFootsteps = false;
  return this._canPlayFootsteps;
};

//=============================================================================
// Game_Follower
//=============================================================================

Game_Follower.prototype.canPlayFootsteps = function() {
  if (!this.isVisible()) return false;
  return Game_Character.prototype.canPlayFootsteps.call(this);
};

//=============================================================================
// End of File
//=============================================================================