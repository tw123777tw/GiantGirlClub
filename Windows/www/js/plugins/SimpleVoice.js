﻿//=============================================================================
// SimpleVoice.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.3 2020/04/15 1.1.2の修正で同時再生したボイスの停止が動作しない問題を修正
// 1.1.2 2020/04/08 異なるチャンネルで短い間隔で複数のボイスを再生した場合に、先に再生したボイスが演奏されない問題を修正
// 1.1.1 2019/01/22 イベント高速化で再生したとき、SV_STOP_VOICEが効かなくなる場合がある問題を修正
// 1.1.0 2017/07/16 ボイスのチャンネル指定機能を追加。同一チャンネルのボイスが同時再生されないようになります。
// 1.0.1 2017/06/26 英語表記のプラグインコマンドの指定方法を変更
// 1.0.0 2017/06/25 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 简单语音插件
 * @author triacontane
 *
 * @param FolderName
 * @type string
 * @desc 存储语音文件的文件夹名称。
 * @default voice
 *
 * @param OptionName
 * @type string
 * @desc 选项画面中显示的语音音量的设定项目名称。
 * @default ボイス 音量
 *
 * @param OptionValue
 * @type number
 * @desc 语音音量的初始值。
 * @default 100
 *
 * @help 简单支持音效播放。
 * 能分开普通的效果音和收纳文件夹，
 * 此外在游戏开始画面能另行设定音量。
 *
 * 播放与循环播放可通过插件指令执行。
 *
 * 插件指令详情
 *  通过“事件指令——插件指令”执行。
 *  （各参数间用半角空格隔开）
 *
 * SV_ボイスの演奏 aaa 90 100 0 2 # 播放指定音效。
 * SV_PLAY_VOICE aaa 90 100 0 2   # 同上
 * ※具体自变数如下：
 * 0 : ファイル名（不要扩展名）
 * 1 : 音量（不要扩展名）
 * 2 : 音高（或是强度，英语pitch）缺省值为100
 * 3 : 相位（缺省值0）
 * 4 : 频道号码
 *
 * 如果设定频道号的话，在停止时会归到设定的频道。
 * 所有音效均可一同停止，
 * 经此可阻止同一频道的音效叠加播放。
 *
 * SV_ボイスのループ演奏 aaa 90 100 0 # 循环播放指定音效
 * SV_PLAY_LOOP_VOICE aaa 90 100 0    # 同上
 *
 * SV_ボイスの停止 aaa # 停播指定音效aaa。
 * SV_STOP_VOICE aaa   # 同上
 * SV_ボイスの停止 1   # 停播所有通过频道【1】重播的音效。
 * SV_STOP_VOICE 1     # 同上
 * ※如果不写自变数，所有音效都会停止。
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc 簡易ボイスプラグイン
 * @author トリアコンタン
 *
 * @param フォルダ名
 * @type string
 * @desc 存储语音文件的文件夹名称。
 * @default voice
 *
 * @param オプション名称
 * @type string
 * @desc 选项画面中显示的语音音量的设定项目名称。
 * @default ボイス 音量
 *
 * @param オプション初期値
 * @type number
 * @desc ボイス音量の初期値です。
 * @default 100
 *
 * @help ボイス演奏を簡易サポートします。
 * 通常の効果音とは格納フォルダを分けられるほか、オプション画面で
 * 別途音量指定が可能になります。
 *
 * 演奏及びループ演奏はプラグインコマンドから行います。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * SV_ボイスの演奏 aaa 90 100 0 2 # 指定したボイスを演奏します。
 * SV_PLAY_VOICE aaa 90 100 0 2   # 同上
 * ※具体的な引数は以下の通りです。
 * 0 : ファイル名(拡張子不要)
 * 1 : 音量(省略した場合は90)
 * 2 : ピッチ(省略した場合は100)
 * 3 : 位相(省略した場合は0)
 * 4 : チャンネル番号
 *
 * チャンネル番号(数値)を指定すると、停止するときに指定したチャンネルと一致する
 * すべてのボイスを一度に停止することができます。
 * これにより同一のチャンネルのボイスが重なって演奏されないようになります。
 *
 * SV_ボイスのループ演奏 aaa 90 100 0 # 指定したボイスをループ演奏します。
 * SV_PLAY_LOOP_VOICE aaa 90 100 0    # 同上
 *
 * SV_ボイスの停止 aaa # ボイスaaaの演奏を停止します。
 * SV_STOP_VOICE aaa   # 同上
 * SV_ボイスの停止 1   # チャンネル[1]で再生した全てのボイスの演奏を停止します。
 * SV_STOP_VOICE 1     # 同上
 * ※引数を省略した場合は全てのボイスを停止します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    var pluginName    = 'SimpleVoice';
    var metaTagPrefix = 'SV_';

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(arg) || 0).clamp(min, max);
    };

    var convertEscapeCharacters = function(text) {
        if (isNotAString(text)) text = '';
        var windowLayer = SceneManager._scene._windowLayer;
        return windowLayer ? windowLayer.children[0].convertEscapeCharacters(text) : text;
    };

    var isNotAString = function(args) {
        return String(args) !== args;
    };

    var convertAllArguments = function(args) {
        for (var i = 0; i < args.length; i++) {
            args[i] = convertEscapeCharacters(args[i]);
        }
        return args;
    };

    var setPluginCommand = function(commandName, methodName) {
        pluginCommandMap.set(metaTagPrefix + commandName, methodName);
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var param         = {};
    param.folderName  = getParamString(['FolderName', 'フォルダ名']);
    param.optionName  = getParamString(['OptionName', 'オプション名称']);
    param.optionValue = getParamNumber(['OptionValue', 'オプション初期値']);

    var pluginCommandMap = new Map();
    setPluginCommand('ボイスの演奏', 'execPlayVoice');
    setPluginCommand('PLAY_VOICE', 'execPlayVoice');
    setPluginCommand('ボイスのループ演奏', 'execPlayLoopVoice');
    setPluginCommand('PLAY_LOOP_VOICE', 'execPlayLoopVoice');
    setPluginCommand('ボイスの停止', 'execStopVoice');
    setPluginCommand('STOP_VOICE', 'execStopVoice');

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var pluginCommandMethod = pluginCommandMap.get(command.toUpperCase());
        if (pluginCommandMethod) {
            this[pluginCommandMethod](convertAllArguments(args));
        }
    };

    Game_Interpreter.prototype.execPlayVoice = function(args, loop) {
        var voice    = {};
        voice.name   = args.length >= 1 ? args[0] : '';
        voice.volume = args.length >= 2 ? getArgNumber(args[1], 0, 100) : 90;
        voice.pitch  = args.length >= 3 ? getArgNumber(args[2], 50, 150) : 100;
        voice.pan    = args.length >= 4 ? getArgNumber(args[3], -100, 100) : 0;
        var channel  = args.length >= 5 ? getArgNumber(args[4], 1) : undefined;
        AudioManager.playVoice(voice, loop || false, channel);
    };

    Game_Interpreter.prototype.execPlayLoopVoice = function(args) {
        this.execPlayVoice(args, true);
    };

    Game_Interpreter.prototype.execStopVoice = function(args) {
        var channel = Number(args[0]);
        if (isNaN(channel)) {
            AudioManager.stopVoice(args[0], null);
        } else {
            AudioManager.stopVoice(null, channel);
        }
    };

    //=============================================================================
    // ConfigManager
    //  ボイスボリュームの設定機能を追加します。
    //=============================================================================
    Object.defineProperty(ConfigManager, 'voiceVolume', {
        get: function() {
            return AudioManager._voiceVolume;
        },
        set: function(value) {
            AudioManager.voiceVolume = value;
        }
    });

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData      = function() {
        var config         = _ConfigManager_makeData.apply(this, arguments);
        config.voiceVolume = this.voiceVolume;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData      = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        var symbol       = 'voiceVolume';
        this.voiceVolume = config.hasOwnProperty(symbol) ? this.readVolume(config, symbol) : param.optionValue;
    };

    //=============================================================================
    // Window_Options
    //  ボイスボリュームの設定項目を追加します。
    //=============================================================================
    var _Window_Options_addVolumeOptions      = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function() {
        _Window_Options_addVolumeOptions.apply(this, arguments);
        this.addCommand(param.optionName, 'voiceVolume');
    };

    //=============================================================================
    // AudioManager
    //  ボイスの演奏機能を追加定義します。
    //=============================================================================
    Object.defineProperty(AudioManager, 'voiceVolume', {
        get: function() {
            return this._voiceVolume;
        },
        set: function(value) {
            this._voiceVolume = value;
        }
    });

    AudioManager.updateVoiceParameters = function(buffer, voice) {
        this.updateBufferParameters(buffer, this._voiceVolume, voice);
    };

    AudioManager._voiceBuffers = [];
    AudioManager._voiceVolume  = 100;
    AudioManager.playVoice     = function(voice, loop, channel) {
        if (voice.name) {
            this.stopVoice(voice.name, channel);
            var buffer = this.createBuffer(param.folderName, voice.name);
            this.updateVoiceParameters(buffer, voice);
            buffer.play(loop);
            buffer.name = voice.name;
            buffer.channel = channel;
            this._voiceBuffers.push(buffer);
        }
    };

    AudioManager.stopVoice = function(name, channel) {
        this._voiceBuffers.forEach(function(buffer) {
            if (!name && !channel || buffer.name === name || buffer.channel === channel) {
                buffer.stop();
            }
        });
        this.filterPlayingVoice();
    };

    AudioManager.filterPlayingVoice = function() {
        this._voiceBuffers = this._voiceBuffers.filter(function(buffer) {
            var playing = buffer.isPlaying() || !buffer.isReady();
            if (!playing) {
                buffer.stop();
            }
            return playing;
        });
    };

    var _AudioManager_stopAll = AudioManager.stopAll;
    AudioManager.stopAll = function() {
        _AudioManager_stopAll.apply(this, arguments);
        this.stopVoice();
    };

    //=============================================================================
    // Scene_Base
    //  フェードアウト時にSEの演奏も停止します。
    //=============================================================================
    var _Scene_Base_fadeOutAll = Scene_Base.prototype.fadeOutAll;
    Scene_Base.prototype.fadeOutAll = function() {
        _Scene_Base_fadeOutAll.apply(this, arguments);
        AudioManager.stopVoice();
    };
})();
