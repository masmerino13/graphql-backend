const { GraphQLServer } = require('graphql-yoga');

const links = [
    {
        id: 1,
        url: 'www.google.com',
        description: 'Fullstack developer link'
    },
    {
        id: 2,
        url: 'www.another.com',
        description: 'Another link'
    }
];

const resolvers = {
    Query: {
        info: () => 'Works babies!',
        feed: () => links,
        link: (id) => {
            links.filter(link => link.id === id)
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});
const port = 7777;

server.start({ port }, () => console.log(`Server is running on http://localhost:${port}`));
