//==============================================================================
// MKR_PlayerMoveForbid.js
//==============================================================================
// Copyright (c) 2016-2017 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// Version
// 1.0.5 2017/12/10 移動禁止の間、決定キーを動作させるかのフラグを追加
//
// 1.0.4 2017/08/27 プラグインパラメータの指定方法を変更
//
// 1.0.3 2017/05/24 メニュー開閉フラグが正常に動作していなかったため修正
//
// 1.0.2 2017/02/19 移動禁止の間、メニュー開閉を行えるかのフラグを追加
//
// 1.0.1 2016/09/04 未使用のコードを削除しファイル容量を小さくした。
//                  デフォルト値の設定が不適切だったので修正。
//
// 1.0.0 2016/09/04 初版公開。
// -----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//==============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0.5) 玩家禁止移动
 * @author マンカインド
 *
 * @help 在玩家移动指定编号的开关接通期间
*禁止通过玩家操作移动角色。
*
*在插件参数“禁止移动开关”中指定开关编号。
*指定编号的开关接通时
*无法通过玩家操作移动角色。
*（可以使用“移动路线设置”命令等移动）
*
*通过[菜单开闭控制]，[移动禁止开关]接通期间
*可控制菜单打开和关闭。
*
*通过[决定键控制]，[移动禁止开关]接通期间
*可控制通过决定键/触摸操作进行的动作（主要是事件的启动）。禁止移动插件
 *
 *
 * 插件命令：
 *   没有
 *
 *
 * 脚本命令：
 *   没有
 *
 *
*使用条款：
*・可以擅自对作者进行本插件的修改、再分发。
*（但请保留页眉的版权显示部分）
*
*・使用形态（自由游戏、商用游戏、R-18作品等）没有限制。
*请自由使用。
*
*・对于使用本插件发生的问题，作者应承担一切责任
*不承担。
*
*・有要求等时，进行本插件的版本升级
*可能
*版本升级可能会更改本插件的规格。
*请谅解。
 *
 *
 * @param Default_Move_Flag
 * @text 移动禁止开关
 * @desc 指定ON期间禁止玩家移动的开关编号。（默认值：10）
 * @type switch
 * @default 10
 *
 * @param Default_Menu_Flag
 * @text 菜单开关控制
 * @desc 在禁止玩家移动的期间，设定是否允许打开和关闭菜单(デフォルト:許可する)
 * @type boolean
 * @on 允许
 * @off 不允许
 * @default true
 *
 * @param Enter Flag
 * @text 确定键控制
 * @desc 在禁止玩家移动的期间，设定是否允许通过决定键/触摸操作进行动作。（默认：允许）
 * @type boolean
 * @on 許可する
 * @off 許可しない
 * @default true
 *
*/
(function () {
    'use strict';

    const PN = "MKR_PlayerMoveForbid";

    const CheckParam = function(type, param, def, min, max) {
        let Parameters, regExp, value;
        Parameters = PluginManager.parameters(PN);

        if(arguments.length < 4) {
            min = -Infinity;
            max = Infinity;
        }
        if(arguments.length < 5) {
            max = Infinity;
        }
        if(param in Parameters) {
            value = String(Parameters[param]);
        } else {
            throw new Error("[CheckParam] プラグインパラメーターがありません: " + param);
        }

        switch(type) {
            case "bool":
                if(value == "") {
                    value = (def)? true : false;
                }
                value = value.toUpperCase() === "ON" || value.toUpperCase() === "TRUE" || value.toUpperCase() === "1";
                break;
            case "switch":
                if(value == "") {
                    value = (def != "")? def : value;
                }
                if(!value.match(/^(\d+)$/i)) {
                    throw new Error("[CheckParam] " + param + "の値がスイッチではありません: " + param + " : " + value);
                }
                break;
            default:
                throw new Error("[CheckParam] " + param + "のタイプが不正です: " + type);
                break;
        }

        return [value, type, def, min, max, param];
    }

    const Params = {
        "MoveSwitch" : CheckParam("switch", "Default_Move_Flag", "10"),
        "MenuFlg" : CheckParam("bool", "Default_Menu_Flag", true),
        "EnterFlg" : CheckParam("bool", "Enter Flag", true),
    };


    //=========================================================================
    // Game_System
    //  ・メニュー開閉許可処理を再定義します。
    //
    //=========================================================================
    const _Game_System_isMenuEnabled = Game_System.prototype.isMenuEnabled;
    Game_System.prototype.isMenuEnabled = function() {
        return _Game_System_isMenuEnabled.call(this)
            && ($gameSwitches.value(Params.MoveSwitch[0]) ? Params.MenuFlg[0] == true : true);
    };


    //=========================================================================
    // Game_Player
    //  ・プレイヤーの移動処理を再定義します。
    //
    //=========================================================================
    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        if(!$gameSwitches.value(Params.MoveSwitch[0])) {
            _Game_Player_executeMove.call(this, direction);
        }
    };

    const _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } else {
            _Game_Player_triggerButtonAction.call(this);
        }
        return false;
    };

    const _Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } else {
            _Game_Player_triggerTouchAction.call(this);
        }
        return false;
    };

})();