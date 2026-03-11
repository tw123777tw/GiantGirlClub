//=============================================================================
// Skittle.js
//=============================================================================

/*:
 * v0.2.0
 * @plugindesc 变量计量器-San值显示[v0.2]
 *
 * @author オオホタルサイコ/硕明云书
 * 
 * @param Container
 * @text 容器
 * @type file
 * @dir img/system/
 * @desc 选择容器图像文件(img/system/)
 * @default h-rq
 * 
 * @param Content
 * @text 容量默认素材
 * @type file
 * @dir img/system/
 * @desc 选择容器图像文件(img/system/)
 * @default h-rl2
 * 
 * @param Capacity
 * @text 最大值
 * @default 100
 * @desc 量规最大容量值
 * 
 * @default 100
 * @desc 初始值
 * 
 * @param Variable
 * @text 目标变量
 * @default 1
 * @desc 存储容量值的变量编号
 * 
 * @param Visible
 * @text 初始显示状态
 * @default true
 * @type boolean
 * @desc 初始是否显示（true=显示，false=隐藏）
 * 
 * @param Location
 * @text 坐标设置
 * @default 672 33
 * @desc 横板672 33  竖版18 18
 * 
 * @param Size
 * @text 图像大小
 * @default 100 30
 * @desc 横100 30 / 竖30 100
 * 
 * @param Margin
 * @text 边距设置
 * @default 0 0
 * @desc 内容边距（水平方向为左右边距，垂直方向为上下边距）
 * 
 * @param Direction
 * @text 填充方向
 * @default horizontal
 * @type select
 * @option 垂直填充（上下）
 * @value vertical
 * @option 水平填充（左右）
 * @value horizontal
 * @desc 量规填充方向
 * 
 * @param ThresholdEnable
 * @text 启用阈值素材
 * @default true
 * @type boolean
 * @desc 是否启用容量阈值素材切换功能
 * 
 * @param ThresholdValue
 * @text 阈值数值
 * @default 40
 * @desc 触发素材切换的容量值（达到此值以上时切换）
 * 
 * @param ThresholdContent
 * @text 阈值素材
 * @type file
 * @dir img/system/
 * @desc 选择容器图像文件(img/system/)
 * @default h-rl
 * 
 * @help 
 
   ■功能说明
 * 1. 支持垂直（上下）和水平（左右）两种填充方向
 * 2. 可设置容量阈值，达到阈值时自动切换显示指定素材
 * 3. 通过插件命令控制增减和显示状态
 * 
 * ■插件命令
 
Skittle add 10    //增加变量数值10   负数会减数值
Skittle add -10


Skittle visible true   //控制显示状态
Skittle visible false  


提供的图片素材pictures
提供的是默认窗口816x624素材
范例：
横向(SAN值理智点显示)[恐怖解密]
竖向(口渴值显示)[生存游戏]


汉化/修正 硕明云书
1、增加横向显示计量器
2、增加阈值数值

条款：
可用于商业游戏制作

 */

/* 
 * 通用处理函数
 */
var parseIntStrict = function (value) {
    var result = parseInt(value, 10);
    if (isNaN(result)) result = 0;
    return result;
};

/*
 * 容量内容处理类
 */
var Content = (function () {
    var sprite = null;
    var thresholdSprite = null; // 阈值素材精灵

    var Content = function (skittle, location, size, parameters) {
        if (!(this instanceof Content)) {
            return new Content(skittle, location, size, parameters);
        }
        this.skittle = skittle;
        this.size = size;
        this.remains = 0;
        this.direction = parameters['Direction'] || 'vertical';
        this.thresholdEnable = eval(parameters['ThresholdEnable'] || 'false');
        this.thresholdValue = parseIntStrict(parameters['ThresholdValue']) || 50;

        // 基础参数
        this.baseContentName = parameters['Content'] || '';
        this.thresholdContentName = parameters['ThresholdContent'] || '';
        this.margin = parameters['Margin'].split(' ').map(s => parseIntStrict(s));
        this.variable = parseIntStrict(parameters['Variable']) || 0;

        // 加载素材
        this.loadSprites(location, size);
        this.updateDisplay();
    }

    // 加载基础素材和阈值素材
    Content.prototype.loadSprites = function (location, size) {
        // 基础素材精灵
        sprite = new Sprite();
        sprite.bitmap = ImageManager.loadSystem(this.baseContentName);
        
        // 阈值素材精灵（初始隐藏）
        thresholdSprite = new Sprite();
        thresholdSprite.bitmap = ImageManager.loadSystem(this.thresholdContentName);
        thresholdSprite.visible = false;

        // 设置坐标和旋转
        if (this.direction === 'horizontal') {
            sprite.x = location[0];
            sprite.y = location[1];
            thresholdSprite.x = location[0];
            thresholdSprite.y = location[1];
            sprite.rotation = 0;
            thresholdSprite.rotation = 0;
        } else {
            sprite.x = location[0] + size[0];
            sprite.y = location[1] + size[1];
            thresholdSprite.x = location[0] + size[0];
            thresholdSprite.y = location[1] + size[1];
            sprite.rotation = 180 * Math.PI / 180;
            thresholdSprite.rotation = 180 * Math.PI / 180;
        }
    }

    // 获取当前应显示的精灵
    Content.prototype.getCurrentSprite = function () {
        if (this.thresholdEnable && this.remains >= this.thresholdValue && this.thresholdContentName) {
            return thresholdSprite;
        } else {
            return sprite;
        }
    }

    // 所有精灵（用于显示/隐藏控制）
    Content.prototype.getAllSprites = function () {
        return [sprite, thresholdSprite];
    }

    // 比例计算
    Content.prototype.Scale = function () {
        if (this.direction === 'horizontal') {
            return (this.size[0] - this.margin[0] - this.margin[1]) / this.skittle.Capacity;
        } else {
            return (this.size[1] - this.margin[0] - this.margin[1]) / this.skittle.Capacity;
        }
    }

    // 水平方向剩余宽度
    Content.prototype.RemainingWidth = function () {
        return this.remains * this.Scale() - this.margin[1];
    }

    // 垂直方向剩余高度
    Content.prototype.RemainingHeight = function () {
        return this.remains * this.Scale() - this.margin[1];
    }

    // 更新显示
    Content.prototype.updateDisplay = function () {
        const currentSprite = this.getCurrentSprite();
        // 隐藏未使用的精灵
        [sprite, thresholdSprite].forEach(s => {
            s.visible = s === currentSprite;
        });

        // 设置显示区域
        if (this.direction === 'horizontal') {
            currentSprite.setFrame(0, 0, this.RemainingWidth(), this.size[1]);
        } else {
            currentSprite.setFrame(0, 0, this.size[0], this.RemainingHeight());
        }
    }

    // 设置容量值
    Content.prototype.setValue = function (value) {
        this.remains += value;
        if (this.remains < 0) this.remains = 0;
        if (this.remains > this.skittle.Capacity) this.remains = this.skittle.Capacity;
        this.updateDisplay();
        $gameVariables.setValue(this.variable, this.remains);
    }

    return Content;
})();

