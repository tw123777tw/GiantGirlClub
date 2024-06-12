/*---------------------------------------------------------------------------*
 * Torigoya_Achievement.js
 *---------------------------------------------------------------------------*
 * 2018/09/09 ru_shalm
 * http://torigoya.hatenadiary.jp/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 【RU成就系统】主体插件   R2
 * @author ru_shalm 汉化:硕明云书
 *
 * @param ■ 基本
 *
 * @param Common Event ID
 * @text 公共事件ID
 * @type common_event
 * @desc 描述注释的共同事件 ID
 * @default 1
 *
 * @param Storage Key
 * @text 存储键
 * @type string
 * @desc [WEB] 保存名称；如果要在一个网站上发布多个游戏，请为每个游戏使用不同的名称
 * @default Achievement: Game
 *
 * @param ■ 弹出式显示
 *
 * @param Use Popup
 * @text 使用弹出窗口
 * @type select
 * @option ON
 * @option OFF
 * @desc 弹出式显示开启/关闭
 * ON: 显示　OFF: 不显示　（default: ON）
 * @default ON
 *
 * @param Popup Position
 * @text 弹出位置
 * @type select
 * @option left
 * @option right
 * @desc 显示信息的位置
 * left: 左上  right: 右上
 * @default left
 *
 * @param Popup Width
 * @text 弹出窗口宽度
 * @type number
 * @min 200
 * @desc 弹出显示宽度（px）
 * 最小值至少设置为 200
 * @default 250
 *
 * @param Popup Wait
 * @text 弹出窗口等待
 * @type number
 * @decimals 2
 * @min 0
 * @desc 弹出显示时间（秒）。
 * 不包括淡入/淡出时间
 * @default 0.75
 *
 * @param Popup Message
 * @text 弹出消息
 * @type string
 * @desc 获取时显示的信息
 * @default 获得成就
 *
 * @param Popup Sound
 * @text 弹出声音se
 * @desc 获取时要播放的音效 (SE) 名称。
 * 留空则不播放
 * @default Saint5
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param Popup Window Image
 * @text 弹出窗口图片
 * @desc 弹出显示屏所用窗口图像的文件名（默认值：Window）
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Popup Opacity
 * @text 弹出窗口不透明度
 * @desc 弹出显示窗口背景的透明度（0-255）。
 * 如果为-1，则使用默认透明度。
 * @type number
 * @min -1
 * @max 255
 * @default -1
 *
 * @param ■ 标题/菜单
 *
 * @param Use Title
 * @text 标题使用？
 * @type select
 * @option ON
 * @option OFF
 * @desc 您想在标题屏幕上显示项目吗
 * ON: 表示　OFF: 不表示　（default: ON）
 * @default ON
 *
 * @param Use Menu
 * @text 菜单使用
 * @type select
 * @option ON
 * @option OFF
 * @desc 您想在菜单屏幕上显示项目吗？
 * ON: 表示　OFF: 不表示　（default: ON）
 * @default ON
 *
 * @param Menu Text
 * @text 菜单文本
 * @type string
 * @desc 菜单中显示项目时的标题/名称
 * @default 成就
 *
 * @param ■ 成就画面
 *
 * @param List Hidden Title
 * @text 未解锁描述
 * @type string
 * @desc 未解锁的成就名称
 * @default ？？？？？
 *
 * @param List Hidden Description
 * @text 列表隐藏说明
 * @type string
 * @desc 未解锁成就说明
 * @default [尚未获得]
 *
 * @param List Hidden Icon
 * @text 列表隐藏图标
 * @type number
 * @min 0
 * @desc 未解锁成就图标 ID。
 * @default 16
 *
 * @param List Cancel Message
 * @text 关闭屏幕文本
 * @type string
 * @desc 关闭屏幕的按钮文本。
 * 如果留空，则不显示关闭按钮
 * @default 关闭
 *
 * @param ■ 高级设置
 *
 * @param Use Global Save
 * @text 使用全局保存
 * @type select
 * @option ON
 * @option OFF
 * @desc 将成就与所有保存的数据共享？　如果关闭，则无法将成就菜单放在标题屏幕上
 * ON: 全局　OFF: 关闭　（default: ON）
 * @default ON
 *
 * @help
 * ------------------------------------------------------------
 * 该插件需要Torigoya_Tween.js
 *（没有它，弹出显示将无法工作）
 * 定义一个类似于成就/奖杯的系统。
 * 可通过在 "共同事件 "中描述来添加成就项目。
 * ------------------------------------------------------------
   快速设置：

   打开公共事件选择绑定后的对应ID
   利用注释功能：

id: 1
icon: 89
secret: true
secretTitle: 球类明星
title: 球类明星
成功击败对手球员！


  用分歧条件判断是否获取此成就脚本：
  Torigoya.Achievement.Manager.isUnlocked(1)
  或
  Torigoya.Achievement.Manager.isAllUnlocked(1, 2, 3, 4, 5)


  如果想要制作成就书可以用插件命令：" 実績表示 "
  如果想要脚本调用：
  SceneManager.push(Torigoya.Achievement.Scene_Achievement);

-------------------------------------------------------------------------

  这个插件还有个附加插件Torigoya_Achievement_Tile.js
  它可以将成就列表屏幕的显示方式更改为平铺图标显示！

 * ------------------------------------------------------------
 * 有关如何使用该系统的更多信息，请参阅博客
 * http://torigoya.hatenadiary.jp/entry/achievement_mv
 * 使用条款：
 * 该插件可以免费使用。
 * 没有费用、修改、分发等方面的限制
 *
 * ------------------------------------------------------------
 * ■ 插件命令
 * ------------------------------------------------------------
 *
 * ● 実績ID:1番を解除します
 * 実績 1
 *
 * ● 実績画面を表示
 * 実績表示
 */

