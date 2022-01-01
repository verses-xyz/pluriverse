export default function scalePercent(start, end, scrollPercent) {
  return (scrollPercent - start) / (end - start);
}
