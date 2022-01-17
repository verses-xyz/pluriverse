import "./LoadingIndicator.css";


export function LoadingIndicator(props) {
  return (
    <span className="spinner" {...props}>
      <div className="bg-gray-100 dot1"></div>
      <div className="bg-gray-100 dot2"></div>
    </span>
  );
}
