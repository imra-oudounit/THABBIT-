type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
};

export function Icon({ name, className = "", filled = false, size = 22 }: IconProps) {
  return (
    <span
      className={`msr ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: size, fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 500, 'GRAD' 0, 'opsz' ${size}` }}
    >
      {name}
    </span>
  );
}
