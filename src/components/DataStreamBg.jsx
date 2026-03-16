const DataStreamBg = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {/* Vertical Data Streams */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-cyber-cyan/40 to-transparent"
          style={{
            left: `${(i + 1) * 7}%`,
            top: "-20%",
            bottom: "-20%",
            opacity: 0.1 + Math.random() * 0.3,
            animation: `data-stream ${3 + Math.random() * 5}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Horizontal Circuit Lines */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"
          style={{
            top: `${(i + 1) * 10}%`,
            left: "-20%",
            right: "-20%",
            opacity: 0.05 + Math.random() * 0.2,
            animation: `data-stream ${5 + Math.random() * 8}s linear reverse infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-10" />
    </div>
  );
};

export default DataStreamBg;
