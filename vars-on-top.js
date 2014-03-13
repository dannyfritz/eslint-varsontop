/**
 * @fileoverview Rule to enforce var declarations are only at the top of a function.
 * @author Danny Fritz
 */
"use strict";

var _ = require('lodash');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var errorMessage = 'All "var" declarations must be at the top of the function scope.';

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function checkFunctionForVarsOnTop (node) {
        var statements;
        statements = pruneStatements(node.body.body);
        if (areVarsOnTop(statements, node) === false) {
            report(node);
        }
    }

    function checkForForVars (node) {
        var statements;
        if (node.init.type === 'VariableDeclaration') {
            report(node);
        }
        statements = pruneStatements(node.body.body);
        if (hasVars(statements)) {
            report(node);
        }
    }

    function checkForInForVars (node) {
        var statements;
        if (node.left.type === "VariableDeclaration") {
            report(node);
        }
        statements = pruneStatements(node.body.body);
        if (hasVars(statements)) {
            report(node);
        }
    }

    function checkIfForVars (node) {
        var statements;
        statements = pruneStatements(node.consequent.body);
        if (hasVars(statements)) {
            report(node);
        }
    }

    function checkCaseForVars (node) {
        var statements;
        statements = pruneStatements(node.consequent);
        if (hasVars(statements)) {
            report(node)
        }
    }

    function checkTryForVars (node) {
        var statements;
        statements = pruneStatements(node.block.body);
        if (hasVars(statements)) {
            report(node)
        }
    }

    function checkCatchForVars (node) {
        var statements;
        statements = pruneStatements(node.body.body);
        if (hasVars(statements)) {
            report(node)
        }
    }

    function checkWhileForVars (node) {
        var statements;
        statements = pruneStatements(node.body.body);
        if (hasVars(statements)) {
            report(node)
        }
    }

    function areVarsOnTop (statements) {
        var lastVariableDeclaration;
        var numberOfVariableDeclarations;
        lastVariableDeclaration = _.lastIndexOf(statements, 'VariableDeclaration');
        numberOfVariableDeclarations = _.reduce(statements,
            function (sum, statement) {
                if (statement === "VariableDeclaration") {
                    return sum + 1;
                }
                return sum;
            }, 0);
        if (numberOfVariableDeclarations <= lastVariableDeclaration) {
            return false;
        }
        return true;
    }

    function hasVars (statements) {
        var variableDeclarationIndex;
        variableDeclarationIndex = _.indexOf(statements, 'VariableDeclaration');
        if (variableDeclarationIndex >= 0) {
            return true;
        }
        return false;
    }

    function pruneStatements (statements) {
        var prunedStatements;
        prunedStatements = _.map(statements, function (statement) {
                return statement.type;
            });
        return prunedStatements;
    }

    function report(node) {
        context.report(node, errorMessage);
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
        'FunctionDeclaration': checkFunctionForVarsOnTop,
        'ForStatement': checkForForVars,
        'ForInStatement': checkForInForVars,
        'IfStatement': checkIfForVars,
        'SwitchCase': checkCaseForVars,
        'TryStatement': checkTryForVars,
        'CatchClause': checkCatchForVars,
        'WhileStatement': checkWhileForVars,
        'DoWhileStatement': checkWhileForVars
    };

};
