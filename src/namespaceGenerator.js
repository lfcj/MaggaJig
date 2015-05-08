/**
 * Created by lfcj on 08.05.15.
 */
/*

 /*
 Task: Create interface to generate namespaces.
 Main Method:
 create(JigName->String, [staticMethods->Object], prototypeMethods->Object)
 JigName input must be: "namespace.Name";

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

    /*1.Check if JigName input is correct, and divide it.*/
    try {
        var namespace_andJigName = JigName.split(".");
        if (namespace_andJigName.length != 2) throw "Wrong JigName input"; //1
        var namespace = namespace_andJigName[0];
        var actualJigName = namespace_andJigName[1];
        /*Check that prototypeMethods is not empty*/
        if (prototypeMethods.length === 0) throw "Please insert some prototypes"
    }
    catch (err) {
        console.log(err);
    }

    /*If the namespace does not exist, create it and assign actualJigName to it.*/
    if (typeof namespace == 'undefined') {
        namespace = {};
        namespace.name = actualJigName;
    }

    //add staticMethods to namespace
    if (typeof staticMethods != 'undefined') {//staticMethods is optional
        staticMethods.map(
            function (method) {
                return addMethods(method, namespace, false);
            }
        );
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
    if (typeof namespace.prototype.init == 'undefined') {
        namespace.prototype.init = {};
    }

    //default Object to be merged at instantiation
    namespace.default = {};


}

