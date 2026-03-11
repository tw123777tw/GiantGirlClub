 //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 // 
 //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/*:
 * Version:
 * @plugindesc v1.0 屏幕随机震动 OverLordFan_ScreenShake
 * @help
 * OverLordFan_ScreenShake 插件使用方法
 * -----------------------------------------------------
 * 新的屏幕震动插件支持地图场景和战斗场景并且可以随时使用
 * 系统屏幕震动不支持x轴 y轴同时随机震动 本插件可以实现x y轴同时随机震动 效果更好
 * 可以在yep战斗序列中随时使用不影响系统默认屏幕震动
 * 
 * - 地图场景使用震动 -
 * -----------------------------------------------------
 * 地图场景中可以在事件内插入脚本输入$gameSystem.shakeMap(level, time);
 * level为震动级别(建议2 最小值1.1) time为震动持续时间(建议30) 30为帧率 0.5秒 此两个变量可按需求自行测试再填写
 * 
 * - 战斗场景使用震动 -
 * -----------------------------------------------------
 * 战斗场景在yep序列中插入代码 eval: $gameSystem.shakeBattle(level, time);
 * 注意eval:后要有一个空格
 * level为震动级别(建议3 最小值1.1) time为震动持续时间(建议30) 30为帧率 0.5秒 可按需求自行测试再填写
 * 
 * -----------------------------------------------------
 * b站up地址https://space.bilibili.com/3873289
 * 有视频教程 请关注我一键三连 谢谢您的支持！
 * 如果有任何插件问题游戏相关可以来我的QQ游戏交流群交流探讨 群号437531927
 * @author OverLordFan
 */

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

 var Imported = Imported || {};
 Imported.OverLordFan_ScreenShake = true;
 var OverLordFan = OverLordFan || {}; 
 OverLordFan._ScreenShake = OverLordFan._ScreenShake || {};
 OverLordFan.parameters = PluginManager.parameters('OverLordFan_ScreenShake');


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Game_System
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//------------------------------------------------------------------------地图上屏幕震动
Game_System.prototype.shakeMap = function(levelMap, timeMap){
    this._shakeLevelMap = levelMap;
    this._shakeTimeMap = timeMap;
};

//------------------------------------------------------------------------战斗场景yep序列中使用屏幕震动
Game_System.prototype.shakeBattle = function(level, duration){
    this._shakeLevel = level;
    this._shakeTime = duration;
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Scene_Map
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
OverLordFan._ScreenShake._updateMap = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    OverLordFan._ScreenShake._updateMap.call(this);

   //-------------------------------------------------------map screen shake
   if ($gameSystem._shakeTimeMap) {
    var shakeXMap = (Math.randomInt($gameSystem._shakeLevelMap) - Math.randomInt($gameSystem._shakeLevelMap)) * (Math.min($gameSystem._shakeTimeMap, 30) * 0.5);
    var shakeYMap = (Math.randomInt($gameSystem._shakeLevelMap) - Math.randomInt($gameSystem._shakeLevelMap)) * (Math.min($gameSystem._shakeTimeMap, 30) * 0.5);
    if ($gameSystem._shakeTimeMap <= 1) {
        this.x = 0;
        this.y = 0;
    } else {
        this.x = shakeXMap;
        this.y = shakeYMap;
    }
    $gameSystem._shakeTimeMap--;
  }
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Scene_Battle
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
OverLordFan._ScreenShake._Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
    OverLordFan._ScreenShake._Scene_Battle_update.call(this);

  //-------------------------------------------------------battle screen shake
 if ($gameSystem._shakeTime) {
  var shakeX = (Math.randomInt($gameSystem._shakeLevel) - Math.randomInt($gameSystem._shakeLevel)) * (Math.min($gameSystem._shakeTime, 30) * 0.5);
  var shakeY = (Math.randomInt($gameSystem._shakeLevel) - Math.randomInt($gameSystem._shakeLevel)) * (Math.min($gameSystem._shakeTime, 30) * 0.5);
  if ($gameSystem._shakeTime <= 1) {
      this.x = 0;
      this.y = 0;
  } else {
      this.x = shakeX;
      this.y = shakeY;
  }
  $gameSystem._shakeTime--;
  }
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>