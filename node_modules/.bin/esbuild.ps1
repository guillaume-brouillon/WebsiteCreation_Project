#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent

$exe=""
if ($PSVersionTable.PSVersion -lt "6.0" -or $IsWindows) {
  # Fix case when both the Windows and Linux builds of Node
  # are installed in the same directory
  $exe=".exe"
}
# Support pipeline input
if ($MyInvocation.ExpectingInput) {
  $input | & "$basedir/../esbuild/bin/esbuild"   $args
} else {
  & "$basedir/../esbuild/bin/esbuild"   $args
}
exit $LASTEXITCODE
