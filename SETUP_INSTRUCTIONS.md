# Model Files Setup Instructions

This guide shows you exactly where to place your MobilePlantViT model files.

---

## 📦 Files You Should Have

You should have the following files ready:

### Model Files
1. `mobileplant_vit_full_checkpoint.pth` - Trained model checkpoint
2. `deployment_metadata.json` - Model metadata with class names
3. `classification_report.json` - Classification metrics (optional)
4. `inference_example_pytorch.py` - Reference inference code (optional)

### Source Code Files
1. `src/__init__.py`
2. `src/models/__init__.py`
3. `src/models/mobile_plant_vit.py`
4. `src/blocks/__init__.py`
5. `src/blocks/ghost_conv.py`
6. `src/blocks/coord_attention.py`
7. `src/blocks/fused_ir.py`
8. `src/blocks/attention.py`
9. `src/blocks/patch_embed.py`
10. `src/blocks/positional_encoding.py`
11. `src/blocks/ffn.py`
12. `src/blocks/classifier.py`
13. `src/blocks/utils.py`

---

## 📂 Directory Structure

After placing all files, your backend directory should look like this:

```
backend/
├── app/
│   ├── __init__.py               ✅ Already created
│   ├── main.py                   ✅ Already created
│   ├── config.py                 ✅ Already created
│   ├── database.py               ✅ Already created
│   ├── routes/                   ✅ Already created
│   ├── services/                 ✅ Already created
│   ├── models/                   ✅ Already created
│   └── utils/                    ✅ Already created
│
├── models/
│   ├── mobileplant_vit_full_checkpoint.pth    ❌ YOU NEED TO ADD
│   ├── deployment_metadata.json                ❌ YOU NEED TO ADD
│   ├── classification_report.json              ❌ YOU NEED TO ADD (optional)
│   └── inference_example_pytorch.py            ❌ YOU NEED TO ADD (optional)
│
├── src/
│   ├── __init__.py               ✅ Already created
│   ├── models/
│   │   ├── __init__.py           ✅ Already created
│   │   └── mobile_plant_vit.py   ❌ YOU NEED TO ADD
│   └── blocks/
│       ├── __init__.py           ✅ Already created
│       ├── ghost_conv.py         ❌ YOU NEED TO ADD
│       ├── coord_attention.py    ❌ YOU NEED TO ADD
│       ├── fused_ir.py           ❌ YOU NEED TO ADD
│       ├── attention.py          ❌ YOU NEED TO ADD
│       ├── patch_embed.py        ❌ YOU NEED TO ADD
│       ├── positional_encoding.py ❌ YOU NEED TO ADD
│       ├── ffn.py                ❌ YOU NEED TO ADD
│       ├── classifier.py         ❌ YOU NEED TO ADD
│       └── utils.py              ❌ YOU NEED TO ADD
│
├── uploads/                      ✅ Already created
├── requirements.txt              ✅ Already created
├── .env.example                  ✅ Already created
└── Dockerfile                    ✅ Already created
```

---

## 🚀 Step-by-Step Instructions

### Step 1: Navigate to Project Directory

```bash
cd /path/to/project-interface-2
```

### Step 2: Place Model Checkpoint Files

```bash
# Copy model files to backend/models/
cp /path/to/your/mobileplant_vit_full_checkpoint.pth backend/models/
cp /path/to/your/deployment_metadata.json backend/models/
cp /path/to/your/classification_report.json backend/models/  # optional
```

**Verify:**
```bash
ls -lh backend/models/
# You should see:
# - mobileplant_vit_full_checkpoint.pth (large file, ~50-200MB)
# - deployment_metadata.json
# - classification_report.json (optional)
```

### Step 3: Place MobilePlantViT Model File

```bash
# Copy the main model file
cp /path/to/your/src/models/mobile_plant_vit.py backend/src/models/
```

**Verify:**
```bash
ls backend/src/models/
# You should see:
# - __init__.py
# - mobile_plant_vit.py
```

### Step 4: Place Block Files

```bash
# Copy all block files
cp /path/to/your/src/blocks/ghost_conv.py backend/src/blocks/
cp /path/to/your/src/blocks/coord_attention.py backend/src/blocks/
cp /path/to/your/src/blocks/fused_ir.py backend/src/blocks/
cp /path/to/your/src/blocks/attention.py backend/src/blocks/
cp /path/to/your/src/blocks/patch_embed.py backend/src/blocks/
cp /path/to/your/src/blocks/positional_encoding.py backend/src/blocks/
cp /path/to/your/src/blocks/ffn.py backend/src/blocks/
cp /path/to/your/src/blocks/classifier.py backend/src/blocks/
cp /path/to/your/src/blocks/utils.py backend/src/blocks/
```

**Or copy all at once:**
```bash
cp /path/to/your/src/blocks/*.py backend/src/blocks/
```

**Verify:**
```bash
ls backend/src/blocks/
# You should see all block files:
# - __init__.py
# - ghost_conv.py
# - coord_attention.py
# - fused_ir.py
# - attention.py
# - patch_embed.py
# - positional_encoding.py
# - ffn.py
# - classifier.py
# - utils.py
```

