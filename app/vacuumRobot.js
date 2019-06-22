class VacuumRobot {
    constructor(config) {
        this._config = config
        this._isFirstStepMade = false
        this._currentPosition = {
            x: undefined,
            y: undefined,
            f: undefined,
        }
    }

    //action methods
    getMessage(data) {
        if (!data) {
            return this._config.messages['welcome']
        }
        if (!this._config.messages[data.msg]) {
            return this._config.messages['welcome']
        }
        let oCombined = Object.assign({}, data)
        return this._config.messages[oCombined.msg].replace(/{(\w+)}/g, function(match, p) {
            return oCombined[p]
        })
    }

    place(x, y, f) {
        let arg = {}

        // Validate user input
        try {
            arg = this._validateCommand(x, y, f)
        } catch (e) {
            return e
        }

        // PLACE a robot only inside of the area
        if (this._isOutOfArea(arg.x, arg.y)) {
            return new Error(
                this.getMessage({
                    msg: 'wrongPlace',
                }),
            )
        }

        // Places a robot - updates its X,Y,F
        this._placeRobot(arg.x, arg.y, arg.f)

        // Save that initial PLACE has been made
        if (!this._isFirstStepMade) this._isFirstStepMade = true

        return this
    }

    move() {
        let x
        let y
        let f

        // Check if initial PLACE command was made
        if (!this._isFirstStepMade) {
            return new Error(
                this.getMessage({
                    msg: 'noInitialCommand',
                }),
            )
        }

        x = this._currentPosition.x
        y = this._currentPosition.y
        f = this._currentPosition.f

        // Change X or Y correctly to
        switch (f) {
            case 0: // north
                ++y
                break
            case 2: // south
                --y
                break
            case 1: // east
                ++x
                break
            case 3: // west
                --x
                break
        }

        // Check if the step in not outside the playground
        if (this._isOutOfArea(x, y)) {
            return new Error(
                this.getMessage({
                    msg: 'wrongMove',
                }),
            )
        }

        // updetes the robot's position
        this._placeRobot(x, y, this._config.availableDirections[f])

        return this
    }

    right() {
        if (!this._isFirstStepMade) {
            return new Error(
                this.getMessage({
                    msg: 'noInitialCommand',
                }),
            )
        }
        this._currentPosition.f = this._currentPosition.f + 1 > 3 ? 0 : this._currentPosition.f + 1
        return this
    }

    left() {
        if (!this._isFirstStepMade) {
            return new Error(
                this.getMessage({
                    msg: 'noInitialCommand',
                }),
            )
        }
        this._currentPosition.f = this._currentPosition.f - 1 < 0 ? 3 : this._currentPosition.f - 1
        return this
    }

    report(msgObj) {
        // Call .report() without any parameters.
        if (!msgObj) {
            let position = this._getRobotPosition()

            // Very beginning, no any PLACE yet, coords are undefined
            // return a message "PLACE a robot to begin", not coords
            if (position.x == undefined && position.y == undefined && position.f == undefined) {
                return this.getMessage({
                    msg: 'placeRobotFirst',
                })
                // coords are defined, return robot's position msg
            } else {
                return this.getMessage({
                    msg: 'robotPosition',
                    x: position.x,
                    y: position.y,
                    f: position.f,
                })
            }
        } else return this.getMessage(msgObj)
    }

    // support mehods
    _validateCommand(x, y, f) {
        // FACE cannot be undefined
        if (!f) {
            throw new TypeError(
                this.getMessage({
                    msg: 'noFace',
                }),
            )
        }

        // FACE must be a string
        if (typeof f !== 'string') {
            throw new TypeError(
                this.getMessage({
                    msg: 'faceNotString',
                }),
            )
        }

        let _f = f.toUpperCase()
        let _x = parseInt(x)
        let _y = parseInt(y)

        // Only either INT or Strings that can be parsed to INT are accepted as
        // coordinatres
        if (!Number.isInteger(_x) || !Number.isInteger(_y)) {
            throw new TypeError(
                this.getMessage({
                    msg: 'wrongPlace',
                }),
            )
        }

        // Only positive X and Y are accepted
        if (_x < 0 || _y < 0) {
            throw new TypeError(
                this.getMessage({
                    msg: 'wrongPlace',
                }),
            )
        }

        // Only valid FACE words are accepted
        // 'NORTH', 'EAST', 'SOUTH', 'WEST'
        if (!this._isDirectionValid(_f)) {
            throw new TypeError(
                this.getMessage({
                    msg: 'wrondDirection',
                }),
            )
        }

        return {
            x: _x,
            y: _y,
            f: _f,
        }
    }

    _isDirectionValid(sFace) {
        return this._config.availableDirections.indexOf(sFace) !== -1
    }

    _placeRobot(x, y, f) {
        ;(this._currentPosition.x = x), (this._currentPosition.y = y), (this._currentPosition.f = this._config.availableDirections.indexOf(f))
    }

    _isOutOfArea(x, y) {
        if (
            x > this._config.initialPositionX + (this._config.availableLengthX - 1) ||
            x < this._config.initialPositionX ||
            y > this._config.initialPositionY + (this._config.availableLengthY - 1) ||
            y < this._config.initialPositionY
        ) {
            return true
        } else return false
    }

    _getRobotPosition() {
        return {
            x: this._currentPosition.x,
            y: this._currentPosition.y,
            f: this._config.availableDirections[this._currentPosition.f],
        }
    }

    _getIsFirstStepMade() {
        return this._isFirstStepMade
    }

    _isFirstStepMadeFunc() {
        if (!this._isFirstStepMade) {
            return this.report({
                msg: 'noInitialCommand',
            })
        } else return true
    }

    _setIsFirstStepMade(val) {
        this._isFirstStepMade = val
    }
}

module.exports = VacuumRobot
