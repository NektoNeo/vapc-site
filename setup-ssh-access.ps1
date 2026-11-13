[CmdletBinding()]
param(
    [string]$Target,
    [string]$PublicKeyPath
)

$ErrorActionPreference = 'Stop'
if (!$Target) { $Target = Read-Host 'SSH destination (user@host or SSH config alias)' }
if ($Target -notmatch '^(?:[a-zA-Z0-9_][a-zA-Z0-9_.-]*@)?(?:[a-zA-Z0-9][a-zA-Z0-9.:-]*|\[[a-fA-F0-9:.]+\])$') {
    throw 'Supply a single SSH destination. Configure custom ports in your SSH config.'
}
if (!$PublicKeyPath) {
    $PublicKeyPath = Join-Path $env:USERPROFILE '.ssh\id_ed25519.pub'
    if (!(Test-Path -LiteralPath $PublicKeyPath)) {
        $PublicKeyPath = Join-Path $env:USERPROFILE '.ssh\id_rsa.pub'
    }
}
if (![string]::Equals([IO.Path]::GetExtension($PublicKeyPath), '.pub', 'OrdinalIgnoreCase')) {
    throw 'Choose a public (.pub) key file.'
}
$key = (Get-Content -Raw -LiteralPath $PublicKeyPath).Trim()
if ($key -notmatch '\A((?:ssh-|ecdsa-|sk-)[A-Za-z0-9@._-]+) ([A-Za-z0-9+/]+={0,2})(?:[ \t][^\r\n]*)?\z') {
    throw 'Choose a file containing one OpenSSH public key.'
}
# Only validated algorithm and base64 fields enter the remote command.
$algorithm = $Matches[1]
$body = $Matches[2]
& ssh-keygen -lf $PublicKeyPath | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'OpenSSH could not read this public key.' }

$install = "set -eu; umask 077; cd; mkdir -p .ssh; chmod 700 .ssh; touch .ssh/authorized_keys; chmod 600 .ssh/authorized_keys; if ! grep -Fq '$body' .ssh/authorized_keys; then printf '\n%s\n' '$algorithm $body' >> .ssh/authorized_keys; fi"
& ssh $Target $install
if ($LASTEXITCODE -ne 0) { throw 'SSH key installation failed. Keep the current session open.' }
Write-Host 'Keep your current session open. Verify a new key-only login in a separate window.'
