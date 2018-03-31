const express = require('express');
const tbl_user = require('../models/user');
const Board = require('../models/board');
const Seq = require('../models/seq');
const router = express.Router();


/*
 * Method : GET
 * @params req : 전체 게시글 가져오기.
 * @params res : vue List.component.js의 boardList()
 */

router.get('/list', (req, res) => {

    /* models/board.js */
    Board.findAll({})
        .then(result => {
            
            console.log(result.length);
            console.log(result[0].registedAt)
            console.log(new Date(result[0].registedAt));
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err)
        });
});

/*
 * Method : GET
 * @params req : 게시물 상세보기를 위한 데이터,
 * @params res : vue List.component.html의 router-link to를 통한 이동
 */

router.get('/view/:no', (req, res) => {
    let boardId = req.params.no;
    Board.findOneBoardData(boardId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

/*
 * Method : DELETE
 * @params req : 게시물 삭제를 위한 데이터,
 * @params res : vue View.component.js의 boardDelete()
 */

router.delete('/:no', (req, res) => {
    /* 삭제할 게시글 번호 */
    let boardId = req.params.no;
    Board.deleteBoard(boardId)
        .then(result => {
            res.status(200).send("success");
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


/*
 * Method : POST
 * @params req : 게시물 저장을 위한 데이터,
 * @params res : vue Write.component.js의 boardSave()
 */

router.post('/', (req, res) => {

    let reqBody = req.body;
    let board = {};

    console.log(reqBody.register);
    console.log(reqBody.registedAt);
    Seq.getBoardCount()
        .then((result) => {
            board.no = result.count;
        })
        .then(() => {
            board.title = reqBody.title;
            board.contents = reqBody.contents;
            board.register = reqBody.register;
            board.registedAt = reqBody.registedAt;

            Board.saveBoard(board)
                .then(result => {
                    res.status(200).send(board);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
});


/*
 * Method : PUT
 * @params req : 데이터 수정을 위한 글 번호 , 제목 , 내용
 * @params res : vue Modify.component.js 의 boarAdjust()
 */
router.put('/', (req, res) => {
    const reqBody = req.body;

    let no = reqBody.no;
    let updateBoard = {};
    updateBoard.title = reqBody.title;
    updateBoard.contents = reqBody.contents;

    Board.updateBoard(no ,  updateBoard)
        .then(result=>{
            console.log(result);
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
});
module.exports = router;
