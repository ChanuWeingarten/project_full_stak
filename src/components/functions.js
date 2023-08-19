
import React from "react";
export function getCurrentDate(){ 
    const currentDate = new Date();

    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }
    let day = addZero(currentDate.getDate());
    let month = addZero(currentDate.getMonth() + 1);
    let year = currentDate.getFullYear();

    let date = `${year}-${month}-${day}`;

    const d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());
    let time = h + ":" + m + ":" + s;
    return [date,time]
}