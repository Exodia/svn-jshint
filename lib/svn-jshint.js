/**
 * Created by exodia on 14-4-10.
 */
var exec = require('child_process').exec


module.exports = function (files) {
    getModifiedFiles(files, hint)
}

function getModifiedFiles(paths, cb) {
    var cmd = 'svn status ' + paths.join(' ')
    exec(cmd, function (err, stdout) {
        err ? console.log(err) : hint(parseSVNOutput(stdout.toString()))
    })
}

function hint(files) {
    var cmd = 'jshint ' + files.join(' ')
    exec(cmd, function (err, stdout, stderr) {
        console.log(stdout)
    })
}

//A:增加，C：冲突，M：修改，R：替换
var modifiedFlag = /^[ACMR]{1}.{6}\s(.+)$/gm

function parseSVNOutput(str) {
    var matches = str.match(modifiedFlag) || []
    matches.forEach(function (match, index) {
        matches[index] = match.slice(8)
    })
    return matches
}