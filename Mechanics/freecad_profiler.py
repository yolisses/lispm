import time
import FreeCAD

doc = FreeCAD.ActiveDocument
results = []

for obj in doc.Objects:
    # Measure recompute time
    obj.touch()
    start = time.time()
    obj.recompute()
    elapsed = time.time() - start

    # Measure geometry complexity (if it has a shape)
    complexity = 0
    if hasattr(obj, 'Shape'):
        s = obj.Shape
        complexity = len(s.Faces) + len(s.Edges) + len(s.Vertexes)

    results.append((elapsed, complexity, obj.Label, obj.TypeId))

results.sort(reverse=True)

print("=" * 60)
print(f"{'Rank':<5} {'Time (s)':<10} {'Elements':<10} {'Label':<20} Type")
print("=" * 60)
for i, (t, complexity, label, typeid) in enumerate(results[:10], 1):
    print(f"{i:<5} {t:<10.4f} {complexity:<10} {label:<20} {typeid}")
print("=" * 60)
