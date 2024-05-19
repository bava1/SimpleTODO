import './Blog.css';
import { useEffect, useState } from 'react';
import { LuUser2 } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
import { MdEdit } from "react-icons/md";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [updateButton, setUpdateButton] = useState(false);

    const URL = '/api/posts';
    const getPosts = async () => {
        const options = {
            method: 'GET'
        }
        const result = await fetch(URL, options);
        if (result.ok) {
            const posts = await result.json();
            setPosts(posts);
            console.log('posts', posts);
            return posts;
        }
        return [];
    }

    const addPost = async () => {

        const headerFormUser = document.querySelector('#header').value;
        const textFormUser = document.querySelector('#text').value;

        if (headerFormUser && textFormUser) {
            const newPost = {
                header: headerFormUser,
                text: textFormUser
            }
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(newPost)
            }
            const result = await fetch(URL, options);
            if (result.ok) {
                const post = await result.json();
                posts.push(post)
                setPosts(posts.slice().reverse());
                console.log('one post', post);
                document.querySelector('#header').value = '';
                document.querySelector('#text').value = '';
            }
        }

    }


    const selectPost = (oldPost) => {
        document.querySelector('#header').value = oldPost.header;
        document.querySelector('#text').value = oldPost.text;
        setUpdateId(oldPost.id)
        setUpdateButton(true)
    }

    const cancelUpdatePost = () => {
        document.querySelector('#header').value = '';
        document.querySelector('#text').value = '';
        setUpdateId(null)
        setUpdateButton(false)
    }


    const updatePost = async () => {

        const headerFormUser = document.querySelector('#header').value;
        const textFormUser = document.querySelector('#text').value;
        const idFormUser = updateId;

        if (headerFormUser && textFormUser && idFormUser) {
            const newPost = {
                id: idFormUser,
                header: headerFormUser,
                text: textFormUser
            }
            //console.log('newPost', newPost)

            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            const options = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(newPost)
            }
            const result = await fetch(URL, options);
            if (result.ok) {
                const post = await result.json();
                const upPost = posts.findIndex(x => x.id === updateId)
                posts[upPost] = post;
                setPosts(posts.slice().reverse());
                document.querySelector('#header').value = '';
                document.querySelector('#text').value = '';
                setUpdateButton(false)
                setUpdateId(null)
            }
        }
      
    }

    const deletePost = (id) => {
        const options = {
            method: 'DELETE',
            headers: new Headers(),
        }
        fetch(URL + `/${id}`, options);
        setPosts(posts.filter(x => x.id !== id));
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <section className="blog">
            <h1>Blog</h1>
            <div className="blog-form">
                <div className="blog-form_input">
                    <input
                        placeholder="Your name*"
                        id="header"
                        type="text"
                        maxLength="20"/>
                </div>
                <div className="blog-form_input">
                    <textarea
                        placeholder="Your post*"
                        id="text"
                        type="text"
                        maxLength="200"
                        ></textarea>
                </div>
                {updateButton ?
                    (
                        <div>
                            <button onClick={() => updatePost()}>Update Post</button>
                            <button className="blog-form_cancel" onClick={() => cancelUpdatePost()}>Cancel</button>
                        </div>

                    )
                    :
                    (
                        <button onClick={() => addPost()}>Add Post</button>
                    )
                }
            </div>
            <h2>Posts list</h2>
						{posts.length > 0 ? 
						
					(
						<div className="blog-posts">
						{posts.map((post, index) => {
								return (

								<div key={index} className="blog-posts_post">
									<div className="blog-posts_post-item">
										<div className="blog-posts_post-item_header">
											<div>
													<LuUser2 className="blog-posts_post-icon" />
													<span>{post.header}</span>
											</div>
                                                <section>
                                                    {(post.id !== updateId) && (
                                                        <div>
                                                            <MdEdit onClick={() => selectPost(post)} className="blog-posts_post-icon_update" />
                                                            <TiDeleteOutline onClick={() => deletePost(post.id)} className="blog-posts_post-icon_delete" />
                                                        </div>
                                                    )}

											</section>
										</div>
									</div>
									<div className="blog-posts_post-item">{post.text}</div>
								</div>
								)
						})}
				</div>
					):(
						<div>
							<h3>Sorry, no posts yet...</h3>
						</div>
					)
					}

        </section>
    )
}

export default Blog