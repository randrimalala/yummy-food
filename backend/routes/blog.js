const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Config multer pour stocker les fichiers dans ./uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + Date.now() + ext;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

// GET tous les articles
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET article par slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: "Article introuvable" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST nouvel article avec upload d'image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content, slug } = req.body;

    if (!title || !excerpt || !content || !slug) {
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new BlogPost({
      title,
      excerpt,
      content,
      slug,
      image,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Erreur création article:", err);
    res.status(400).json({ error: "Erreur création article" });
  }
});

// PUT modifier un article (sans gestion image ici, à adapter selon besoin)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content, slug } = req.body;

    const updateData = { title, excerpt, content, slug };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Erreur modification article" });
  }
});

// DELETE un article
router.delete('/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Erreur suppression article" });
  }
});
router.post('/:id/like', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Article introuvable' });

    post.likes = (post.likes || 0) + 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (err) {
    console.error('Erreur like article:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
module.exports = router;
