type PiCircleProps = {
  className?: string;
  width?: string;
  height?: string;
  color?: string;
};

const PiCircle = ({
  className,
  width,
  height,
  color = "#fcc36e",
}: PiCircleProps) => {
  return (
    <svg
      width={`${width && width.trim() !== "" ? width : "26"}`}
      height={`${height && height.trim() !== "" ? height : "26"}`}
      viewBox="0 0 260 260"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={`${className && className.trim() !== "" ? className : ""}`}>
      <path
        fill={color}
        d="M94.91 66.314c0-1.078.875-1.953 1.954-1.953h18.878c1.079 0 1.953.875 1.953 1.953v14.973a1.953 1.953 0 0 1-1.953 1.953H96.863a1.953 1.953 0 0 1-1.953-1.953V66.314ZM133.97 66.314c0-1.078.875-1.953 1.953-1.953h18.879c1.079 0 1.953.875 1.953 1.953v14.973a1.953 1.953 0 0 1-1.953 1.953h-18.879a1.953 1.953 0 0 1-1.953-1.953V66.314Z"></path>
      <path
        fill={color}
        d="M94.91 115.616v77.765l22.785 8.992v-86.757h16.275v77.765l22.785 8.992v-86.757h15.14c12.491 0 22.618-10.234 22.618-22.858V79.985h-22.618v12.773H80.422c-12.492 0-22.618 10.234-22.618 22.858v15.798h22.618v-15.798h14.489Z"></path>
      <path
        fill={color}
        fill-rule="evenodd"
        d="M130.122 20.75c-60.368 0-109.305 48.937-109.305 109.305 0 60.367 48.937 109.305 109.305 109.305 60.367 0 109.305-48.938 109.305-109.305 0-60.368-48.938-109.305-109.305-109.305ZM.943 130.055C.943 58.711 58.778.875 130.122.875c71.343 0 129.178 57.836 129.178 129.18 0 71.343-57.835 129.178-129.178 129.178C58.778 259.233.943 201.398.943 130.055Z"
        clip-rule="evenodd"></path>
    </svg>
  );
};

export default PiCircle;
