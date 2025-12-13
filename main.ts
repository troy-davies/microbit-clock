let Clock = 0 // Clock by Troy Davies
let Minute = 0
let Hour = 0
let SetupComplete = 0
let Locale = 0 // To use 12 hour, use Locale = 1
basic.showString("Calibrate")
SetTime()
function SetTime () {
    while (SetupComplete != 1) {
        if (input.buttonIsPressed(Button.A)) {
            Hour += 1
            if (12 * Locale < Hour) {
                Hour = 0
            }
            ShowTime()
        }
        if (input.buttonIsPressed(Button.B)) {
            Minute += 5
            if (60 < Minute) {
                Minute = 0
            }
            ShowTime()
        }
        if (input.buttonIsPressed(Button.AB)) {
            SetupComplete = 1
        }
    }
}
function Tick () {
    basic.pause(1)
    Clock += 1
    if (Clock == 60000) {
        Clock = 0
        Minute += 1
    }
    if (Minute > 60) {
        Minute = 0
        Hour += 1
    }
    if (Hour > 12 * Locale) {
        Hour = 0
    }
}
function ShowTime () {
    if (Minute < 10) {
        basic.showString(Hour + ":" + "0" + Minute)
    } else {
        basic.showString(Hour + ":" + Minute)
    }
}
basic.forever(function () {
    Tick()
    if (SetupComplete == 1) {
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            ShowTime()
        }
    }
})
