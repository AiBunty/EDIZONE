# FTP Upload Script for Edizone Careers
$ftpServer = "ftp.theboxerp.com"
$ftpUser = "admin@edizonecareers.com"
$ftpPassword = "Zebra@789"
$ftpUri = "ftp://$ftpServer/"
$localRoot = "D:\GITHUB Projects\Edizone\EDIZONE"

# Create FTP credentials
$credential = New-Object System.Net.NetworkCredential($ftpUser, $ftpPassword)

# Function to upload file via FTP
function Upload-FileToFtp {
    param(
        [string]$LocalPath,
        [string]$RemotePath
    )
    
    try {
        $uri = "$ftpUri$RemotePath"
        $ftp = [System.Net.FtpWebRequest]::Create($uri)
        $ftp.Credentials = $credential
        $ftp.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        
        $fileStream = [System.IO.File]::OpenRead($LocalPath)
        $ftpStream = $ftp.GetRequestStream()
        $fileStream.CopyTo($ftpStream)
        $ftpStream.Close()
        $fileStream.Close()
        
        $response = $ftp.GetResponse()
        Write-Host "✓ Uploaded: $RemotePath" -ForegroundColor Green
        $response.Close()
    }
    catch {
        Write-Host "✗ Failed to upload $RemotePath : $_" -ForegroundColor Red
    }
}

# Function to upload directory recursively
function Upload-DirectoryToFtp {
    param(
        [string]$LocalDir,
        [string]$RemoteDir
    )
    
    $items = Get-ChildItem -Path $LocalDir -Recurse
    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            continue
        }
        
        $relativePath = $item.FullName.Substring($LocalRoot.Length + 1)
        $remotePath = $relativePath.Replace("\", "/")
        
        Write-Host "Uploading: $remotePath"
        Upload-FileToFtp -LocalPath $item.FullName -RemotePath $remotePath
    }
}

# Upload critical files first
Write-Host "Starting FTP upload..." -ForegroundColor Cyan
Write-Host "Target: ftp://$ftpServer" -ForegroundColor Cyan
Write-Host ""

# Upload robots.txt
Upload-FileToFtp -LocalPath "$localRoot\robots.txt" -RemotePath "robots.txt"

# Upload index.html
Upload-FileToFtp -LocalPath "$localRoot\index.html" -RemotePath "index.html"

# Upload all styles
Write-Host "`nUploading styles..." -ForegroundColor Yellow
Upload-DirectoryToFtp -LocalDir "$localRoot\styles" -RemoteDir "styles"

# Upload all scripts
Write-Host "`nUploading scripts..." -ForegroundColor Yellow
Upload-DirectoryToFtp -LocalDir "$localRoot\scripts" -RemoteDir "scripts"

# Upload assets
Write-Host "`nUploading assets..." -ForegroundColor Yellow
Upload-DirectoryToFtp -LocalDir "$localRoot\assets" -RemoteDir "assets"

# Upload other static files
Write-Host "`nUploading static files..." -ForegroundColor Yellow
@("sitemap.xml", "config.json", "section-order.json", "llms.txt", "BingSiteAuth.xml") | ForEach-Object {
    $file = "$localRoot\$_"
    if (Test-Path $file) {
        Upload-FileToFtp -LocalPath $file -RemotePath $_
    }
}

Write-Host "`n✓ FTP upload completed!" -ForegroundColor Green
