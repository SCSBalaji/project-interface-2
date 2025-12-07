"""
Main FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection
from app.services.model_service import model_service
from app.services.auth_service import auth_service
from app.routes import auth, prediction


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting Plant Disease Detection API...")
    
    # Connect to database
    await connect_to_mongo()
    
    # Initialize services
    await auth_service.initialize()
    await model_service.initialize()
    
    print("✅ Application started successfully")
    
    yield
    
    # Shutdown
    print("🛑 Shutting down...")
    await close_mongo_connection()
    print("✅ Application shut down successfully")


# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API for plant disease detection using MobilePlantViT model",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(auth.router)
app.include_router(prediction.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "🌱 Plant Disease Detection API",
        "version": settings.app_version,
        "status": "running"
    }


@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_ready": model_service.is_ready()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