/* 
 * 主控制器类
 */
var Skittle = (function () {
    var parameters = null;
    var containerSprite = null;

    var Skittle = function () {
        if (!(this instanceof Skittle)) {
            return new Skittle();
        }
        this.isFirst = true;
        this.IsDisp = true;
        this.startAnimetion = false;
        this.animeContents = '';
        this.addContent = 0;
        this.initialize();
    }

    Skittle.prototype.clearValue = function () {
        this.clearAnimetion();
        this.addContent = 0;
    }

    Skittle.prototype.clearAnimetion = function () {
        this.animeContents = '';
        this.startAnimetion = false;
    };

    Skittle.prototype.initialize = function () {
        parameters = PluginManager.parameters('Skittle');

        var container = parameters['Container'] || '';
        var location = parameters['Location'].split(' ').map(s => parseIntStrict(s));
        var size = parameters['Size'].split(' ').map(s => parseIntStrict(s));
        this.IsDisp = eval(parameters['Visible'] || 'true');
        this.Displyed = !this.IsDisp;
        this.Capacity = parseIntStrict(parameters['Capacity']) || 0;

        // 初始化容量内容
        this.content = new Content(this, location, size, parameters);
        this.content.setValue(parseIntStrict(parameters['Default']) || 0);

        // 加载容器素材
        this.loadContainerSprite(container, location);

        this.clearValue();
    }

    // 加载容器精灵
    Skittle.prototype.loadContainerSprite = function (fileName, location) {
        containerSprite = new Sprite();
        containerSprite.bitmap = ImageManager.loadSystem(fileName);
        containerSprite.x = location[0];
        containerSprite.y = location[1];
    }

    // 获取所有精灵（用于显示控制）
    Skittle.prototype.getAllSprites = function () {
        return [containerSprite, ...this.content.getAllSprites()];
    }

    // 处理插件命令参数
    Skittle.prototype.setParameter = function (args) {
        if (args.length < 2) {
            throw new SyntaxError("参数格式错误");
        }
        this.animeContents = args[0];
        if (args[0] == 'visible') {
            this.IsDisp = eval(args[1]);
        } else {
            this.addContent = parseIntStrict(args[1]);
            this.startAnimetion = true;
        }
        return true;
    };

    // 帧更新
    Skittle.prototype.update = function () {
        if (this.startAnimetion) {
            if (this.animeContents == 'add') {
                if (this.addContent > 0) {
                    var add = 1;
                    this.addContent -= add;
                    this.content.setValue(add);
                } else if (this.addContent < 0) {
                    var add = -1;
                    this.addContent -= add;
                    this.content.setValue(add);
                } else {
                    this.startAnimetion = false;
                }
            }
        }
        return true;
    };

    return Skittle;
})();

// 全局变量
var $skittle = null;

/*
 * 系统集成部分
 */
(function () {
    // 游戏初始化时创建实例
    var createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        createGameObjects.call(this);
        $skittle = new Skittle();
    };

    // 插件命令处理
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Skittle') {
            switch (args[0]) {
                case 'add':
                case 'visible':
                    if ($skittle.startAnimetion) return;
                    $skittle.setParameter(args);
                    break;
                default:
                    break;
            }
        }
    };

    // 存档处理
    var makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = makeSaveContents.call(this);
        contents.skittle = $skittle;
        return contents;
    };

    // 读档处理
    var extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        extractSaveContents.call(this, contents);
        $skittle = contents.skittle;
        $skittle.content.updateDisplay();
    };

    // 显示控制
    var _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _Spriteset_Map_update.call(this);
        if (!$skittle) return;

        $skittle.update();
        const allSprites = $skittle.getAllSprites();

        if ($skittle.IsDisp) {
            if (!$skittle.Displyed) {
                allSprites.forEach(sprite => this.addChild(sprite));
                $skittle.Displyed = true;
            }
        } else {
            if ($skittle.Displyed) {
                allSprites.forEach(sprite => this.removeChild(sprite));
                $skittle.Displyed = false;
            }
        }
    };
})();