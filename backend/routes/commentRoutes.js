const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");

// 1. Ajouter un commentaire à un article
router.post("/:postId/comments", async (req, res) => {
  try {
    const { authorName, content } = req.body;
    if (!authorName || !content) {
      return res.status(400).json({ message: "Nom et contenu requis" });
    }
    const comment = new Comment({
      post: req.params.postId,
      authorName,
      content,
      approved: true, // tu peux gérer modération ici
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 2. Récupérer tous les commentaires approuvés d'un article
router.get("/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId, approved: true }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 3. Ajouter un like à un commentaire
router.post("/comments/:commentId/like", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Commentaire non trouvé" });

    comment.likes += 1;
    await comment.save();
    res.json({ likes: comment.likes });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 4. Ajouter un like à un article
router.post("/:postId/like", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Article non trouvé" });

    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 5. Incrémenter le compteur de vues d'un article
router.post("/:postId/view", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Article non trouvé" });

    post.views += 1;
    await post.save();
    res.json({ views: post.views });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
