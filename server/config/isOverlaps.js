const isOverlaps = (
  interviewStartTime,
  interviewEndTime,
  myStartTime,
  myEndTime
) => {
  if (
    Math.max(myStartTime, interviewStartTime) <=
    Math.min(myEndTime, interviewEndTime)
  )
    return true;

  return false;
};

module.exports = isOverlaps;
