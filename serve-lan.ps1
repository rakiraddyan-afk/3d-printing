$root = "C:\Users\rakir\Documents\eurospares-3d"
$port = 8843
$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript"; ".svg"="image/svg+xml"
}

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $requestLine = $reader.ReadLine()
    while (-not [string]::IsNullOrEmpty($reader.ReadLine())) { } # consume headers

    $path = "/index.html"
    if ($requestLine -match '^\S+\s+([^\s]+)\s+HTTP') {
      $reqPath = $matches[1].Split('?')[0]
      if ($reqPath -ne "/") { $path = $reqPath }
    }

    $file = Join-Path $root ($path.TrimStart("/") -replace '/', '\')
    $resolved = $null
    try { $resolved = (Resolve-Path -LiteralPath $file -ErrorAction Stop).Path } catch {}

    $writer = New-Object System.IO.StreamWriter($stream)
    $writer.NewLine = "`r`n"
    $writer.AutoFlush = $true

    if ($resolved -and $resolved.StartsWith($root) -and (Test-Path $resolved -PathType Leaf)) {
      $ext = [System.IO.Path]::GetExtension($resolved)
      $ctype = $mime[$ext]; if (-not $ctype) { $ctype = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($resolved)
      $writer.WriteLine("HTTP/1.1 200 OK")
      $writer.WriteLine("Content-Type: $ctype")
      $writer.WriteLine("Content-Length: $($bytes.Length)")
      $writer.WriteLine("Connection: close")
      $writer.WriteLine("")
      $writer.Flush()
      $stream.Write($bytes, 0, $bytes.Length)
    } else {
      $body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
      $writer.WriteLine("HTTP/1.1 404 Not Found")
      $writer.WriteLine("Content-Type: text/plain")
      $writer.WriteLine("Content-Length: $($body.Length)")
      $writer.WriteLine("Connection: close")
      $writer.WriteLine("")
      $writer.Flush()
      $stream.Write($body, 0, $body.Length)
    }
    $stream.Flush()
  } catch {
  } finally {
    $client.Close()
  }
}
