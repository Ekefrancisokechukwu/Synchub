const SynchubSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="160"
      height="40"
    >
      <defs>
        {/* Define a linear gradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#dddddd", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#808080", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      {/* Use the linear gradient for the text fill */}
      <text
        x="0"
        y="40"
        fontFamily="Arial"
        fontSize="40"
        fill="url(#textGradient)"
      >
        Synchub
      </text>
    </svg>
  );
};

export default SynchubSVG;
