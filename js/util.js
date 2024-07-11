"use strict";
const testString = "__________________________________________IIIIIIIIII_______________S_________S______J___S_____JJJ_S_______J_S____ZZ_JJS___ZZZZ__S___IIZZ__S___ZZZZ__S___ZZZZ__S___Z_Z___S_TTTT____S_T______S__T####___#_T____@#@____ZZ_#@#@__ZZ_Z_Z____Z_Z__Z_ZZ_ZZ___ZZZ______ZZZZ_________Z__OO________OOO__O__O_O__O_OOOO_O__O_OO___OOO_LLL____LLL_OLO__L_L____O___L_O______LLOO______LOO_O____OOOOOO__L____OO_______________?T,T,T,T,T,T,J,J,J,J,L,L,L,L,O,L,O,L,O,L,O,I,I,J,L,J,L,J,L,J,L,J,L,O,O,S,Z,S,S,S,S,Z?I";
console.log(compare(testString, unpack(pack(testString))));
function pack(mapString) {
    const parts = mapString.split("?");
    const map = !!parts[0] ? __compress(parts[0]) : null;
    const queue = !!parts[1] ? __compress(parts[1].replaceAll(",", "")) : null;
    const hold = parts[2] ?? null;
    return `${map}?${queue}?${hold}`;
}
function __compress(str) {
    let string = "";
    let count = 1;
    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1])
            count++;
        else {
            if (count > 1)
                string += count + str[i - 1];
            else
                string += str[i - 1];
            count = 1;
        }
    }
    return string;
}
function unpack(mapString) {
    const parts = mapString.split("?");
    const map = !!parts[0] ? __decompress(parts[0]) : null;
    const queue = !!parts[1] ? __decompress(parts[1]).split("").join(",") : null;
    const hold = parts[2] ?? null;
    return `${map}?${queue}?${hold}`;
}
function __decompress(str) {
    let string = "";
    let i = 0;
    while (i < str.length) {
        if (str[i] >= "0" && str[i] <= "9") {
            let count = "";
            while (str[i] >= "0" && str[i] <= "9") {
                count += str[i];
                i++;
            }
            string += str[i].repeat(parseInt(count));
        }
        else
            string += str[i];
        i++;
    }
    return string;
}
function compare(mapString1, mapString2) {
    const parts1 = mapString1.split("?");
    const parts2 = mapString2.split("?");
    return {
        map: parts1[0] === parts2[0],
        queue: parts1[1] === parts2[1],
        hold: parts1[2] === parts2[2],
        base: `${parts1[0]}?${parts1[1]}?${parts1[2]}` === `${parts2[0]}?${parts2[1]}?${parts2[2]}`,
        orig: mapString1 === mapString2
    };
}
