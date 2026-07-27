"""Build the static Pattern World catalog from the Python source examples."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PATTERNS_ROOT = ROOT / "patterns"
OUTPUT_PATH = ROOT / "pattern-data.json"


def pattern_number(path: Path) -> int:
    match = re.search(r"(\d+)$", path.stem)
    return int(match.group(1)) if match else 0


def run_example(path: Path) -> tuple[str, str | None]:
    try:
        result = subprocess.run(
            [sys.executable, str(path)],
            input="5\n5\n5\n",
            capture_output=True,
            text=True,
            timeout=2,
            check=False,
        )
    except subprocess.TimeoutExpired:
        return "", "Example timed out"

    output = result.stdout.strip()
    error = result.stderr.strip() or None
    return output[:1600], error


def difficulty_for(code: str) -> str:
    executable_lines = [
        line
        for line in code.splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    ]
    if len(executable_lines) <= 8:
        return "Starter"
    if len(executable_lines) <= 13:
        return "Intermediate"
    return "Advanced"


def build_catalog() -> list[dict[str, object]]:
    catalog: list[dict[str, object]] = []

    for category in ("star", "number"):
        files = sorted((PATTERNS_ROOT / category).glob("pattern_*.py"), key=pattern_number)
        for path in files:
            number = pattern_number(path)
            code = path.read_text(encoding="utf-8").replace("\t", "    ").strip()
            output, error = run_example(path)
            catalog.append(
                {
                    "id": f"{category}-{number}",
                    "category": category,
                    "number": number,
                    "title": f"{category.title()} Pattern {number:02d}",
                    "difficulty": difficulty_for(code),
                    "path": path.relative_to(ROOT).as_posix(),
                    "code": code,
                    "output": output,
                    "verified": error is None and bool(output),
                }
            )

    return catalog


if __name__ == "__main__":
    patterns = build_catalog()
    OUTPUT_PATH.write_text(
        json.dumps(patterns, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    verified = sum(1 for pattern in patterns if pattern["verified"])
    print(f"Built {len(patterns)} patterns ({verified} verified outputs).")
