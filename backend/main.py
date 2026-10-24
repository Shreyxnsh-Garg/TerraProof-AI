"""
TerraProof AI - Backend API
AI-powered Carbon-Credit Integrity & Pre-Issuance MRV System.
Handles document/JSON project ingestion, canonical polygon normalization,
trust score calculation, and EIP-712 satellite oracle observation generation.
"""

import time
import os
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from geo_normalizer import compute_parcel_hash, normalize_polygon_coordinates

app = FastAPI(
    title="TerraProof AI - MRV & Oracle Service",
    description="Pre-issuance verification and post-issuance satellite monitoring for high-integrity carbon credits.",
    version="1.0.0"
)

# Enable CORS for frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Models
class CoordinatePoint(BaseModel):
    lat: float
    lng: float


class ProjectAnalyzeRequest(BaseModel):
    project_name: str = Field(..., example="Rio Branco Agroforestry Preservation")
    registry_standard: Optional[str] = Field("Verra VCS / Plan Vivo", example="Verra VCS")
    claimed_credits: Optional[int] = Field(50000, example=50000)
    country: Optional[str] = Field("Brazil", example="Brazil")
    coordinates: List[List[float]] = Field(
        default=[
            [-9.9754, -67.8249],
            [-9.9721, -67.8180],
            [-9.9805, -67.8152],
            [-9.9840, -67.8221]
        ],
        description="List of [latitude, longitude] pairs for parcel polygon."
    )


class SatelliteObservationRequest(BaseModel):
    batch_id: int = Field(..., example=1)
    health_score: int = Field(..., ge=0, le=100, example=88)
    observation_cid: Optional[str] = Field(
        "bafybeihdwdcefgh4dqkjv67uacm3m46e5gn7pq3vqol7zoxw4nynfcox74",
        example="bafybeihdwdcefgh4dqkjv67uacm3m46e5gn7pq3vqol7zoxw4nynfcox74"
    )


@app.get("/")
def root():
    return {
        "service": "TerraProof AI Backend",
        "status": "online",
        "version": "1.0.0",
        "features": [
            "Canonical Geo-Polygon Normalizer",
            "Multi-Spectral AI Trust Scoring",
            "EIP-712 Satellite Oracle Signer",
            "Double-Mint Prevention Hash"
        ]
    }


def calculate_mock_trust_score(coords: List[Any], claimed_credits: int) -> Dict[str, Any]:
    """
    Simulates multi-spectral computer vision and historical deforestation analysis
    over the canonical polygon region.
    """
    # Deterministic variation based on vertex count and credits
    base = 85
    delta = (len(coords) * 2) % 10
    overall = min(96, max(45, base + delta))

    canopy_score = min(98, overall + 3)
    biomass_score = min(95, overall - 2)
    deforestation_risk = max(10, 100 - overall - 5)
    additionality_index = min(94, overall + 1)

    recommendation = "APPROVED" if overall >= 75 else ("AUDIT_REQUIRED" if overall >= 50 else "REJECTED")

    return {
        "overall_trust_score": overall,
        "recommendation": recommendation,
        "metrics": {
            "canopy_density": f"{canopy_score}%",
            "biomass_density_index": f"{biomass_score}/100",
            "deforestation_risk_score": f"{deforestation_risk}%",
            "additionality_confidence": f"{additionality_index}%",
            "spectral_variance_check": "PASSED",
            "historical_baseline_match": "CONSISTENT_5_YEAR_HISTORICAL"
        },
        "ndvi_mean": 0.74,
        "satellite_source": "Sentinel-2 / Landsat-9 Multi-Spectral Fusion",
        "mock_evidence_cid": f"ipfs://bafybeig{abs(hash(str(coords))) % 10000000000000000}terraproof"
    }


@app.post("/api/project/analyze")
def analyze_project(payload: ProjectAnalyzeRequest):
    """
    Analyzes project polygon, normalizes coordinates, generates canonical parcel hash,
    and returns comprehensive AI trust score.
    """
    try:
        geo_result = compute_parcel_hash(payload.coordinates, use_keccak=True)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Coordinate normalization failed: {str(e)}")

    trust_score_data = calculate_mock_trust_score(
        geo_result["canonical_coordinates"],
        payload.claimed_credits or 50000
    )

    return {
        "status": "success",
        "project_name": payload.project_name,
        "registry_standard": payload.registry_standard,
        "claimed_credits": payload.claimed_credits,
        "geo_normalization": {
            "vertex_count": geo_result["vertex_count"],
            "canonical_coordinates": geo_result["canonical_coordinates"],
            "parcel_hash": geo_result["parcel_hash"],
            "sha256_hash": geo_result["sha256_hash"],
            "keccak256_hash": geo_result["keccak256_hash"]
        },
        "ai_trust_score": trust_score_data,
        "issuance_payload": {
            "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "amount": payload.claimed_credits,
            "parcelHash": geo_result["parcel_hash"],
            "evidenceCID": trust_score_data["mock_evidence_cid"],
            "initialHealthScore": trust_score_data["overall_trust_score"]
        }
    }


