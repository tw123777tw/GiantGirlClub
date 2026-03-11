//=============================================================================
// TMPlugin - キャラクター表示拡張
// バージョン: 2.0.2
// 最終更新日: 2016/12/03
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc TM事件显示增强
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param landingAnimation
 * @text 着陆动画
 * @desc 在跳跃后的着陆时自动应用放大修正率。  
 * 初始值：1（0为无效/1为有效）
 * @default 1
 *
 * @help
     汉化；硕明云书
  
 *   使用方法：
 *
 *   通过在事件的备注栏中写入标签，可以设置显示位置、放大率和旋转角度。
 *
 *   如果希望围绕图形的中心进行旋转，请与 angle 标签一起使用
 *   <anchorY:0.5> 请进行设置。
*
*   当事件页面发生变化时，下一页面没有标签设置的参数会继承变化前的状态。
*
*   该插件已在 RPG Maker MV 版本1.3.4中进行了功能验证
*
*
 * 备注栏（事件）标签：
 *
*   <chrShift:0 0>         # 修改位置补正值
*   <chrAngle:0>           # 修改旋转角度 (0 ～ 359)
*   <chrScale:1.0 1.0>     # 修改放大率 (1.0 为等倍)
*   <chrAnchor:0.5 1.0>    # 修改中心位置anchorX  anchorY 值 0（左上角）到 1（右下角）之间
* 
*   两个数值的标签分别指定X方向和Y方向的设置。
* 
*   除了事件的备注栏外，还可以在执行内容的最上方的注释命令中使用相同的标签设置参数
*   如果备注栏和注释中都有标签，注释优先
 *
 *
* 插件命令：
*
*   chrShift 1 5 -3
*     将事件 1 向右移动 5 像素，向上移动 3 像素。
*
*   chrAngle 1 90
*     将事件 1 旋转 90 度。
*
*   chrScale 2 1.5 0.5
*     将事件 2 的宽度放大 50%，高度缩小至一半。
*
*   chrScaleRate 3 1.3 0.7
*     将事件 3 的放大修正率设置为宽度 1.3 倍，高度 0.7 倍。
*     放大修正率与通过 setChrScale 设置的放大率分别相乘，且会随着时间推移恢复为原始比例。
*
*   chrClear 1
*     解除适用于事件 1 的所有 chrShift、chrAngle 和 chrScale 的效果。
*
*   事件编号（第一个数字）按照以下规则指定目标：
*     -1     … 目标为玩家
*     0      … 目标为执行命令的事件
*     1 以上 … 目标为该编号的事件
 *
 *
* 脚本命令：
*
*   this.setChrShift(-10, 5)
*     将该事件的位置向左移动10，向下移动5。
*
*   this.setChrAngle(180)
*     将该事件旋转180度。
*
*   this.setChrScale(2, 1)
*     将该事件的宽度扩大至2倍。
*
*   this.setChrScaleRate(1, 1.5)
*     将该事件的放大修正率设置为宽度保持不变，高度为1.5倍。
*
*   在事件命令“移动路线设置”中无法使用插件命令，请使用上述脚本作为替代。
 */

var Imported = Imported || {};
Imported.TMCharacterEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.CharacterEx = {};
TMPlugin.CharacterEx.Parameters = PluginManager.parameters('TMCharacterEx');
TMPlugin.CharacterEx.LandingAnimation = TMPlugin.CharacterEx.Parameters['landingAnimation'] === '1';

if (!TMPlugin.EventBase) {
  TMPlugin.EventBase = true;
  (function() {

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName];
    };

  })();
} // TMPlugin.EventBase

