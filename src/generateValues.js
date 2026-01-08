function isOdd(num) {
  return num % 2 == 0 ? false : true;
}

const generateValues = (num) => {
  let ogNum = num;
  let numList = [num];
  if (num == 0) {
    return [0];
  }
  var _LP = Date.now();
  try {
    while (num != 1) {
      if (Date.now() - _LP > 100) break;
      if (num == -1) {
        break;
      }
      if (num < 0) {
        if (isOdd(num)) {
          num = num * 3 - 1;
        } else {
          num = num / 2;
        }
        numList.push(num);
        continue;
      }
      if (isOdd(num)) {
        num = num * 3 + 1;
      } else {
        num = num / 2;
      }
      numList.push(num);
    }
  } catch (e) {
    throw new Error(ogNum);
  }

  return numList;
};

export default generateValues;
