export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#041B13]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin border-2 border-[#0A3D2B] border-t-[#CED46A]" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#CED46A]">Loading</p>
      </div>
    </div>
  )
}