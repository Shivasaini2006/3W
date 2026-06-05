async function test() {
  try {
    const signupReq = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@test.com',
        password: 'password'
      })
    });
    const signup = await signupReq.json();
    if (!signupReq.ok) throw new Error(signup.error);
    const token = signup.token;
    console.log('Signed up, token:', token);

    const postReq = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: 'Hello world', image: '' })
    });
    const post = await postReq.json();
    if (!postReq.ok) throw new Error(post.error);
    console.log('Created post:', post._id);

    const likeReq = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    const like = await likeReq.json();
    if (!likeReq.ok) throw new Error(like.error);
    console.log('Liked post:', like.likes);

    const commentReq = await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: 'Nice post' })
    });
    const comment = await commentReq.json();
    if (!commentReq.ok) throw new Error(comment.error);
    console.log('Commented post:', comment.comments);

  } catch (err) {
    console.error('Error:', err.message);
  }
}
test();
