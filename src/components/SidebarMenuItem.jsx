export default function SidebarMenuItem({ text, Icon }) {
  return (
    <div className="flex cursor-pointer items-center justify-center space-x-3 rounded-3xl py-3  text-lg transition duration-150 ease-out hover:bg-slate-200 xl:justify-start">
      <Icon className="h-7" />
      <span className="hidden text-lg xl:inline">{text}</span>
    </div>
  );
}
