const config = require('./../app/config')
const VacuumRobot = require('./../app/vacuumRobot')

describe('The Vacuum Robot', function() {
    let robot
    let x
    let y
    let f

    beforeEach(function() {
        robot = new VacuumRobot(config)
    })

    it('coordinates should be undefined at start', function() {
        let oPosition = robot._getRobotPosition()
        expect(oPosition.x == undefined && oPosition.y == undefined && oPosition.f == undefined).toBe(true)
    })

    it('should report its position', function() {
        let x = 2
        let y = 3
        let f = 'south'

        robot.place(x, y, f)

        expect(robot.report()).toEqual(
            robot.getMessage({
                msg: 'robotPosition',
                x: x,
                y: y,
                f: f.toUpperCase(),
            }),
        )
    })

    it('should say "place me first to begin" at start', function() {
        expect(robot.report()).toEqual(
            robot.getMessage({
                msg: 'placeRobotFirst',
            }),
        )
    })

    it('should not accept nonInt X or Y', function() {
        let x = 'foo'
        let y = '1,4'
        let f = 'south'
        expect(robot.place(x, y, f)).toEqual(
            new TypeError(
                robot.getMessage({
                    msg: 'wrongPlace',
                }),
            ),
        )
    })

    it('should not accept undefined FACE', function() {
        let x = 'foo'
        let y = '1,4'
        let f
        expect(robot.place(x, y, f)).toEqual(
            new TypeError(
                robot.getMessage({
                    msg: 'noFace',
                }),
            ),
        )
    })

    it('should not accept non-string FACE', function() {
        let x = 'foo'
        let y = '1,4'
        let f = 100
        expect(robot.place(x, y, f)).toEqual(
            new TypeError(
                robot.getMessage({
                    msg: 'faceNotString',
                }),
            ),
        )
    })

    it('should not accept negative Y in PLACE', function() {
        let x = 0
        let y = -1
        let f = 'south'
        expect(robot.place(x, y, f)).toEqual(
            new TypeError(
                robot.getMessage({
                    msg: 'wrongPlace',
                }),
            ),
        )
    })

    it('should not accept negative X in PLACE', function() {
        ;(x = -1), (y = 0), (f = 'south')
        expect(robot.place(x, y, f)).toEqual(
            new TypeError(
                robot.getMessage({
                    msg: 'wrongPlace',
                }),
            ),
        )
    })

    it('should not accept invalid FACING words', function() {
        ;(x = 2), (y = 3), (f = 'foo')
        expect(robot.place(x, y, f)).toEqual(
            new TypeError(
                robot.getMessage({
                    msg: 'wrondDirection',
                }),
            ),
        )
    })

    it('should have "_isFirstStepMade = false" before initial PLACE', function() {
        expect(robot._getIsFirstStepMade()).toBe(false)
    })

    it('should set "_isFirstStepMade = true" upon successful initial PLACE', function() {
        let x = 3
        let y = 3
        let f = 'south'
        robot.place(x, y, f)
        expect(robot._getIsFirstStepMade()).toBe(true)
    })

    it('should change X, Y upon successful place', function() {
        let x = 3
        let y = 3
        let f = 'south'
        let oPositionEnd = {}

        robot.place(x, y, f)

        oPositionEnd = robot._getRobotPosition()

        expect(oPositionEnd.x == x && oPositionEnd.y == y && oPositionEnd.f == f.toUpperCase()).toBe(true)
    })

    it('should return itself if PLACE was successful', function() {
        ;(x = 1), (y = 1), (f = 'south')
        expect(robot.place(x, y, f)).toEqual(robot)
    })

    it('should not accept MOVE command before initial PLACE command', function() {
        expect(robot.move()).toEqual(
            new Error(
                robot.getMessage({
                    msg: 'noInitialCommand',
                }),
            ),
        )
    })

    it('should successfully make a correct MOVE', function() {
        let x = 1
        let y = 1
        let f = 'east'
        let pos
        robot.place(x, y, f)
        robot.move()
        pos = robot._getRobotPosition()
        expect(pos.x == x + 1 && pos.y == y && pos.f == f.toUpperCase()).toBe(true)
    })

    it('should not turn RIGHT before initial PLACE was made', function() {
        expect(robot.right()).toEqual(
            new Error(
                robot.getMessage({
                    msg: 'noInitialCommand',
                }),
            ),
        )
    })

    it('should not turn LEFT before initial PLACE was made', function() {
        expect(robot.left()).toEqual(
            new Error(
                robot.getMessage({
                    msg: 'noInitialCommand',
                }),
            ),
        )
    })

    it('should turn LEFT (change face)', function() {
        let x = 1
        let y = 1
        let f = 'north'
        robot.place(x, y, f)
        robot.left()
        expect(robot._getRobotPosition().f).toEqual('WEST')
    })

    it('should turn RIGHT (change face)', function() {
        let x = 1
        let y = 1
        let f = 'north'
        robot.place(x, y, f)
        robot.right()
        expect(robot._getRobotPosition().f).toEqual('EAST')
    })
})
