cd D:\projects\archvision-3d

$files = Get-ChildItem -Path "src" -Recurse -File -Include *.jsx,*.js,*.css

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)

  # Current black/cream/gold theme -> editorial light theme
  $content = $content.Replace('#080808', '#F4F3F0')
  $content = $content.Replace('#111111', '#171717')
  $content = $content.Replace('#171717', '#171717')
  $content = $content.Replace('#2A2A2A', '#D9D6CF')
  $content = $content.Replace('#3A3A3A', '#BDB9B1')
  $content = $content.Replace('#262626', '#D9D6CF')

  $content = $content.Replace('#F4EFE6', '#171717')
  $content = $content.Replace('#FFF8EC', '#FBFAF7')
  $content = $content.Replace('#E8DDCC', '#FBFAF7')
  $content = $content.Replace('#C9BCA8', '#77736B')
  $content = $content.Replace('#8D806E', '#77736B')

  $content = $content.Replace('#B59A67', '#B5AEA3')
  $content = $content.Replace('#D4BD8D', '#AAA69E')

  # Any remaining old colors from previous themes
  $content = $content.Replace('#041B13', '#F4F3F0')
  $content = $content.Replace('#0A3D2B', '#D9D6CF')
  $content = $content.Replace('#07553B', '#FBFAF7')
  $content = $content.Replace('#CED46A', '#171717')
  $content = $content.Replace('#DDE08F', '#151514')
  $content = $content.Replace('#EAF3EC', '#171717')
  $content = $content.Replace('#B9CCC0', '#77736B')
  $content = $content.Replace('#8FAA9B', '#77736B')

  $content = $content.Replace('#654EA3', '#F4F3F0')
  $content = $content.Replace('#5E489B', '#F4F3F0')
  $content = $content.Replace('#6B52A6', '#E5E2DC')
  $content = $content.Replace('#7C5FB0', '#E5E2DC')
  $content = $content.Replace('#8A69B8', '#DCD9D2')
  $content = $content.Replace('#9370BC', '#DCD9D2')
  $content = $content.Replace('#A77CC0', '#E5E2DC')
  $content = $content.Replace('#B489C2', '#F4F3F0')
  $content = $content.Replace('#D2A2C8', '#F4F3F0')
  $content = $content.Replace('#EAAFCB', '#FBFAF7')
  $content = $content.Replace('#F0C4D8', '#B5AEA3')
  $content = $content.Replace('#F6DCE8', '#F6F4EF')
  $content = $content.Replace('#1E1230', '#151514')
  $content = $content.Replace('#2E1A47', '#5F5B55')
  $content = $content.Replace('#3D2B6B', '#77736B')
  $content = $content.Replace('#4E3A85', '#171717')

  [System.IO.File]::WriteAllText($file.FullName, $content)
}