if (!TMPlugin.InterpreterBase) {
  TMPlugin.InterpreterBase = true;
  (function() {

    Game_Interpreter.prototype.convertEscapeCharactersTM = function(text) {
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberNameTM(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
      return text;
    };
  
    Game_Interpreter.prototype.actorNameTM = function(n) {
      var actor = n >= 1 ? $gameActors.actor(n) : null;
      return actor ? actor.name() : '';
    };

    Game_Interpreter.prototype.partyMemberNameTM = function(n) {
      var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
      return actor ? actor.name() : '';
    };

  })();
} // TMPlugin.InterpreterBase

(function() {

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this.initChrParams();
  }
  
  Game_CharacterBase.prototype.initChrParams = function() {
    this._chrShiftX     = 0;
    this._chrShiftY     = 0;
    this._chrAngle      = 0;
    this._chrScaleX     = 1.0;
    this._chrScaleY     = 1.0;
    this._chrAnchorX    = 0.5;
    this._chrAnchorY    = 1;
    this._chrScaleRateX = 1;
    this._chrScaleRateY = 1;
  };

  var _Game_CharacterBase_screenX = Game_CharacterBase.prototype.screenX;
  Game_CharacterBase.prototype.screenX = function() {
    return _Game_CharacterBase_screenX.call(this) + this._chrShiftX;
  };

  var _Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;
  Game_CharacterBase.prototype.screenY = function() {
    return _Game_CharacterBase_screenY.call(this) + this._chrShiftY;
  };

  Game_CharacterBase.prototype.screenAngle = function() {
    return this._chrAngle;
  };

  Game_CharacterBase.prototype.screenScaleX = function() {
    return this._chrScaleX * this._chrScaleRateX;
  };

  Game_CharacterBase.prototype.screenScaleY = function() {
    return this._chrScaleY * this._chrScaleRateY;
  };
  
  Game_CharacterBase.prototype.screenAnchorX = function() {
    return this._chrAnchorX;
  };
  
  Game_CharacterBase.prototype.screenAnchorY = function() {
    return this._chrAnchorY;
  };
  
  Game_CharacterBase.prototype.setChrShift = function(shiftX, shiftY) {
    if (shiftX != null && shiftY != null) {
      this._chrShiftX = +shiftX;
      this._chrShiftY = +shiftY;
    }
  };
  
  Game_CharacterBase.prototype.setChrAngle = function(angle) {
    if (angle != null) {
      this._chrAngle = angle * Math.PI / 180;
    }
  };
  
  Game_CharacterBase.prototype.setChrScale = function(scaleX, scaleY) {
    if (scaleX != null && scaleY != null) {
      this._chrScaleX = +scaleX;
      this._chrScaleY = +scaleY;
    }
  };

  Game_CharacterBase.prototype.setChrScaleRate = function(scaleRateX, scaleRateY) {
    if (scaleRateX != null && scaleRateY != null) {
      this._chrScaleRateX = +scaleRateX;
      this._chrScaleRateY = +scaleRateY;
    }
  };

  Game_CharacterBase.prototype.setChrAnchor = function(anchorX, anchorY) {
    if (anchorX != null && anchorY != null) {
      this._chrAnchorX = +anchorX;
      this._chrAnchorY = +anchorY;
    }
  };

  var _Game_CharacterBase_updateJump = Game_CharacterBase.prototype.updateJump;
  Game_CharacterBase.prototype.updateJump = function() {
    _Game_CharacterBase_updateJump.call(this);
    if (TMPlugin.CharacterEx.LandingAnimation && this._jumpCount === 0) {
      this.setChrScaleRate(1.3, 0.7);
    }
  };

  var _Game_CharacterBase_updateAnimation = Game_CharacterBase.prototype.updateAnimation;
  Game_CharacterBase.prototype.updateAnimation = function() {
    _Game_CharacterBase_updateAnimation.call(this);
    if (this._chrScaleRateX < 1) {
      this._chrScaleRateX = Math.min(this._chrScaleRateX + 0.05, 1);
    } else if (this._chrScaleRateX > 1) {
      this._chrScaleRateX = Math.max(this._chrScaleRateX - 0.05, 1);
    }
    if (this._chrScaleRateY < 1) {
      this._chrScaleRateY = Math.min(this._chrScaleRateY + 0.05, 1);
    } else if (this._chrScaleRateY > 1) {
      this._chrScaleRateY = Math.max(this._chrScaleRateY - 0.05, 1);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //
  
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      var chrShift = this.loadTagParam('chrShift');
      if (chrShift) this.setChrShift.apply(this, chrShift.split(' '));
      this.setChrAngle(this.loadTagParam('chrAngle'));
      var chrScale = this.loadTagParam('chrScale');
      if (chrScale) this.setChrScale.apply(this, chrScale.split(' '));
      var chrAnchor = this.loadTagParam('chrAnchor');
      if (chrAnchor) this.setChrAnchor.apply(this, chrAnchor.split(' '));
    } else {
      this.initChrParams();
    }
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'chrShift') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrShift(arr[1], arr[2]);
    } else if (command === 'chrAngle') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrAngle(arr[1]);
    } else if (command === 'chrScale') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrScale(arr[1], arr[2]);
    } else if (command === 'chrScaleRate') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) character.setChrScaleRate(arr[1], arr[2]);
    } else if (command === 'chrClear') {
      var arr = args.map(this.convertEscapeCharactersTM, this);
      var character = this.character(+arr[0]);
      if (character) {
        character.setChrShift(0, 0);
        character.setChrAngle(0);
        character.setChrScale(1.0, 1.0);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //
  
  var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function() {
    _Sprite_Character_updateOther.call(this);
    this.rotation = this._character.screenAngle();
    this.scale.set(this._character.screenScaleX(), this._character.screenScaleY());
    this.anchor.set(this._character.screenAnchorX(), this._character.screenAnchorY());
  };

})();
