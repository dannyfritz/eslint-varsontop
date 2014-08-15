/**
 * @fileoverview Tests for vars-on-top rule.
 * @author Danny Fritz
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

eslintTester.addRuleTest("vars-on-top", {

    // Examples of code that should not trigger the rule
    valid:
        [
            [
                "function foo() {",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   if (true) {",
                "       first = true;",
                "   } else {",
                "       first = 1;",
                "   }",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   var second = 1;",
                "   var third;",
                "   var fourth = 1, fifth, sixth = third;",
                "   var seventh;",
                "   if (true) {",
                "       third = true;",
                "   }",
                "   first = second;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var i;",
                "   for (i = 0; i < 10; i++) {",
                "       alert(i);",
                "   }",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var outer;",
                "   function inner() {",
                "       var inner = 1;",
                "       var outer = inner;",
                "   }",
                "   outer = 1;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   //Hello",
                "   var second = 1;",
                "   first = second;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   /*",
                "       Hello Clarice",
                "   */",
                "   var second = 1;",
                "   first = second;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   var second = 1;",
                "   function bar(){",
                "       var first;",
                "       first = 5;",
                "   }",
                "   first = second;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   var second = 1;",
                "   function bar(){",
                "       var third;",
                "       third = 5;",
                "   }",
                "   first = second;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   var bar = function(){",
                "       var third;",
                "       third = 5;",
                "   }",
                "   first = 5;",
                "}"
            ].join("\n"),
            [
                "function foo() {",
                "   var first;",
                "   first.onclick(function(){",
                "       var third;",
                "       third = 5;",
                "   });",
                "   first = 5;",
                "}"
            ].join("\n")
        ],

    // Examples of code that should trigger the rule
    invalid:
        [
            {
                code:
                    [
                        "function foo() {",
                        "   var first;",
                        "   first = 1;",
                        "   first = 2;",
                        "   first = 3;",
                        "   first = 4;",
                        "   var second = 1;",
                        "   second = 2;",
                        "   first = second;",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "FunctionDeclaration"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first;",
                        "   if (true) {",
                        "       var second = true;",
                        "   }",
                        "   first = second;",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "IfStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   for (var i = 0; i < 10; i++) {",
                        "       alert(i);",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "ForStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = 10;",
                        "   var i;",
                        "   for (i = 0; i < first; i ++) {",
                        "       var second = i;",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "ForStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = 10;",
                        "   var i;",
                        "   switch (first) {",
                        "       case 10:",
                        "           var hello = 1;",
                        "           break;",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "SwitchCase"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = 10;",
                        "   var i;",
                        "   try {",
                        "       var hello = 1;",
                        "   } catch (e) {",
                        "       alert('error');",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "TryStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = 10;",
                        "   var i;",
                        "   try {",
                        "       asdf;",
                        "   } catch (e) {",
                        "       var hello = 1;",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "CatchClause"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = 10;",
                        "   while (first) {",
                        "       var hello = 1;",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "WhileStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = 10;",
                        "   do {",
                        "       var hello = 1;",
                        "   } while (first == 10);",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "DoWhileStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = [1,2,3];",
                        "   for (var item in first) {",
                        "       item++;",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "ForInStatement"
                    }
                ]
            },
            {
                code:
                    [
                        "function foo() {",
                        "   var first = [1,2,3];",
                        "   var item;",
                        "   for (item in first) {",
                        "       var hello = item;",
                        "   }",
                        "}"
                    ].join("\n"),
                errors: [
                    {
                        message: "All \"var\" declarations must be at the top of the function scope.",
                        type: "ForInStatement"
                    }
                ]
            }
        ]
});
