/*
Viggo Gustavii, 910424
Erik Isacson, 910201
*/

function myObject() {}

myObject.func = function (){console.log("hurra");}

myObject.prototype.call = function(funcName, parameters){
	var funcLookUp = 'this.' + funcName;
	if(eval(funcLookUp) != null){
		var s = 'this.' + funcName + '(parameters);';
		return (eval(s));
	}

	for(var i = 0; i< this.list.length;i++){
		funcLookUp = 'this.list[i].' + funcName;

		if(eval(funcLookUp) != null){
			var s = 'this.list[i].' + funcName + '(parameters);';
			return (eval(s));
		}
		return this.list[i].call(funcName, parameters);
	}
}

myObject.create = function(prototypeList){
	var t = {};
	if(prototypeList == null){
		t.__proto__ = myObject.prototype;
		return t;
	}
	
	if(prototypeList.constructor === Array){
		t.list = [];
		var i = 0;
		for(i; i<prototypeList.length; i++){
				t.list[i] = prototypeList[i];
		}
		t.__proto__ = myObject.prototype;
	}else{	
		prototypeList._proto__ = myObject.prototype;
	}
	return t;
}

myObject.prototype.create = function(){
	var t =  {};
	t.__proto__ = this;
	return t;
}


var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]);
