"""
TerraProof AI - Geographic Parcel Normalizer
Rounds polygon coordinates to 4 decimal places, sorts them canonically,
and generates a deterministic hash (Keccak-256 and SHA-256) formatted as 0x-prefixed bytes32 for smart contract verification.
"""

from typing import List, Tuple, Union, Dict, Any
import hashlib
import json

try:
    from eth_account._utils.signing import keccak as eth_keccak
    HAVE_ETH_KECCAK = True
except ImportError:
    HAVE_ETH_KECCAK = False


Coordinate = Union[List[float], Tuple[float, float], Dict[str, float]]


def parse_coordinate(coord: Coordinate) -> Tuple[float, float]:
    """
    Normalizes input coordinate to (latitude, longitude) tuple.
    Accepts [lat, lng], [lng, lat] (if dict format), or dict {'lat': ..., 'lng': ...}.
    """
    if isinstance(coord, dict):
        lat = coord.get("lat") or coord.get("latitude")
        lng = coord.get("lng") or coord.get("lon") or coord.get("longitude")
        if lat is None or lng is None:
            raise ValueError(f"Invalid coordinate dict format: {coord}")
        return float(lat), float(lng)
    elif isinstance(coord, (list, tuple)):
        if len(coord) != 2:
            raise ValueError(f"Coordinate tuple/list must have 2 elements: {coord}")
        # Standard convention: [latitude, longitude]
        return float(coord[0]), float(coord[1])
    else:
        raise TypeError(f"Unsupported coordinate type: {type(coord)}")


def normalize_polygon_coordinates(
    coordinates: List[Coordinate],
    precision: int = 4
) -> List[Tuple[float, float]]:
    """
    Takes a list of polygon vertices, rounds them to `precision` decimal places (default 4),
    and sorts them canonically (by rounded latitude, then rounded longitude) to prevent
    duplicate registration variants of the same parcel.
    """
    if not coordinates or len(coordinates) < 3:
        raise ValueError("Polygon must contain at least 3 vertices.")

    rounded_coords: List[Tuple[float, float]] = []
    for coord in coordinates:
        lat, lng = parse_coordinate(coord)
        rounded_lat = round(lat, precision)
        rounded_lng = round(lng, precision)
        rounded_coords.append((rounded_lat, rounded_lng))

    # Sort canonically (lexicographical by lat, then lng)
    # Deduplicate redundant consecutive duplicate vertices if any
    unique_canonical_coords = sorted(list(set(rounded_coords)), key=lambda pt: (pt[0], pt[1]))

    return unique_canonical_coords


def compute_parcel_hash(
    coordinates: List[Coordinate],
    use_keccak: bool = True
) -> Dict[str, Any]:
    """
    Rounds polygon coordinates to 4 decimal places, sorts them canonically,
    and returns a Keccak-compatible / SHA-256 hex string with 0x prefix for Solidity bytes32.

    Returns:
        dict: {
            "canonical_coordinates": [[lat, lng], ...],
            "vertex_count": int,
            "canonical_string": str,
            "sha256_hash": "0x...",
            "keccak256_hash": "0x...",
            "parcel_hash": "0x..."  # Primary bytes32 parcel hash
        }
    """
    canonical_coords = normalize_polygon_coordinates(coordinates, precision=4)

    # Deterministic JSON representation (no whitespace)
    canonical_repr = json.dumps(canonical_coords, separators=(",", ":"))
    payload_bytes = canonical_repr.encode("utf-8")

    # Standard SHA-256
    sha256_hex = "0x" + hashlib.sha256(payload_bytes).hexdigest()

    # Keccak-256
    if HAVE_ETH_KECCAK:
        keccak256_hex = "0x" + eth_keccak(payload_bytes).hex()
    else:
        # Fallback to sha256 if eth-account isn't installed yet
        keccak256_hex = sha256_hex

    primary_hash = keccak256_hex if use_keccak else sha256_hex

    return {
        "canonical_coordinates": canonical_coords,
        "vertex_count": len(canonical_coords),
        "canonical_string": canonical_repr,
        "sha256_hash": sha256_hex,
        "keccak256_hash": keccak256_hex,
        "parcel_hash": primary_hash
    }


if __name__ == "__main__":
    # Test example
    sample_polygon = [
        [-3.46532, -62.21589],
        [-3.46591, -62.21045],
        [-3.47120, -62.21098],
        [-3.47085, -62.21630]
    ]
    result = compute_parcel_hash(sample_polygon)
    print("Parcel Normalization Result:")
    print(json.dumps(result, indent=2))
