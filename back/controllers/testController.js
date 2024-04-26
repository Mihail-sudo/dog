import TestModel from '../models/test.js'
import QuestionModel from '../models/question.js'

export const checkAnswers = async (req, res) => {
    try {
        const testId = req.query.id
        let answers = req.query.answers
        answers = answers.map((elem) => Number(elem))

        let rights = 0

        const test = await TestModel.findById(testId);

        const questions = test.questions
        for (var elem in questions) {
            const question = await QuestionModel.findById(questions[elem]);
            question.answer === answers[elem] ? rights += 1 : rights += 0
        }

        res.json({
            result: rights,
            max: answers.length
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'couldnt check answers' })
    } 
}

export const create = async (req, res) => {
    try {
        const ids = []
        const questions = req.body.questions

        questions.map((elem) => {
            const line = elem.split('#')
            const title = line.shift()
            const answer = Number(line.pop())

            const doc = new QuestionModel({
                title: title,
                answer: answer - 1,
                questions: line
            })

            doc.save()
            ids.push(doc._id)
        })

        const doc = new TestModel({
            title: req.body.title,
            questions: ids,
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

export const getAll = async (_, res) => {
    try {
        const posts = await TestModel.find()
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
        const testId = req.params.id;

        const article = await TestModel.findById(testId);

        if (!article) {
            return res.status(404).json({ message: 'Тест не найдена' });
        }

        const questions = []
        for (var question of article.questions) {
            const quest = await QuestionModel.findById(question)
            const data = { title: quest.title, questions: quest.questions}
            questions.push(data)
        }

        const response = {
            _id: article._id,
            title: article.title,
            questions: questions
        }

        res.json(response);
      
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            message: "Post getting failed",
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const article = await TestModel.findById(postId)
        
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

        await TestModel.updateOne(
            {
                _id: postId
            }, {
                title: req.body.title,
                questions: req.body.questions,
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

