$port = 8080
$htmlPath = "d:\lundry\standalone.html"

if (-not (Test-Path $htmlPath)) {
    Write-Error "standalone.html not found at $htmlPath"
    exit 1
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "========================================================="
    Write-Host "  LaundryHub Local Server Running!"
    Write-Host "  URL: http://localhost:$port/"
    Write-Host "========================================================="
    
    # Launch browser automatically
    Start-Process "http://localhost:$port/"

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $($request.HttpMethod) $($request.Url.LocalPath)"

            if (Test-Path $htmlPath) {
                $bytes = [System.IO.File]::ReadAllBytes($htmlPath)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                }
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentLength64 = $buffer.Length
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                }
            }
            $response.OutputStream.Close()
        } catch {
            Write-Host "Request Error: $_"
        }
    }
} catch {
    Write-Host "Server Exception: $_"
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
