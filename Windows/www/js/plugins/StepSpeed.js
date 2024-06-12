//
//  足踏み速度変更 ver1.00
//
// author yana
//

var Imported = Imported || {};
Imported['StepSpeed'] = 1.00;
/*:
 * @target MZ 
 * @plugindesc ver1.00/事件踏步动画速度
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法   参数0.1~1  数值越小踏步步伐越快  1为正常！
 * ------------------------------------------------------
 * 在事件的备注中：
 * <足踏み速度:x>
 * 或
 * <StepSpeed:x>
 * 将脚步速度更改为 1/x。  
 * x 可以是小数，将其设置为 1 或更小将提高速度
 * 此插件支持MZ/MV软件上通用！
 * ------------------------------------------------------
 * 使用条款
 * ------------------------------------------------------ 
 * 没有使用限制。 它可用于商业和成人目的。
 * 二级分发不受限制，但不受支持。
 * 版权是可选的。 您无需执行此操作即可使用它。
 * 简而言之，没有特殊规则。
 * 有关错误报告和有关如何使用该服务的查询，请联系Netsukuru Thread或Twitter。
 * https://twitter.com/yanatsuki_
 * 使用这些材料的风险由您自行承担。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

(function(){
	////////////////////////////////////////////////////////////////////////////////////
	
	var parameters = PluginManager.parameters('StepSpeed');
	
	////////////////////////////////////////////////////////////////////////////////////
	
	var __GCBase_animationWait = Game_CharacterBase.prototype.animationWait;
	Game_CharacterBase.prototype.animationWait = function() {
		return __GCBase_animationWait.call(this) * this.stepSpeed();
	};
	
	Game_CharacterBase.prototype.stepSpeed = function() {
		return 1.0;
	}
	
	////////////////////////////////////////////////////////////////////////////////////
	
	Game_Event.prototype.stepSpeed = function() {
		var speed = 1.0;
		if (this.event().meta['足踏み速度']){ speed = Number(this.event().meta['足踏み速度']) }
		if (this.event().meta['StepSpeed']){ speed = Number(this.event().meta['StepSpeed']) }
		return speed;
	};
}());