export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin border-2 border-[#262626] border-t-[#F4EFE6]" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#F4EFE6]">Loading</p>
      </div>
    </div>
  )
}
