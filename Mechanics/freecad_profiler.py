import time
import FreeCAD

doc = FreeCAD.ActiveDocument
results = []
visited = set()

def profile_obj(obj):
    if obj.Name in visited:
        return
    visited.add(obj.Name)

    # Recurse into children first
    for child in obj.OutList:
        profile_obj(child)

    # Measure recompute time
    obj.touch()
    start = time.time()
    obj.recompute()
    elapsed = time.time() - start

    # Measure geometry complexity
    complexity = 0
    if hasattr(obj, 'Shape'):
        s = obj.Shape
        complexity = len(s.Faces) + len(s.Edges) + len(s.Vertexes)

    # Skip objects with no meaningful data
    if elapsed > 0 or complexity > 0:
        results.append((elapsed, complexity, obj.Label, obj.TypeId))

# Walk all top-level objects (recursion handles the rest)
for obj in doc.Objects:
    profile_obj(obj)

results.sort(reverse=True)

print("=" * 70)
print(f"{'Rank':<5} {'Time (s)':<10} {'Elements':<10} {'Label':<25} Type")
print("=" * 70)
for i, (t, complexity, label, typeid) in enumerate(results[:10], 1):
    print(f"{i:<5} {t:<10.4f} {complexity:<10} {label:<25} {typeid}")
print("=" * 70)
print(f"Total objects scanned: {len(visited)}")
