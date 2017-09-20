/*
Viggo Gustavii, 910424
Erik Isacsson, 910201
*/

createClass = function(className, superClassList){
		
	var evalString = "function " + className+"(){}";
	eval(evalString);
	
	eval(className).new = function(){
		var t = {};
		t.__proto__ = this;
		return t;
	}
	
	eval(className).hej = function(){
		return "hej";
	}
	
	
	if(superClassList != null){
		if(superClassList.constructor === Array){
			eval(className).list = superClassList;
		}
	}
	
	eval(className).call = function(funcName, parameters){
		for(var i = 0; i< this.list.length;i++){
			var funcLookUp = 'this.list[i].' + funcName;

			if(eval(funcLookUp) != null){
				var s = 'this.list[i].' + funcName + '(parameters);';
				return (eval(s));
			}
			return this.list[i].call(funcName, parameters);
		}						
	}
	return eval(className);		
}



var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);