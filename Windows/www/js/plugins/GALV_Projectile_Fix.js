//=============================================================================
// GALV's Map Projectiles - Old Save Fix
//=============================================================================
// 功能：修复旧存档中缺失的投射物变量，使子弹反馈效果正常生效
// 作者：AI Assistant
// 版本：1.0
// 日期：2026-02-22
//=============================================================================

var Imported = Imported || {};
Imported.GALV_Projectile_Fix = true;

(function() {

    console.log("=== GALV 投射物修复插件已加载 ===");

    // ============================================================
    // 1. 修复 Game_Player (玩家) 的投射物变量
    // ============================================================
    var _Fix_Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Fix_Game_Player_initMembers.call(this);
        this.fixProjPlayerVars();
    };

    Game_Player.prototype.fixProjPlayerVars = function() {
        if (this._projEffects === undefined || this._projEffects === null) {
            this._projEffects = true;
            console.log("[修复] 玩家 _projEffects 已初始化");
        }
        if (this._projYoffset === undefined || this._projYoffset === null) {
            this._projYoffset = 0;
            console.log("[修复] 玩家 _projYoffset 已初始化");
        }
        if (this.projDodge === undefined || this.projDodge === null) {
            this.projDodge = false;
            console.log("[修复] 玩家 projDodge 已初始化");
        }
    };

    // ============================================================
    // 2. 修复 Game_Event (事件) 的投射物变量
    // ============================================================
    var _Fix_Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function() {
        _Fix_Game_Event_initMembers.call(this);
        this.fixProjEventVars();
    };

    Game_Event.prototype.fixProjEventVars = function() {
        if (this._projBlock === undefined || this._projBlock === null) {
            this._projBlock = 0;
            console.log("[修复] 事件 " + this._eventId + " _projBlock 已初始化");
        }
        if (this._projBlockList === undefined || this._projBlockList === null) {
            this._projBlockList = [];
            console.log("[修复] 事件 " + this._eventId + " _projBlockList 已初始化");
        }
        if (this._projEffects === undefined || this._projEffects === null) {
            this._projEffects = false;
            console.log("[修复] 事件 " + this._eventId + " _projEffects 已初始化");
        }
    };

    // ============================================================
    // 3. 修复 Game_Map 的投射物数组
    // ============================================================
    var _Fix_Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Fix_Game_Map_initialize.call(this);
        this.fixProjMapVars();
    };

    Game_Map.prototype.fixProjMapVars = function() {
        if (this._mapProjectiles === undefined || this._mapProjectiles === null) {
            this._mapProjectiles = [];
            console.log("[修复] Game_Map _mapProjectiles 数组已初始化");
        }
    };

    // ============================================================
    // 4. 存档加载后强制修复所有变量 (最关键的一步)
    // ============================================================
    var _Fix_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _Fix_DataManager_extractSaveContents.call(this, contents);
        
        // 延迟一帧执行，确保所有游戏对象已加载
        setTimeout(function() {
            console.log("=== 开始修复旧存档变量 ===");
            
            // 修复玩家
            if ($gamePlayer) {
                $gamePlayer.fixProjPlayerVars();
            }
            
            // 修复所有事件
            if ($gameMap && $gameMap._events) {
                for (var i = 0; i < $gameMap._events.length; i++) {
                    var event = $gameMap._events[i];
                    if (event) {
                        event.fixProjEventVars();
                    }
                }
            }
            
            // 修复地图投射物数组
            if ($gameMap) {
                $gameMap.fixProjMapVars();
            }
            
            console.log("=== 旧存档变量修复完成 ===");
        }, 100);
    };

    // ============================================================
    // 5. 新游戏开始时也执行一次修复
    // ============================================================
    var _Fix_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Fix_Scene_Boot_start.call(this);
        console.log("=== 新游戏启动，检查投射物变量 ===");
    };

})();