const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');

const resolvers = {
    Query: {
        info: () => 'Works babies!',
        feed: (root, args, context, info) => context.db.query.links({}, info),
        link: (root, args) => {
            const { id } = args;
            return _.find(links, i => i.id == id);
        }
    },
    Mutation: {
        createLink: (root, args) => {
            return args;
        },
        updateLink: (root, args) => {
            const { id, url, description } = args;

            let link = links.find(i => {
                return i.id == id;
            });

            link.url = url;
            link.description = description;
        },
        deleteLink: (root, args) => {
            const { id } = args;
            
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});
const port = 7777;

server.start({ port }, () => console.log(`Server is running on http://localhost:${port}`));
