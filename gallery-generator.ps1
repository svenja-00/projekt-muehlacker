# ==========================================
# Projekt Mühlacker
# Gallery Generator
# ==========================================

$galleryRoot = "assets/images/gallery"
$outputFile  = "assets/data/gallery.json"

$images = @()

$id = 1

Get-ChildItem $galleryRoot -Directory | Sort-Object Name | ForEach-Object {

    # Kategoriename übernehmen
    $category = $_.Name.ToLower()
    Write-Host "Kategorie erkannt: $category"

    # Umlaute ersetzen
    $category = $category.Replace("ä","ae")
    $category = $category.Replace("ö","oe")
    $category = $category.Replace("ü","ue")
    $category = $category.Replace("ß","ss")
    Write-Host "Nach Replace: $category"

    # Bilder im Ordner durchlaufen
    Get-ChildItem $_.FullName -File | Sort-Object Name | ForEach-Object {

        $images += [PSCustomObject]@{

            id       = $id
            category = $category
            image    = "assets/images/gallery/$category/$($_.Name)"

        }

        $id++

    }

}

# JSON erzeugen
$json = @{

    images = $images

} | ConvertTo-Json -Depth 3

# Datei speichern
$json | Out-File $outputFile -Encoding UTF8

Write-Host ""
Write-Host "========================================="
Write-Host " Gallery erfolgreich erstellt!"
Write-Host "========================================="
Write-Host ""
Write-Host "Bilder : $($images.Count)"
Write-Host "Datei  : $outputFile"
Write-Host ""