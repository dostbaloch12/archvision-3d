export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F3F0]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin border-2 border-[#D9D6CF] border-t-[#171717]" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#171717]">Loading</p>
      </div>
    </div>
  )
}
