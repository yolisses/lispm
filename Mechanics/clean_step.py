#!/usr/bin/env python3
"""
clean_step.py  –  Remove decorative geometry (logos, text) from STEP files
exported by EasyEDA Pro before importing into FreeCAD.

Requirements:
    pip install cadquery          # recommended
  OR
    pip install build123d         # alternative

Falls back to a pure-OCC approach if neither is available.

Usage:
    python clean_step.py input.step output_clean.step
    python clean_step.py my_pcb_folder/ cleaned_folder/   # batch mode
"""

import sys
import os
from pathlib import Path


# ── Tunables ────────────────────────────────────────────────────────────────
# Solids whose bounding-box VOLUME is smaller than this (mm³) are removed.
# EasyEDA logos are typically < 0.05 mm³.  Increase if you still see junk;
# decrease if real small pads are being removed.
MIN_VOLUME_MM3 = 0.1

# Solids whose bounding-box longest EDGE is smaller than this (mm) are removed.
MIN_BBOX_EDGE_MM = 0.5
# ────────────────────────────────────────────────────────────────────────────


def clean_with_cadquery(in_path: Path, out_path: Path):
    import cadquery as cq

    print(f"  Reading {in_path.name} …")
    assy = cq.importers.importStep(str(in_path))

    # Iterate over all solids in the compound
    all_solids = assy.solids().vals()
    kept, removed = [], []

    for solid in all_solids:
        bb = solid.BoundingBox()
        vol = bb.xlen * bb.ylen * bb.zlen
        longest = max(bb.xlen, bb.ylen, bb.zlen)
        if vol < MIN_VOLUME_MM3 or longest < MIN_BBOX_EDGE_MM:
            removed.append(solid)
        else:
            kept.append(solid)

    print(f"  Solids: {len(all_solids)} total  →  keeping {len(kept)}, removing {len(removed)}")

    if not kept:
        print("  WARNING: nothing left after filtering – writing original unchanged")
        import shutil; shutil.copy(in_path, out_path)
        return

    result = cq.Workplane().newObject(kept)
    cq.exporters.export(result, str(out_path))
    print(f"  Saved → {out_path}")


def clean_with_occ(in_path: Path, out_path: Path):
    """Fallback using raw pythonOCC / FreeCAD's OCC bindings."""
    try:
        from OCC.Core.STEPControl import STEPControl_Reader, STEPControl_Writer, STEPControl_AsIs
        from OCC.Core.BRep import BRep_Builder
        from OCC.Core.TopoDS import TopoDS_Compound
        from OCC.Core.BRepBndLib import brepbndlib
        from OCC.Core.Bnd import Bnd_Box
        from OCC.Core.TopExp import TopExp_Explorer
        from OCC.Core.TopAbs import TopAbs_SOLID
        from OCC.Core.IFSelect import IFSelect_RetDone
    except ImportError:
        print("  ERROR: neither cadquery nor pythonOCC is available.")
        print("  Install with:  pip install cadquery")
        sys.exit(1)

    print(f"  Reading {in_path.name} (OCC fallback) …")
    reader = STEPControl_Reader()
    status = reader.ReadFile(str(in_path))
    if status != IFSelect_RetDone:
        raise RuntimeError(f"Failed to read STEP file: {in_path}")
    reader.TransferRoots()
    shape = reader.OneShape()

    builder = BRep_Builder()
    compound = TopoDS_Compound()
    builder.MakeCompound(compound)

    explorer = TopExp_Explorer(shape, TopAbs_SOLID)
    kept = removed = 0
    while explorer.More():
        solid = explorer.Current()
        box = Bnd_Box()
        brepbndlib.Add(solid, box)
        xmin, ymin, zmin, xmax, ymax, zmax = box.Get()
        xlen = xmax - xmin
        ylen = ymax - ymin
        zlen = zmax - zmin
        vol = xlen * ylen * zlen
        longest = max(xlen, ylen, zlen)
        if vol >= MIN_VOLUME_MM3 and longest >= MIN_BBOX_EDGE_MM:
            builder.Add(compound, solid)
            kept += 1
        else:
            removed += 1
        explorer.Next()

    print(f"  Solids: {kept+removed} total  →  keeping {kept}, removing {removed}")

    writer = STEPControl_Writer()
    writer.Transfer(compound, STEPControl_AsIs)
    writer.Write(str(out_path))
    print(f"  Saved → {out_path}")


def process_file(in_path: Path, out_path: Path):
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        import cadquery  # noqa: F401
        clean_with_cadquery(in_path, out_path)
    except ImportError:
        clean_with_occ(in_path, out_path)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(0)

    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])

    if src.is_dir():
        # Batch mode
        step_files = list(src.glob("**/*.step")) + list(src.glob("**/*.stp"))
        if not step_files:
            print(f"No .step/.stp files found in {src}")
            sys.exit(1)
        print(f"Batch mode: {len(step_files)} files")
        for f in step_files:
            rel = f.relative_to(src)
            out = dst / rel
            print(f"\n[{f.name}]")
            process_file(f, out)
    elif src.is_file():
        process_file(src, dst)
    else:
        print(f"Input not found: {src}")
        sys.exit(1)

    print("\nDone!")


if __name__ == "__main__":
    main()
