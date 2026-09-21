cd D:\projects\archvision-3d

New-Item -ItemType Directory -Force -Path "public\images\projects"

function Copy-FirstMatch {
  param (
    [string]$SourceFolder,
    [string[]]$Patterns,
    [string]$Destination
  )

  foreach ($pattern in $Patterns) {
    $file = Get-ChildItem -Path $SourceFolder -File | Where-Object { $_.Name -like $pattern } | Select-Object -First 1

    if ($file) {
      Copy-Item -LiteralPath $file.FullName -Destination $Destination -Force
      Write-Host "Copied:" $file.Name "=>" $Destination
      return
    }
  }

  Write-Host "No match found for:" $Destination -ForegroundColor Yellow
}

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Residential" `
  -Patterns @("01_11*", "3D VIEW.jpg*", "RF_15*", "*.jpg*") `
  -Destination "public\images\projects\private-residence.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Residential" `
  -Patterns @("01_12*", "2.1_3*", "2.1_4*", "*.jpg*") `
  -Destination "public\images\projects\contemporary-house.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Residential" `
  -Patterns @("RF_15*", "3D VIEW-2*", "2.1_4*", "*.jpg*") `
  -Destination "public\images\projects\urban-residence.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Hospitality" `
  -Patterns @("3D VIEW-2*", "3D VIEW-3*", "3D VIEW-4*", "*.jpg*") `
  -Destination "public\images\projects\hospitality-concept.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Commercial" `
  -Patterns @("LOBBY_03*", "BASEMENT+LOUNGE*", "VIEW 1.jpg*", "*.jpg*") `
  -Destination "public\images\projects\commercial-workplace.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Commercial" `
  -Patterns @("DINING++KITCHEN*", "BEDROOM VIEW 1*", "VIEW 2*", "*.jpg*") `
  -Destination "public\images\projects\office-environment.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Institutional" `
  -Patterns @("1.jpg*", "2.jpg*", "3.jpg*", "*.jpg*") `
  -Destination "public\images\projects\institutional-building.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Mixed-Use" `
  -Patterns @("3D VIEW -1*", "01_11*", "01_12*", "*.jpg*") `
  -Destination "public\images\projects\mixed-use-development.jpg"

Copy-FirstMatch `
  -SourceFolder "public\all-projects\Commercial" `
  -Patterns @("BEDROOM VIEW 2*", "DINING++KITCHEN*", "LOUNGE VIEW*", "*.jpg*") `
  -Destination "public\images\projects\interior-architecture.jpg"

Write-Host "Done. Final project images:" -ForegroundColor Green
Get-ChildItem "public\images\projects" -File | Select-Object Name, Length