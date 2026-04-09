$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$downloads = @(
    @{ Url = 'https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png'; Out = 'assets\external\google\googleg_32dp.png' },
    @{ Url = 'https://www.gstatic.com/images/branding/product/1x/googleg_96dp.png'; Out = 'assets\external\google\googleg_96dp.png' },
    @{ Url = 'https://unsplash.com/photos/3S0Ucv4BDCk/download?force=true&w=1600'; Out = 'assets\external\backgrounds\photo-one.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; Out = 'assets\external\backgrounds\photo-two.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1603288231069-1007b5d651e9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; Out = 'assets\external\backgrounds\photo-three.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\photo-four.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\photo-five.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\photo-six.jpg' },
    @{ Url = 'https://storagev2.files-vault.com/uploads/blacklabel-765/sub-account-81526/BG%201.webp'; Out = 'assets\external\backgrounds\bg-main.webp' },
    @{ Url = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\brochure-career.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1581362072978-14998d01fdaa?q=80&w=768&auto=format&fit=crop'; Out = 'assets\external\backgrounds\brochure-abroad.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=774&auto=format&fit=crop'; Out = 'assets\external\backgrounds\brochure-parenting.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-usa.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-uk.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-australia.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-canada.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-germany.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-france.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-singapore.jpg' },
    @{ Url = 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1740&auto=format&fit=crop'; Out = 'assets\external\backgrounds\country-netherlands.jpg' },
    @{ Url = 'https://picsum.photos/seed/default-campus/720/420'; Out = 'assets\universities\demo\default-campus.jpg' }
)

$logoDomains = @{
    HARV = 'harvard.edu'; MIT = 'mit.edu'; SU = 'stanford.edu'; YU = 'yale.edu'; OX = 'ox.ac.uk'; CAM = 'cam.ac.uk'
    ICL = 'imperial.ac.uk'; LSE = 'lse.ac.uk'; UM = 'unimelb.edu.au'; ANU = 'anu.edu.au'; UNSW = 'unsw.edu.au'; MON = 'monash.edu'
    UOFT = 'utoronto.ca'; UBC = 'ubc.ca'; MG = 'mcgill.ca'; MAC = 'mcmaster.ca'; TUM = 'tum.de'; HD = 'uni-heidelberg.de'
    HB = 'hu-berlin.de'; BONN = 'uni-bonn.de'; PS = 'universite-paris-saclay.fr'; SOR = 'sorbonne-universite.fr'; PSL = 'psl.eu'; HEC = 'hec.edu'
    NUS = 'nus.edu.sg'; NTU = 'ntu.edu.sg'; SMU = 'smu.edu.sg'; SUSS = 'suss.edu.sg'; UVA = 'uva.nl'; UU = 'uu.nl'; EUR = 'eur.nl'; RUG = 'rug.nl'
}

$demoSeeds = @{
    HARV = 'harvard-campus'; MIT = 'mit-campus'; SU = 'stanford-campus'; YU = 'yale-campus'; OX = 'oxford-campus'; CAM = 'cambridge-campus'
    ICL = 'imperial-campus'; LSE = 'lse-campus'; UM = 'unimelb-campus'; ANU = 'anu-campus'; UNSW = 'unsw-campus'; MON = 'monash-campus'
    UOFT = 'uoft-campus'; UBC = 'ubc-campus'; MG = 'mcgill-campus'; MAC = 'mcmaster-campus'; TUM = 'tum-campus'; HD = 'heidelberg-campus'
    HB = 'humboldt-campus'; BONN = 'bonn-campus'; PS = 'paris-saclay-campus'; SOR = 'sorbonne-campus'; PSL = 'psl-campus'; HEC = 'hec-campus'
    NUS = 'nus-campus'; NTU = 'ntu-campus'; SMU = 'smu-campus'; SUSS = 'suss-campus'; UVA = 'uva-campus'; UU = 'utrecht-campus'; EUR = 'erasmus-campus'; RUG = 'groningen-campus'
}

foreach ($key in $logoDomains.Keys) {
    $downloads += @{
        Url = "https://logo.clearbit.com/$($logoDomains[$key])"
        Out = "assets\\universities\\logos\\$($key.ToLower()).png"
    }
}

foreach ($key in $demoSeeds.Keys) {
    $downloads += @{
        Url = "https://picsum.photos/seed/$($demoSeeds[$key])/720/420"
        Out = "assets\\universities\\demo\\$($key.ToLower())-campus.jpg"
    }
}

foreach ($item in $downloads) {
    $fullOut = Join-Path $root $item.Out
    $dir = Split-Path -Parent $fullOut
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    try {
        Invoke-WebRequest -Uri $item.Url -OutFile $fullOut
    } catch {
        Write-Warning "Skipped $($item.Url): $($_.Exception.Message)"
    }
}

Write-Host "Downloaded $($downloads.Count) files."