(function (global) {
    'use strict';

    var Achievement = {
        name: 'Torigoya_Achievement'
    };
    Achievement.settings = (function () {
        var parameters = PluginManager.parameters(Achievement.name);
        return {
            commonEventID: Number(parameters['Common Event ID'] || 1),
            storageKey: String(parameters['Storage Key'] || 'Achievement-Game'),
            usePopup: String(parameters['Use Popup'] || 'ON') === 'ON',
            popupPosition: String(parameters['Popup Position'] || 'left'),
            popupWidth: Number(parameters['Popup Width'] || 250),
            popupMessage: String(parameters['Popup Message'] || '実績を獲得しました'),
            popupSound: String(parameters['Popup Sound'] || ''),
            popupWait: Number(parameters['Popup Wait'] || 0.75),
            popupWindowImage: String(parameters['Popup Window Image'] || 'Window'),
            popupOpacity: Number(parameters['Popup Opacity'] === undefined ? -1 : parameters['Popup Opacity']),
            listHiddenTitle: String(parameters['List Hidden Title'] || '？？？？？'),
            listHiddenDescription: String(parameters['List Hidden Description'] || ''),
            listHiddenIcon: Number(parameters['List Hidden Icon'] || 0),
            listCancel: String(parameters['List Cancel Message']),
            useTitle: String(parameters['Use Title'] || 'ON') === 'ON',
            useMenu: String(parameters['Use Menu'] || 'ON') === 'ON',
            menuText: String(parameters['Menu Text'] || '実績'),
            useGlobalSave: String(parameters['Use Global Save'] || 'ON') === 'ON'
        };
    })();

    // -------------------------------------------------------------------------
    // Constant

    // 内部処理用に使うユニークなスロット名
    // 実際のファイル名/キー名は設定のものを使う
    Achievement.saveSlotID = 'Torigoya Achievement';

    // -------------------------------------------------------------------------
    // AchievementItem

    var AchievementItem = (function () {
        function AchievementItem() {
            this.id = 0;
            this.icon = 0;
            this.title = '';
            this.description = '';
            this.isSecret = false;
            this.secretTitle = '';
            this.secretDescription = '';

            if (arguments.length === 1) {
                var obj = arguments[0];
                Object.keys(obj).forEach(function (key) {
                    this[key] = obj[key];
                }.bind(this));
            } else {
                // 互換維持
                this.id = arguments[0];
                this.icon = arguments[1];
                this.title = arguments[2];
                this.description = arguments[3];
                this.isSecret = !!arguments[4];
            }
        }

        AchievementItem.parse = function (array) {
            var id, icon, title, description = '', secret = false,
                secretTitle = '', secretDescription = '';
            array.forEach(function (line) {
                var match;
                if (!id && (match = line.match(/^\s*id:\s*(\d+)/))) {
                    id = ~~match[1];
                } else if (!icon && (match = line.match(/^\s*icon:\s*(\d+)/))) {
                    icon = ~~match[1];
                } else if (!title && (match = line.match(/^\s*title:\s*(.+)\s*$/))) {
                    title = match[1];
                } else if (match = line.match(/^\s*secret:\s*(.+)\s*$/)) {
                    secret = (match[1] === 'true');
                } else if (match = line.match(/^\s*secretTitle:\s*(.+)\s*$/)) {
                    secretTitle = match[1];
                } else if (match = line.match(/^\s*secretText:\s*(.+)\s*$/)) {
                    secretDescription = match[1];
                } else {
                    description += line + '\n';
                }
            });
            return new AchievementItem({
                id: id,
                icon: icon,
                title: title,
                description: description,
                isSecret: !!secret,
                secretTitle: secretTitle,
                secretDescription: secretDescription
            });
        };

        return AchievementItem;
    })();

    // -------------------------------------------------------------------------
    // AchievementParser

    Achievement.loadFromCommonEvent = function (commonEventID) {
        var event = new Game_CommonEvent(commonEventID);

        var list = event.list();
        var result = [];
        var isRouting = false;
        for (var i = 0; i < list.length; ++i) {
            if (isRouting && list[i].code === 408) {
                result[result.length - 1].push(list[i].parameters[0]);
            } else if (list[i].code === 108 && list[i].parameters[0].indexOf('id:') === 0) {
                result.push([list[i].parameters[0]]);
                isRouting = true;
            } else {
                isRouting = false;
            }
        }

        var achievements = [];
        result.forEach(function (array, i) {
            var item = AchievementItem.parse(array);

            // merge
            for (var j = 0; j < achievements.length; ++j) {
                var prevItem = achievements[j];
                if (prevItem.id !== item.id) continue;

                Object.keys(item).forEach(function (key) {
                    if (!item[key]) return;
                    prevItem[key] = item[key];
                });
                return;
            }

            achievements.push(item);
        });

        return achievements.sort(function (a, b) {
            return a.id - b.id;
        });
    };

    // -------------------------------------------------------------------------
    // AchievementManager

    var AchievementManager = (function () {
        function AchievementManager() {
            this._achievements = [];
            this._callbacks = [];
        }

        AchievementManager.prototype.getRawAchievements = function () {
            return this._achievements;
        };

        AchievementManager.prototype.setRawAchievements = function (achievements) {
            this._achievements = achievements;
        };

        AchievementManager.prototype.data = function (id) {
            // Array#find
            for (var i = 0; i < this._items.length; ++i) {
                if (this._items[i].id === id) return this._items[i];
            }
            return null;
        };

        AchievementManager.prototype.allData = function () {
            return this._items;
        };

        AchievementManager.prototype.init = function () {
            this._items = Achievement.loadFromCommonEvent(Achievement.settings.commonEventID);
            this.load();
        };

        AchievementManager.prototype.isUnlocked = function (id) {
            return !!this._achievements[id];
        };

        AchievementManager.prototype.unlock = function (id) {
            if (this._achievements[id]) return;
            if (!this.data(id)) return;
            this._achievements[id] = Date.now();
            this.save();
            this.notify(id);
        };

        AchievementManager.prototype.on = function (callback) {
            this._callbacks.push(callback);
        };

        AchievementManager.prototype.off = function (callback) {
            this._callbacks = this._callbacks.filter(function (n) {
                return n !== callback;
            });
        };

        AchievementManager.prototype.notify = function (id) {
            var data = this.data(id);
            this._callbacks.forEach(function (callback) {
                callback(data);
            }.bind(this));
        };

        AchievementManager.prototype.load = function () {
            if (!Achievement.settings.useGlobalSave) return;

            this._achievements = this._loadAchievements();
        };

        AchievementManager.prototype.save = function () {
            if (!Achievement.settings.useGlobalSave) return;

            // [多重起動対応] 旧データとの差異があったら吸収する
            var oldData = this._loadAchievements();
            for (var i = 0; i < this._items.length; ++i) {
                this._achievements[i] = (oldData[i] || this._achievements[i]);
            }

            StorageManager.save(Achievement.saveSlotID, JSON.stringify({
                achievements: this._achievements
            }));
        };

        AchievementManager.prototype.clear = function () {
            this._achievements = [];

            if (!Achievement.settings.useGlobalSave) return;
            StorageManager.save(Achievement.saveSlotID, JSON.stringify({
                achievements: []
            }));
        };

        AchievementManager.prototype._loadAchievements = function () {
            try {
                var json = StorageManager.load(Achievement.saveSlotID);
                var obj = JSON.parse(json);
                return obj.achievements || [];
            } catch (_e) {
                return [];
            }
        };

        return new AchievementManager();
    })();

    Achievement.Manager = AchievementManager;

    // 非システムセーブ向け
    if (!Achievement.settings.useGlobalSave) {
        var upstream_DataManager_createGameObjects = DataManager.createGameObjects;
        DataManager.createGameObjects = function () {
            upstream_DataManager_createGameObjects.apply(this);
            Achievement.Manager.clear();
        };

        var upstream_DataManager_makeSaveContents = DataManager.makeSaveContents;
        DataManager.makeSaveContents = function () {
            var contents = upstream_DataManager_makeSaveContents.apply(this);
            contents.torigoyaAchievements = Achievement.Manager.getRawAchievements();
            return contents;
        };

        var upstream_DataManager_extractSaveContents = DataManager.extractSaveContents;
        DataManager.extractSaveContents = function (contents) {
            upstream_DataManager_extractSaveContents.apply(this, arguments);
            Achievement.Manager.setRawAchievements(contents.torigoyaAchievements || []);
        };
    }

    // -------------------------------------------------------------------------
    // AchievementPopupManager

    var AchievementPopupManager = (function () {
        function AchievementPopupManager() {
            this.reset();
        }

        AchievementPopupManager.prototype.init = function () {
            Torigoya.Achievement.Manager.on(this.onNotify.bind(this));
            this.reset();
        };

        AchievementPopupManager.prototype.reset = function () {
            this._stacks = [];
        };

        AchievementPopupManager.prototype.onNotify = function (item) {
            var window = new Window_AchievementPopup(item);
            SceneManager._scene.addChild(window); // 行儀悪い

            var isLeft = Achievement.settings.popupPosition === 'left';
            var x = isLeft ? 10 : Graphics.width - window.width - 10;
            var y = (function () {
                var y = 10;
                for (var i = 0; i < this._stacks.length; ++i) {
                    if (this._stacks[i].y !== y) return y;
                    y += window.height + 10;
                }
                return y;
            }.bind(this))();

            var originalOpacity = window.opacity;
            var originalBackOpacity = window.backOpacity;
            Torigoya.Tween.create(window, {
                x: x + window.width * (isLeft ? -1 : 1),
                y: y,
                opacity: 0,
                backOpacity: 0,
                contentsOpacity: 0
            })
                .to({
                    x: x,
                    opacity: originalOpacity,
                    backOpacity: originalBackOpacity,
                    contentsOpacity: 255
                }, 30, Torigoya.Tween.Easing.easeOutCircular)
                .wait(Math.floor(Achievement.settings.popupWait * 60))
                .to({
                    y: y - window.height,
                    opacity: 0,
                    backOpacity: 0,
                    contentsOpacity: 0
                }, 30, Torigoya.Tween.Easing.easeInCircular)
                .onComplete(function () {
                    this._stacks = this._stacks.filter(function (stack) {
                        return window !== stack;
                    });
                    if (window.parent) {
                        window.parent.removeChild(window);
                    }
                }.bind(this))
                .start();

            this._stacks.push(window);
            this._stacks.sort(function (a, b) {
                return a.y - b.y;
            });

            // 効果音の再生
            if (Achievement.settings.popupSound.length > 0) {
                AudioManager.playSe({
                    name: Achievement.settings.popupSound,
                    pan: 0,
                    pitch: 100,
                    volume: 90
                });
            }
        };

        return new AchievementPopupManager();
    })();

    Achievement.PopupManager = AchievementPopupManager;

    // -------------------------------------------------------------------------
    // Window_AchievementPopup

    function Window_AchievementPopup() {
        this.initialize.apply(this, arguments);
    }

    Window_AchievementPopup.prototype = Object.create(Window_Base.prototype);
    Window_AchievementPopup.prototype.constructor = Window_AchievementPopup;

    Window_AchievementPopup.prototype.initialize = function (item) {
        Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), 50);
        this.item = item;
        this.refresh();
    };

    Window_AchievementPopup.prototype.windowWidth = function () {
        return Achievement.settings.popupWidth;
    };

    Window_AchievementPopup.prototype.standardFontSize = function () {
        return 16;
    };

    Window_AchievementPopup.prototype.lineHeight = function () {
        return 20;
    };

    Window_AchievementPopup.prototype.standardPadding = function () {
        return 0;
    };

    Window_AchievementPopup.prototype.refresh = function () {
        this.contents.clear();
        this.drawIcon(this.item.icon, 10, 10);
        this.drawTitle();
        this.drawMessage();
    };

    Window_AchievementPopup.prototype.drawTitle = function () {
        this.drawTextEx('\\c[14]' + this.item.title, 50, 5);
    };

    Window_AchievementPopup.prototype.drawMessage = function () {
        var textWidth = this.windowWidth() - 60;
        this.resetTextColor();
        this.contents.fontSize = 12;
        this.contents.drawText(Achievement.settings.popupMessage, 50, 29, textWidth, 12, 'left');
    };

    Window_AchievementPopup.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem(Achievement.settings.popupWindowImage);
    };

    Window_AchievementPopup.prototype.standardBackOpacity = function () {
        return Achievement.settings.popupOpacity === -1 ?
            Window_Base.prototype.standardBackOpacity.call(this) : Achievement.settings.popupOpacity;
    };

    Achievement.Window_AchievementPopup = Window_AchievementPopup;

    // -------------------------------------------------------------------------
    // Window_AchievementPopup

    function Window_AchievementList() {
        this.initialize.apply(this, arguments);
    }

    Window_AchievementList.prototype = Object.create(Window_Selectable.prototype);
    Window_AchievementList.prototype.constructor = Window_AchievementList;

    Window_AchievementList.prototype.initialize = function (x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.makeItemList();
        this.refresh();
    };

    Window_AchievementList.prototype.maxItems = function () {
        return this._data ? this._data.length : [];
    };

    Window_AchievementList.prototype.item = function () {
        return this._data[this.index()];
    };

    Window_AchievementList.prototype.refresh = function () {
        this.contents.clear();
        this.drawAllItems();
    };

    Window_AchievementList.prototype.makeItemList = function () {
        this._data = AchievementManager.allData().map(function (achievement) {
            var unlocked = AchievementManager.isUnlocked(achievement.id);
            if (!unlocked && achievement.isSecret) {
                return {
                    title: achievement.secretTitle || Achievement.settings.listHiddenTitle,
                    description: achievement.secretDescription || Achievement.settings.listHiddenDescription,
                    icon: Achievement.settings.listHiddenIcon,
                    unlocked: unlocked
                };
            } else if (unlocked) {
                return {
                    title: achievement.title,
                    description: achievement.description,
                    icon: achievement.icon,
                    unlocked: unlocked
                };
            } else {
                return {
                    title: achievement.secretTitle || achievement.title,
                    description: achievement.secretDescription || achievement.description,
                    icon: achievement.icon,
                    unlocked: unlocked
                };
            }
        });
        if (Achievement.settings.listCancel) this._data.push(null);
    };

    Window_AchievementList.prototype.drawItem = function (index) {
        var item = this._data[index];
        var rect = this.itemRect(index);
        var iconBoxWidth = Window_Base._iconWidth + 4;
        if (item) {
            this.changePaintOpacity(item.unlocked);
            this.drawIcon(item.icon, rect.x, rect.y);
            this.drawText(item.title, rect.x + iconBoxWidth, rect.y, rect.width - iconBoxWidth, 'left');
            this.changePaintOpacity(true);
        } else {
            this.changePaintOpacity(true);
            this.drawText(Achievement.settings.listCancel, rect.x, rect.y, rect.width, 'center');
        }
    };

    Window_AchievementList.prototype.updateHelp = function () {
        this._helpWindow.clear();
        this.setHelpWindowItem(this.item());
    };

    Window_AchievementList.prototype.processOk = function () {
        if (this.item()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    };

    Achievement.Window_AchievementList = Window_AchievementList;

    // -------------------------------------------------------------------------
    // Scene_Achievement

    function Scene_Achievement() {
        this.initialize.apply(this, arguments);
    }

    Scene_Achievement.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Achievement.prototype.constructor = Scene_Achievement;

    Scene_Achievement.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Achievement.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createAchievementWindow();
    };

    Scene_Achievement.prototype.createAchievementWindow = function () {
        this._achievementWindow = new Window_AchievementList(0, this._helpWindow.y + this._helpWindow.height, Graphics.boxWidth, Graphics.boxHeight - this._helpWindow.y - this._helpWindow.height);
        this._achievementWindow.setHelpWindow(this._helpWindow);
        this._achievementWindow.select(0);
        this._achievementWindow.activate();
        this._achievementWindow.setHandler('ok', this.popScene.bind(this));
        this._achievementWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._achievementWindow);
    };

    Achievement.Scene_Achievement = Scene_Achievement;

    // -------------------------------------------------------------------------
    // 保存周り

    var upstream_StorageManager_localFilePath = StorageManager.localFilePath;
    StorageManager.localFilePath = function (savefileId) {
        if (savefileId === Achievement.saveSlotID) {
            return this.localFileDirectoryPath() + 'achievements.rpgsave';
        }
        return upstream_StorageManager_localFilePath.apply(this, arguments);
    };

    var upstream_StorageManager_webStorageKey = StorageManager.webStorageKey;
    StorageManager.webStorageKey = function (savefileId) {
        if (savefileId === Achievement.saveSlotID) {
            return Achievement.settings.storageKey;
        }
        return upstream_StorageManager_webStorageKey.apply(this, arguments);
    };

    // -------------------------------------------------------------------------
    // 起動時初期化処理

    var upstream_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        AchievementManager.init();
        upstream_Scene_Boot_start.apply(this);
        if (Achievement.settings.usePopup && global.Torigoya.Tween) {
            AchievementPopupManager.init();
        }
    };

    // -------------------------------------------------------------------------
    // タイトル画面への追加

    if (Achievement.settings.useTitle && Achievement.settings.useGlobalSave) {
        var upstream_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
        Window_TitleCommand.prototype.makeCommandList = function () {
            upstream_Window_TitleCommand_makeCommandList.apply(this);
            this.addCommand(Achievement.settings.menuText, 'achievement');
        };

        var upstream_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
        Scene_Title.prototype.createCommandWindow = function () {
            upstream_Scene_Title_createCommandWindow.apply(this);
            this._commandWindow.setHandler('achievement', this.torigoyaAchievement_commandAchievement.bind(this));
        };
    }

    Scene_Title.prototype.torigoyaAchievement_commandAchievement = function () {
        this._commandWindow.close();
        SceneManager.push(Scene_Achievement);
    };

    // -------------------------------------------------------------------------
    // メニュー画面への追加

    if (Achievement.settings.useMenu) {
        var upstream_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function () {
            upstream_Window_MenuCommand_addOriginalCommands.apply(this);
            this.addCommand(Achievement.settings.menuText, 'achievement');
        };

        var upstream_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function () {
            upstream_Scene_Menu_createCommandWindow.apply(this);
            this._commandWindow.setHandler('achievement', this.torigoyaAchievement_commandAchievement.bind(this));
        };
    }

    Scene_Menu.prototype.torigoyaAchievement_commandAchievement = function () {
        SceneManager.push(Scene_Achievement);
    };

    // -------------------------------------------------------------------------
    // プラグインコマンド

    var upstream_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        switch (command) {
            case 'Achievement':
            case '実績':
                var achievementID = ~~Number(args[0]);
                AchievementManager.unlock(achievementID);
                return;
            case 'ShowAchievement':
            case '実績表示':
                SceneManager.push(Scene_Achievement);
                return;
            case 'ResetAchievement':
            case '実績リセット':
                AchievementManager.clear();
                return;
        }
        upstream_Game_Interpreter_pluginCommand.apply(this, arguments);
    };

    // -------------------------------------------------------------------------
    global.Torigoya = (global.Torigoya || {});
    global.Torigoya.Achievement = Achievement;
})(this);
