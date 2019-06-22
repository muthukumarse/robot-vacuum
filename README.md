# Vacuum Robot Simulator

#### Table Of Contents

[Description](#description)  
[Requirements](#requirements)  
[Test Environment](#test-environment)  
[Usage](#usage)  
[Unit Test](#unit-test)  
[Sample Test Data](#sample-test-data)

### Description

-   The application is a simulation of a robot vacuum moving in an area of dimensions 5 units by 5 units.
-   There are no other obstructions in the area.
-   The robot is free to roam around the area but must be prevented from leaving the area - this includes the initial placement of the robot.
-   Any movement that would result in the robot leaving the area must be prevented, however further valid movement commands must still be allowed.

### Requirements

-   Command-line application that can read in commands of the following syntax

```
    > PLACE X,Y,F
    > MOVE
    > LEFT
    > RIGHT
    > REPORT
```

-   PLACE will put the robot in the area at position X,Y and facing direction F (NORTH, SOUTH, EAST, or WEST).
-   The origin (0,0) can be considered to be the SOUTH WEST corner.
-   The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command.
-   The application should discard all commands in the sequence until a valid PLACE command has been executed.
-   MOVE will move the robot one unit forward in the direction it is currently facing.
-   LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
-   REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.
-   A robot that is not already placed in the area should ignore the MOVE, LEFT, RIGHT and REPORT commands.
-   Input can be from a file, or from standard input, as the developer chooses.

### Test Environment

To run the app, you'll need:

-   [Node.js](https://nodejs.org/en/download/)

To run tests of the app, you'll need:

-   [jasmine](https://github.com/jasmine/jasmine-npm)

```
$ npm install -g jasmine
```

### Usage

```
$ npm start
Welcome!
Begin simulation by - PLACE X, Y, F.
'q' to exit.
> PLACE 1 1 SOUTH
> REPORT
> Output: 1, 1, SOUTH
```

### Unit Test

Covered minimally, there are more to cover on TDD

```
jasmine
```

### Sample Test Data

There are 3 sample files with commands as part of POC, to test those file use below commands

```
npm run sampleRun1
npm run sampleRun2
npm run sampleRun3
```
