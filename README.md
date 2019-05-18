# Simple Pomodoro Timer

A very simple, elegant and easy-to-use pomodoro program.

Made in React and displayed in an electron window.

Why electron? Because i wanted to learn how to use it... :^)

## screenshot
![](https://i.imgur.com/YtDrPP8.jpg)

note that the transparrency comes from my window compositor (compton) and is not included in this program

## Features
- Normal timer
- Pause timer
- Reset timer to either normal or pause timer
- System notification on timer end
- Background color animation on timer end

## How to use

Click on window to start or pause the timer
Click on window after timer has reached zero to start pause timer

Double click on window at any time to reset the timer back to Default
Double click on window when timer is paused at Default to set timer to pause timer 

## How to install
For now you have to use the development version:

Step 1 - clone repo

`git clone git@github.com:kimborgen/simple-pomodoro.git && cd simple-pomodoro`

Step 2 - install dependencies and start application

`npm i && npm run dev`

You can also just use the web version by running `npm start` instead of `npm run dev`

## Todo
- Build & deploy - npm and aur?
- <strike>notification or alarm when timer is done</strike>
- Change length - presets maybe?
- <strike>Pause timer - to know how long to take a break for </strike>
- <strike>hotkeys</strike>
- statistics?
- website and mobile app
