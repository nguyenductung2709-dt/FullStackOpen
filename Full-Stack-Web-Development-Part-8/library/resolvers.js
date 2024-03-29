const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user');
require('dotenv').config()
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
      bookCount: async() => Book.collection.countDocuments(), //count length of books
  
      authorCount: async() => Author.collection.countDocuments(), //count length of authors in database
  
      allBooks: async (root, args) => {
        let query = {};
      
        if (args.author) {
          query.author = args.author;
        }
      
        if (args.genre) {
          query.genres = { $in: [args.genre] }; // $in to check if the genre is in the array
        }
      
        try {
          const books = await Book.find(query).populate('author');
          return books;
        } catch (error) {
          throw new Error(`Error fetching books: ${error.message}`);
        }
      },    
  
      allAuthors: async() => {
        console.log("Author found")
        return Author.find({})
      },
      
      me: (root, args, context) => {
        return context.currentUser
      }
    },
  
    Author: {
      bookCount: async ({ name }) => {
        const author = await Author.find({ name: name });
        let query = { author }; 
        const books = await Book.find(query);
    
        if (books === null || books === undefined) {
          return 0;
        }
        console.log("Book count")
        return books.length;
      }
    },
    
    Mutation: {
  
      addBook: async (root, args, context) => {
        let author = await Author.findOne({ name: args.author });
  
        if (!context.currentUser) {
          throw new Error('Authentication required to add a book');
        }
    
        // If the author doesn't exist, create a new author
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }
    
        const book = new Book({
          ...args,
          author: author._id, // Use the ObjectId of the author
          genres: args.genres,
        });
    
        try {
        await book.save();
        }
        catch (error) {
          throw new GraphQLError('Saving person failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        
        // Retrieve the book with populated author information
        const savedBook = await Book.findById(book._id).populate('author');
    
        pubsub.publish('BOOK_ADDED', {bookAdded: savedBook})

        return savedBook; // Return the created book with populated author
      },
  
      editAuthor: async (root, args, context) => {
        if (!context.currentUser) {
          throw new Error('Authentication required to add a book');
        }
        
        try {
          const updatedAuthor = await Author.findOneAndUpdate(
            { name: args.name },
            { $set: { born: args.setBornTo } },
            { new: true }
          );
          return updatedAuthor;
        } catch (error) {
          throw new Error(`Editing author failed: ${error.message}`);
        }
      },
  
      createUser: async (root, args) => {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        return user.save()
        .catch(error => {
          throw new GraphQLError("Creating the user failed", {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
          }
        })
      })
      },
  
      login: async(root,args) => {
        const user = await User.findOne({ username: args.username })
        if (!user || args.password !== 'tungdt') {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT' }
          })    
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

  
module.exports = resolvers