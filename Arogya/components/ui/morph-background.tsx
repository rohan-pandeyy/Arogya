export default function MorphBackground() {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden"
      style={{ backgroundColor: "#DDFFDA" }}
    >
      <div className="absolute w-[40vw] h-[40vw] bg-green-300/50 rounded-full animate-pulse2 blur-2xl top-[3%] left-[20%]" />
      <div className="absolute w-[50vw] h-[50vw] bg-green-400/30 rounded-full animate-pulse2 blur-2xl top-[17%] left-[1%]" />
      <div className="absolute w-[40vw] h-[40vw] bg-green-300/30 rounded-full animate-pulse1 blur-2xl top-[15%] right-[30%]" />
      <div className="absolute w-[30vw] h-[30vw] bg-green-400/30 rounded-full animate-pulse1 blur-2xl top-[20%] right-[10%]" />
    </div>
  );
}
