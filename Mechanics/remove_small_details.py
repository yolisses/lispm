import FreeCAD, Part

doc = FreeCAD.ActiveDocument
for obj in doc.Objects:
    if hasattr(obj, 'Shape'):
        solids_to_keep = []
        for solid in obj.Shape.Solids:
            bb = solid.BoundBox
            vol = bb.XLength * bb.YLength * bb.ZLength
            if vol > 0.1:  # mm³ threshold
                solids_to_keep.append(solid)
        if solids_to_keep and len(solids_to_keep) < len(obj.Shape.Solids):
            obj.Shape = Part.makeCompound(solids_to_keep)
            print(f"Cleaned: {obj.Label}")
doc.recompute()
