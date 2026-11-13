[CmdletBinding()]
param(
    [string]$Target,
    [string]$PublicKeyPath
)

& (Join-Path $PSScriptRoot 'setup-ssh-access.ps1') @PSBoundParameters
