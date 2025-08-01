# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['src\\Forbidden_Paradise_Graphics\\__main__.py'],
    pathex=['src'],
    binaries=[],
    datas=[('src/Forbidden_Paradise_Graphics/img', 'img'), ('src/Forbidden_Paradise_Graphics/configs', 'configs'), ('src/Forbidden_Paradise_Graphics/characters', 'characters')],
    hiddenimports=['Pillow'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='ForbiddenParadiseGraphics',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='ForbiddenParadiseGraphics',
)
