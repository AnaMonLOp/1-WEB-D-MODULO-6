export function UserAvatar({ avatar, size = "md", alt = "avatar" }) {
  const sizeMap = {
    sm: "w-9 h-9 text-xl",
    md: "w-10 h-10 text-2xl",
    lg: "w-20 h-20 text-4xl",
  };

  const className = `rounded-full flex items-center justify-center bg-gray-100 ${sizeMap[size] || sizeMap.md}`;

  return avatar?.startsWith("http") ? (
    <img src={avatar} alt={alt} className={`object-cover rounded-full ${sizeMap[size] || sizeMap.md}`} />
  ) : (
    <div className={className}>{avatar || "👤"}</div>
  );
}