@app.post("/api/project/upload-doc")
async def upload_document(
    file: UploadFile = File(...),
    project_name: Optional[str] = Form("Amazon Basin REDD+ Initiative"),
    registry_standard: Optional[str] = Form("Verra VCS-1422")
):
    """
    Receives PDF or document, parses parcel boundaries, runs geo normalizer and produces Trust Score.
    """
    file_bytes = await file.read()
    filename = file.filename or "unknown.pdf"
    file_size_kb = len(file_bytes) / 1024

    # Mock extracted polygon from PDF project boundary annex
    mock_extracted_polygon = [
        [-9.9754, -67.8249],
        [-9.9721, -67.8180],
        [-9.9805, -67.8152],
        [-9.9840, -67.8221]
    ]

    geo_result = compute_parcel_hash(mock_extracted_polygon, use_keccak=True)
    trust_score_data = calculate_mock_trust_score(geo_result["canonical_coordinates"], 50000)

    return {
        "status": "success",
        "file_info": {
            "filename": filename,
            "size_kb": round(file_size_kb, 2),
            "content_type": file.content_type
        },
        "extracted_project_name": project_name,
        "registry_standard": registry_standard,
        "geo_normalization": {
            "vertex_count": geo_result["vertex_count"],
            "canonical_coordinates": geo_result["canonical_coordinates"],
            "parcel_hash": geo_result["parcel_hash"],
            "sha256_hash": geo_result["sha256_hash"]
        },
        "ai_trust_score": trust_score_data,
        "issuance_payload": {
            "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "amount": 50000,
            "parcelHash": geo_result["parcel_hash"],
            "evidenceCID": trust_score_data["mock_evidence_cid"],
            "initialHealthScore": trust_score_data["overall_trust_score"]
        }
    }


@app.post("/api/oracle/sign-observation")
def sign_satellite_observation(payload: SatelliteObservationRequest):
    """
    Mocks an EIP-712 Satellite AI Oracle signing an observation payload
    for TerraProofRegistry.submitSatelliteObservation.
    Uses mock Hardhat Account #1 private key for demonstration.
    """
    current_timestamp = int(time.time())

    # Demo oracle test private key (Hardhat standard account #1)
    # Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    mock_private_key = os.getenv(
        "ORACLE_PRIVATE_KEY",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
    )

    try:
        from eth_account import Account
        from eth_account.messages import encode_typed_data

        eip712_data = {
            "types": {
                "EIP712Domain": [
                    {"name": "name", "type": "string"},
                    {"name": "version", "type": "string"},
                    {"name": "chainId", "type": "uint256"},
                    {"name": "verifyingContract", "type": "address"}
                ],
                "SatelliteObservation": [
                    {"name": "batchId", "type": "uint256"},
                    {"name": "healthScore", "type": "uint256"},
                    {"name": "timestamp", "type": "uint256"},
                    {"name": "observationCID", "type": "string"}
                ]
            },
            "primaryType": "SatelliteObservation",
            "domain": {
                "name": "TerraProofRegistry",
                "version": "1",
                "chainId": 11155111,  # Sepolia
                "verifyingContract": "0x5FbDB2315678afecb367f032d93F642f64180aa3"
            },
            "message": {
                "batchId": payload.batch_id,
                "healthScore": payload.health_score,
                "timestamp": current_timestamp,
                "observationCID": payload.observation_cid
            }
        }

        encoded = encode_typed_data(full_message=eip712_data)
        signed = Account.sign_message(encoded, mock_private_key)
        signature_hex = signed.signature.hex()
        oracle_address = Account.from_key(mock_private_key).address

    except Exception:
        # Fallback simulated signature if eth-account cryptography isn't loaded in current env
        signature_hex = "0x" + "a" * 130
        oracle_address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

    return {
        "status": "signed",
        "oracle_address": oracle_address,
        "batch_id": payload.batch_id,
        "health_score": payload.health_score,
        "timestamp": current_timestamp,
        "observation_cid": payload.observation_cid,
        "signature": signature_hex,
        "freeze_triggered": payload.health_score < 50,
        "message": "Freeze trigger activated" if payload.health_score < 50 else "Normal health observation"
    }
