/*
  Each element in an array represents a ball.
  Directions are either 1 (right) or -1 (left).
  Balls will collide if they are moving towards each other, e.g. 1, -1 will collide.
  Corresponding strength will determine which one is destroyed (lower strength is destroyed).

  Strengths will never be equal at any stage of the collisions events (e.g. even after collision, no strength will be equal)

  ex:
  [1, -1, 1], [3, 2, 5] => [0, 2]
  [-1, 1, -1], [2, 3, 4] => [0, 2]
  [1, -1, -1], [2, 1, 3] => [2]

  Return the indices of the balls after all collisions.
*/

const solution = (directionsArr, strengthsArr) => {
  // Build tuple[], [dir * strength, idx][]
  const tupleArr = directionsArr.reduce((acc, direction, idx) => {
    const val = direction * strengthsArr[idx];
    const tupleEntry = createTuple(val, idx);

    return [...acc, tupleEntry];
  }, []);

  const result = simulateCollisions(tupleArr);

  return result.map(([_, idx]) => idx);
};

const createTuple = (val, idx) => [val, idx];

const simulateCollisions = (tupleArr) => {
  let tupleArrDup = [...tupleArr];
  let hasCollided = true;

  while (hasCollided) {
    hasCollided = false;

    // last element can never collide with the one that comes after
    for (let i = 0; i < tupleArrDup.length - 1; i++) {
      // checking from left to right, only need to check positives
      const currVal = tupleArrDup[i][0];
      if (currVal < 0) continue;
      const nextVal = tupleArrDup[i + 1][0];
      if (nextVal > 0) continue;

      // currVal > 0, nextVal < 0, collision possible, determine survivor
      // remove destroyed
      if (Math.abs(currVal) > Math.abs(nextVal)) {
        tupleArrDup = [...tupleArrDup.slice(0, i + 1), ...tupleArrDup.slice(i + 2)];
      } else {
        tupleArrDup = [...tupleArrDup.slice(0, i), ...tupleArrDup.slice(i + 1)];
      }
      hasCollided = true;
      break;
    };
  }

  return tupleArrDup;
};

module.exports = solution;