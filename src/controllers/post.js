'use strict'

const { db } = require('../startup/db');

async function createPost(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('error connecting to database');
      const { title, content, createdOn } = req.body;
      const { name } = req.user;
      const queryString = `INSERT INTO post (author, title, content, status, createdOn) VALUES("${name}", "${title}", "${content}", 1, "${createdOn}");`
      db.query(queryString, (err, result) => {
        if(err) return reject('error executing the query');
        else resolve('post successfully created');
      })
    })
  })
}


async function deletePost(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('Error in connecting to database');
      const { postId } = req.body;
      const { name } = req.user;
      let checkQuery = `SELECT * FROM post WHERE postId=${postId} and author="${name}";`
      db.query(checkQuery, (err, result) => {
        if(err) return reject("Failed to execute query");
        if(result.length == 0) {
          return reject('This is not your post so you cannot delete it');
        }
        else {
          const queryString = `UPDATE post SET status = 0 WHERE postId = ${postId};`
          db.query(queryString, (err, result) => {
            if(err) return reject("Failed to execute query");
            const queryString1 = `UPDATE comments SET status = 0 WHERE postId = ${postId};`
            db.query(queryString1, (err, result) => {
              if(err) return reject("Failed to execute query");
              else resolve('post successfully deleted');
            })
          })
        }
      })
    })
  })
}

async function getPosts() {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('error connecting to database');
      const queryString = `SELECT * FROM post WHERE status=1;`
      db.query(queryString, (err, result) => {
        if(err) return reject('error executing the query');
        else resolve(result);
      })
    })  
  })
}



async function updatePost(req) {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if(err) return reject('error connecting to database');
      const { postId, title, content } = req.body;
      const { name } = req.user;
      let checkQuery = `SELECT * FROM post WHERE postId=${postId} and author="${name}";`
      db.query(checkQuery, (err, result) => {
        if(err) return reject("Failed to execute query");
        if(result.length == 0) {
          return reject('This is not your post so you cannot update it');
        }
        let queryString = `UPDATE post`;
        if(title || content) queryString += ` SET`;
        if(title) queryString += ` title="${title},"`;
        if(content) queryString += ` content="${content}"`;
        queryString += ` WHERE postId=${postId};`;
        db.query(queryString, (err, result) => {
          if(err) return reject('failed to execute query');
          else resolve('post successfully updated');
        })
      })
    })
  })
}



module.exports = { createPost, deletePost, getPosts, updatePost };