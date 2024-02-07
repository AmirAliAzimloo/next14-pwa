export function inputCurrency(selfVal: string): string {
  if (!selfVal) return "";
  let strVal: string = "" + selfVal;
  let value: string = strVal.split(",").join("");
  if (isNaN(Number(value))) {
    value = selfVal.replace(/\D/g, "");
  }
  let result: string = "";
  let valueArray: string[] = value.split("");
  let resultArray: string[] = [];
  let counter: number = 0;
  let temp: string = "";
  for (let i: number = valueArray.length - 1; i >= 0; i--) {
    temp += valueArray[i];
    counter++;
    if (counter === 3) {
      resultArray.push(temp);
      counter = 0;
      temp = "";
    }
  }
  if (counter > 0) {
    resultArray.push(temp);
  }
  for (let i: number = resultArray.length - 1; i >= 0; i--) {
    let resTemp: string[] = resultArray[i].split("");
    for (let j: number = resTemp.length - 1; j >= 0; j--) {
      result += resTemp[j];
    }
    if (i > 0) {
      result += ",";
    }
  }
  return result;
}

export default inputCurrency;