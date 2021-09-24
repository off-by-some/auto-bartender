export const ML_IN_CUP = 236
export const ML_IN_SHOT = 44

export function roundToHundredth(num) {
    return Math.ceil(num * 100) / 100;
}

export function convertUnitToShots(unit) {
    if (unit.type === "ml") {
        return roundToHundredth(unit.amount / ML_IN_SHOT);
    }

    return roundToHundredth(unit.amount); 
}