cd D:\projects\archvision-3d

$sourceRoot = "public\all-projects"
$galleryRoot = "public\images\gallery"
$outputFile = "src\generated\projectImages.js"

New-Item -ItemType Directory -Force -Path "public\images" | Out-Null
New-Item -ItemType Directory -Force -Path "src\generated" | Out-Null

if (Test-Path $galleryRoot) {
  Remove-Item -Recurse -Force $galleryRoot
}

New-Item -ItemType Directory -Force -Path $galleryRoot | Out-Null

$categories = @(
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Mixed-Use"
)

function Get-SafeSlug {
  param([string]$Value)

  $name = [System.IO.Path]::GetFileNameWithoutExtension($Value)
  $name = $name -replace "\.jpg$", ""
  $name = $name -replace "\.jpeg$", ""
  $name = $name -replace "\.png$", ""
  $name = $name -replace "\.webp$", ""
  $name = $name.ToLower()
  $name = $name -replace "whatsapp-image-\d{4}-\d{2}-\d{2}-at-", ""
  $name = $name -replace "am|pm", ""
  $name = $name -replace "[^a-z0-9]+", "-"
  $name = $name.Trim("-")

  if ([string]::IsNullOrWhiteSpace($name)) {
    return "project"
  }

  return $name
}

function Get-CleanTitle {
  param(
    [string]$FileName,
    [string]$Category
  )

  $lower = $FileName.ToLower()

  if ($lower.Contains("whatsapp image")) {
    return "$Category Project"
  }

  $title = [System.IO.Path]::GetFileNameWithoutExtension($FileName)
  $title = $title -replace "\.jpg$", ""
  $title = $title -replace "\.jpeg$", ""
  $title = $title -replace "\.png$", ""
  $title = $title -replace "\.webp$", ""
  $title = $title -replace "_", " "
  $title = $title -replace "\+", " "
  $title = $title -replace "-", " "
  $title = $title -replace "\s+", " "
  $title = $title.Trim()

  if ([string]::IsNullOrWhiteSpace($title)) {
    return "$Category Project"
  }

  return (Get-Culture).TextInfo.ToTitleCase($title.ToLower())
}

function Get-OutputExtension {
  param([string]$FileName)

  $lower = $FileName.ToLower()

  if ($lower.EndsWith(".png")) {
    return ".png"
  }

  if ($lower.EndsWith(".webp")) {
    return ".webp"
  }

  return ".jpg"
}

function Escape-JsString {
  param([string]$Value)

  return $Value.Replace("\", "\\").Replace("'", "\'")
}

$items = @()
$counter = 1

foreach ($category in $categories) {
  $folder = Join-Path $sourceRoot $category

  if (!(Test-Path $folder)) {
    Write-Host "Missing folder: $folder" -ForegroundColor Yellow
    continue
  }

  $files = Get-ChildItem -Path $folder -File | Where-Object {
    $_.Name.ToLower().EndsWith(".jpg") -or
    $_.Name.ToLower().EndsWith(".jpeg") -or
    $_.Name.ToLower().EndsWith(".jpg.jpeg") -or
    $_.Name.ToLower().EndsWith(".png") -or
    $_.Name.ToLower().EndsWith(".webp")
  } | Sort-Object Name

  foreach ($file in $files) {
    if ($file.Length -gt 10MB) {
      Write-Host "Skipped heavy image over 10MB: $($file.Name)" -ForegroundColor Yellow
      continue
    }

    $safeCategory = $category.ToLower() -replace "[^a-z0-9]+", "-"
    $slug = Get-SafeSlug $file.Name
    $ext = Get-OutputExtension $file.Name

    $newFileName = "{0:D3}-{1}-{2}{3}" -f $counter, $safeCategory, $slug, $ext
    $destPath = Join-Path $galleryRoot $newFileName

    Copy-Item -LiteralPath $file.FullName -Destination $destPath -Force

    $items += [PSCustomObject]@{
      title = Get-CleanTitle $file.Name $category
      category = $category
      location = ""
      year = "2024"
      image = "/images/gallery/$newFileName"
      description = "Selected Utopian Design Studio portfolio image showing architecture, interior detail, material direction and spatial composition."
    }

    Write-Host "Copied: $($file.Name) -> $newFileName"
    $counter++
  }
}

$js = "export const generatedProjectImages = [`n"

foreach ($item in $items) {
  $js += @"
  {
    title: '$(Escape-JsString $item.title)',
    category: '$(Escape-JsString $item.category)',
    location: '$(Escape-JsString $item.location)',
    year: '$(Escape-JsString $item.year)',
    image: '$(Escape-JsString $item.image)',
    description: '$(Escape-JsString $item.description)',
  },

"@
}

$js += "]`n"

Set-Content -Path $outputFile -Value $js -Encoding UTF8

Write-Host ""
Write-Host "Generated $($items.Count) gallery images." -ForegroundColor Green
Write-Host "Gallery folder: $galleryRoot" -ForegroundColor Green
Write-Host "Data file: $outputFile" -ForegroundColor Green