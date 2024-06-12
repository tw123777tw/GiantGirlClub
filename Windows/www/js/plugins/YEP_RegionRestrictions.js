//=============================================================================
// Yanfly Engine Plugins - Region Restrictions
// YEP_RegionRestrictions.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionRestrictions = true;

var Yanfly = Yanfly || {};
Yanfly.RR = Yanfly.RR || {};
Yanfly.RR.version = 1.04

//=============================================================================
 /*:
 * @plugindesc 【YEP❀实用类】区域通行限制|YEP_RegionRestrictions.js
 * @author Yanfly Engine Plugins
 *
 * @param Player Restrict
 * @text 玩家限制
 * @desc 此区域 ID 将限制玩家进入。
 * 要使用多个区域，请用空格分隔它们。
 * @default 0
 *
 * @param Event Restrict
 * @text 事件限制
 * @desc 此区域 ID 将限制所有事件进入。
 * 要使用多个区域，请用空格分隔它们。
 * @default 0
 *
 * @param All Restrict
 * @text 全部限制
 * @desc 此区域 ID 将限制玩家和事件。
 * 要使用多个区域，请用空格分隔它们。
 * @default 0
 *
 * @param Player Allow
 * @text 全部允许
 * @desc 此区域 ID 将始终允许玩家通过。
 * 要使用多个区域，请用空格分隔它们。
 * @default 0
 *
 * @param Event Allow
 * @text 事件允许
 * @desc 此区域 ID 将始终允许事件传递。
 * 要使用多个区域，请用空格分隔它们。
 * @default 0
 *
 * @param All Allow
 * @text 全部允许
 * @desc 此区域 ID 将始终允许这两种传递。
 * 要使用多个区域，请用空格分隔它们。
 * @default 0
 *
 * @help
 * ============================================================================
 * ▼ 简介和说明
 * ============================================================================
 *
 * 不是每个人都希望NPC到处能通行。有了这个插件，
 * 您可以将NPC设置为无法移动由指定标记的通行证瓷砖
 * 只需画出要包围NPC的区域，然后除非他们有通过，
 * 否则他们将无法通过它。同样有些地区也可以阻止玩家继续前进！
 *
 *
 * ============================================================================
 * ▼ 备注标签
 * ============================================================================
 *
 *   您可以在地图中使用此记事标记。
 *
 *   地图注释标签：
 *
 *   <Player Restrict Region: x>
 *   <Player Restrict Region: x, x, x>
 *   <Player Restrict Region: x to y>
 *   限制玩家在此特定地图上的x区域。使用多个 x
 *   标记更多区域。从 x 到 y，您可以标记多个区域。 
 *
 *   <Event Restrict Region: x>
 *   <Event Restrict Region: x, x, x>
 *   <Event Restrict Region: x to y>
 *   限制此特定地图上所有事件的区域 x。使用多个 x
 *   标记更多区域。从 x 到 y，您可以标记多个区域。
 *
 *   <All Restrict Region: x>
 *   <All Restrict Region: x, x, x>
 *   <All Restrict Region: x to y>
 *   限制玩家和此特定地图上所有事件的x区域。
 *   使用多个 x 标记更多区域。从 x 到 y，您可以标记多个
 *   地区数量。
 *
 *   <Player Allow Region: x>
 *   <Player Allow Region: x, x, x>
 *   <Player Allow Region: x to y>
 *   允许玩家在此特定地图上的区域x。使用多个 x
 *   标记更多区域。从 x 到 y，您可以标记多个区域。
 *
 *   <Event Allow Region: x>
 *   <Event Allow Region: x, x, x>
 *   <Event Allow Region: x to y>
 *   允许此特定地图上所有事件的区域 x。使用多个 x
 *   标记更多区域。从 x 到 y，您可以标记多个区域。
 *
 *   <All Allow Region: x>
 *   <All Allow Region: x, x, x>
 *   <All Allow Region: x to y>
 *   允许玩家和此特定地图上的所有事件的区域x。
 *   使用多个 x 标记更多区域。从 x 到 y，您可以标记多个
 *   地区数量。
 *
 * ============================================================================
 * 更新日志
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Fixed an issue with vehicles being capable of landing the player in region
 * restricted zones.
 *
 * Version 1.02:
 * - Plugin parameters have been upgraded to now accept multiple region ID's.
 * Insert a space in between them to add more than one region ID.
 *
 * Version 1.01:
 * - Added new notetags to allow for more region restriction settings!
 *
 * Version 1.00:
 * - Finished plugin!
 * ============================================================================
 *  YEP官网：http://yanfly.moe/yep
 *  插件作者：Yanfly
 *  汉化插件：云书 
 *  使用条款：除非另有说明，否则 Yanfly 
 *  使用条款：http://www.yanfly.moe/wiki/Category:Yanfly_Engine_Plugins#Terms_of_Use
 *  声明：仅用于汉化参考，如发布游戏到官网下载原版插件。
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Param = Yanfly.Param || {};

Yanfly.SetupParameters = function() {
  var parameters = PluginManager.parameters('YEP_RegionRestrictions');
  Yanfly.Param.RRAllAllow = String(parameters['All Allow']);
  Yanfly.Param.RRAllAllow = Yanfly.Param.RRAllAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllAllow.length; ++i) {
    Yanfly.Param.RRAllAllow[i] = Number(Yanfly.Param.RRAllAllow[i]);
  }
  Yanfly.Param.RRAllRestrict = String(parameters['All Restrict']);
  Yanfly.Param.RRAllRestrict = Yanfly.Param.RRAllRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllRestrict.length; ++i) {
    Yanfly.Param.RRAllRestrict[i] = Number(Yanfly.Param.RRAllRestrict[i]);
  }
  Yanfly.Param.RREventAllow = String(parameters['Event Allow']);
  Yanfly.Param.RREventAllow = Yanfly.Param.RREventAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventAllow.length; ++i) {
    Yanfly.Param.RREventAllow[i] = Number(Yanfly.Param.RREventAllow[i]);
  }
  Yanfly.Param.RREventRestrict = String(parameters['Event Restrict']);
  Yanfly.Param.RREventRestrict = Yanfly.Param.RREventRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventRestrict.length; ++i) {
    Yanfly.Param.RREventRestrict[i] = Number(Yanfly.Param.RREventRestrict[i]);
  }
  Yanfly.Param.RRPlayerAllow = String(parameters['Player Allow']);
  Yanfly.Param.RRPlayerAllow = Yanfly.Param.RRPlayerAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerAllow.length; ++i) {
    Yanfly.Param.RRPlayerAllow[i] = Number(Yanfly.Param.RRPlayerAllow[i]);
  }
  Yanfly.Param.RRPlayerRestrict = String(parameters['Player Restrict']);
  Yanfly.Param.RRPlayerRestrict = Yanfly.Param.RRPlayerRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerRestrict.length; ++i) {
    Yanfly.Param.RRPlayerRestrict[i] = Number(Yanfly.Param.RRPlayerRestrict[i]);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

DataManager.processRRNotetags = function() {
  if (!$dataMap) return;
  $dataMap.restrictPlayerRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RRPlayerRestrict);
  $dataMap.restrictEventRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RREventRestrict);
  $dataMap.allowPlayerRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RRPlayerAllow);
  $dataMap.allowEventRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RREventAllow);
  if (!$dataMap.note) return;

  var note1a = /<(?:PLAYER RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:PLAYER RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note2a = /<(?:EVENT RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:EVENT RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note3a = /<(?:ALL RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3b = /<(?:ALL RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var note4a = /<(?:PLAYER ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4b = /<(?:PLAYER ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note5a = /<(?:EVENT ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5b = /<(?:EVENT ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note6a = /<(?:ALL ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6b = /<(?:ALL ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var notedata = $dataMap.note.split(/[\r\n]+/);

  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(note1a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
    } else if (line.match(note1b)) {
      var mainArray = $dataMap.restrictPlayerRegions;
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(range);
    } else if (line.match(note2a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note2b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(range);
    } else if (line.match(note3a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note3b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note4a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions =
        $dataMap.allowPlayerRegions.concat(array);
    } else if (line.match(note4b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions =$dataMap.allowPlayerRegions.concat(range);
    } else if (line.match(note5a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note5b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(range);
    } else if (line.match(note6a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note6b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RR.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Yanfly.RR.Game_Map_setup.call(this, mapId);
    if ($dataMap) DataManager.processRRNotetags();
};

Game_Map.prototype.restrictEventRegions = function() {
    if ($dataMap.restrictEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictEventRegions || [];
};

Game_Map.prototype.restrictPlayerRegions = function() {
    if ($dataMap.restrictPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictPlayerRegions || [];
};

Game_Map.prototype.allowEventRegions = function() {
    if ($dataMap.allowEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowEventRegions || [];
};

Game_Map.prototype.allowPlayerRegions = function() {
    if ($dataMap.allowPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowPlayerRegions || [];
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.RR.Game_CharacterBase_isMapPassable =
    Game_CharacterBase.prototype.isMapPassable;
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    if (this.isEventRegionForbid(x, y, d)) return false;
    if (this.isPlayerRegionForbid(x, y, d)) return false;
    if (this.isEventRegionAllow(x, y, d)) return true;
    if (this.isPlayerRegionAllow(x, y, d)) return true;
    return Yanfly.RR.Game_CharacterBase_isMapPassable.call(this, x, y, d);
};

Game_CharacterBase.prototype.isEvent = function() {
    return false;
};

Game_CharacterBase.prototype.isPlayer = function() {
    return false;
};

Game_CharacterBase.prototype.processRRNotetags = function() {
    DataManager.processRRNotetags();
};

Game_CharacterBase.prototype.isEventRegionForbid = function(x, y, d) {
    if (this.isPlayer()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictEventRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isPlayerRegionForbid = function(x, y, d) {
    if (this.isEvent()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictPlayerRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isEventRegionAllow = function(x, y, d) {
    if (this.isPlayer()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowEventRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isPlayerRegionAllow = function(x, y, d) {
    if (this.isEvent()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowPlayerRegions().contains(regionId)) return true;
    return false
};

Game_CharacterBase.prototype.getRegionId = function(x, y, d) {
    switch (d) {
    case 1:
      return $gameMap.regionId(x - 1, y + 1);
      break;
    case 2:
      return $gameMap.regionId(x + 0, y + 1);
      break;
    case 3:
      return $gameMap.regionId(x + 1, y + 1);
      break;
    case 4:
      return $gameMap.regionId(x - 1, y + 0);
      break;
    case 5:
      return $gameMap.regionId(x + 0, y + 0);
      break;
    case 6:
      return $gameMap.regionId(x + 1, y + 0);
      break;
    case 7:
      return $gameMap.regionId(x - 1, y - 1);
      break;
    case 8:
      return $gameMap.regionId(x + 0, y - 1);
      break;
    case 9:
      return $gameMap.regionId(x + 1, y - 1);
      break;
    default:
      return $gameMap.regionId(x, y);
      break;
    }
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isEvent = function() {
    return true;
};

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.isPlayer = function() {
    return true;
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.RR.Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
  var value = Yanfly.RR.Game_Vehicle_isLandOk.call(this, x, y, d);
  if (!value) return false;
  if (this.isAirship()) {
    d = 5;
    $gamePlayer._through = false;
  }
  if ($gamePlayer.isPlayerRegionForbid(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return false;
  }
  if ($gamePlayer.isPlayerRegionAllow(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return true;
  }
  return true;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
