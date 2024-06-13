const users = [
    {
        username: 'tom123',
        email: 'example1@example.com',
        password: 'Example123!',
        bio: 'I am just an example'
    },
    {
        username: 'jack456',
        email: 'example2@example.com',
        password: 'Example456!',
        avatar_img_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
];

const posts = [
    {
        user_id: 1,
        post_body: 'What a gorgeous sunset this is!',
        post_img_url: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
        created_at: 1604728980000
    },
    {
        user_id: 2,
        post_body: 'Enjoying the pool while I can. This holiday has been absolutely amazing and I am definitely going to miss it a lot when I go home.',
        post_img_url: 'https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9vbHxlbnwwfHwwfHx8MA%3D%3D',
        created_at: 1604728670000
    }
];

const comments = [
    {
        user_id: 2,
        post_id: 1,
        comment_body: 'Wow that is beautiful'
    }
];

module.exports = { users, posts, comments };