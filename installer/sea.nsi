!define NAME "Sea"
!define REGPATH_UNINSTSUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${NAME}"
Name "${NAME}"
OutFile "release\sea-${VERSION}-windows-x64.exe"
Unicode True
RequestExecutionLevel User
InstallDir "" ; Don't set a default $InstDir so we can detect /D= and InstallDirRegKey
InstallDirRegKey HKCU "${REGPATH_UNINSTSUBKEY}" "UninstallString"
SetCompressor /SOLID /FINAL lzma

!include LogicLib.nsh
!include WinCore.nsh

Page Directory
Page InstFiles

Uninstpage UninstConfirm
Uninstpage InstFiles

Function .onInit
  SetShellVarContext Current

  ${If} $InstDir == "" ; No /D= nor InstallDirRegKey?
    GetKnownFolderPath $InstDir ${FOLDERID_UserProgramFiles}
    StrCmp $InstDir "" 0 +2 
    StrCpy $InstDir "$LocalAppData\Programs" ; Fallback directory
    StrCpy $InstDir "$InstDir\$(^Name)"
  ${EndIf}
FunctionEnd

Function un.onInit
  SetShellVarContext Current
FunctionEnd

Section "Program files (Required)"
  SectionIn Ro

  SetOutPath $InstDir
  WriteUninstaller "$InstDir\Uninst.exe"
  WriteRegStr HKCU "${REGPATH_UNINSTSUBKEY}" "DisplayName" "${NAME}"
  WriteRegStr HKCU "${REGPATH_UNINSTSUBKEY}" "DisplayIcon" "$InstDir\MyApp.exe,0"
  WriteRegStr HKCU "${REGPATH_UNINSTSUBKEY}" "UninstallString" '"$InstDir\Uninst.exe"'
  WriteRegStr HKCU "${REGPATH_UNINSTSUBKEY}" "QuietUninstallString" '"$InstDir\Uninst.exe" /S'
  WriteRegDWORD HKCU "${REGPATH_UNINSTSUBKEY}" "NoModify" 1
  WriteRegDWORD HKCU "${REGPATH_UNINSTSUBKEY}" "NoRepair" 1

  File /nonfatal /a /r "build\" 

  ; Add the install directory to PATH
  EnVar::AddValue "PATH" "$INSTDIR"
  Pop $0
  DetailPrint "EnVar::AddValue returned=|$0|"
SectionEnd

Section -Uninstall
  RMDir /r /REBOOTOK $INSTDIR
  DeleteRegKey HKCU "${REGPATH_UNINSTSUBKEY}"

  ; Remove the install directory from PATH
  EnVar::DeleteValue "PATH" "$INSTDIR"
  Pop $0
  DetailPrint "EnVar::DeleteValue returned=|$0|"
SectionEnd