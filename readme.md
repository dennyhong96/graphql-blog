# GraphQL multi-user realtime blog application template

#### In the spirit of learning GraphQL and Apollo, I created this easy-to-use full-stack blog application template with React, Material-UI, Nodejs, MongoDB.

## Implemented User stories:

#### As a user, I want to...

- Browse and read blog posts.
- See realtime blog post updates without refresh.
- Search blog posts by keyword.
- Authenticate with google or email.
- Write blog posts with a rich text editor and attach an image.
- Update and delete my blog posts.
- Create a public profile.
- Upload multiple profile images.
- See other blogger's public profile.

## Live Demo

[Live app on Heroku](https://denny-gql-blog.herokuapp.com/ "Realtime Blog")

## Screenshot Previews

#### Browse blog posts with pagination

<img src="./previews/pagination.gif" width="80%">

#### Search blog posts by keyword.

<img src="./previews/search.gif" width="80%">

#### Uesr authenticatation.

<img src="./previews/authentication.gif" width="80%">

#### Create blog post.

<img src="./previews/createpost.gif" width="80%">

#### Update blog post.

<img src="./previews/updatepost.gif" width="80%">

#### Update user public profile.

<img src="./previews/updateuser.gif" width="80%">

#### Browse user public profile.

<img src="./previews/publicprofile.gif" width="80%">

## Installation

Use NPM:

```bash
cd client && npm i # install react app dependencies
cd ..
cd server && npm i # install express app dependencies
```

## Usage

```bash
cd server && npm start # start up server on http://localhost:8000
# open up another terminal tab
npm start # start up react dev server on http://localhost:3000
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
