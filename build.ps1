# Write-Output "Build IE code";
# Set-Variable -Name "RootDir" -Value $PWD;
# # Set-Location "$RootDir\JsCode\BotTimeUI.Web.Js.IE";
# Set-Location "$RootDir\TsCode\BotTimeUI.Web.IE";
# Write-Output "Install IE dependencies";
# npm ci;
# Write-Output "Building...";
# npm run build;
# Write-Output "Done";

Write-Output "Build javascript code";
Set-Variable -Name "RootDir" -Value $PWD;
Set-Location "$RootDir\src\main";
Write-Output "Install dependencies";
npm ci;
Write-Output "Building Fontend Code ...";
npm run build;
Write-Output "Done";

Set-Location "$RootDir\src\server";
Write-Output "Install dependencies";
npm ci;
Write-Output "Done";

Set-Location "$RootDir";
Write-Output "Install dependencies";
npm ci;
Write-Output "Building Fontend Code ...";
npm run build;
Write-Output "Done";
