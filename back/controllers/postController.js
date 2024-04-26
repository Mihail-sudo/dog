import PostModel from '../models/post.js'

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
            testUrl: null
        })

        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'no post today'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "couldn't get posts"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const article = await PostModel.findById(postId);

        if (!article) {
            return res.status(404).json({ message: 'Статья не найдена' });
        }
        article.viewsCount += 1;
    
        await article.save();
        await article.populate('user')
        res.json(article);
      
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Post getting faild",
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const article = await PostModel.findById(postId)
        
        if (!article) {
            return res.status(404).json({ message: 'could not find the post' })
        }

        await article.deleteOne()
        res.json(article)
      
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Post getting faild",
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId
            }, {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
                testUrl: req.body.testUrl
            })
        
        res.json({
            success: true
        })
      
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "could not update post",
        })
    }
}

export const getLastTags = async (_req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "couldn't get posts"
        })
    }
}
