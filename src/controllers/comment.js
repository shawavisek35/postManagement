'use strict'

const { db } = require('../startup/db');

async function getComments(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('error connecting to database');
      const { postId } = req.body;
      const queryString = `SELECT * FROM comments WHERE  postId=${postId} AND status=1;`
      db.query(queryString, (err, result) => {
        if(err) return reject('error executing the query');
        resolve(result);
      })
    })  
  })
}


async function createComment(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('error connecting to database');
      const { postId, author, comment, createdOn } = req.body;
      const queryString = `INSERT INTO comments (postId, author, comment, status, createdOn) VALUES(${postId}, "${author}", "${comment}", 1, "${createdOn}");`
      db.query(queryString, (err, result) => {
        if(err) return reject('error executing the query');
        else resolve('Comment successfully created');
      })
    })
  })
}

async function updateComment(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('Error in connecting to database');
      const { commentId, comment } = req.body;
      const { name } = req.user;
      let checkQuery = `SELECT * FROM comments WHERE commentId=${commentId} and author="${name}";`
      db.query(checkQuery, (err, result) => {
        if(err) return reject("Failed to execute query");
        if(result.length == 0) {
          return reject('This is not your comment so you cannot update it');
        }
        else {
          let queryString = `UPDATE comments`;
          if(comment) queryString += ` SET comment="${comment}"`;
          queryString += `WHERE commentId=${commentId};`;
          db.query(queryString, (err, result) => {
            if(err) return reject("Failed to execute query");
            else resolve('Comment successfully updated');
          })
        }
      })
    })
  })    
}

async function deleteComment(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('Error in connecting to database');
      const { commentId } = req.body;
      const { name } = req.user;
      let checkQuery = `SELECT * FROM comments WHERE commentId=${commentId} and author="${name}";`
      db.query(checkQuery, (err, result) => {
        if(err) return reject("Failed to execute query");
        if(result.length == 0) {
          return reject('This is not your comment so you cannot delete it');
        }
        else {
          const queryString = `UPDATE comments SET status = 0 WHERE commentId = ${commentId};`
          db.query(queryString, (err, result) => {
            if(err) return reject("Failed to execute query");
            else resolve('Comment successfully Deleted');
          })
        }
      })
    })
  }) 
}

module.exports = { createComment, getComments, deleteComment, updateComment }