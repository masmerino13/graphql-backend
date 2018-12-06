const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');

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
        link: (root, args) => {
            const { id } = args;
            return _.find(links, i => i.id == id);
        }
    },
    Mutation: {
        createLink: (root, args) => {
            const { description, url } = args,
                id = links.length + 1,
                link = {
                    id,
                    description,
                    url
                };

            links.push(link);

            return link;
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