---

## ✅ Verification Checklist

Run these commands to verify all files are in place:

```bash
# Check model files
[ -f backend/models/mobileplant_vit_full_checkpoint.pth ] && echo "✅ Model checkpoint found" || echo "❌ Model checkpoint missing"
[ -f backend/models/deployment_metadata.json ] && echo "✅ Metadata found" || echo "❌ Metadata missing"

# Check MobilePlantViT model
[ -f backend/src/models/mobile_plant_vit.py ] && echo "✅ MobilePlantViT model found" || echo "❌ MobilePlantViT model missing"

# Check block files
[ -f backend/src/blocks/ghost_conv.py ] && echo "✅ ghost_conv.py found" || echo "❌ ghost_conv.py missing"
[ -f backend/src/blocks/coord_attention.py ] && echo "✅ coord_attention.py found" || echo "❌ coord_attention.py missing"
[ -f backend/src/blocks/fused_ir.py ] && echo "✅ fused_ir.py found" || echo "❌ fused_ir.py missing"
[ -f backend/src/blocks/attention.py ] && echo "✅ attention.py found" || echo "❌ attention.py missing"
[ -f backend/src/blocks/patch_embed.py ] && echo "✅ patch_embed.py found" || echo "❌ patch_embed.py missing"
[ -f backend/src/blocks/positional_encoding.py ] && echo "✅ positional_encoding.py found" || echo "❌ positional_encoding.py missing"
[ -f backend/src/blocks/ffn.py ] && echo "✅ ffn.py found" || echo "❌ ffn.py missing"
[ -f backend/src/blocks/classifier.py ] && echo "✅ classifier.py found" || echo "❌ classifier.py missing"
[ -f backend/src/blocks/utils.py ] && echo "✅ utils.py found" || echo "❌ utils.py missing"
```

---

## 📄 Expected File Formats

### deployment_metadata.json

This file should contain model metadata. Example format:

```json
{
  "model_name": "MobilePlantViT",
  "version": "1.0",
  "num_classes": 38,
  "class_names": [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
  ],
  "input_size": [224, 224],
  "mean": [0.485, 0.456, 0.406],
  "std": [0.229, 0.224, 0.225]
}
```

### classification_report.json (Optional)

This file contains classification metrics. Example format:

```json
{
  "accuracy": 0.9523,
  "macro_avg": {
    "precision": 0.9456,
    "recall": 0.9401,
    "f1-score": 0.9428
  },
  "weighted_avg": {
    "precision": 0.9535,
    "recall": 0.9523,
    "f1-score": 0.9528
  }
}
```

---

## 🧪 Test Model Loading

After placing all files, test if the model loads correctly:

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # Windows: venv\Scripts\activate

# Test model loading with Python
python -c "
from src.models.mobile_plant_vit import MobilePlantViT
import torch
import json

# Load metadata
with open('models/deployment_metadata.json', 'r') as f:
    metadata = json.load(f)
    
print(f'Model: {metadata[\"model_name\"]}')
print(f'Classes: {metadata[\"num_classes\"]}')

# Create model
model = MobilePlantViT(num_classes=metadata['num_classes'])
print('✅ Model created successfully')

# Load checkpoint
checkpoint = torch.load('models/mobileplant_vit_full_checkpoint.pth', map_location='cpu')
print('✅ Checkpoint loaded successfully')

# Load state dict
if 'model_state_dict' in checkpoint:
    model.load_state_dict(checkpoint['model_state_dict'])
elif 'state_dict' in checkpoint:
    model.load_state_dict(checkpoint['state_dict'])
else:
    model.load_state_dict(checkpoint)
    
print('✅ Model weights loaded successfully')
print('✅ All model files are correctly placed!')
"
```

If you see all ✅ checkmarks, your model is ready to use!

---

## ❓ Troubleshooting

### Error: "No module named 'src.models.mobile_plant_vit'"

**Solution:** Make sure the file is at exactly this path:
```
backend/src/models/mobile_plant_vit.py
```

### Error: "No such file or directory: 'models/mobileplant_vit_full_checkpoint.pth'"

**Solution:** Make sure the checkpoint file is at:
```
backend/models/mobileplant_vit_full_checkpoint.pth
```

### Error: "ImportError: cannot import name 'GhostConv'"

**Solution:** Make sure all block files are present in:
```
backend/src/blocks/
```

### Model file is too large for git

**Solution:** The .gitignore already excludes .pth files. They won't be committed to git.

---

## 🎯 Next Steps

After placing all model files:

1. ✅ Verify all files are in place using the verification checklist
2. ✅ Test model loading with the test script above
3. ✅ Follow the [QUICKSTART.md](QUICKSTART.md) guide to run the application
4. ✅ Test the complete flow: signup → login → upload image → get prediction

---

## 📞 Need Help?

If you encounter issues:

1. Double-check file paths match exactly as shown above
2. Verify file names are correct (case-sensitive)
3. Check file permissions (should be readable)
4. Ensure virtual environment is activated when testing
5. Review error messages carefully
6. Check [README.md](README.md) troubleshooting section

---

**Once all files are in place, you're ready to detect plant diseases! 🌿**
