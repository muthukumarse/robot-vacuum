const config = {
    initialPositionX: 0,
    initialPositionY: 0,
    availableLengthX: 5,
    availableLengthY: 5,
    availableCommands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
    availableDirections: ['NORTH', 'EAST', 'SOUTH', 'WEST'],
    messages: {
        noInitialCommand: 'Robot not placed into area. Type "PLACE X, Y, F" to put a robot on the playground.',
        placeRobotFirst: 'Nothing to report',
        wrongPlace: 'Out of area of dimensions OR X and Y must be integers',
        wrondDirection: 'Allowed directions are (NORTH, EAST, SOUTH, WEST)',
        noFace: 'Enter correct form is: PLACE X, Y, FACE.',
        faceNotString: 'Enter correct form of FACE, it is not a string.',
        unknownCommand: 'Wrong Command, Available commands are: PLACE X, Y, F | MOVE | LEFT | RIGHT | REPORT',
        robotPosition: 'Output: {x}, {y}, {f}',
        wrongMove: 'You cannot move the robot that way, it will fall.',
        default: 'Welcome to The Vacuum Robot simlulation. Start with placing a robot typing PLACE X, Y, F.',
        fileNotFound: "File '{fileName}' was not found.",
        welcome: "Welcome!{eol}Begin simulation by - PLACE X, Y, F. {eol}'q' to exit.",
    },
}

module.exports = config
