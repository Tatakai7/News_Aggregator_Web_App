export const LoadingFallback = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin mb-4">
          <div className="w-12 h-12 border-4 border-muted border-t-secondary rounded-full"></div>
        </div>
        <p className="text-muted-foreground font-medium">Loading page...</p>
      </div>
    </div>
  )
}

export default LoadingFallback;
