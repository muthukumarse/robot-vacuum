const config = require('./config')
const VacuumRobot = require('./vacuumRobot')

let os = require('os')
let stdin = process.stdin
let stdout = process.stdout
let stderr = process.stderr
let robot = new VacuumRobot(config)
let EOL = os.EOL
let fs = require('fs')
let readline = require('readline')
let rl
let argv

stdin.setEncoding('utf8')
process.title = '** The Vacuum Robot Simulation **' // sets a terminal title

argv = process.argv.slice(2) // get only the name of the file from user prompt

// read stdin
// this piece of code is for reading user's input from CLI
stdin.on('data', data => {
    doOutput(data)
})

// this piece of code is for reading commands from a file
if (argv.length) {
    try {
        fs.accessSync(argv[0], fs.F_OK | fs.R_OK)
    } catch (e) {
        stderr.write(
            robot.getMessage({
                msg: 'fileNotFound',
                fileName: argv[0],
            }),
        )
        process.exit()
    }

    rl = readline.createInterface({
        input: fs.createReadStream(argv[0]),
        terminal: false,
    })

    // event handler. is called when a line is read from a file
    rl.on('line', line => {
        stdout.write(line + EOL)
        doOutput(line)
    })

    // event handler. is called when all the lines in a file have been read
    // closes a stream and exit
    rl.on('close', () => {
        rl.close()
        process.exit()
    })
}

const doAction = sCommand => {
    let res
    // PLACE X(,| )Y(,| )F(  *)  # defined format
    if (sCommand.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
        let args = sCommand
            .trim()
            .split(/(?:\s+|,\s*)/i)
            .slice(1)
        res = robot.place(args[0], args[1], args[2])
    } else if (sCommand.match(/^move\s*$/i)) {
        res = robot.move()
    } else if (sCommand.match(/^left\s*$/i)) {
        res = robot.left()
    } else if (sCommand.match(/^right\s*$/i)) {
        res = robot.right()
    } else if (sCommand.match(/^report\s*$/i)) {
        res = robot.report()
    } else {
        res = new Error(
            robot.getMessage({
                msg: 'unknownCommand',
            }),
        )
    }
    return res
}

const doOutput = data => {
    let res
    let _data = data.trim()

    if (_data.match(/(q|quit|exit)/i)) process.exit()

    res = doAction(_data)
    if (res instanceof Error) {
        stdout.write(res.message + EOL + '> ')
    } else if (typeof res == 'string') {
        stdout.write(res + EOL + '> ')
    } else {
        stdout.write('> ')
    }
}

const TheVacuumRobotApp = () => {}

TheVacuumRobotApp.run = () => {
    stdout.write(
        robot.getMessage({
            msg: 'welcome',
            eol: EOL,
        }) +
            EOL +
            '> ',
    )
    stdin.resume()
}

module.exports = TheVacuumRobotApp
