var args = process.argv.slice(2)
!args.length && args.push(process.cwd())

require('./lib/svn-jshint')(args)