export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#44433f]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin border-2 border-[#c8c4bc] border-t-[#44433f]" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#44433f]">Loading</p>
      </div>
    </div>
  )
}
