/**
 * Created by lfcj on May,2015
 */
/*

 /*
 Task: Create interface to generate namespaces.
 Main Method:
 create(JigName->String, [staticMethods->Object], prototypeMethods->Object)
 JigName input can be: "namespace.Name", "Name" or "";

 First, I check if the given namespace exists.
 If not, create it.
 Then add the static and prototype methods to namespace.

 */

var Jig = require("MaggaJig");

function addMethods(method, namespace, isPrototype) {
    "use strict";
    var methodName = method.name;
    if (typeof namespace.method == 'undefined' && isPrototype) {
        namespace.prototype.methodName = {};
        namespace.prototype.methodName = method;
    }
    else {
        namespace.methodName = {};
        namespace.methodName = method;
    }
}

function create(JigName, staticMethods, prototypeMethods) {


    /*Arguments can be ("JigName", {}, {},), [args->case1]
     *              or ("JigName", {}) -> Object is prototypeMethods [args->case2]
     *              or ({}) -> prototypeMethods [args->case3]
     */

    /*Check JigName input*/

    var namespace_andJigName = JigName.split(".");
    var stringsInJigName = namespace_andJigName.length;
    var actualJigName, namespace;
    switch (stringsInJigName) {
        case 1: //only name of Jig
            actualJigName = namespace_andJigName[0];
            break;
        case 2: //both namespace and name of Jig
            namespace = namespace_andJigName[0];
            actualJigName = namespace_andJigName[1];
            break;
        default://no namespace or name of Jig
            break;
    }

    /*If the namespace does not exist, create it and assign actualJigName to it.*/
    if (typeof namespace === 'undefined') {
        namespace = {};
        namespace.name = actualJigName;
    }

    //add staticMethods to namespace
    if (typeof prototypeMethods != 'undefined') {//[args->case1]
        staticMethods.map(
            function (method) {
                return addMethods(method, namespace, false);
            }
        );
    }
    else {//[args->case2
        prototypeMethods = staticMethods;
    }

    //add prototypeMethods as prototype Methods to namespace
    prototypeMethods.map(
        function (method) {
            return addMethods(method, namespace, true);
        }
    );

    //make sure that there are static && prototype init methods
    if (typeof namespace.init == 'undefined') {
        namespace.init = {};
    }
    if (typeof namespace.prototype.init === 'undefined') {
        namespace.prototype.init = {};
    }

    //make sure there are prototype default & plugin Objects
    if(typeof namespace.prototype.default === 'undefined'){
        namespace.prototype.default = {};
    }
    if(typeof namespace.prototype.plugin === 'undefined'){
        namespace.prototype.plugin = {};
    }

    return namespace;
}

