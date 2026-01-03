$ProgressPreference = 'SilentlyContinue'
# Testataan react
for ($i = 1; $i -le 40; $i++) {
    $startTime = Get-Date
    Invoke-WebRequest -Uri "http://localhost:4174/" 
    $endTime = Get-Date
    $responseTime = New-TimeSpan -Start $startTime -End $endTime
    Write-Host "React Iteraatio $($i): $($responseTime.TotalMilliseconds) ms"
    Start-Sleep -Seconds 1
}
