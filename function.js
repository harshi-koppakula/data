function solution(D) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayValues = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
  const dayCounts = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };

  // Step 1: Map each date to its weekday and sum values
  for (const dateStr in D) {
    const date = new Date(dateStr);
    const dayName = dayNames[date.getUTCDay()];
    dayValues[dayName] += D[dateStr];
    dayCounts[dayName]++;
  }

  // Step 2: Calculate averages for existing days
  for (const day in dayValues) {
    if (dayCounts[day] > 0) {
      dayValues[day] = Math.round(dayValues[day]);
    }
  }

  // Step 3: Fill missing days using mean of previous and next
  const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let i = 0; i < weekOrder.length; i++) {
    const day = weekOrder[i];
    if (dayCounts[day] === 0) {
      let prev = null, next = null;

      // Find previous non-zero
      for (let j = i - 1; j >= 0; j--) {
        if (dayCounts[weekOrder[j]] > 0) {
          prev = weekOrder[j];
          break;
        }
      }

      // Find next non-zero
      for (let k = i + 1; k < weekOrder.length; k++) {
        if (dayCounts[weekOrder[k]] > 0) {
          next = weekOrder[k];
          break;
        }
      }

      // If both neighbors exist, take mean
      if (prev && next) {
        dayValues[day] = Math.round((dayValues[prev] + dayValues[next]) / 2);
      }
    }
  }

  return dayValues;
}
