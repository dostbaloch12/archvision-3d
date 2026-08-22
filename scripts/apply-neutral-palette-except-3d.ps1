cd D:\projects\archvision-3d

$files = Get-ChildItem -Path "src" -Recurse -File -Include *.jsx,*.js,*.css |
  Where-Object {
    $_.FullName -notlike "*\src\components\three\*" -and
    $_.FullName -notlike "*\src\components\Hero.jsx"
  }

function Replace-Color {
  param (
    [string]$Content,
    [string]$From,
    [string]$To
  )

  return [System.Text.RegularExpressions.Regex]::Replace(
    $Content,
    [System.Text.RegularExpressions.Regex]::Escape($From),
    $To,
    [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
  )
}

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)

  # Backgrounds -> creamy white
  $content = Replace-Color $content '#080808' '#f6f4ef'
  $content = Replace-Color $content '#041B13' '#f6f4ef'
  $content = Replace-Color $content '#F4F3F0' '#f6f4ef'
  $content = Replace-Color $content '#FBFAF7' '#fbfaf7'
  $content = Replace-Color $content '#E5E2DC' '#f6f4ef'
  $content = Replace-Color $content '#DCD9D2' '#f6f4ef'

  # Main dark / ink
  $content = Replace-Color $content '#151514' '#44433f'
  $content = Replace-Color $content '#1B1B19' '#44433f'
  $content = Replace-Color $content '#171717' '#44433f'
  $content = Replace-Color $content '#171716' '#44433f'
  $content = Replace-Color $content '#181816' '#44433f'
  $content = Replace-Color $content '#111111' '#44433f'
  $content = Replace-Color $content '#1E1230' '#44433f'
  $content = Replace-Color $content '#2E1A47' '#44433f'
  $content = Replace-Color $content '#3D2B6B' '#44433f'
  $content = Replace-Color $content '#4E3A85' '#44433f'

  # Cream text -> ink on light site
  $content = Replace-Color $content '#F4EFE6' '#44433f'
  $content = Replace-Color $content '#F6F4EF' '#44433f'
  $content = Replace-Color $content '#EAF3EC' '#44433f'

  # Muted text
  $content = Replace-Color $content '#77736B' '#77736b'
  $content = Replace-Color $content '#5F5B55' '#77736b'
  $content = Replace-Color $content '#66615A' '#77736b'
  $content = Replace-Color $content '#68645D' '#77736b'
  $content = Replace-Color $content '#8D806E' '#77736b'
  $content = Replace-Color $content '#8FAA9B' '#77736b'
  $content = Replace-Color $content '#B9CCC0' '#77736b'
  $content = Replace-Color $content '#C9BCA8' '#77736b'

  # Borders
  $content = Replace-Color $content '#D9D6CF' '#c8c4bc'
  $content = Replace-Color $content '#C8C4BC' '#c8c4bc'
  $content = Replace-Color $content '#BDB9B1' '#c7c3bb'
  $content = Replace-Color $content '#C7C3BB' '#c7c3bb'
  $content = Replace-Color $content '#2A2A2A' '#c8c4bc'
  $content = Replace-Color $content '#262626' '#c8c4bc'
  $content = Replace-Color $content '#3A3A3A' '#c7c3bb'
  $content = Replace-Color $content '#44433F' '#44433f'

  # Accents -> muted/taupe
  $content = Replace-Color $content '#B59A67' '#77736b'
  $content = Replace-Color $content '#D4BD8D' '#c7c3bb'
  $content = Replace-Color $content '#B5AEA3' '#c7c3bb'
  $content = Replace-Color $content '#AAA69E' '#77736b'
  $content = Replace-Color $content '#CED46A' '#44433f'
  $content = Replace-Color $content '#DDE08F' '#77736b'

  # Old purple/pink backgrounds -> creamy white
  $content = Replace-Color $content '#654EA3' '#f6f4ef'
  $content = Replace-Color $content '#5E489B' '#f6f4ef'
  $content = Replace-Color $content '#6B52A6' '#f6f4ef'
  $content = Replace-Color $content '#7C5FB0' '#f6f4ef'
  $content = Replace-Color $content '#8A69B8' '#f6f4ef'
  $content = Replace-Color $content '#9370BC' '#f6f4ef'
  $content = Replace-Color $content '#A77CC0' '#f6f4ef'
  $content = Replace-Color $content '#B489C2' '#f6f4ef'
  $content = Replace-Color $content '#D2A2C8' '#f6f4ef'
  $content = Replace-Color $content '#EAAFCB' '#c8c4bc'
  $content = Replace-Color $content '#F0C4D8' '#c7c3bb'
  $content = Replace-Color $content '#F6DCE8' '#f6f4ef'

  # Old green backgrounds
  $content = Replace-Color $content '#0A3D2B' '#c8c4bc'
  $content = Replace-Color $content '#07553B' '#44433f'
  $content = Replace-Color $content '#062B1F' '#44433f'

  [System.IO.File]::WriteAllText($file.FullName, $content)
}