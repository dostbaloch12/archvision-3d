cd D:\projects\archvision-3d

New-Item -ItemType Directory -Force -Path "src\generated" | Out-Null

$root = "public\all-projects"
$output = "src\generated\projectImages.js"

$categories = @(
  "Residential",
  "Commercial",
  "Hospitality",
  "Institutional",
  "Mixed-Use"
)

function Clean-Title {
  param([string]$Name, [string]$Category)

  $lower = $Name.ToLower()

  if ($lower.Contains("whatsapp image")) {
    return "$Category Project"
  }

  $title = [System.IO.Path]::GetFileNameWithoutExtension($Name)

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

function Escape-JsString {
  param([string]$Value)
  return $Value.Replace("\", "\\").Replace("'", "\'")
}

$items = @()

foreach ($category in $categories) {
  $folder = Join-Path $root $category

  if (!(Test-Path $folder)) {
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
    $relative = $file.FullName.Replace((Get-Location).Path + "\public", "")
    $relative = $relative.Replace("\", "/")

    $items += [PSCustomObject]@{
      title = Clean-Title $file.Name $category
      category = $category
      location = ""
      year = "2024"
      image = $relative
      description = "Selected Utopian Design Studio portfolio image showing architecture, interior detail, material direction and spatial composition."
    }
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

Set-Content -Path $output -Value $js -Encoding UTF8

Write-Host "Generated $($items.Count) images in $output" -ForegroundColor Green